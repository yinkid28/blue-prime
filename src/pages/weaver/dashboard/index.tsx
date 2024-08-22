import Navbar from "@/components/Layout/Nav/navbar";
import GlobalPagination, { BreadCrumbs, SearchBar } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Skeleton, Spinner, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import icon1 from "../../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../../public/images/api_icons/icon2.png";
import icon3 from "../../../../public/images/api_icons/icon3.png";
import icon4 from "../../../../public/images/api_icons/icon4.png";
import { useRouter } from "next/router";
import APIServices from "@/services/api_services/api_service";
import { IApi } from "@/models/api.model";
import ApiCardWebber from "@/components/Webber/ApiCardWebber";
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function WebberDashboard() {
  const router = useRouter();
  const { loading, setLoading, setSidebar, setApiErrorMessage, user } =
    useOnboarding();
  const [isfetchingApis, setIsLoading] = useState<boolean>(false);
  const [fetchedApis, setFetchedApis] = useState<IApi[]>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [dataCount, setDataCount] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [skels, setSkels] = useState<number[]>([1, 2, 3, 4]);
  const toast = useToast();
  useEffect(() => {
    setLoading(false);
    setSidebar("weaver");
    if (user) {
      getApis(user.customerCode, pageNo, pageSize);
    }
  }, [user]);
  const handlePageClick = (page: number) => {
    const newOffset = page;
    setPageNo(newOffset);
    getApis(user!.customerCode, newOffset, pageSize);
  };
  useEffect(() => {
    const page = dataCount / pageSize;
    console.log(page, "countt");

    setPageCount(Math.ceil(page));
  }, [dataCount]);
  const getApis = async (cco: string, pageNo: number, pageSize: number) => {
    setIsLoading(true);

    try {
      const res = await APIServices.getAllApibyCustomerCode(
        cco,
        pageNo,
        pageSize
      );
      if (res.statusCode === 200) {
        setIsLoading(false);
        setFetchedApis(res.data);
        setDataCount(res.totalElements);
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  return (
    <>
      <WebberLayout>
        <Navbar title="Home" />
        {/* <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={"Home"}
        /> */}
        <div className="p-5 flex flex-col gap-5">
          <div className="flex flex-col-reverse md:flex-row w-full">
            <div className="w-[60%] w-full ">
              <SearchBar />
            </div>
            <div className="w-[40%] w-full flex items-center justify-end">
              <button
                className="w-fit h-fit hover:bg-primary hover:text-white transition ease-in-out duration-700  px-5 py-2 font-semibold border-primaryFade border-[1px] text-primary rounded-lg"
                onClick={() => {
                  router.push("/weaver/create_api");
                }}
              >
                Create API
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isfetchingApis ? (
              skels.map((item, index) => <Skeleton height={200} key={index} />)
            ) : fetchedApis ? (
              fetchedApis.map((item, index) => (
                <ApiCardWebber
                  img={""}
                  title={item.name}
                  category={item.lifeCycleStatus.toUpperCase()}
                  description={item.description}
                  key={index}
                  api={item}
                />
              ))
            ) : (
              <>
                <p>You Currently do not have any APIs</p>
              </>
            )}
          </div>
          <div className="flex w-full justify-end">
            <GlobalPagination
              onPageClick={handlePageClick}
              pageCount={pageCount < 1 ? 1 : pageCount}
              inc
            />
          </div>
        </div>
      </WebberLayout>
    </>
  );
}
