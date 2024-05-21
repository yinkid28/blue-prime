import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { useState } from "react";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function SubscriptionPolicy({
  isOpen,
  onClose,
}: addEndpointModalProps) {
  const [toggleState, setToggleState] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey font-urbanist" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          New Subscription Policy
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Subscription Policy Name</p>
              <input
                type="text"
                placeholder="Basic"
                className="outline-none border-none"
              />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Description</p>
              <textarea
                placeholder="Describe your Endpoint"
                name="endpointDescription"
                id="endpointDescription"
                rows={3}
              ></textarea>
            </div>
            <div className="flex items-center max-w-[100%] flex-wrap gap-3">
              <Checkbox>Request Count</Checkbox>
              <Checkbox>Request Bandwidth</Checkbox>
              <Checkbox>Event Based (Async API)</Checkbox>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Request Count</p>
              <input
                type="number"
                placeholder="29,500"
                className="outline-none border-none"
              />
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
                  className="border-none outline-none text-mid-grey"
                >
                  <option value="">Choose Time option</option>
                  <option value="entertainment">finance</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-[60%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <p className="text-xs text-dark-grey">
                  Burst Control Rate Limit
                </p>
                <input type="number" className="outline-none border-none" />
              </div>
              <div className="w-full md:w-[40%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <p className="text-xs text-dark-grey">Unit</p>
                <select
                  name="rateLimit"
                  id="rateLimit"
                  className="border-none outline-none text-mid-grey"
                >
                  <option value="">Requests/s</option>
                  <option value="entertainment">finance</option>
                </select>
              </div>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">
                GraphQL Maximum Complexity
              </p>
              <input type="number" className="outline-none border-none" />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">GraphQL Maximum Depth</p>
              <input type="number" className="outline-none border-none" />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">
                Maximum Webhook Subscription{" "}
              </p>
              <input type="number" className="outline-none border-none" />
            </div>

            <div className="flex gap-3">
              <p>Billing Plan:</p>
              <Checkbox>Free</Checkbox>
              <Checkbox>Commercial</Checkbox>
            </div>

            <div className="flex gap-3 items-center">
              <p>Stop on quota reach</p>
              <div
                className="border rounded-full w-8 h-fit flex items-center cursor-pointer"
                onClick={() => setToggleState(!toggleState)}
              >
                <div
                  className={`rounded-full h-2 m-[2.5px] w-2 bg-gradient-to-r duration-300 from-[#2548A0] to-[#424CF9] ${
                    toggleState && "translate-x-[210%]"
                  }`}
                ></div>
              </div>
            </div>

            <div className="flex gap-3">
              <p>Permissions:</p>
              <CheckboxGroup>
                <Checkbox name="none">None</Checkbox>
                <Checkbox name="none">Allow</Checkbox>
                <Checkbox name="none">Deny</Checkbox>
              </CheckboxGroup>
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
