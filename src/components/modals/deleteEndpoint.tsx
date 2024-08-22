import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { IPolicy, SwaggerOperation } from "@/models/api.model";
import { FaCircleMinus } from "react-icons/fa6";
import { useState } from "react";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  deleteEndpoint: () => void;
};
export default function DeleteEndpointModal({
  isOpen,
  onClose,
  deleteEndpoint,
}: addEndpointModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Remove Endpoint
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <p className="">
              Are you sure you want to remove this endpoint? You will lose all
              configurations made on the endpoint.
            </p>
            <div className="flex justify-end gap-3 items-center">
              <button
                className="text-mid-grey border-dark-grey rounded-lg w-fit h-fit px-5 py-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <Button
                type="fit"
                text="Remove"
                onClick={() => {
                  deleteEndpoint();
                }}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
