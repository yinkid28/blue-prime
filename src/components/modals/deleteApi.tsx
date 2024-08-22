import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { IApi } from "@/models/api.model";
import { useRouter } from "next/router";
import APIServices from "@/services/api_services/api_service";
import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  api: IApi;
};
export default function DeleteAPIModal({
  isOpen,
  onClose,
  api,
}: addEndpointModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setApiErrorMessage } = useOnboarding();
  const toast = useToast();
  const deleteApi = async (aco: string) => {
    setLoading(true);
    try {
      const response = await APIServices.deleteApi(aco);
      if (response.statusCode === 200) {
        setLoading(false);

        toast({
          title: "Delete Api",
          description: "API successfully deleted",
          duration: 3000,
          position: "bottom-right",
        });
        router.push("/weaver/dashboard");
      }
    } catch (error: any) {
      setLoading(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Delete API
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="">
            <p>Are you sure you want to delete {api.name}?</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex justify-end gap-3">
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-light-grey  text-dark-grey font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-error-bg text-error font-semibold"
              onClick={() => {
                deleteApi(api.apiCode);
              }}
            >
              {loading ? <Spinner size={"sm"} /> : "Delete"}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
