import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "../utils";
import ApiScratch from "../Webber/CreateAPI/createApiComponent";

type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function ImportAPi({ isOpen, onClose }: addEndpointModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Import API
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          {/* <ApiScratch /> */}
          <div className="flex mt-3 justify-end">
            <Button type="fit" text="Next" onClick={() => {}} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
