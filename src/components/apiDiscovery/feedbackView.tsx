import { MdAdd } from "react-icons/md";
import FeedbackCard from "./feedbackCard";
import { Dispatch, SetStateAction, useState } from "react";
import FeedBackCardDetails from "./feedbackDetails";
import CreateComment from "../modals/createCommentModal";
import { Skeleton, useDisclosure } from "@chakra-ui/react";
import { IComment } from "@/models/api.model";
export type IMockFeedback = {
  name: string;
  comment: string;
  replies: number;
};

type FeedbackViewProps = {
  commentButtonDisplay?: boolean;
  ratingButton?: boolean;
  feedbacks: IComment[];
  isLoading: boolean;
  canReply?: boolean;
  // getComments: (aco: string, limit: number, offset: number) => void;
};
export default function FeedbackView({
  commentButtonDisplay,
  ratingButton,
  feedbacks,
  isLoading,
  canReply,
}: // getComments,
FeedbackViewProps) {
  const [view, setView] = useState<string>("all");
  const [currentItem, setCurrentItem] = useState<IComment>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReplyOpen,
    onOpen: onReplyOpen,
    onClose: onReplyClose,
  } = useDisclosure();

  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between">
      <div className="w-full md:w-[65%] flex flex-col gap-2">
        {view === "all" ? (
          <>
            {isLoading ? (
              [1, 2, 3, 4].map((item, index) => (
                <Skeleton key={index} w={"100%"} borderRadius={12} h={100} />
              ))
            ) : feedbacks.length > 0 ? (
              feedbacks.map((item, index) => (
                <FeedbackCard
                  item={item}
                  setView={setView}
                  setCurrentItem={
                    setCurrentItem as Dispatch<SetStateAction<IComment>>
                  }
                  key={index}
                />
              ))
            ) : (
              <>
                <p>No comments yet</p>
              </>
            )}
          </>
        ) : (
          <FeedBackCardDetails
            setView={setView}
            onReplyOpen={onOpen}
            feedback={currentItem as IComment}
            canReply={canReply}
          />
        )}
      </div>

      <div className="md:w-[35%] w-full gap-2 flex justify-end">
        {commentButtonDisplay && (
          <button
            onClick={onOpen}
            className="flex gap-2 items-center rounded-lg text-primary w-fit h-fit border-2 border-light-grey px-3 py-1"
          >
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
      <CreateComment
        isOpen={isOpen}
        onClose={onClose}
        to={currentItem ? currentItem.id : undefined}
        // getComments={getComments}
      />
    </div>
  );
}
