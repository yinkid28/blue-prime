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

interface addAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddApp({ isOpen, onClose }: addAppProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Add Application
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <p className="my-3">Input details of your website</p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="appName" className="text-xs">
                Application Name
              </label>
              <input
                type="text"
                name="appName"
                id="appName"
                placeholder="New App"
                className="border-mid-grey p-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="quota" className="text-xs">
                Shared Token Quota
              </label>
              <select
                className="border-mid-grey p-2 border rounded-md"
                name="quota"
                id="quota"
              >
                <option>20 per min</option>
                <option>30 per min</option>
                <option>40 per min</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="callback" className="text-xs">
                Callback URL
              </label>
              <input
                type="text"
                name="callback"
                id="callback"
                className="border-mid-grey p-2 border rounded-md"
                placeholder="https://localhost:8000/customersupport/1.0.0|"
              />
            </div>

            <Button
              text="Save"
              onClick={() => console.log("text has been clicked")}
              className="w-20 ml-auto mt-2"
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
