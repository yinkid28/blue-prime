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
import { Button } from "../../utils";
import { IApi } from "@/models/api.model";
import { useRouter } from "next/router";

import { useOnboarding } from "@/context/OnboardingContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  IRole,
  IUser,
  ModifySingleUserRole,
  ModifyUsersRole,
} from "@/models/user.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users: IUser[];
  onRoleOpen: () => void;
  // getUsers?: () => Promise<void>;
};
export default function ChangeUserRoleModal({
  isOpen,
  onClose,
  users,
  onRoleOpen,
}: addEndpointModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setApiErrorMessage } = useOnboarding();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [role, setRole] = useState<string>("");

  const toast = useToast();

  const getAllRoles = async () => {
    try {
      const res = await OnboardingServices.getAllRoles();
      setRoles(res.data.roles);
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  useEffect(() => {
    getAllRoles();
  }, []);
  const isSingleUSer = (users: IUser[]) => {
    if (users.length > 1) {
      return false;
    } else {
      return true;
    }
  };
  const modifyMultiUsersRole = async (roleId: number) => {
    setLoading(true);
    const data: ModifyUsersRole = {
      userIdArray: Array.from(users, (item) => item.id),
    };

    try {
      const res = await OnboardingServices.modifyMultiUsersRole(data, roleId);
      if (res.status === "OK") {
        setLoading(false);
        toast({
          status: "success",
          description: `role modified for ${users.length} users`,
          position: "bottom-right",
        });
        router.reload();
        onClose();
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  const modifySingleUserRole = async (userId: number, role: number) => {
    setLoading(true);
    const data: ModifySingleUserRole = {
      roleArray: [role],
    };

    try {
      const res = await OnboardingServices.modifySingleUserRole(data, userId);
      if (res.status === "OK") {
        setLoading(false);
        toast({
          status: "success",
          description: `role modified for ${users[0].name}`,
          position: "bottom-right",
        });
        router.reload();
        onClose();
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 ">
        <ModalHeader className=" font-semibold">Change Role</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-5">
            {isSingleUSer(users) ? (
              <div className="border p-2 flex items-center gap-2">
                <div className="w-[30px] h-[30px] bg-light-grey rounded-lg flex items-center text-[#052113] justify-center font-semibold ">
                  {users[0]?.name.charAt(0)}
                </div>
                <div className="flex flex-col ">
                  <p className="text-sm text-left text-[#757575]">
                    {users[0]?.name}
                  </p>
                  <p className="text-xs text-mid-grey">
                    Last seen 12/9/2024 13:57
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-[#474A57]">
                  You are about to change the role for the following users.
                </p>
                <ul className="list-disc">
                  {users.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <p className="textsm font-semibold">Role</p>
                <select
                  name="role"
                  id="role"
                  className="p-2 w-full rounded-lg border outline-none"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select a role </option>
                  {roles.map((item, index) => (
                    <option key={index} value={item.id}>
                      {" "}
                      {item.roleName}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="mt-2 flex items-center cursor-pointer gap-2"
                onClick={onRoleOpen}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 9H5V11H9V15H11V11H15V9H11V5H9V9Z"
                    fill="#0085C8"
                  />
                </svg>
                <p className="text-[#474A57]">
                  Can’t find the role? Create a user role
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex justify-end gap-3">
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-[#F5F5F5] text-[#474A57] font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-secondaryBg text-secondary font-semibold"
              onClick={() => {
                if (isSingleUSer(users)) {
                  modifySingleUserRole(users[0].id, parseInt(role));
                } else {
                  modifyMultiUsersRole(parseInt(role));
                }
              }}
            >
              {loading ? <Spinner size={"sm"} /> : "Yes, Update"}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
