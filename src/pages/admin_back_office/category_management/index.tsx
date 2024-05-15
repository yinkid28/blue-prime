import CategoryCard from "@/components/Admin/CategoryCard";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function CategoryManager() {
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  useEffect(() => {
    setSidebar("backOffice");
    setLoading(false);
  }, []);

  const categories = [
    { title: "Entertainment" },
    { title: "Agriculture" },
    { title: "Sports" },
    { title: "User Authentication" },
    { title: "Banking and Finance" },
    { title: "Gaming" },
    { title: "Education" },
    { title: "Logistics" },
    { title: "Visual Recognition" },
    { title: "Text Analysis" },
    { title: "Payments" },
    { title: "E-Commerce" },
    { title: "Data Analysis" },
  ];

  return (
    <AdminLayout>
      <AdminNavbar title="Category Management" />
      <BreadCrumbs breadCrumbActiveItem="Category Management" />
      {/* <div className="p-5">Category Management , hello</div> */}

      <div className="px-4 py-6">
        <div className="flex justify-between">
          <div className="flex items-center border rounded-lg w-[50%] py-2 px-2 sm:px-4 gap-1">
            <Icon
              icon="lets-icons:search-alt-light"
              className="text-mid-grey text-2xl"
            />
            <input
              type="search"
              placeholder="Search"
              className="font-medium text-sm md:text-base focus:outline-none w-full text-dark-txt"
            />
          </div>
          <button className="border-2 text-primary py-2 px-2 font-semibold text-xs rounded-lg">
            Add New Category
          </button>
        </div>

        {/* WHERE I WOULD RENDER THE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-4">
          {categories.map((item, index) => (
            <CategoryCard key={index} title={item.title} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
