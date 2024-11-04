import Layout from "@/components/Layout/layout";
import GlobalPagination, { Table } from "@/components/utils";
import { GrFilter } from "react-icons/gr";
import { IADPTemplate, IMockADP } from "@/models/adp.model";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import ADPServices from "@/services/adp_services/adp_services";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import DeactivatePlan from "@/components/modals/manageDeliveryPlans/deactivatePlan";
import OpenDraft from "@/components/modals/manageDeliveryPlans/openDraft";
export default function DeliveryPlans() {
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [fetchedAdps, setFetchedAdps] = useState<IADPTemplate[]>([]);
  const [selectedAdp, setSelectedAdp] = useState<IADPTemplate>();
  const limit = 10;
  const { setApiErrorMessage, user } = useOnboarding();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDraftOpen,
    onOpen: onDraftOpen,
    onClose: onDraftClose,
  } = useDisclosure();
  const router = useRouter();
  const handlePageClick = (page: number) => {
    const newOffset = page - 1;
    setOffset(newOffset);
    getAllUploads(newOffset, limit);
  };
  const getAllUploads = async (pageNo: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await ADPServices.getAllAdpUploads(pageNo, pageSize);
      setLoading(false);
      setPageCount(res.data.totalPages);
      setTotalCount(res.data.totalItems);
      setFetchedAdps(res.data.users);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  useEffect(() => {
    getAllUploads(offset, limit);
  }, []);
  return (
    <Layout page="Delivery Plans">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between">
          <p className="text-xl text-[#052113]">
            Showing {fetchedAdps.length} plan{fetchedAdps.length > 1 ? "s" : ""}{" "}
            of {totalCount}{" "}
          </p>
          {/* <button
            className="w-fit px-5 py-2 flex items-center border font-semibold rounded-lg gap-2"
            onClick={() => {}}
          >
            <GrFilter />
            <p>Filters</p>
          </button> */}
        </div>
        {loading ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Skeleton key={item} width={"100%"} height={10} />
            ))}
          </div>
        ) : (
          <Table>
            <Table.Header>
              <Table.Heading className="text-dark-grey">NAME</Table.Heading>
              <Table.Heading className="text-dark-grey">AUTHOR</Table.Heading>
              <Table.Heading className="text-dark-grey">PRODUCT</Table.Heading>
              <Table.Heading className="text-dark-grey">YEAR</Table.Heading>
              <Table.Heading className="text-dark-grey">STATUS</Table.Heading>
              <Table.Heading className="text-dark-grey">OPTIONS</Table.Heading>
            </Table.Header>
            <Table.Body
              data={fetchedAdps}
              render={(item: IADPTemplate, index: number) => (
                <tr key={index} className="hover:shadow-md">
                  <td className="p-2">
                    <div className="flex items-center  gap-2 w-fit">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="40" rx="10" fill="#F5F5F5" />
                        <g clipPath="url(#clip0_129_1435)">
                          <path
                            d="M10.859 10.877L23.429 9.08197C23.5 9.07179 23.5723 9.07699 23.641 9.0972C23.7098 9.11741 23.7734 9.15216 23.8275 9.1991C23.8817 9.24605 23.9251 9.30408 23.9549 9.36928C23.9846 9.43447 24 9.5053 24 9.57697V30.423C24 30.4945 23.9846 30.5653 23.9549 30.6304C23.9252 30.6955 23.8819 30.7535 23.8279 30.8004C23.7738 30.8473 23.7103 30.8821 23.6417 30.9024C23.5731 30.9227 23.5009 30.928 23.43 30.918L10.858 29.123C10.6196 29.089 10.4015 28.9702 10.2437 28.7883C10.0859 28.6065 9.99903 28.3738 9.99902 28.133V11.867C9.99903 11.6262 10.0859 11.3935 10.2437 11.2116C10.4015 11.0297 10.6196 10.9109 10.858 10.877H10.859ZM12 12.735V27.265L22 28.694V11.306L12 12.735ZM25 27H28V13H25V11H29C29.2652 11 29.5196 11.1053 29.7071 11.2929C29.8947 11.4804 30 11.7348 30 12V28C30 28.2652 29.8947 28.5195 29.7071 28.7071C29.5196 28.8946 29.2652 29 29 29H25V27ZM18.2 20L21 24H18.6L17 21.714L15.4 24H13L15.8 20L13 16H15.4L17 18.286L18.6 16H21L18.2 20Z"
                            fill="#007A3D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_129_1435">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(8 8)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <div className="flex flex-col">
                        <p className="font-[500]">{item.templateDescription}</p>
                        <p className="font-[500] text-xs text-[#757575]">
                          {/* {item.lastModified} */}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <p className="text-sm text-left">{item.createdBy}</p>
                  </td>
                  <td className="p-2">
                    <p className="text-sm text-left">{item.product}</p>
                  </td>
                  <td className="p-2">
                    <p className="text-sm text-left">{item.templateYear}</p>
                  </td>
                  <td className="p-2">
                    <div
                      className={`w-fit h-fit px-3 py-1 border-[1px] text-sm rounded-full ${
                        item.status != null &&
                        item.status.toLowerCase() === "active"
                          ? "text-success bg-success-bg"
                          : "text-mid-grey bg-light-grey"
                      }`}
                    >
                      {item.status || "INACTIVE"}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center  gap-2">
                      <Menu>
                        <MenuButton>
                          <button className="flex items-center gap-2 text-nowrap bg-[#F5F5F5] text-[#757575] w-fit h-fit px-4 py-2 rounded-full">
                            <HiOutlineEllipsisVertical />
                            Options
                          </button>
                        </MenuButton>
                        {item.status != null &&
                          item.status.toLowerCase() === "draft" && (
                            <MenuList>
                              <MenuItem
                                onClick={() => {
                                  onDraftOpen();
                                }}
                              >
                                open
                              </MenuItem>
                            </MenuList>
                          )}
                        {item.status != null &&
                          item.status.toLowerCase() !== "draft" && (
                            <MenuList>
                              <MenuItem
                                onClick={() =>
                                  router.push({
                                    pathname: `/delivery_plans/${item.id}/details`,
                                    query: {
                                      name: item.templateDescription,
                                    },
                                  })
                                }
                              >
                                View Summary
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  router.push({
                                    pathname: `/delivery_plans/${item.id}/activities`,
                                  })
                                }
                              >
                                View Activities
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setSelectedAdp(item);
                                  onOpen();
                                }}
                              >
                                Deactivate ADP
                              </MenuItem>
                            </MenuList>
                          )}
                      </Menu>
                    </div>
                  </td>
                </tr>
              )}
            />
          </Table>
        )}
        <div className="flex justify-end">
          <GlobalPagination
            onPageClick={handlePageClick}
            pageCount={pageCount}
          />
        </div>
        <DeactivatePlan
          isOpen={isOpen}
          onClose={onClose}
          plan={selectedAdp as IADPTemplate}
        />
        <OpenDraft
          isOpen={isDraftOpen}
          onClose={onDraftClose}
          plan={selectedAdp as IADPTemplate}
        />
      </div>
    </Layout>
  );
}
