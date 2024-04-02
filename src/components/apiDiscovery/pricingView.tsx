import { useState } from "react";
import PriceCard from "./priceCard";

export default function PriceView() {
  const [view, setView] = useState<string>("Paid");

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-xl md:text-2xl font-bold">
          Simple, transparent pricing
        </p>
        <div className="flex items-center gap-3">
          <div
            className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-full hover:text-primary ${
              view === "Paid"
                ? "text-primary border-primary border-[1px]"
                : "text-mid-grey "
            }  bg-transparent `}
            onClick={() => {
              setView("Paid");
            }}
          >
            <p>Paid</p>
          </div>
          <div
            className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-full hover:text-primary ${
              view === "Free"
                ? "text-primary border-primary border-[1px]"
                : "text-mid-grey "
            }  bg-transparent `}
            onClick={() => {
              setView("Free");
            }}
          >
            <p>Free</p>
          </div>
        </div>
      </div>
      <div className="my-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <PriceCard requests="1000" title="Basic Plan" price={1145} />
        <PriceCard requests="5000" title="Medium Plan" price={2030} />
        <PriceCard requests="10,000" title="Standard Plan" price={5067} />
      </div>
    </div>
  );
}
