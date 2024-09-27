import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import APIServices from "@/services/api_services/api_service";
import { useOnboarding } from "@/context/OnboardingContext";
import { useApi } from "@/context/ApiDiscoveryContext";
import { createApplication } from "@/models/api.model";

interface AddAppProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cco: string;
}

export default function AddApp({ isOpen, onClose, onSuccess, cco }: AddAppProps) {
  const { setApiErrorMessage, setLoading } = useOnboarding();
  const { api, setApi } = useApi();
  const [state, setState] = useState<createApplication>({
    name: "",
    throttlingPolicy: "",
    description: "",
    tokenType: "JWT",
    groups: [],
    attributes: {},
    subscriptionScopes: [],
  });
  const { name, throttlingPolicy, description } = state;
  const toast = useToast();

  const createApplication = async () => {
    setLoading(true);

    const data: createApplication = state;
    console.log(data, "application data");
    try {
      const res = await APIServices.createApplication(cco, data);
      if (res.statusCode === 201) {
        console.log(res);
        toast({
          title: "Application created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        onSuccess();
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error?.response?.data?.message || "Failed to create application";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchThrottlingPolicies = async (policyName: string) => {
    try {
      setLoading(false);
      const response = await APIServices.getAllWebberThrottlingPolicies(
        "application",
         policyName
      );
      console.log("Throttling policies:", response);
      
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to fetch throttling policies";
      setApiErrorMessage(errorMessage);
    } 
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "throttlingPolicy") {
      fetchThrottlingPolicies(value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Add Application
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full rounded-lg bg-white">
          <p className="my-3">Input details of your website</p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs">
                Application Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="New App"
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
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleChange}
                className="border-mid-grey p-2 border rounded-md"
              />
            </div>
            <Button
              text="Save"
              onClick={createApplication}
              className="w-20 ml-auto mt-2"
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}