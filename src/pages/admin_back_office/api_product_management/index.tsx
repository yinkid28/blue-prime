import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import { BreadCrumbs } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";

import icon1 from "../../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../../public/images/api_icons/icon2.png";
import icon3 from "../../../../public/images/api_icons/icon3.png";

const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function CategoryManager() {
  const router = useRouter();
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  useEffect(() => {
    setSidebar("categoryManager");
    setLoading(false);
  }, []);

  type apiProductsData = {
    img: StaticImageData;
    title: string;
    description: string;
    category: string;
  };

  const apiProducts = [
    {
      img: icon1,
      title: "Tickets++",
      description:
        "An event ticketing manger that  is revolutionizing the event ticketing landscape by offering a seamless, digital solution for ticket buyers, event owners, and merchants, streamlining the entire process from ticket purchase to event attendance with state-of-the-art technology.",
      category: "Event Management",
    },
    {
      img: icon2,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Data Analysis",
    },
    {
      img: icon3,
      title: "API Business Solution",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters per month",
      category: "Banking and Finance",
    },
  ];

  return (
    <AdminLayout>
      <AdminNavbar title="Category Management" />
      <BreadCrumbs breadCrumbActiveItem="API Product Management" />

      <div className="px-4 py-6">
        {/* HEADER - WITH SELECTIONS AND "CREATE API BUTTON" */}
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <div className="px-4 py-2 border text-mid-grey rounded-lg">
              <p>API Product</p>
            </div>
            <div className="px-4 py-2 border text-mid-grey rounded-lg">
              <p>API Library</p>
            </div>
          </div>

          <div
            className="border-2 border-primary text-primary text-sm font-semibold rounded-lg py-[10px] px-4 cursor-pointer"
            onClick={() =>
              router.push(
                "/admin_back_office/api_product_management/new_api_product"
              )
            }
          >
            Create API Product
          </div>
        </div>

        <div className="flex justify-between my-6">
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

          <div className="flex border p-2 rounded-lg items-center gap-2">
            <Icon icon="lets-icons:filter-big" className="text-mid-grey" />
            <p>Filter</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* SINGULAR API PRODUCT CARD! - I really don't wanna make another component for it. */}
          {apiProducts.map((apiProduct, index) => (
            <div
              key={index}
              className="p-4 space-y-4 border rounded-lg text-dark-txt flex flex-col"
            >
              <div className="flex gap-[10px] items-center font-semibold">
                <Image
                  src={apiProduct.img}
                  width={53}
                  height={53}
                  alt="API Product Image"
                />
                <p>{apiProduct.title}</p>
              </div>
              <p className="flex-1">{apiProduct.description}</p>
              <div className="w-fit px-4 py-1 rounded-full bg-category-fade text-category">
                <p className="font-semibold text-sm">{apiProduct.category}</p>
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
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
