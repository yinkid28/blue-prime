import Layout from "@/components/Layout/layout";
import NewRole from "@/components/modals/addNewRole";
import NewUser from "@/components/modals/addNewUser";
import RolesView from "@/components/userManagement/RolesView";
import UsersView from "@/components/userManagement/UsersView";
import { Button, EmptyState } from "@/components/utils";
import { IMockRole, IMockUser } from "@/models/user.model";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { GrFilter } from "react-icons/gr";
import { MdAdd, MdOutlineFilterAltOff } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

type filterArrayObject = {
  filter: string;
  value: string;
};
export default function ManageUsers() {
  const toast = useToast();
  const [view, setView] = useState<string>("users");
  const [users, setUsers] = useState<IMockUser[]>([]);
  const [roles, setRoles] = useState<IMockRole[]>([]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState({
    role: "",
    status: "",
    sort: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<filterArrayObject[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRoleOpen,
    onOpen: onRoleOpen,
    onClose: onRoleClose,
  } = useDisclosure();
  const { role, status, sort } = filterOptions;

  const handlefilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    const filterState = [...appliedFilters];
    let appliedFilter = {
      filter: e.target.name,
      value: e.target.value,
    };

    if (filterState.some((item) => item.filter === appliedFilter.filter)) {
      const reorg = filterState.filter(
        (item) => item.filter !== appliedFilter.filter
      );
      reorg.push(appliedFilter);
      setAppliedFilters(reorg);
    } else {
      setAppliedFilters([...appliedFilters, appliedFilter]);
    }
  };
  const mockUsers: IMockUser[] = [
    {
      fullname: "Bright Bassey",
      email: "example@gmail.com",
      role: "CMM",
      status: "Active",
    },
    {
      fullname: "Naruto Uzumaki",
      email: "example2@gmail.com",
      role: "CMM",
      status: "Active",
    },
    {
      fullname: "Monkey D. Luffy",
      email: "example3@gmail.com",
      role: "CMM",
      status: "Inactive",
    },
    {
      fullname: "Roronoa Zoro",
      email: "example4@gmail.com",
      role: "CMM",
      status: "Active",
    },
    {
      fullname: "vinsmoke Sanji",
      email: "example5@gmail.com",
      role: "CMM",
      status: "Active",
    },
    {
      fullname: "Bright Bassey",
      email: "example6@gmail.com",
      role: "CMM",
      status: "Active",
    },
    {
      fullname: "Bright Bassey",
      email: "example7@gmail.com",
      role: "CMM",
      status: "Active",
    },
    {
      fullname: "Bright Bassey",
      email: "example8@gmail.com",
      role: "CMM",
      status: "Active",
    },
  ];
  const mockRoles: IMockRole[] = [
    { title: "System Administratorrreerwrwrwwrwrr", noU: 20, noP: 12 },
    { title: "CCM", noU: 20, noP: 12 },
    { title: "CMD", noU: 20, noP: 12 },
    { title: "System Administrator", noU: 20, noP: 12 },
    { title: "System Administrator", noU: 20, noP: 12 },
    { title: "System Administrator", noU: 20, noP: 12 },
    { title: "System Administrator", noU: 20, noP: 12 },
    { title: "System Administrator", noU: 20, noP: 12 },
  ];
  return (
    <Layout page="Manage Users">
      <div className="flex flex-col gap-8 h-full w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 cursor-pointer ${
                view === "users"
                  ? "text-secondary border-b-[2px] border-secondary font-semibold"
                  : "text-mid-grey"
              }`}
              onClick={() => setView("users")}
            >
              <p>Users</p>
            </div>
            <div
              className={`px-3 py-1 cursor-pointer ${
                view === "roles"
                  ? "text-secondary border-b-[2px] border-secondary font-semibold"
                  : "text-mid-grey"
              }`}
              onClick={() => setView("roles")}
            >
              <p>Roles</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              className="w-fit px-5 py-2 flex items-center border font-semibold rounded-lg gap-2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterOpen ? <MdOutlineFilterAltOff /> : <GrFilter />}
              <p>Filters</p>
            </button>
            <Button
              text="New "
              className="font-semibold"
              type="fit"
              onClick={() => {
                if (view === "users") {
                  setUsers(mockUsers);
                  onOpen();
                } else {
                  setRoles(mockRoles);
                }
              }}
              icon={<MdAdd />}
            />
          </div>
        </div>
        {view === "users" ? (
          <p className="text-xl text-[#052113]">
            Showing {users.length} of 24 users
          </p>
        ) : (
          <p className="text-xl text-[#052113]">Showing {roles.length} roles</p>
        )}
        {filterOpen ? (
          <>
            {filterApplied ? (
              <div className="flex items-center gap-2">
                {appliedFilters.map((item, index) => (
                  <div
                    className="w-fit rounded-full h-fit px-3 py-1 text-sm bg-secondaryBg flex items-center gap-2"
                    key={index}
                  >
                    <p className="text-xs text-[#474A57]">
                      {item.filter} : {item.value}
                    </p>
                    <RxCross1
                      className="text-sm cursor-pointer"
                      onClick={() => {
                        setAppliedFilters(
                          appliedFilters.filter(
                            (filter) => filter.filter !== item.filter
                          )
                        );
                      }}
                    />
                  </div>
                ))}
                <button
                  className="w-fit h-fit flex items-center gap-2 px-5 py-2 text-[#757575]"
                  onClick={() => {
                    setFilterApplied(false);
                    setFilterOpen(false);
                    const defaultValue = {
                      role: "",
                      sort: "",
                      status: "",
                    };
                    setFilterOptions(defaultValue);
                    setAppliedFilters([]);
                  }}
                >
                  Clear All
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex border items-center rounded-lg px-3 py-1">
                  <label
                    htmlFor="roleFilter"
                    className="text-sm font-[500] text-[#959595]"
                  >
                    Role:
                  </label>
                  <select
                    name="role"
                    value={role}
                    className="border-none outline-none"
                    onChange={handlefilterChange}
                  >
                    <option value="">All</option>
                    <option value="CCM">CCM</option>
                    <option value="Hokage">Hokage</option>
                  </select>
                </div>
                <div className="flex border items-center rounded-lg px-3 py-1">
                  <label
                    htmlFor="statusFilter"
                    className="text-sm font-[500] text-[#959595]"
                  >
                    Status:
                  </label>
                  <select
                    name="status"
                    value={status}
                    className="border-none outline-none"
                    onChange={handlefilterChange}
                  >
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex border items-center rounded-lg px-3 py-1">
                  <label
                    htmlFor="roleFilter"
                    className="text-sm font-[500] text-[#959595]"
                  >
                    Sort By:
                  </label>
                  <select
                    name="sort"
                    value={sort}
                    className="border-none outline-none"
                    onChange={handlefilterChange}
                  >
                    <option value="">All</option>
                    <option value="rele">Relavancy</option>
                    <option value="Date">Date</option>
                    <option value="hehe">Hokage</option>
                  </select>
                </div>
                <button
                  className="w-fit h-fit px-3 py-1 text-primary border-primary rounded-full border-[1px] hover:bg-primary hover:text-white ease-in-out duration-500 text-sm"
                  onClick={() => {
                    if (role === "" && status === "" && sort === "") {
                      toast({
                        description: "Select at least one filter",
                        duration: 2000,
                        status: "error",
                      });
                      return;
                    }
                    setFilterApplied(true);
                  }}
                >
                  Apply
                </button>
                <button
                  className="w-fit h-fit flex items-center gap-2 px-5 py-2 text-[#757575]"
                  onClick={() => {
                    const defaultValue = {
                      role: "",
                      sort: "",
                      status: "",
                    };
                    setFilterOptions(defaultValue);
                  }}
                >
                  <RxCross1 />
                  Reset
                </button>
              </div>
            )}
          </>
        ) : null}
        {view === "users" ? <UsersView users={users} /> : null}
        {view === "roles" ? <RolesView roles={roles} /> : null}
        <NewUser isOpen={isOpen} onClose={onClose} onRoleOpen={onRoleOpen} />
        <NewRole isOpen={isRoleOpen} onClose={onRoleClose} />
      </div>
    </Layout>
  );
}
