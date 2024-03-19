import { useRouter } from "next/router";
import { BsFilePlay, BsSearch } from "react-icons/bs";
import { MdHomeFilled } from "react-icons/md";
import { FiFolder } from "react-icons/fi";
export default function MainSidebar() {
  const router = useRouter();
  const cats = [
    { name: "Entertainment" },
    { name: "Gaming" },
    { name: "Banking and Finance" },
    { name: "Agriculture" },
    { name: "E-Commerce" },
    { name: "Sports" },
  ];
  return (
    <div className="w-full  flex flex-col h-full gap-2">
      <div className="bg-white rounded p-5 h-fit flex flex-col gap-4 ">
        <p className="text-2xl">Logo</p>
        <div
          className={`flex items-center cursor-pointer ease-in-out duration-700 hover:text-primary gap-3 w-full ${
            router.asPath == "/api_discovery"
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
          <FiFolder />
          <p className="font-semibold">Library</p>
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
      <div className="bg-white h-full rounded p-5 flex flex-col gap-4">
        <p className="text-2xl text-mid-grey font-bold">Categories</p>
        {cats?.map((cat, index) => (
          <p className="text-dark-grey cursor-pointer" key={index}>
            {cat.name}
          </p>
        ))}
      </div>
    </div>
  );
}
