import Image from "next/image";
import img from "../../../public/icons/indIconReg.svg";
type priceCardProps = {
  title: string;
  price: number;
  requests: string;
};
export default function PriceCard({ title, price, requests }: priceCardProps) {
  return (
    <div className="w-full rounded-lg border-[1px] border-light-grey">
      <div className="p-3 border-b-[1px] border-light-grey flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] rounded  overflow-hidden">
            <Image
              src={img}
              alt="icon"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
          <p className="">{title}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-3">
        <div className="w-fit px-3 py-1 rounded-full bg-success-bg text-success">
          <p className="text-sm">Limited supply only</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl md:text2xl lg:text-3xl font-bold">
            ${price.toLocaleString()}{" "}
            <span className="text-sm text-mid-grey">per month</span>{" "}
          </p>
          <p className="text-sm text-mid-grey">{requests} requests per day</p>
        </div>
      </div>
    </div>
  );
}
