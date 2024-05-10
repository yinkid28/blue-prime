import { MdAdd } from "react-icons/md";
import FeedbackCard from "./feedbackCard";
import { Dispatch, SetStateAction, useState } from "react";
import FeedBackCardDetails from "./feedbackDetails";
export type IMockFeedback = {
  name: string;
  comment: string;
  replies: number;
};

type FeedbackViewProps = {
  commentButtonDisplay: boolean;
  ratingButton?: boolean;
};
export default function FeedbackView({
  commentButtonDisplay,
  ratingButton,
}: FeedbackViewProps) {
  const [view, setView] = useState<string>("all");
  const [currentItem, setCurrentItem] = useState<IMockFeedback>();
  const feedback: IMockFeedback[] = [
    {
      name: "CodewithSomya",
      comment:
        "Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to comba",
      replies: 7,
    },
    {
      name: "CodewithSomya",
      comment:
        "Ask GBOYEGA San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to comba",
      replies: 7,
    },
    {
      name: "CodewithSomya",
      comment:
        "Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to comba",
      replies: 7,
    },
    {
      name: "CodewithSomya",
      comment:
        "Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to comba",
      replies: 7,
    },
  ];
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between">
      <div className="w-full md:w-[65%]">
        {view === "all" ? (
          <>
            {feedback.map((item, index) => (
              <FeedbackCard
                item={item}
                setView={setView}
                setCurrentItem={
                  setCurrentItem as Dispatch<SetStateAction<IMockFeedback>>
                }
                key={index}
              />
            ))}
          </>
        ) : (
          <FeedBackCardDetails
            setView={setView}
            feedback={currentItem as IMockFeedback}
          />
        )}
      </div>

      <div className="md:w-[35%] w-full gap-2 flex justify-end">
        {commentButtonDisplay && (
          <button className="flex gap-2 items-center rounded-lg text-primary w-fit h-fit border-2 border-light-grey px-3 py-1">
            <MdAdd />
            <p>Comment</p>
          </button>
        )}
        {ratingButton && (
          <button className="flex gap-2 items-center rounded-lg text-primary w-fit h-fit border-2 border-light-grey px-3 py-1">
            <MdAdd />
            <p>Add Ratting</p>
          </button>
        )}
      </div>
    </div>
  );
}
