import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
} from "@chakra-ui/react";
import { Button } from "../utils";

type NewCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewCategory({
  isOpen,
  onClose,
}: NewCategoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold ">
          New Category
        </ModalHeader>
        <ModalCloseButton
          position="absolute"
          top="28px"
          right="30px"
          size="sm"
          _hover={{ bg: "gray.200" }}
          sx={{
            borderRadius: "full",
            border: "2px solid gray",
            borderColor: "gray.700",
          }}
        />
        <ModalBody className="w-full rounded-lg bg-white">
          <div className="flex flex-col gap-2 ">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col hover:border-blue-500 group">
              <p className="text-xs text-dark-grey group-focus-within:text-blue-500">
                Name
              </p>
              <input
                type="text"
                placeholder="Data Analysis"
                className="outline-none border-none"
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
                className="outline-none text-border-blue"
              ></textarea>
            </div>

            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col hover:border-blue-500 group">
              <p className="text-xs pb-2 text-dark-grey group-focus-within:text-blue-500">
                API Approval Criteria
              </p>
              <Select
                placeholder="80% of Endpoints"
                className="border-none outline-none"
              ></Select>
            </div>

            <div className="flex justify-end mt-4">
              <Button type="fit" text="Save" onClick={() => {}} />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
