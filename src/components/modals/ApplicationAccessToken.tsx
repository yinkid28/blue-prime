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
import { MdFileCopy } from "react-icons/md";
import { useRouter } from "next/router";

interface AddAppProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string;
  validity: number;
}

export default function ApplicationAccessToken({
  isOpen,
  onClose,
  accessToken,
  validity,
}: AddAppProps) {
  const { setApiErrorMessage, setLoading } = useOnboarding();
  const { api, setApi } = useApi();
  const toast = useToast();
  const router = useRouter();
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      toast({
        description: "Token copied to clipboard",
        status: "success",
        duration: 3000,
      });
    } catch (err) {
      console.error("Error copying text: ", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Access Token
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full rounded-lg bg-white">
          <div className="flex flex-col gap-4">
            <p className="text-xl">Please Copy the Access Token</p>
            <p className="text-sm text-mid-grey">
              please copy this generated token value as it will be displayed
              only for the current browser session. ( The token will not be
              visible in the UI after the page is refreshed. )
            </p>
            <div className="flex flex-col gap-2">
              <label htmlFor="token" className="text-xs">
                Access Token
              </label>
              <div className="flex w-full items-center gap-2">
                <textarea
                  rows={3}
                  placeholder="token"
                  name="token"
                  value={accessToken}
                  disabled
                  // onChange={handleChange}
                  className="border-mid-grey w-full p-2 border rounded-md"
                />
                <MdFileCopy
                  className="cursor-pointer"
                  onClick={() => copyText(accessToken)}
                />
              </div>
            </div>
            <Button
              text="close"
              onClick={() => {
                onClose();
                router.reload();
              }}
              className="w-20 ml-auto mt-2"
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
