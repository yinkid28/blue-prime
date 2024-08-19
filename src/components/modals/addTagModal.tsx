import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { useState } from "react";
type addTaglProps = {
  isOpen: boolean;
  onClose: () => void;
  addPath: (path: string) => void;
};
export default function AddTagModal({
  isOpen,
  onClose,
  addPath,
}: addTaglProps) {
  const [pathname, setPathname] = useState<string>("");
  const toast = useToast();
  const createPath = () => {
    if (pathname === "") {
      toast({
        description: "Add a Tag name",
        position: "bottom-right",
        duration: 3000,
        status: "error",
      });
      return;
    }
    const regex = /^\//;

    if (!regex.test(pathname)) {
      toast({
        description: "Ensure Tag name starts with a '/'",
        position: "bottom-right",
        duration: 3000,
        status: "warning",
      });
      return;
    }
    addPath(pathname);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Add API Tag
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Name</p>
              <input
                type="text"
                className="outline-none border-none"
                value={pathname}
                onChange={(e) => setPathname(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="fit"
                text="save"
                onClick={() => {
                  createPath();
                }}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
