import { ICategory } from "@/models/admin.model";
import { useRouter } from "next/router";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

type CategoryCardProps = {
  category: ICategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  return (
    <div
      className="p-4 border flex flex-col gap-4 rounded-lg text-dark-txt cursor-pointer"
      onClick={() =>
        router.push({
          pathname: `/admin_back_office/category_management/category_details/${category.name}`,
          query: { catCo: category.categoryCode },
        })
      }
    >
      <div className="flex gap-4 justify-between items-center">
        <div className="rounded-full bg-blue-500 h-6 w-6"></div>
        <p className="flex-1 text-sm font-semibold">{category.name}</p>
        <CiMenuKebab />
      </div>
      <p className="text-sm">{category.description}</p>
      <p className="text-xs text-mid-grey">{category.numberOfAPIs} API(s)</p>
    </div>
  );
}
