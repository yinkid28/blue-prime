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

  const createComment = async (aco: string, to?: string) => {
    const data = {
      content,
      category: "",
    };
    setIsCreating(true);
    try {
      const res = await APIServices.createComment(data, aco, to);
      if (res.statusCode === 201) {
        // setComments(res.data);
        setIsCreating(false);
        toast({
          title: "Feedback",
          description: "Feedback Saved",
          duration: 3000,
          status: "success",
          position: "bottom-right",
        });
        onClose();
        // getComments(api?.apiCode as string, 10, 0);
        router.reload();
      }
      setLoading(false);
    } catch (error: any) {
      setIsCreating(false);
      console.log(error);
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
                  createComment(
                    api?.apiCode as string,
                    to !== undefined ? to : undefined
                  );
                }}
                loading={isCreating}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
