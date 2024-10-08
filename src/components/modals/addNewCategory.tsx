import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import APIServices from "@/services/api_services/api_service";
import { useState } from "react";
import AdminServices from "@/services/admin_services/admin_services";
import { createCategory } from "@/models/admin.model";
import { useOnboarding } from "@/context/OnboardingContext";

type NewCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewCategory({
  isOpen,
  onClose,
}: NewCategoryModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const toast = useToast();
  const { setApiErrorMessage } = useOnboarding();
  const createCategory = async (criteria?: string) => {
    setLoading(true);
    const data: createCategory = {
      name,
      description,
    };
    try {
      const res = await AdminServices.createCategory(data, criteria);
      console.log(res);
      if (res.statusCode === 201) {
        setLoading(false);
        toast({
          title: "Create Category",
          description: "New category added",
          duration: 3000,
          position: "bottom-right",
          status: "success",
        });
        //   getApiPricing(api.apiCode);
        // router.reload();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      console.error("Caught error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unknown error occurred";
      setApiErrorMessage(errorMessage, "error");
    }
  };
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              <Button
                type="fit"
                text="Save"
                onClick={() => {
                  createCategory();
                }}
                loading={loading}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
