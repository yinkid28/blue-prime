import { useRouter } from "next/router";
import { BsFilePlay, BsSearch } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { FiFolder } from "react-icons/fi";
export default function WebberSidebar() {
  const router = useRouter();

  return (
    <div className="w-full  flex flex-col h-full gap-2">
      <div className="bg-white rounded p-5 h-full flex flex-col gap-4 ">
        <p className="text-2xl">Logo</p>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == "/webber/dashboard"
              ? "text-primary"
              : "text-dark-grey"
          }`}
        >
          <MdHomeFilled />
          <p className="font-semibold">Home</p>
        </div>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == "" ? "text-primary" : "text-dark-grey"
          }`}
        >
          <BsSearch />
          <p className="font-semibold">Search</p>
        </div>

        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == "" ? "text-primary" : "text-dark-grey"
          }`}
        >
          <BsFilePlay />
          <p className="font-semibold">How to Use</p>
        </div>
      </div>
    </div>
  );
}
