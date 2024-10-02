import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import APIServices from "@/services/api_services/api_service";
import { useOnboarding } from "@/context/OnboardingContext";

interface EditAppProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  appco: string;
}

interface UpdateApplication {
  name: string;
  throttlingPolicy: string;
  description: string;
}

export default function EditApp({
  isOpen,
  onClose,
  onSuccess,
  appco,
}: EditAppProps) {
  const { setApiErrorMessage, setLoading } = useOnboarding();
  const [update, setUpdate] = useState<UpdateApplication>({
    name: "",
    throttlingPolicy: "",
    description: "",
  });
  const { name, throttlingPolicy, description } = update;
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchApplicationDetails();
    }
  }, [isOpen, appco]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      const response = await APIServices.getWebberApplication(appco);
      if (response.statusCode === 200) {
        setUpdate(response.data);
      } else {
        throw new Error("Failed to fetch application details");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch application details";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // <<<<<<< HEAD
  // const fetchThrottlingPolicies = async (policyName: string) => {
  //   try {
  //     setLoading(false);
  //     const response = await APIServices.getAllWebberThrottlingPolicies(
  //       "application",
  //       25,
  //       0
  //     );
  //     setLoading(false);
  //   } catch (error: any) {
  //     setLoading(false);
  //     const errorMessage = error?.response?.data?.message;
  //     setApiErrorMessage(errorMessage, "error");
  //   }
  // };
  // =======
  //   const fetchThrottlingPolicies = async (policyName: string) => {
  //     try {
  //       setLoading(false);
  //       const response = await APIServices.getAllWebberThrottlingPolicies(
  //         "application",
  //          policyName
  //       );
  //       console.log("Throttling policies:", response);

  //     } catch (error: any) {
  //       const errorMessage = error?.response?.data?.message || "Failed to fetch throttling policies";
  //       setApiErrorMessage(errorMessage);
  //     }
  //   };
  // >>>>>>> b97c7e4 (update application)

  const updateApplication = async (appco: string) => {
    setLoading(false);
    try {
      const res = await APIServices.updateWebberApplication(appco, update);
      if (res.statusCode === 200) {
        toast({
          title: "Application updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onSuccess();
        onClose();
      } else {
        throw new Error("Failed to update application");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update application";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));

    // if (name === "throttlingPolicy") {
    //   fetchThrottlingPolicies(value);
    // }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Edit Application
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full rounded-lg bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs">
                Application Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
                className="border-mid-grey p-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="throttlingPolicy" className="text-xs">
                Shared Token Quota
              </label>
              <select
                className="border-mid-grey p-2 border rounded-md"
                name="throttlingPolicy"
                id="throttlingPolicy"
                value={throttlingPolicy}
                onChange={handleChange}
              >
                <option value="">Select a policy</option>
                <option value={"10PerMin"}>10 per min</option>
                <option value={"20PerMin"}>20 per min</option>
                <option value={"30PerMin"}>30 per min</option>
                <option value={"40PerMin"}>40 per min</option>
                <option value={"50PerMin"}>50 per min</option>
                <option value={"20PerMin"}>60 per min</option>
                <option value={"70PerMin"}>70 per min</option>
                <option value={"80PerMin"}>80 per min</option>
                <option value={"90PerMin"}>90 per min</option>
                <option value={"Unlimited"}>Unlimited</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-xs">
                Descriptions
              </label>
              <textarea
                rows={5}
                name="description"
                value={description}
                onChange={handleChange}
                className="border-mid-grey p-2 border rounded-md"
              />
            </div>

            <Button
              text="Update"
              onClick={() => updateApplication(appco)}
              className="w-20 ml-auto mt-2"
              disabled={!name || !throttlingPolicy}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
