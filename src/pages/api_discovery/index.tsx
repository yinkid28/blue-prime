import Navbar from "@/components/Layout/Nav/navbar";
import ApiHero from "@/components/apiDiscovery/hero";
import dynamic from "next/dynamic";
const DiscoveryLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

import GlobalPagination, { BreadCrumbs } from "@/components/utils";
import icon1 from "../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../public/images/api_icons/icon2.png";
import icon3 from "../../../public/images/api_icons/icon3.png";
import icon4 from "../../../public/images/api_icons/icon4.png";
import icon5 from "../../../public/images/api_icons/icon5.png";
import icon6 from "../../../public/images/api_icons/icon6.png";
import icon7 from "../../../public/images/api_icons/icon7.png";
import icon8 from "../../../public/images/api_icons/icon8.png";
import icon9 from "../../../public/images/api_icons/icon9.jpg";

import { useEffect, useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Skeleton, Spinner, useToast } from "@chakra-ui/react";
import { RegisterUserDto } from "@/models/onboarding.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { IMockApi } from "@/models/apidiscovery.model";
import { useApi } from "@/context/ApiDiscoveryContext";
import ApiCard from "@/components/apiDiscovery/apiLibraryCard";
import APIServices from "@/services/api_services/api_service";
import { IApi } from "@/models/api.model";

export default function ApiDiscoveryDashboard() {
  const { setSidebar, loading, setLoading, setApiErrorMessage, user } =
    useOnboarding();
  const { setBookMarked, bookmarkedAPIs } = useApi();
  const [isfetchingApis, setIsLoading] = useState<boolean>(false);
  const [fetchedApis, setFetchedApis] = useState<IApi[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [dataCount, setDataCount] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [skels, setSkels] = useState<number[]>([1, 2, 3, 4]);
  const rec: IMockApi[] = [
    {
      id: 1,
      img: icon1,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 2,
      img: icon2,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 3,
      img: icon3,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 4,
      img: icon4,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 5,
      img: icon5,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 6,
      img: icon6,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 7,
      img: icon7,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 8,
      img: icon8,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 9,
      img: icon5,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 10,
      img: icon6,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 11,
      img: icon7,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
    {
      id: 12,
      img: icon8,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
      bookmarked: false,
    },
  ];
  const toast = useToast();
  const [allApis, setAllApis] = useState<IMockApi[]>(rec);
  const getApis = async (pageNo: number, pageSize: number) => {
    setIsLoading(true);

    try {
      const res = await APIServices.getAllWebberApis(pageNo, pageSize);
      if (res.statusCode === 200) {
        setIsLoading(false);
        setFetchedApis(res.data.content);
        setPageCount(res.data.totalPages);
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const bookmarkApis = async (cco: string, aco: string) => {
    setIsLoading(true);

    try {
      const res = await APIServices.bookmarkApi(aco, cco);
      if (res.statusCode === 201) {
        toast({
          description: "API added to bookmarks",
          status: "success",
          duration: 3000,
          position: "bottom-left",
        });
        setIsLoading(false);
        getApis(pageNo, pageSize);
      }
    } catch (error: any) {
      setIsLoading(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const unbookmarkApi = async (cco: string, aco: string) => {
    setIsLoading(true);

    try {
      const res = await APIServices.removebookmarkApi(aco, cco);
      if (res.statusCode === 200) {
        setIsLoading(false);
        toast({
          description: "API removed from bookmarks",
          status: "success",
          duration: 3000,
          position: "bottom-left",
        });
        getApis(pageNo, pageSize);
      }
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const handlePageClick = (page: number) => {
    const newOffset = page;
    setPageNo(newOffset);
    getApis(page, pageSize);
  };
  useEffect(() => {
    setSidebar("");
    setLoading(false);
    getApis(pageNo, pageSize);
  }, []);

  return (
    <DiscoveryLayout>
      <Navbar title="Dashboard" />
      {/* <BreadCrumbs breadCrumbActiveItem="Dashboard" /> */}
      <ApiHero />
      <div className="p-5">
        <div className="my-3 flex justify-between flex-col gap-2 md:flex-row">
          <p className=" font-semibold text-dark-grey">Recommended</p>
          <button className="bg-transparent text-[14px] w-fit border-none text-mid-grey">
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isfetchingApis ? (
            skels.map((item, index) => <Skeleton height={200} key={index} />)
          ) : fetchedApis ? (
            fetchedApis.map((item, index) => (
              <ApiCard
                key={index}
                img={""}
                title={item.name}
                category={item.lifeCycleStatus}
                description={item.description}
                bookmarked={item.bookmarked as boolean}
                api={item}
                onToggleBookmarked={() => {
                  item.bookmarked
                    ? unbookmarkApi(user?.customerCode as string, item.apiCode)
                    : bookmarkApis(user?.customerCode as string, item.apiCode);
                }}
              />
            ))
          ) : (
            <>
              <p>You Currently do not have any APIs</p>
            </>
          )}
        </div>
        <div className="flex items-center my-5 justify-end">
          <GlobalPagination
            onPageClick={handlePageClick}
            pageCount={pageCount <= 1 ? 1 : pageCount}
          />
        </div>
      </div>
    </DiscoveryLayout>
  );
}
