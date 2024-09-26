import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Layout/Nav/navbar";
import GlobalPagination, { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CiMenuKebab } from "react-icons/ci";
import { getFormattedDate } from "@/helper_utils/helpers";
import APIServices from "@/services/api_services/api_service";
import AddApp from "@/components/modals/addApp";

const DiscoveryLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});


type Application = {
  id: string;
  name: string;
  throttlingPolicy: string;
  createdDate: string;
};

export default function Application() {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { loading, setLoading, setSidebar, setApiErrorMessage, user } = useOnboarding();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState<number>(3);

  const router = useRouter();
  
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/webber/library",
    },
  ];

  const getAllApplications = useCallback(async () => {
    if (!user?.customerCode) {
      setError("User customer code not available");
      return;
    }

    setIsLoadingApps(true);
    setError(null);
    try {
      console.log("Fetching applications with params:", { pageNumber: pageNumber + 1, pageSize, customerCode: user.customerCode });
      const res = await APIServices.getAllWebberApplications(
        pageNumber + 1,
        pageSize,
        user.customerCode
      );
      console.log("API Response:", res);

      if (res.statusCode === 200) {
        let formattedApplications;
        if (Array.isArray(res.data)) {
          formattedApplications = res.data.map((app: any) => ({
            id: app.id,
            name: app.name,
            throttlingPolicy: app.throttlingPolicy || "N/A",
            // createdTime: app.renewDate ? getFormattedDate(app.renewDate) : "N/A",
          }));
        } 
        console.log("Formatted Applications:", formattedApplications);
        setApplications(formattedApplications);
        setPageCount(res.totalPages || res.data.totalPages || 1);
      } 
    } catch (error: any) {
      console.error("Error fetching applications:", error);
      const errorMessage = error?.response?.data?.message || error.message || "Failed to fetch applications";
      setApiErrorMessage(errorMessage);
    
    } finally {
      setIsLoadingApps(false);
    }
  }, [pageNumber, pageSize, user, setApiErrorMessage]);

  const handlePageClick = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    setLoading(false);
    setSidebar("");
    if (user?.customerCode) {
      getAllApplications();
    }
  }, [user, pageNumber, pageSize, searchTerm, getAllApplications, setLoading, setSidebar]);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  const deleteApplication = async (id: string) => {
    setLoading(true);
    try {
      const response = await APIServices.deleteWebberApplication(id);
      if (response.statusCode === 200) {
        toast({
          title: "Delete Application",
          description: "Application successfully deleted",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        getAllApplications();
      }
    } catch (error: any) {
      console.error("Error deleting application:", error);
      const errorMessage = error?.response?.data?.message || "Failed to delete application";
      setApiErrorMessage(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DiscoveryLayout>
      <>
        <Navbar title="Library" />
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem="Application"
        />
        <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-0 gap-6">
            <div className="flex items-center border rounded-lg w-[40%] py-2 px-4 gap-1">
              <Icon
                icon="lets-icons:search-alt-light"
                className="text-mid-grey text-2xl"
              />
              <input
                type="search"
                placeholder="Search"
                className="text-base font-semibold focus:outline-none w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex flex-col gap-3 lg:gap-6 lg:items-end">
              <button
                onClick={onOpen}
                className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit"
              >
                Add New App
              </button>
            </div>
          </div>

          <div className="mt-4">
            {isLoadingApps ? (
              <p>Loading applications...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : applications.length > 0 ? (
              <Table>
                <Table.Header>
                  <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                    Application Name
                  </th>
                  <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                    Token Quota
                  </th>
                  <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                    Date Added
                  </th>
                  <th className="w-[5%] px-6 py-2">Actions</th>
                </Table.Header>
                <Table.Body
                  data={applications}
                  render={(data: Application, index: number) => (
                    <TableRow
                      id={data.id}
                      name={data.name}
                      throttlingPolicy={data.throttlingPolicy}
                      createdDate={data.createdDate}
                      onDelete={deleteApplication}
                      key={index}
                    />
                  )}
                />
              </Table>
            ) : (
              <p>No applications found.</p>
            )}
          </div>
          {applications.length > 0 && (
            <div className="flex items-center my-5 justify-end">
              <GlobalPagination
                onPageClick={handlePageClick}
                pageCount={pageCount}
                inc={false}
              />
            </div>
          )}
        </div>

        <AddApp
          isOpen={isOpen}
          onClose={() => {
            onClose();
            getAllApplications();
          }}
          onSuccess={getAllApplications}
          cco={user?.customerCode || ""}
        />
      </>
    </DiscoveryLayout>
  );
}

function TableRow({
  id,
  name,
  throttlingPolicy,
  createdDate,
  onDelete,
}: Application & {
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const { id: routerId } = router.query;

  return (
    <tr>
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 text-sm border-t">{throttlingPolicy}</td>
      <td className="px-6 py-4 text-sm border-t">{createdDate}</td>
      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" minH="0" h="70px">
            <MenuItem
              onClick={() =>
                router.push(`/webber/library/${routerId}/overview/${name}`)
              }
            >
              <p>View Details</p>
            </MenuItem>
            <MenuItem>
              <p>Cancel Subscription</p>
            </MenuItem>
            <MenuItem onClick={() => onDelete(id)}>
              <p>Delete Application</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}
