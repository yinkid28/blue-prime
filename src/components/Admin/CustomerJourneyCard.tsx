import { useApi } from "@/context/ApiDiscoveryContext";
import { useRouter } from "next/router";
import { FaEllipsisV } from "react-icons/fa";
import { toTitleCase } from "../utils";

export default function CustomerJourneyCard() {
  const router = useRouter();
  const { apiProduct } = useApi();
  return (
    <div
      className="w-full border boder-light-grey rounded-lg p-3 flex flex-col justify-between h-[100px] bg-white hover:shadow-md cursor-pointer"
      onClick={() =>
        router.push(
          `/admin_back_office/api_product_management/apiProductDetails-${toTitleCase(
            apiProduct?.title as string
          )}/journey_details/${1}`
        )
      }
    >
      <div className="flex w-full justify-between">
        <div className="w-[90%]">
          <p className="font-thin text-sm text-dark-grey">
            Buy an event Ticket
          </p>
        </div>
        <div className="w-[10%] flex justify-end">
          <FaEllipsisV />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="">
          <p className="font-thin text-sm text-mid-grey">12 APIs</p>
        </div>
        <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      </div>
    </div>
  );
}
