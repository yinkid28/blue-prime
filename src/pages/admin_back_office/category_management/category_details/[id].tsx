import CategoryCard from "@/components/Admin/CategoryCard";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Key, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function CategoryDetail() {
  const {
    setSidebar,
    loading,
    setLoading,
    apiCategory,
    setApiCategory,
    setApiErrorMessage,
  } = useOnboarding();
  const router = useRouter();
  const { id } = router.query;
  if (id) setApiCategory(id as string);
  // console.log(apiCategory);

  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Category Management",
      breadCrumbPath: "/admin_back_office/category_management",
    },
  ];
  useEffect(() => {
    setSidebar("categoryDetails");
    setLoading(false);
  }, []);

  type categoryDataTypes = {
    name: string;
    description: string;
  };

  const categoryDetailData: categoryDataTypes[] = [
    {
      name: "Criteria 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
    {
      name: "Criteria 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
    },
  ];

  return (
    <AdminLayout>
      <AdminNavbar title="Category Management" />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={id as string}
      />
      <div className="px-4 py-6">
        <div className="flex justify-between mb-4">
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
          <div className="flex items-center gap-4">
            <button className="border-2 flex items-center justify-center gap-2 h-fit rounded-xl text-primary py-[5px] px-[22px] font-semibold text-xs whitespace-nowrap">
              <span className="text-base -translate-y-[1px]">+</span>{" "}
              <p>Add Endpoint Criteria</p>
            </button>
            <button className="border-2 rounded-xl text-primary py-2 px-[22px] font-semibold text-xs whitespace-nowrap">
              Upload CSV
            </button>
          </div>
        </div>
        <Table>
          <Table.Header>
            {/* <th className="w-[40%] px-6 py-2">Name</th>
            <th className="w-[50%] px-6 py-2">Description</th>
            <th className="w-[10%] px-6 py-2">Action</th> */}
            <Table.Heading className="w-[20%] md:w-[40%]">Name</Table.Heading>
            <Table.Heading className="w-[75%] md:w-[50%]">
              Description
            </Table.Heading>
            <Table.Heading className="w-[5%]">Action</Table.Heading>
          </Table.Header>
          <Table.Body
            data={categoryDetailData}
            render={(
              item: categoryDataTypes,
              index: Key | null | undefined
            ) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm">{item.description}</td>
                <td className="px-6 py-4 text-sm">
                  <Menu>
                    <MenuButton>
                      <CiMenuKebab />
                    </MenuButton>
                    <MenuList minW="0" w={"100px"} minH={"0"} h={"70px"}>
                      <MenuItem>
                        <p>Block</p>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </td>
              </tr>
            )}
          />
        </Table>
      </div>
    </AdminLayout>
  );
}
