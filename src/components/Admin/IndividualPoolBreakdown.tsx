import { ImockTag } from "@/pages/webber/api_details/[id]/test";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { MdAdd } from "react-icons/md";

type CompProps = {
  tags: ImockTag[];
};
export default function IndividualPoolBreakdown({ tags }: CompProps) {
  const [view, setView] = useState<string>(tags[0].name);
  const [selectedTag, setSelectedTag] = useState<ImockTag>(tags[0]);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-3 p-5 justify-between">
        <div className="w-full md:w-[20%] flex flex-col gap-2">
          <div className="w-full text-mid-grey items-center border-bottom-[1px] border-light-grey py-2 flex justify-between">
            <p className="">API Tags</p>
          </div>
          <div className="w-full bg-light-grey rounded text-mid-grey flex flex-col gap-1">
            {tags.map((item, index) => (
              <div
                className={`px-3 py-1 flex hover:bg-[#F8F8F8] ${
                  view === item.name ? "bg-[#F8F8F8]" : "bg-transparent"
                } items-center gap-2 cursor-pointer`}
                key={index}
                onClick={() => {
                  setView(item.name);
                  setSelectedTag(item);
                }}
              >
                {view === item.name ? <FaChevronDown /> : <FaChevronRight />}
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-[80%] flex flex-col gap-2">
          <div className="py-2 flex items-center justify-end "></div>
          <div className="flex flex-col gap-2">
            {selectedTag?.endpoints.map((item, index) => (
              <div
                className="w-full flex items-center bg-white p-2 rounded-lg justify-between"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <button
                    className={`${
                      item.method === "POST"
                        ? "bg-success"
                        : item.method === "PUT"
                        ? "bg-warning"
                        : item.method === "GET"
                        ? "bg-info"
                        : "bg-error"
                    } w-fit h-fit px-5 py-2 text-white rounded-lg`}
                  >
                    {item.method}
                  </button>
                  <div className="flex items-start flex-col gap-1">
                    <p className="text-sm font-semibold text-mid-grey">
                      {item.url}
                    </p>
                    <p className="text-xs font-semibold text-light-grey">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GiPadlock />
                  {/* <AccordionIcon /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
