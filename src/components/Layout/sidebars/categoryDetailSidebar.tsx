import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";

type categorySidebarProps = {
  category: string;
};

export default function CategoryDetailSidebar({
  category,
}: categorySidebarProps) {
  const router = useRouter();
  return (
    <div className="w-full h-full rounded text-[14px] bg-white text-dark-txt p-6">
      <p className="text-2xl font-semibold mt-2">Logo</p>
      <div className="flex gap-4 items-center">
        <FaChevronLeft className="text-xs" />
        <p
          className="text-mid-grey text-base py-2 cursor-pointer"
          onClick={() => router.back()}
        >
          Back
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-blue-dark">{category}</p>
        <p>
          Refers to all endpoints that fit into the criteria of Pop culture,
          celebrity lifestyle,
        </p>
      </div>
    </div>
  );
}
