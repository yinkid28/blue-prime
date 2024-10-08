import CategoryCard from "@/components/Admin/CategoryCard";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import Navbar from "@/components/Layout/Nav/navbar";
import CreateEndpointCriteria from "@/components/modals/addEndpointCriteria";
import DeleteAPICategory from "@/components/modals/Admin/deleteCategoryModal";
import UploadCSVModal from "@/components/modals/UploadCSVModal";
import {
  BreadCrumbItems,
  BreadCrumbs,
  Button,
  Table,
} from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { ICategory } from "@/models/admin.model";
import AdminServices from "@/services/admin_services/admin_services";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});

export default function CategoryDetail() {
  const {
    isOpen: isUploadCSVOpen,
    onOpen: onOpenUploadCSV,
    onClose: onCloseUploadCSV,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [view, setView] = useState<string>("advanced");
  const [cat, setCat] = useState<ICategory>();
  const {
    setSidebar,

    setLoading,
    setApiErrorMessage,
  } = useOnboarding();
  const router = useRouter();
  const { id, catCo } = router.query;

  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Category Management",
      breadCrumbPath: "/admin_back_office/category_management",
    },
  ];
  useEffect(() => {
    if (catCo) {
      getCategory(catCo as string);
      setSidebar("categoryDetails");
    }
    // setLoading(false);
  }, [catCo]);

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
  const getCategory = async (catCo: string) => {
    setLoading(true);

    try {
      const res = await AdminServices.getCategory(catCo);
      console.log(res);
      if (res.statusCode === 200) {
        setLoading(false);
        setCat(res.data);
        //   getApiPricing(api.apiCode);
        // router.reload();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      console.error("Caught error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unknown error occurred";
      setApiErrorMessage(errorMessage, "error");
    }
  };

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
            {/* <button
              onClick={onOpenUploadCSV}
              className="border-2 rounded-xl text-primary py-2 px-[22px] font-semibold text-xs whitespace-nowrap"
            >
              Upload CSV
            </button> */}
            <button
              onClick={onOpenDelete}
              className="bg-error-bg text-error  rounded-xl  py-2 px-[22px] font-semibold text-xs whitespace-nowrap"
            >
              Delete
            </button>
            {/* {view && (
            )} */}

            <Button
              type="fit"
              text={"Add Endpoint Criteria"}
              onClick={() => {
                onOpen();
              }}
            />

            {/* <UploadCSVModal
                isOpen={isUploadCSVOpen}
                onClose={onCloseUploadCSV}
              /> */}
            <DeleteAPICategory
              isOpen={isDeleteOpen}
              onClose={onCloseDelete}
              cat={cat as ICategory}
            />
            <CreateEndpointCriteria isOpen={isOpen} onClose={onClose} />
          </div>
        </div>
        <Table>
          <Table.Header>
            <th className="w-[40%] px-6 py-2">Name</th>
            <th className="w-[50%] px-6 py-2">Description</th>
            <th className="w-[10%] px-6 py-2">Action</th>
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
