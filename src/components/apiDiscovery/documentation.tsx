import { MdAdd } from "react-icons/md";
import FeedbackCard from "./feedbackCard";
import { Dispatch, SetStateAction, useState } from "react";
import FeedBackCardDetails from "./feedbackDetails";
import { useApi } from "@/context/ApiDiscoveryContext";
import Link from "next/link";
export type IMockFeedback = {
  name: string;
  comment: string;
  replies: number;
};

export default function DocumentationView() {
  const { api } = useApi();
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between">
      <div className="w-full md:w-[65%]">
        <p className="text-sm mb-3 text-primary">{api?.category}</p>
        <p className="text-sm ">README</p>
      </div>
      <div className="md:w-[35%] w-full flex justify-end">
        <div className="p-2 rounded-lg border-mid-grey border-[1px] bg-light-grey flex flex-col  gap-2">
          <p className="text-primary font-semibold">Resources and links</p>
          <Link href={"#"} className="text-dark-grey text-sm">
            https://www.dnncw8h,com/dju/djvb
          </Link>
        </div>
      </div>
    </div>
  );
}
