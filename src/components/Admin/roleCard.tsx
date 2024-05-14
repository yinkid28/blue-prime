import { MdOutlineEdit } from "react-icons/md";

export default function RoleCard() {
  return (
    <div className="w-full flex flex-col gap-2 bg-lightest-grey rounded-lg p-3">
      <div className="w-full flex justify-between">
        <p className="font-semibold text-mid-grey">Admin</p>
        <MdOutlineEdit />
      </div>
      <div className="w-fit h-fit rounded-full border border-dark-grey text-dark-grey px-3 py-1">
        <p>Permission 1</p>
      </div>
    </div>
  );
}
