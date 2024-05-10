import { useRouter } from "next/router";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

type CategoryCardProps = {
  title: string;
};

export default function CategoryCard({ title }: CategoryCardProps) {
  const router = useRouter();

  return (
    <div
      className="p-4 border flex flex-col gap-4 rounded-lg text-dark-txt cursor-pointer"
      onClick={() =>
        router.push(
          // `/admin_back_office/category_management/category_details/${title.toLowerCase()}`
          `/admin_back_office/category_management/category_details/${title}`
        )
      }
    >
      <div className="flex gap-4 justify-between items-center">
        <div className="rounded-full bg-blue-500 h-6 w-6"></div>
        <p className="flex-1 text-sm font-semibold">{title}</p>
        <CiMenuKebab />
      </div>
      <p className="text-sm">
        Refers to all endpoints that fit into the criteria of Pop culture, c...
      </p>
      <p className="text-xs text-mid-grey">24 Endpoints</p>
    </div>
  );
}
