import Image from "next/image";
import img from "../../../public/images/api_icons/icon4.png";
import { MdAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { Dispatch, SetStateAction } from "react";
import { IMockFeedback } from "./feedbackView";
import { IComment } from "@/models/api.model";

type FeedProp = {
  item: IComment;
  setView: Dispatch<SetStateAction<string>>;
  setCurrentItem: Dispatch<SetStateAction<IComment>>;
};
export default function FeedbackCard({
  item,
  setView,
  setCurrentItem,
}: FeedProp) {
  return (
    <div
      className="w-full rounded-xl hover:shadow-md cursor-pointer mb-4 border-[1px] border-light-grey p-3 flex flex-col gap-4"
      onClick={() => {
        setView("details");
        setCurrentItem(item);
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[20px] rounded bg-mid-grey overflow-hidden">
            <Image
              src={img}
              alt="icon"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
          <p className="text-mid-grey text-sm">{item.createdBy}</p>
        </div>
        {/* <div className="w-fit px-3 py-1 bg-light-grey rounded-xl flex items-center gap-3">
          <IoMdAdd
            className="text-mid-grey cursor-pointer font-bold z-10"
            onClick={() => {
              // console.log("hello");
              // setView("all");
            }}
          />
          <p className="text-primary text-sm font-bold">12</p>
          <FaMinus className="text-mid-grey cursor-pointer" />
        </div> */}
      </div>
      <p className="text-dark-grey">{item.content}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TbMessageCircle className="text-mid-grey" />
          <p className="text-mid-grey text-sm font-semibold">
            {item.replies.list.length} replies
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-[15px] h-[15px] rounded bg-mid-grey overflow-hidden">
            <Image
              src={img}
              alt="icon"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
          <p className="text-mid-grey text-sm">
            Mr Majekodunmi <span className="font-semibold">replied</span>
          </p>
        </div> */}
      </div>
    </div>
  );
}
