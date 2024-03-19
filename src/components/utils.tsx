import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";

type ButtonProps = {
  type: string;
  text: string;
  onClick: () => void;
};
export function Button({ type, text, onClick }: ButtonProps) {
  return (
    <button
      className={`${
        type === "fit" ? "w-fit" : "w-full"
      } px-4 py-2 text-center bg-primaryGradient hover:bg-secondaryGradient text-white rounded-lg`}
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
    <div className="flex mb-3 px-5 gap-2 items-center">
      <p
        className="text-mid-grey font-semibold"
        onClick={() => {
          router.push("/api_discovery");
        }}
      >
        Home
      </p>
      {breadCrumbItems?.map((item) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            router.push(item.breadCrumbPath);
          }}
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
