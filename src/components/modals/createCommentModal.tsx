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
import { useUser } from "@/context/userContext";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  to?: string;
  // getComments: (aco: string, limit: number, offset: number) => void;
};
export default function CreateComment({
  isOpen,
  onClose,
  to,
}: // getComments,
addEndpointModalProps) {
  const { api, setApi } = useApi();
  const { userType } = useUser();
  const toast = useToast();
  const router = useRouter();
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  const [content, setContent] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCreateComment = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        status: "error",
        duration: 3000,
        position: "bottom-right",
      });
      return;
    }

    const data = { content, category: "" };
    setIsCreating(true);

    try {
      const createCommentFunction = userType === "webber" 
        ? APIServices.createWebberComment 
        : APIServices.createComment;

      const res = await createCommentFunction(data, api?.apiCode as string, to);

      if (res.statusCode === 201) {
        setIsCreating(false);
        toast({
          title: "Feedback",
          description: "Feedback Saved",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        onClose();
        router.reload();
      }
    } catch (error: any) {
      setIsCreating(false);
      console.error(error);
      const errorMessage = error?.response?.data?.message || "An error occurred";
      setApiErrorMessage(errorMessage, "error");
    } finally {
      setLoading(false);
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
                onClick={handleCreateComment}
                loading={isCreating}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
