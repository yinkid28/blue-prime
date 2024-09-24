import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "../utils";

interface NewSubscriptionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSubscription({ isOpen, onClose }: NewSubscriptionProps) {
  const [application, setApplication] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");

  const handleNext = () => {
    
    console.log("Application:", application);
    console.log("Subscription Plan:", subscriptionPlan);
   
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-white rounded-lg" maxWidth="400px">
        <ModalHeader className="text-lg font-semibold">New Subscription</ModalHeader>
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
              <select
                id="application"
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an application</option>
                <option value="Edu App">Edu App</option>
                {/* Add more options as needed */}
              </select>
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
              >
                <option value="">Select a plan</option>
                <option value="Gold">Gold</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <Button
              text="Next"
              onClick={handleNext}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}