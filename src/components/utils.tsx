import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdSearch } from "react-icons/md";

type ButtonProps = {
  type?: string;
  text: string;
  onClick: () => void;
  className?: string;
  Type?: "button" | "reset" | "submit";
};
export function Button({ type, text, onClick, className, Type }: ButtonProps) {
  return (
    <button
      className={`${
        type === "fit" ? "w-fit" : "w-full"
      } px-4 py-2 text-center bg-primaryGradient hover:bg-secondaryGradient text-white rounded-lg ${className}`}
      onClick={onClick}
      type={Type}
    >
      {text}
    </button>
  );
}
type InputProps = {
  type?: string;
  placeholder: string;
  secondaryElement?: boolean;
  field: any;
};
export function Input({
  type,
  placeholder,
  secondaryElement,
  field,
}: InputProps) {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="w-full border border-light-grey rounded flex items-center justify-between p-2">
      <input
        type={
          secondaryElement && show
            ? "text"
            : secondaryElement && !show
            ? "password"
            : type
        }
        {...field}
        placeholder={placeholder}
        className="bg-transparent w-[90%] outline-none border-none"
      />
      {secondaryElement && (
        <>
          {show ? (
            <HiEyeOff onClick={handleClick} cursor="pointer" />
          ) : (
            <HiEye onClick={handleClick} cursor="pointer" />
          )}
        </>
      )}
    </div>
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
    <div className="flex mb-3  px-5 gap-2 items-center">
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

type ProgressProps = {
  trailBg: string;
  pathBg: string;
  value: string;
  height: string;
};
export function ProgressBar({ trailBg, pathBg, value, height }: ProgressProps) {
  return (
    <div
      className={`w-full rounded-full`}
      style={{ height, background: trailBg }}
    >
      <div
        className={`rounded-full  bg-${pathBg} h-full`}
        style={{
          width: `${value}%`,
        }}
      ></div>
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
