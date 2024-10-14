import { MdAdd } from "react-icons/md";
import { EmptyState } from "../utils";
import { IMockRole } from "@/models/user.model";
import RoleCard from "./RoleCard";
type rolesViewProps = {
  roles: IMockRole[];
};
export default function RolesView({ roles }: rolesViewProps) {
  return (
    <div className="h-full">
      {roles.length < 1 ? (
        <EmptyState
          heading="No Roles Found"
          subText="Start by creating a new role"
          buttonText="New Role"
          icon={<MdAdd />}
          onClick={() => {}}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-xl text-[#052113]">Showing {roles.length} roles</p>
          <div className="grid grid-cols-4 gap-5">
            {roles.map((item, index) => (
              <RoleCard
                title={item.title}
                noP={item.noP}
                noU={item.noU}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
