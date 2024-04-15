import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiModules() {
  const { api } = useApi();
  const router = useRouter();
  const [view, setView] = useState<string>("info");

  const { loading, setLoading } = useOnboarding();
  const tags = [
    { name: "Pets", id: 1 },
    { name: "Store", id: 2 },
    { name: "User", id: 3 },
  ];
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <WebberLayout>
      <Navbar title={`${api?.title}`} />
      <BreadCrumbs
        // breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.title}-Module`}
      />
      <div className="flex flex-col md:flex-row gap-3 p-5 justify-between">
        <div className="w-full md:w-[20%] flex flex-col gap-2">
          <div className="w-full text-mid-grey items-center border-bottom-[1px] border-light-grey py-2 flex justify-between">
            <p className="">API Tags</p>
            <MdAdd />
          </div>
          <div className="w-full bg-light-grey rounded text-mid-grey flex flex-col gap-1">
            {tags.map((item, index) => (
              <div
                className={`px-3 py-1 flex hover:bg-[#F8F8F8] ${
                  view === item.name ? "bg-[#F8F8F8]" : "bg-transparent"
                } items-center gap-2`}
                key={index}
                onClick={() => setView(item.name)}
              >
                {view === item.name ? <FaChevronDown /> : <FaChevronRight />}
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-[80%] flex flex-col gap-2">
          <div className="py-2 flex items-center justify-end ">
            <button className="border-primaryFade px-3 font-semibold py-1 rounded-lg w-fit flex items-center gap-2 text-primary border">
              <MdAdd />
              <p className="text-sm">Add Endpoint</p>
            </button>
          </div>
        </div>
      </div>
    </WebberLayout>
  );
}
