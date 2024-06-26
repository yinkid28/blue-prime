import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
// import { MdBookmarkBorder } from "react-icons/md";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { toTitleCase } from "../utils";

// THE ONLY THING DIFFERENT HERE IS STYLING AND THE PROPS PASSED.

type dataToBeUsed = {
  id: number;
  img: any;
  title: string;
  description: string;
  category: string;
  bookmarked: boolean;
};

type ApiCardProps = {
  img: StaticImageData;
  title: string;
  description: string;
  category: string;
  bookmarked: boolean;
  item: IMockApi;
  onToggleBookmarked: (apiId: number, item: IMockApi) => void;

  // FROM FRAMER MOTION
  layout?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
};

export default function ApiCard({
  img,
  title,
  description,
  category,
  bookmarked,
  onToggleBookmarked,
  item,
  initial,
  animate,
  exit,
  transition,
}: ApiCardProps) {
  const router = useRouter();
  const { setApi } = useApi();
  const { setSidebar, setLoading } = useOnboarding();
  //   console.log(item);
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className="w-full border-[1px] cursor-pointer border-light-grey hover:shadow-md rounded-lg p-3 flex flex-col gap-3"
      onClick={() => {
        setLoading(true);
        if (router.asPath === "/api_discovery") {
          router.push(`/api_discovery/api_product/${title}`);
          setSidebar("api");
        } else {
          setSidebar("apiProgressWeaver");
          router.push(`/webber/library/${toTitleCase(title, true)}/overview`);
        }
        // I would comment all these ones for now ↓
        // setApi({
        //   img,
        //   title,
        //   description,
        //   category,
        // });
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
            onToggleBookmarked(item.id as number, item);
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
    </motion.div>
  );
}
