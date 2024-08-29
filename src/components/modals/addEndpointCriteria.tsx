import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { NewEndpointCriteriaModalProps } from "@/models/api.model";


export default function CreateEndpointCriteria({
  isOpen,
  onClose,
}: NewEndpointCriteriaModalProps) {
  const modalSize = useBreakpointValue({ base: "95%", md: "500px" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const closeButtonTop = useBreakpointValue({ base: "16px", md: "28px" });
  const closeButtonRight = useBreakpointValue({ base: "16px", md: "30px" });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="bg-light-grey p-2" bg="#F8F8F8" width={modalSize} maxWidth={modalSize}>
        <ModalHeader className="text-mid-grey font-semibold" fontSize={fontSize}>
          New Endpoint Criteria
        </ModalHeader>
        <ModalCloseButton
          position="absolute"
          top={closeButtonTop}
          right={closeButtonRight}
          size="sm"
          color="gray.400"
          _hover={{ bg: "gray.200" }}
          sx={{
            borderRadius: "full",
            border: "1px solid gray",
            borderColor: "gray.400",
          }}
        />
        <ModalBody p={4} className="rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col hover:border-blue-500 group">
              <p className="text-xs text-dark-grey group-focus-within:text-blue-500">
                Name
              </p>
              <input
                type="text"
                placeholder="Data Analysis"
                className="outline-none border-none w-full"
              />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col hover:border-blue-500 group">
              <p className="text-xs text-dark-gray group-focus-within:text-blue-500">
                Description
              </p>
              <textarea
                placeholder="Description..."
                name="categoryDescription"
                id="categoryDescription"
                rows={3}
                className="outline-none text-border-blue w-full"
              ></textarea>
            </div>
            <div className="flex justify-end ">
              <Button type="fit" text="Save" onClick={() => {}} />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}



