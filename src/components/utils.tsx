import Image from "next/image";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

type ButtonProps = {
  type?: string;
  text: string;
  onClick: () => void;
  className?: string;
};
export function Button({ type, text, onClick, className }: ButtonProps) {
  return (
    <button
      className={`${
        type === "fit" ? "w-fit" : "w-full"
      } px-4 py-2 text-center bg-primaryGradient hover:bg-secondaryGradient text-white rounded-lg ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
export type BreadCrumbItems = {
  breadCrumbText: string;
  breadCrumbPath: string;
};

interface BreadProps {
  breadCrumbItems?: BreadCrumbItems[];
  breadCrumbActiveItem: string;
}

export function BreadCrumbs({
  breadCrumbItems,
  breadCrumbActiveItem,
}: BreadProps) {
  const router = useRouter();
  return (
    <div className="flex mb-3 border-b-[1px] border-light-grey px-5 gap-2 items-center">
      <p
        className="text-mid-grey font-semibold"
        onClick={() => {
          router.push("/api_discovery");
        }}
      >
        Home
      </p>
      {breadCrumbItems?.map((item, index) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            router.push(item.breadCrumbPath);
          }}
          key={index}
        >
          <FaChevronRight className="text-sm" />
          <p className="text-mid-grey font-semibold">{item.breadCrumbText}</p>
        </div>
      ))}
      <FaChevronRight className="text-sm" />
      <p className="text-black  font-semibold">{breadCrumbActiveItem}</p>
    </div>
  );
}

export function SearchBar() {
  return (
    <div className="w-full p-2 flex border-light-grey border-[1px] rounded-lg flex items-center gap-2">
      <MdSearch />
      <input className="border-none outline-none w-full" placeholder="search" />
    </div>
  );
}

export function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={"/gifs/loader.gif"} alt="loader" width={50} height={50} />
    </div>
  );
}

export function toTitleCase(input: string, space?: boolean): string {
  // Step 1: Remove underscores
  const noUnderscores = input?.replace(/_/g, " ");

  // Step 2: Convert to title case
  const titleCase = noUnderscores
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  // Step 3: Remove spaces
  if (space) {
    const noSpaces = titleCase.replace(/ /g, "");
    return noSpaces;
  }
  return titleCase;
}
