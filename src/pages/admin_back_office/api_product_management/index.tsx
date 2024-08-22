import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import { BreadCrumbs, Button, Table, toTitleCase } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaEllipsisV, FaRegClock, FaRegEye, FaRegStar } from "react-icons/fa";
import { useRouter } from "next/router";

import icon1 from "../../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../../public/images/api_icons/icon2.png";
import icon3 from "../../../../public/images/api_icons/icon3.png";
import { useDisclosure } from "@chakra-ui/react";
import ImportAPi from "@/components/modals/importApi";
import AddAPi from "@/components/modals/addApi";
import { useApi } from "@/context/ApiDiscoveryContext";
import { IMockapiProduct } from "@/models/apidiscovery.model";

const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function ApiProductManager() {
  const router = useRouter();
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const { setApiProduct } = useApi();
  const [searchedText, setSearchedText] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [view, setView] = useState<string>("product");
  useEffect(() => {
    setSidebar("backOffice");
    setLoading(false);
  }, []);

  type apiProductsData = {
    img: StaticImageData;
    title: string;
    description: string;
    category: string;
  };

  const apis = [
    {
      img: icon1,
      title: "Tickets++",
      description: "Attract attention",
      provider: "Marketing API",
      Ui: "Encounters marketing materials",
    },
    {
      img: icon2,
      title: "Tickets++",
      description: "Attract attention",
      provider: "Marketing API",
      Ui: "Encounters marketing materials",
    },
    {
      img: icon3,
      title: "Tickets++",
      description: "Attract attention",
      provider: "Marketing API",
      Ui: "Encounters marketing materials",
    },
    {
      img: icon1,
      title: "Tickets++",
      description: "Attract attention",
      provider: "Marketing API",
      Ui: "Encounters marketing materials",
    },
  ];
  const apiProducts: IMockapiProduct[] = [
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
      <AdminNavbar title="API Product Management" />
      <BreadCrumbs breadCrumbActiveItem="API Product Management" />

      <div className="p-5">
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <div
              className={`px-4 py-2 border ${
                view === "product"
                  ? "border-primary text-primary"
                  : "text-mid-grey"
              }  rounded-lg cursor-pointer`}
              onClick={() => setView("product")}
            >
              <p>API Product</p>
            </div>
            <div
              className={`px-4 py-2 border ${
                view === "api" ? "border-primary text-primary" : "text-mid-grey"
              }  rounded-lg cursor-pointer`}
              onClick={() => setView("api")}
            >
              <p>API Library</p>
            </div>
          </div>

          <Button
            type="fit"
            text={view === "product" ? "Create API Product" : "Add API"}
            onClick={() => {
              if (view === "product") {
                router.push(
                  "/admin_back_office/api_product_management/new_api_product"
                );
              } else {
                onOpen();
              }
            }}
          />
          {/* <ImportAPi isOpen={isOpen} onClose={onClose} /> */}
          <AddAPi isOpen={isOpen} onClose={onClose} />
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
        {view === "product" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiProducts.map((apiProduct, index) => (
              <div
                key={index}
                className="p-4 space-y-4 border rounded-lg text-dark-txt hover:shadow-md cursor-pointer flex flex-col"
                onClick={() => {
                  router.push(
                    `/admin_back_office/api_product_management/apiProductDetails-${apiProduct.title}`
                  );
                  setApiProduct(apiProduct);
                }}
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
        ) : (
          // <div className="rounded-lg border overflow-scroll my-5 w-full">
          //   <table className="min-w-full">
          //     <thead className="bg-[#f8f8f8] text-mid-grey">
          //       <tr className="text-left text-sm">
          //         <th className="w-1/3 px-6 py-2 whitespace-nowrap">
          //           API NAME
          //         </th>
          //         <th className="w-1/3 px-6 py-2 whitespace-nowrap">
          //           PROVIDER
          //         </th>
          //         <th className="w-1/3 px-6 py-2 whitespace-nowrap">
          //           DESCRIPTION
          //         </th>
          //         <th className="w-1/3 px-6 py-2 whitespace-nowrap">
          //           USER INTERACTION
          //         </th>
          //         <th className="w-1/3 px-6 py-2 whitespace-nowrap">ACTION</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {apis.filter((item) =>
          //         searchedText.length > 0
          //           ? item.title.includes(searchedText)
          //           : item
          //       ).length > 0 ? (
          //         apis
          //           .filter((item) =>
          //             searchedText.length > 0
          //               ? item.title.includes(searchedText)
          //               : item
          //           )
          //           .map((item, index) => <TableRow key={index} api={item} />)
          //       ) : (
          //         <tr>
          //           <td colSpan={3} className="text-center py-4 text-dark-txt">
          //             &quot;{searchedText}&quot; doesn&apos;t match any
          //             consumption rate!
          //           </td>
          //         </tr>
          //       )}
          //     </tbody>
          //   </table>
          // </div>
          <Table>
            <Table.Header>
              <Table.Heading>API Name</Table.Heading>
              <Table.Heading>Provider</Table.Heading>
              <Table.Heading>Description</Table.Heading>
              <Table.Heading>User Interaction</Table.Heading>
              <Table.Heading>Action</Table.Heading>
            </Table.Header>
            <Table.Body
              data={apis}
              render={(item: any, index: number) => (
                <TableRow key={index} api={item} />
              )}
            />
          </Table>
        )}
      </div>
    </AdminLayout>
  );
}

function TableRow({ api }: any) {
  const router = useRouter();

  return (
    <tr
      className="text-dark-txt hover:bg-light-grey cursor-pointer"
      onClick={() => {
        // router.push(
        //   `/admin_back_office/api_management/${toTitleCase(
        //     api.name,
        //     true
        //   )}/overview`
        // );
      }}
    >
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
        <div className="flex gap-2 items-center font-semibold">
          <Image src={api.img} width={20} height={20} alt="API Product Image" />
          <p>{api.name}</p>
        </div>
      </td>

      <td className="px-6 py-4 text-sm border-t">
        <div className="w-fit h-fit px-3 py-1 bg-category-fade rounded-full text-category">
          <p className="text-sm">{api.provider}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-sm border-t">{api.description}</td>
      <td className="px-6 py-4 text-sm border-t">{api.Ui}</td>
      <td className="px-6 py-4 text-sm border-t">
        <FaEllipsisV />
      </td>
    </tr>
  );
}
