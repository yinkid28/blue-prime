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
  UseToastOptions,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CiMenuKebab } from "react-icons/ci";
import { getFormattedDate } from "@/helper_utils/helpers";
import APIServices from "@/services/api_services/api_service";
import EditApp from "@/components/modals/editApp";
import AddApp from "@/components/modals/addApp";
import { GiJetPack } from "react-icons/gi";

const DiscoveryLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

type TableRowProps = {
  name: string;
  tokenQuota: string;
  createdTime: string;
  appco: string;
  onDelete: (appco: string) => void;
  onEdit: (appco: string) => void;
};

type Application = {
  name: string;
  tokenQuota: string;
  createdTime: string;
  appco: string;
};

const toastProps: UseToastOptions = {
  description: "successfully copied",
  status: "success",
  isClosable: true,
  duration: 800,
  position: "bottom-right",
};

export default function Application() {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onClose: onEditClose,
    onOpen: onEditOpen,
  } = useDisclosure();
  const { loading, setLoading, setSidebar, setApiErrorMessage } = useOnboarding();
  const [copied, setCopied] = useState<boolean>(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [editingApp, setEditingApp] = useState<string | null>(null);
  
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState<number>(12);

  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/webber/library",
    },
  ];

  const getAllApplications = useCallback(async (pageNumber: number, pageSize: number) => {
    setIsLoadingApps(true);
    try {
      const res = await APIServices.getAllWebberApplications(pageNumber + 1, pageSize, searchTerm);
      if (res.statusCode === 200) {
        const formattedApplications = res.data.list.map((app: any) => ({
          name: app.name,
          tokenQuota: app.throttlingPolicy || "N/A",
          createdTime: app.renewDate ? getFormattedDate(app.renewDate) : "N/A",
          appco: app.appCode || app.applicationId,
        }));
        setApplications(formattedApplications);
        setFilteredApplications(formattedApplications);
        setPageCount(res.data.totalPages);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to fetch applications";
      setApiErrorMessage(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoadingApps(false);
    }
  }, [searchTerm, setApiErrorMessage]);

  const handlePageClick = (page: number) => {
    setPageNumber(page);
    getAllApplications(page, pageSize);
  };

  useEffect(() => {
    setLoading(false);
    setSidebar("");
    getAllApplications(pageNumber, pageSize);
  }, [pageNumber, pageSize, getAllApplications, setLoading, setSidebar]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
    getAllApplications(0, pageSize);
  };

  const handleEditApplication = (appco: string) => {
    setEditingApp(appco);
    onEditOpen();
  };

  const deleteApplication = async (appco: string) => {
    setLoading(true);
    try {
      const response = await APIServices.deleteWebberApplication(appco);
      if (response.statusCode === 200) {
        toast({
          title: "Delete Application",
          description: "Application successfully deleted",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        getAllApplications(pageNumber, pageSize);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to delete application";
      setApiErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DiscoveryLayout>
      <>
        <Navbar title={`Library`} />
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`Application`}
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
              <p>{error}</p>
            ) : filteredApplications.length > 0 ? (
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
                  data={filteredApplications}
                  render={(data: Application, index: number) => (
                    <TableRow
                      name={data.name}
                      tokenQuota={data.tokenQuota}
                      createdTime={data.createdTime}
                      appco={data.appco}
                      onDelete={deleteApplication}
                      onEdit={handleEditApplication}
                      key={index}
                    />
                  )}
                />
              </Table>
            ) : (
              <p>No applications found.</p>
            )}
          </div>
          <div className="flex items-center my-5 justify-end">
            <GlobalPagination
              onPageClick={handlePageClick}
              pageCount={pageCount}
              inc={false}
            />
          </div>
        </div>

        <AddApp
          isOpen={isOpen}
          onClose={() => {
            onClose();
            getAllApplications(pageNumber, pageSize);
          }}
          onSuccess={() => getAllApplications(pageNumber, pageSize)}
        />
       
        {editingApp && (
          <EditApp
            isOpen={isEditOpen}
            onClose={() => {
              onEditClose();
              setEditingApp(null);
              getAllApplications(pageNumber, pageSize);
            }}
            onSuccess={() => getAllApplications(pageNumber, pageSize)}
            appco={editingApp}
          />
        )}
      </>
    </DiscoveryLayout>
  );
}

function TableRow({
  name,
  tokenQuota,
  createdTime,
  appco,
  onDelete,
  onEdit,
}: TableRowProps) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <tr>
      <td className="px-6 py-4 text-sm border-gukt whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 text-sm border-t">{tokenQuota}</td>
      <td className="px-6 py-4 text-sm border-t">{createdTime}</td>
      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton onClick={() => console.log(name, appco)}>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" minH={"0"} h={"70px"}>
            <MenuItem
              onClick={() =>
                router.push(`/webber/library/${id}/overview/${name}`)
              }
            >
              <p>View Details</p>
            </MenuItem>
            <MenuItem>
              <p>Cancel Subscription</p>
            </MenuItem>
            <MenuItem onClick={() => onEdit(appco)}>
              <p>Edit Application</p>
            </MenuItem>
            <MenuItem onClick={() => onDelete(appco)}>
              <p>Delete Application</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}















