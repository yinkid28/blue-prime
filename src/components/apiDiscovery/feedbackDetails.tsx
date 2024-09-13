import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";
import img from "../../../public/images/api_icons/icon4.png";
import { TbMessageCircle } from "react-icons/tb";
import { IMockFeedback } from "./feedbackView";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IComment, IReply } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";
type FeedProp = {
  feedback: IComment;
  setView: Dispatch<SetStateAction<string>>;
  onReplyOpen: () => void;
  canReply?: boolean;
};
export default function FeedBackCardDetails({
  feedback,
  setView,
  onReplyOpen,
  canReply,
}: FeedProp) {
  const [replies, setReplies] = useState<IReply[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState<boolean>(false);
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(true);


  const getApiReplies = async (aco: string, commId: string) => {
    setIsLoadingReplies(true);
    try {
      const res = await APIServices.getWebberRepliesToComment(aco, commId);
      if (res.statusCode === 200) {
        setReplies(res.list);
      } else {
        console.warn("Unexpected status code:", res.statusCode);
      }
    } catch (error: any) {
      console.error("Error fetching replies:", error);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  useEffect(() => {
    if (feedback && feedback.aco && feedback.id) { 
      getApiReplies(feedback.aco, feedback.id);
    }
  }, [feedback]);
  return (
    <div className="flex flex-col w-full gap-5">
      <div
        className="flex items-center cursor-pointer gap-2"
        onClick={() => setView("all")}
      >
        <FaChevronLeft className="text-sm" />
        <p className="font-semibold text-mid-grey">Back</p>
      </div>
      <div className="w-full flex flex-col gap-4">
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
            <p className="text-mid-grey text-sm">{feedback.createdBy}</p>
          </div>
        </div>
        <p className="text-dark-grey">{feedback.content}</p>
        {canReply ? (
          <div
            className="flex justify-end cursor-pointer text-primary items-center"
            onClick={onReplyOpen}
          >
            <TbMessageCircle />
            <p className="font-semibold  text-sm">Add Reply </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col w-full gap-3 items-center">
        {feedback.replies.list.map((item, index) => (
          <div
            className="w-full rounded-xl border-[1px] border-light-grey p-3 flex flex-col gap-4"
            key={index}
          >
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
            <p className="text-sm text-dark-grey font-thin">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
