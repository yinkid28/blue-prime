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
import APIServices from "@/services/api_services/api_service";
import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useRouter } from "next/router";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  to?: string;
};
export default function CreateComment({
  isOpen,
  onClose,
  to,
}: addEndpointModalProps) {
  const { api, setApi } = useApi();
  const toast = useToast();
  const router = useRouter();
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  const [content, setContent] = useState<string>("");

  const createComment = async (aco: string, to?: string) => {
    const data = {
      content,
      category: "",
    };
    try {
      const res = await APIServices.createComment(data, aco, to);
      if (res.statusCode === 201) {
        // setComments(res.data);
        toast({
          title: "Feedback",
          description: "Feedback Saved",
          duration: 3000,
          status: "success",
          position: "bottom-right",
        });
        onClose();
      }
      setLoading(false);
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
          {to ? "New Reply" : "New Comment"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Feedback</p>
              <textarea
                placeholder="Give a Feedback"
                name="feedback"
                id="feedback"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Button
                type="fit"
                text="Save"
                onClick={() => {
                  createComment(api?.apiCode as string, to);
                }}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
