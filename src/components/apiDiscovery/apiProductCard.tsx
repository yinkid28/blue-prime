import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
// import { MdBookmarkBorder } from "react-icons/md";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { toTitleCase } from "../utils";

type ApiCardProps = {
  img: StaticImageData;
  title: string;
  description: string;
  category: string;
  bookmarked: boolean;
  onToggleBookmarked: (apiId: number) => void;
  item: IMockApi;
};
export default function ApiProductCard({
  img,
  title,
  description,
  category,
  bookmarked,
  onToggleBookmarked,
  item,
}: ApiCardProps) {
  const router = useRouter();
  const { setApi } = useApi();
  const { setSidebar, setLoading } = useOnboarding();
  return (
    <div
      className="w-full border-[1px] cursor-pointer border-light-grey hover:shadow-md rounded-lg p-3 flex flex-col gap-3"
      onClick={() => {
        setLoading(true);
        router.push(
          `/weaver/api_product/api_product_details/${toTitleCase(title, true)}`
        );
        // setApi({
        //   img,
        //   title,
        //   description,
        //   category,
        // });
        setSidebar("api");
      }}
    >
      <div className="w-full flex justify-between">
        <div className="w-[50px] h-[50px] rounded bg-mid-grey overflow-hidden">
          <Image
            src={img}
            alt="icon"
            width={200}
            height={200}
            className="w-full h-full"
          />
        </div>
        <div
          className="hover:text-primary cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmarked(item.id as number);
          }}
        >
          {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-dark-grey">{title}</p>
        <p className="text-sm text-dark-grey">{description}</p>
      </div>
      <div className="w-fit px-4 py-1 rounded-full bg-category-fade text-category">
        <p className="font-semibold text-sm">{category}</p>
      </div>
      <div className="flex items-center text-xs justify-between">
        <div className="flex items-center gap-1">
          <FaRegEye className=" text-mid-grey" />
          <p className="font-thin text-mid-grey">10k</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegStar className=" text-mid-grey" />
          <p className="font-thin text-mid-grey">4.0/5</p>
        </div>
        <div className="flex items-center gap-1">
          <FaRegClock className=" text-mid-grey" />
          <p className="font-thin text-mid-grey">100ms</p>
        </div>
      </div>
    </div>
  );
}