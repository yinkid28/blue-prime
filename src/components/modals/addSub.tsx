import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import APIServices from "@/services/api_services/api_service";
import { useOnboarding } from "@/context/OnboardingContext";
import { ISubscription } from "@/models/api.model";

interface NewSubscriptionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Application {
  name: string;
  appco: string;
}

export default function NewSubscription({
  isOpen,
  onClose,
}: NewSubscriptionProps) {
  const { loading, setLoading, setApiErrorMessage, user } = useOnboarding();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const { api } = useApi();
  const toast = useToast();

  useEffect(() => {
    if (isOpen && user?.customerCode) {
      fetchApplications();
    }
  }, [isOpen, user?.customerCode]);

  const fetchApplications = async () => {
    if (!user?.customerCode) {
      setApiErrorMessage("Customer code not available");
      return;
    }
    setIsLoadingApps(false);
    try {
      const response = await APIServices.getAllWebberApplications(1, 10, user.customerCode);
      console.log("API Response:", response);

      if (response.statusCode === 200) {
        const applicationData = response.data.map((app: any) => ({
          name: app.name,
          appco: app.applicationCode,
        }));
        setApplications(applicationData);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch applications";
      setApiErrorMessage(errorMessage);
    } finally {
      setIsLoadingApps(false);
    }
  };

  const handleCreateSubscription = async () => {
    if (!api || !api.apiCode) {
      toast({
        title: "API information is not available",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!subscriptionPlan || !selectedApplication) {
      toast({
        title: "Please select both an application and a subscription plan",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const selectedApp = applications.find(app => app.name === selectedApplication);
      if (!selectedApp) {
        throw new Error("Selected application not found");
      }

      const data = {
        apiCode: api.apiCode,
        applicationCode: selectedApp.appco,
        throttlingPolicy: subscriptionPlan,
      };
      console.log(data, "application data");

      await APIServices.createSubscription(
        api.apiCode, 
        selectedApp.appco,  
        subscriptionPlan,  
        data 
      );
      toast({
        title: "Subscription created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch subscription";
    setApiErrorMessage(errorMessage);
    setLoading(false);
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-white rounded-lg" maxWidth="400px">
        <ModalHeader className="text-lg font-semibold">
          New Subscription
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p className="my-3 text-sm text-gray-600">
            Select the application and subscription plan
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="application" className="text-sm font-medium">
                Application
              </label>
              {isLoadingApps ? (
                <Spinner size="sm" />
              ) : (
                <select
                  id="application"
                  value={selectedApplication}
                  onChange={(e) => setSelectedApplication(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  disabled={applications.length === 0}
                >
                  <option value="">Select an application</option>
                  {applications.map((app, index) => (
                    <option key={index} value={app.name}>
                      {app.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subscriptionPlan" className="text-sm font-medium">
                Subscription Plan
              </label>
              <select
                id="subscriptionPlan"
                value={subscriptionPlan}
                onChange={(e) => setSubscriptionPlan(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                disabled={!api?.policies || api.policies.length === 0}
              >
                <option value="">Select a plan</option>
                {api?.policies?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <Button
              text="Create Subscription"
              onClick={handleCreateSubscription}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              disabled={loading || isLoadingApps || !subscriptionPlan || !selectedApplication}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

