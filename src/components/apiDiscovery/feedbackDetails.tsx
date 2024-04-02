import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";
import img from "../../../public/images/api_icons/icon4.png";
import { TbMessageCircle } from "react-icons/tb";
import { IMockFeedback } from "./feedbackView";
import { Dispatch, SetStateAction } from "react";
type FeedProp = {
  feedback: IMockFeedback;
  setView: Dispatch<SetStateAction<string>>;
};
export default function FeedBackCardDetails({ feedback, setView }: FeedProp) {
  const replies = [
    {
      name: "whitegoose497",
      message:
        "Can someone please provide me with access to the necessary tools/resources to complete this task?",
    },
    {
      name: "whitegoose497",
      message: `Did I make a mistake or is their just no data?
        import requests
        url = “https://api-basketball.p.rapidapi.com/odds”
        querystring = {“season”:“2021”,“league”:“175”}
        headers = {“X-RapidAPI-Key”: key,“X-RapidAPI-Host”: “api-basketball.p.rapidapi.com”}
        response = requests.get(url, headers=headers, params=querystring)
        season_2021 = response.json()
        print(season_2021)
        {‘get’: ‘odds’,‘parameters’: {‘league’: ‘175’, ‘season’: ‘2021’},‘errors’: [],‘results’: 0,‘response’: []}`,
    },
    {
      name: "whitegoose497",
      message:
        "Can someone please provide me with access to the necessary tools/resources to complete this task?",
    },
  ];
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
            <p className="text-mid-grey text-sm">{feedback.name}</p>
          </div>
        </div>
        <p className="text-dark-grey">{feedback.comment}</p>
        <div className="flex justify-end text-primary items-center">
          <TbMessageCircle />
          <p className="font-semibold text-sm">Add Reply </p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3 items-center">
        {replies.map((item, index) => (
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
              <p className="text-mid-grey text-sm">{item.name}</p>
            </div>
            <p className="text-sm text-dark-grey font-thin">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
