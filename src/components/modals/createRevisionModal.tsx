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
import { useState } from "react";
import APIServices from "@/services/api_services/api_service";
import { useRouter } from "next/router";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function CreateRevision({
  isOpen,
  onClose,
}: addEndpointModalProps) {
  const toast = useToast();
  const router = useRouter();
  const [description, setDesc] = useState<string>("");
  const { api } = useApi();
  const { setApiErrorMessage } = useOnboarding();
  const [loading, setLoading] = useState<boolean>(false);
  const createRevision = async (apiCode: string) => {
    setLoading(true);
    const data = { description };
    try {
      const res = await APIServices.createRevision(data, apiCode);
      if (res.statusCode === 201) {
        setLoading(false);
        toast({
          title: "Revision Creation",
          description: "Revision successfully created",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        router.reload();
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
          New Revision
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Description</p>
              <textarea
                placeholder="Describe your Endpoint"
                name="endpointDescription"
                id="endpointDescription"
                rows={5}
                value={description}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Button
                type="fit"
                text="Create"
                onClick={() => {
                  createRevision(api?.apiCode as string);
                }}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
