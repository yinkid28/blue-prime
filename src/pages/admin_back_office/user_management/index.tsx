import CategoryCard from "@/components/Admin/CategoryCard";
import RoleCard from "@/components/Admin/roleCard";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function UserManager() {
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const [view, setView] = useState<string>("role");
  const [selected, setSelected] = useState<number>(1);
  useEffect(() => {
    setSidebar("backOffice");
    setLoading(false);
  }, []);
  const permissions = [
    { name: "API Management", id: 1 },
    { name: "Category Management", id: 2 },
    { name: "User Management", id: 3 },
    { name: "API Product Management", id: 4 },
  ];

  return (
    <AdminLayout>
      <AdminNavbar title="User Management" />
      <BreadCrumbs breadCrumbActiveItem="User Management" />
      {/* <div className="p-5">Category Management , hello</div> */}

      <div className="p-5 flex flex-col gap-5">
        <div className="w-full flex  justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <button
              className={`w-fit md:px-5 md:py-2 px-3 py-2 border-[1px] rounded-lg ${
                view === "role"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              } ease-in-out duration-700`}
              onClick={() => setView("role")}
            >
              Roles
            </button>
            {/* <button
              className={`w-fit md:px-5 md:py-2 px-3 py-2 border-[1px] rounded-lg ${
                view === "report"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              } ease-in-out duration-700`}
              onClick={() => setView("report")}
            >
              Users
            </button> */}
          </div>

          <Menu>
            <MenuButton>
              <FaEllipsisV className="font-thin text-mid-grey" />
            </MenuButton>
            <MenuList>
              <MenuItem>Approve Publishing</MenuItem>
              <MenuItem>Deny Publishing</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="border border-light-grey rounded-lg p-5 gap-3 flex flex-col-reverse md:flex-row">
          <div className="w-full flex flex-col gap-3">
            <p className="font-semibold text-mid-grey">Create Role</p>
            <div className="w-full flex flex-col gap-2 rounded-lg border border-light-grey p-2">
              <p>Role Name</p>
              <input
                type="text"
                placeholder="Admin"
                name="role_name"
                className="bg-none bordener-none outline-none"
              />
            </div>
            <p className="text-sm">Permissions</p>
            <div className="w-full flex flex-wrap overflow-scroll gap-2">
              {permissions.map((perm, index) => (
                <div
                  className={` ${
                    selected === perm.id
                      ? "border-primary text-primary"
                      : "border-light-grey text-mid-grey"
                  } border w-fit h-fit px-2 cursor-pointer py-1 rounded-full`}
                  onClick={() => setSelected(perm.id)}
                  key={index}
                >
                  <p className="text-xs">{perm.name}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <Checkbox>Manage All</Checkbox>
              <Checkbox>Manage </Checkbox>
              <Checkbox>Create</Checkbox>
              <Checkbox>Read/View</Checkbox>
              <Checkbox>Update</Checkbox>
              <Checkbox>Approve</Checkbox>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="font-semibold text-mid-grey">Role</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <RoleCard />
              <RoleCard />
              <RoleCard />
              <RoleCard />
              <RoleCard />
              <RoleCard />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
