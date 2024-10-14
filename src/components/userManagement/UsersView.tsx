import { MdAdd } from "react-icons/md";
import { EmptyState, Table } from "../utils";
import { IMockUser } from "@/models/user.model";
import { Checkbox } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { RxCross1 } from "react-icons/rx";

type usersViewProps = {
  users: IMockUser[];
};

export default function UsersView({ users }: usersViewProps) {
  const [selectedUsers, setSelectedUsers] = useState<IMockUser[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const handleSelectedUsers = (
    e: ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { checked, name } = e.target;

    if (name === "all") {
      setAllChecked(checked);
      if (checked) {
        setSelectedUsers(users); // Select all users
      } else {
        setSelectedUsers([]); // Deselect all users
      }
    } else if (index !== undefined) {
      const user = users[index];
      const isSelected = selectedUsers.some(
        (selectedUser) => selectedUser.email === user.email
      );

      if (checked && !isSelected) {
        // Add user to selectedUsers
        setSelectedUsers([...selectedUsers, user]);
      } else if (!checked && isSelected) {
        // Remove user from selectedUsers
        setSelectedUsers(
          selectedUsers.filter(
            (selectedUser) => selectedUser.email !== user.email
          )
        );
      }
    }
  };

  return (
    <div className="h-full">
      {users.length < 1 ? (
        <EmptyState
          heading="No Users Found"
          subText="Start by creating a new user"
          buttonText="New User"
          icon={<MdAdd />}
          onClick={() => {}}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {selectedUsers?.length > 0 ? (
            <div className="flex items-center gap-2">
              <p className="text-[#474A57]">
                {selectedUsers?.length} items Selected
              </p>
              <button className="w-fit h-fit rounded-full bg-secondaryBg px-5 py-2 text-secondary">
                Update Role
              </button>
              <button className="w-fit h-fit rounded-full bg-secondaryBg px-5 py-2 text-secondary">
                Remove
              </button>
              <button
                className="w-fit h-fit flex items-center gap-2 px-5 py-2 text-[#757575]"
                onClick={() => setSelectedUsers([])}
              >
                <RxCross1 />
                Dismiss
              </button>
            </div>
          ) : null}
          <Table>
            <Table.Header>
              <Table.Heading className="  text-dark-grey">
                <Checkbox
                  name="all"
                  isChecked={allChecked}
                  onChange={handleSelectedUsers}
                />
              </Table.Heading>
              <Table.Heading className=" text-dark-grey">
                FULL NAME
              </Table.Heading>
              <Table.Heading className="text-dark-grey">EMAIL</Table.Heading>
              <Table.Heading className="text-dark-grey">ROLE</Table.Heading>
              <Table.Heading className="text-dark-grey">STATUS</Table.Heading>
              <Table.Heading className="text-dark-grey">OPTIONS</Table.Heading>
            </Table.Header>
            <Table.Body
              data={users}
              render={(item: IMockUser, index: number) => (
                <tr key={index}>
                  <th className="text-left px-6">
                    <Checkbox
                      name={`user-${index}`}
                      isChecked={selectedUsers.some(
                        (selectedUser) => selectedUser.email === item.email
                      )}
                      onChange={(e) => handleSelectedUsers(e, index)}
                    />
                  </th>
                  <th className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] bg-light-grey rounded-lg flex items-center text-[#052113] justify-center font-semibold ">
                        {item.fullname.charAt(0)}
                      </div>
                      <div className="flex flex-col ">
                        <p className="text-sm text-left text-[#757575]">
                          {item.fullname}
                        </p>
                        <p className="text-xs text-mid-grey">
                          Last seen 12/9/2024 13:57
                        </p>
                      </div>
                    </div>
                  </th>
                  <th className="p-2">
                    <p className="text-sm text-left">{item.email}</p>
                  </th>
                  <th className="p-2">
                    <p className="text-sm font-semibold text-left">
                      {item.role}
                    </p>
                  </th>
                  <th className="p-2">
                    <div
                      className={`w-fit h-fit px-3 py-1 border-[1px] text-sm rounded-full ${
                        item.status.toLowerCase() === "active"
                          ? "text-success border-success"
                          : "text-mid-grey border-mid-grey"
                      }`}
                    >
                      {item.status}
                    </div>
                  </th>
                  <th className="p-2">{/* Actions: Edit, Delete, etc. */}</th>
                </tr>
              )}
            ></Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}
