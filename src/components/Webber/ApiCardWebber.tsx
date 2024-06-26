import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
// import { MdBookmarkBorder } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { toTitleCase } from "../utils";
import { IApi } from "@/models/api.model";

type ApiCardProps = {
  img: string;
  title: string;
  description: string;
  category: string;
  api: IApi;
};
export default function ApiCardWebber({
  img,
  title,
  description,
  category,
  api,
}: ApiCardProps) {
  const router = useRouter();
  const { setApi } = useApi();
  const { setSidebar, setLoading } = useOnboarding();
  return (
    <div
      className="w-full border-[1px] border-light-grey hover:shadow-md cursor-pointer rounded-lg p-3 flex flex-col gap-3"
      onClick={() => {
        setLoading(true);
        const path = `/weaver/api_details/${toTitleCase(title, true)}/overview`;
        console.log(path);
        router.push(path);
        setApi(api);
        // setApi({

        //   title,
        //   description,
        //   category,
        // });
        setSidebar("apiProgress");
      }}
    >
      <div className="w-full flex justify-between">
        <div className="w-[50px] h-[50px] rounded bg-mid-grey overflow-hidden">
          <Image
            src={"/images/api_icons/apiMock.webp"}
            alt="icon"
            width={200}
            height={200}
            loading="lazy"
            className="w-full h-full"
          />
        </div>
        <IoBookmarkOutline className="hover:text-primary cursor-pointer" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-dark-grey">{title}</p>
        <p className="text-sm text-dark-grey">{description}</p>
      </div>
      <div className="w-fit px-4 py-1 rounded-full bg-category-fade text-category">
        <p className="font-semibold text-sm">{category}</p>
      </div>
    </div>
  );
}
