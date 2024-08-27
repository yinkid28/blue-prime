import { Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, createContext, useContext, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
// import { createContext } from "vm";

type ButtonProps = {
  type?: string;
  text: string;
  onClick: (e: any) => void;
  className?: string;
  Type?: "button" | "reset" | "submit";
  loading?: boolean;
  disabled?: boolean;
};
export function Button({
  type,
  text,
  onClick,
  className,
  Type,
  loading,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`${
        type === "fit" ? "w-fit" : "w-full"
      } px-4 py-2 text-center text-sm ${
        disabled === true
          ? "bg-light-grey text-dark-grey"
          : "bg-primaryGradient hover:bg-secondaryGradient text-white"
      }  rounded-lg ${className}`}
      onClick={onClick}
      type={Type}
      disabled={disabled !== undefined ? disabled : false}
    >
      {loading ? <Spinner size={"sm"} /> : text}
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
    <div className="w-full border border-light-grey  rounded flex items-center justify-between p-2">
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
    <div className="md:flex hidden mb-3 px-5 gap-2 items-center">
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
          <p className="text-mid-grey text-sm font-semibold">
            {item.breadCrumbText}
          </p>
        </div>
      ))}
      <FaChevronRight className="text-sm" />
      <p className="text-black text-sm font-semibold">{breadCrumbActiveItem}</p>
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

//  THE COMPOUND COMPONENT PATTERN is the advanced react pattern used to create this table component. Below are the steps followed.

interface TableTypes {
  children?: React.ReactNode;
  data?: any[];
  render?: any;
  // For extra styling
  className?: string;
}

// 1. Create parent component
export function Table({ children, className }: TableTypes) {
  return (
    <div className={`rounded-lg border overflow-scroll ${className}`}>
      <table className={`min-w-full`}>{children}</table>
    </div>
  );
}

// 2. Creation of child components to render table header and body.
function Header({ children }: TableTypes) {
  return (
    <thead className="bg-resources-bg text-mid-grey rounded-lg">
      <tr className="text-left">{children}</tr>
    </thead>
  );
}

function Heading({ children, className }: TableTypes) {
  return (
    <th className={`px-6 py-2 whitespace-nowrap ${className}`}>{children}</th>
  );
}

function Body({ data, render }: TableTypes) {
  if (!data?.length)
    return (
      <tbody>
        <tr>
          <td colSpan={data?.length} className="text-center py-4 text-dark-txt">
            Data not avalaible!
          </td>
        </tr>
      </tbody>
    );

  return <tbody>{data?.map(render)}</tbody>;
}

// 3. Child components added as properties to the parent component.
Table.Header = Header;
Table.Heading = Heading;
Table.Body = Body;

type paginationProps = {
  pageCount: number;
  onPageClick: (page: number) => void;
  inc?: boolean;
};
export default function GlobalPagination({
  pageCount = 10,
  onPageClick,
  inc,
}: paginationProps) {
  const [activePage, setActivePage] = useState<number>(inc ? 1 : 0);

  const handlePageClick = (page: number) => {
    if (page != activePage) {
      setActivePage(page);
      onPageClick(page);
    }
  };
  const handleNext = () => {
    setActivePage((prevPage) => {
      const nextPage = prevPage <= pageCount - 1 ? prevPage + 1 : prevPage;
      if (nextPage !== prevPage) {
        onPageClick(nextPage);
      }
      return nextPage;
    });
  };
  const handlePrev = () => {
    if (activePage > 0) {
      const prevPage = activePage - 1;
      console.log(prevPage, "going bsck");
      setActivePage(prevPage);
      onPageClick(prevPage);
    }
  };

  useEffect(() => {
    console.log(activePage);
  }, [activePage]);

  return (
    <div
      className="flex gap-2 items-center"
      style={{
        width: "fit-content",
      }}
    >
      <div
        className="bg-primary hover:bg-primaryFade px-3 py-1 rounded-lg text-white text-sm font-semibold w-fit h-fit"
        style={{ cursor: "pointer" }}
        onClick={() => handlePrev()}
      >
        <p className="mb-0">Previous</p>
      </div>
      <div className="flex gap-2 items-center" style={{ width: "fit-content" }}>
        {Array.from({ length: pageCount }, (_, index) => {
          const newIndex = inc ? index + 1 : index;
          return (
            <div
              key={newIndex} // Key should be unique, so using newIndex + 1
              className={`px-3 py-2 rounded-lg  text-sm font-semibold w-fit h-fit${
                activePage === newIndex ? " text-primary" : "text-primary"
              }`}
              onClick={() => handlePageClick(newIndex)} // Handling click
              style={{ cursor: "pointer" }}
            >
              <p className="mb-0">{index + 1}</p>
            </div>
          );
        })}
      </div>
      <div
        className="bg-primary hover:bg-primaryFade px-3 py-1 rounded-lg text-white text-sm font-semibold w-fit h-fit"
        style={{ cursor: "pointer" }}
        onClick={() => handleNext()}
      >
        <p className="mb-0">Next</p>
      </div>
    </div>
  );
}

export type Base64<imageType extends string> =
  `data:image/${imageType};base64,${string}`;

export function dataURLtoFile(dataurl: any, filename: string) {
  if (!dataurl) return;
  if (!filename) return;
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
