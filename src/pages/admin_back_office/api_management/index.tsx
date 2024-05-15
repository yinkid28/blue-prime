import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, SearchBar, Table, toTitleCase } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import { Icon } from "@iconify/react";
import icon4 from "../../../../public/images/api_icons/icon4.png";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/router";
import { useApi } from "@/context/ApiDiscoveryContext";
const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function AdminApiManager() {
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const [searchedText, setSearchedText] = useState<string>("");
  useEffect(() => {
    setSidebar("backOffice");
    setLoading(false);
  }, []);

  const apis: IMockApi[] = [
    {
      id: Math.ceil(Math.random() * 100),
      img: icon4,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: Math.ceil(Math.random() * 100),
      img: icon4,
      title: "Food Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: Math.ceil(Math.random() * 100),
      img: icon4,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: Math.ceil(Math.random() * 100),
      img: icon4,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: Math.ceil(Math.random() * 100),
      img: icon4,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
  ];
  return (
    <AdminLayout>
      <AdminNavbar title="API Management" />
      <BreadCrumbs breadCrumbActiveItem="API Management" />
      <div className="p-5">
        <div className="flex flex-col gap-3 md:flex-row justify-between ">
          <div className="w-full md:w-[60%]">
            <SearchBar />
          </div>
          <div className="">
            <button className="flex w-fit border p-2 rounded-lg items-center gap-2">
              <Icon icon="lets-icons:filter-big" className="text-mid-grey" />
              <p>Filter</p>
            </button>
          </div>
        </div>

        {/* IN CASE YOU STILL WANNA TAKE A LOOK AT IT */}
        {/* <div className="rounded-lg border overflow-scroll my-5 w-full">
          <table className="min-w-full">
            <thead className="bg-[#f8f8f8] text-mid-grey">
              <tr className="text-left text-sm">
                <th className="w-1/3 px-6 py-2 whitespace-nowrap">API NAME</th>
                <th className="w-1/3 px-6 py-2 whitespace-nowrap">VERSION</th>
                <th className="w-1/3 px-6 py-2 whitespace-nowrap">CATEGORY</th>
                <th className="w-1/3 px-6 py-2 whitespace-nowrap">STATUS</th>
                <th className="w-1/3 px-6 py-2 whitespace-nowrap">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {apis.filter((item) =>
                searchedText.length > 0
                  ? item.title.includes(searchedText)
                  : item
              ).length > 0 ? (
                apis
                  .filter((item) =>
                    searchedText.length > 0
                      ? item.title.includes(searchedText)
                      : item
                  )
                  .map((item, index) => <TableRow key={index} api={item} />)
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-dark-txt">
                    &quot;{searchedText}&quot; doesn&apos;t match any
                    consumption rate!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}

        <Table className="my-5">
          <Table.Header>
            <Table.Heading>API Name</Table.Heading>
            <Table.Heading>Version</Table.Heading>
            <Table.Heading>Category</Table.Heading>
            <Table.Heading>Status</Table.Heading>
            <Table.Heading className="w-[5%]">Action</Table.Heading>
          </Table.Header>
          <Table.Body
            data={apis}
            render={(item: IMockApi, index: number) => (
              <TableRow key={index} api={item} />
            )}
          />
        </Table>
      </div>
    </AdminLayout>
  );
}

type APIM = {
  api: IMockApi;
};
function TableRow({ api }: APIM) {
  const router = useRouter();
  const { setApi } = useApi();
  return (
    <tr
      className="text-dark-txt hover:bg-light-grey cursor-pointer"
      onClick={() => {
        router.push(
          `/admin_back_office/api_management/${toTitleCase(
            api.title,
            true
          )}/overview`
        );
        setApi(api);
      }}
    >
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">
        {api.title}
      </td>
      <td className="px-6 py-4 text-sm border-t">v1</td>
      <td className="px-6 py-4 text-sm border-t">{api.category}</td>
      <td className="px-6 py-4 text-sm border-t">
        <div
          className={`w-fit bg-success-bg text-success px-3 py-1 rounded-full`}
        >
          Approved
        </div>
      </td>
      <td className="px-6 py-4 text-sm border-t">
        <FaEllipsisV />
      </td>
    </tr>
  );
}
