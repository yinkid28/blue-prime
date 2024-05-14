import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
} from "@chakra-ui/react";
import { Button } from "../utils";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function CreatePolicy({
  isOpen,
  onClose,
}: addEndpointModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          New Policy
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Policy Name</p>
              <input type="text" className="outline-none border-none" />
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
            <div className="flex items-center flex-col md:flex-row gap-3">
              <Checkbox>Request Count</Checkbox>
              <Checkbox>Request Bandwidth</Checkbox>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Request Count</p>
              <input type="number" className="outline-none border-none" />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-[60%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <p className="text-xs text-dark-grey">Unit Time</p>
                <input type="number" className="outline-none border-none" />
              </div>
              <div className="w-full md:w-[40%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <p className="text-xs text-dark-grey">Time Option</p>
                <select
                  name="rateLimit"
                  id="rateLimit"
                  className="border-none outline-none"
                >
                  <option value="">Choose Time option</option>
                  <option value="entertainment">finance</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="fit" text="Save" onClick={() => {}} />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
