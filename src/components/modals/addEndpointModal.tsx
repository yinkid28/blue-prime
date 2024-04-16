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
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function AddEndpointModal({
  isOpen,
  onClose,
}: addEndpointModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Add Endpoint
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey"> API Tag</p>
              <select
                name="rateLimit"
                id="rateLimit"
                className="border-none outline-none"
              >
                <option value="">Choose a policy</option>
                <option value="entertainment">finance</option>
              </select>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Request Method</p>
              <select
                name="rateLimit"
                id="rateLimit"
                className="border-none outline-none"
              >
                <option value="">Choose a method</option>
                <option value="GET">GET</option>
              </select>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey"> Endpoint Name</p>
              <input type="text" className="outline-none border-none" />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Url Parameter</p>
              <input type="text" className="outline-none border-none" />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Endpoint Category</p>
              <select
                name="rateLimit"
                id="rateLimit"
                className="border-none outline-none"
              >
                <option value="">Choose a policy</option>
                <option value="entertainment">finance</option>
              </select>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Description</p>
              <textarea
                placeholder="Describe your Endpoint"
                name="endpointDescription"
                id="endpointDescription"
                rows={5}
              ></textarea>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Summary</p>
              <textarea
                placeholder="Describe your Endpoint"
                name="endpointDescription"
                id="endpointDescription"
                rows={5}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <Button type="fit" text="save" onClick={() => {}} />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
