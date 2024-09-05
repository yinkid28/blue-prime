import { useOnboarding } from "@/context/OnboardingContext";
import Navbar from "@/components/Layout/Nav/navbar";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BreadCrumbs } from "@/components/utils";
import icon1 from "../../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../../public/images/api_icons/icon2.png";
import icon3 from "../../../../public/images/api_icons/icon3.png";
import icon4 from "../../../../public/images/api_icons/icon4.png";
import icon5 from "../../../../public/images/api_icons/icon5.png";
import icon6 from "../../../../public/images/api_icons/icon6.png";
import icon7 from "../../../../public/images/api_icons/icon7.png";
import icon8 from "../../../../public/images/api_icons/icon8.png";
import ApiCard from "@/components/apiDiscovery/apiLibraryCard";
import { Icon } from "@iconify/react";
import { useApi } from "@/context/ApiDiscoveryContext";
import { IMockApi } from "@/models/apidiscovery.model";
import { AnimatePresence } from "framer-motion";
import { IApi } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";
import { Skeleton, useToast } from "@chakra-ui/react";
const DiscoveryLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export default function LibraryDashboard() {
  const toast = useToast();
  const { setSidebar, setLoading, setApiErrorMessage, user } = useOnboarding();
  const { setBookMarked, bookmarkedAPIs, libraryView } = useApi();
  const [isfetchingApis, setIsLoading] = useState<boolean>(false);
  const [fetchedApis, setFetchedApis] = useState<IApi[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [dataCount, setDataCount] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [skels, setSkels] = useState<number[]>([1, 2, 3, 4]);

  const getApis = async (cco: string) => {
    setIsLoading(true);

    try {
      const res = await APIServices.getbookmarkApi(cco);
      if (res.statusCode === 200) {
        setIsLoading(false);
        setFetchedApis(res.data.content);
        setDataCount(res.data.content.length);
        setBookMarked(res.data.content);
      }
    } catch (error: any) {
      setLoading(false);
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
      }
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  useEffect(() => {
    if (user) {
      setSidebar("");
      setLoading(false);
      getApis(user.customerCode);
    }
  }, [user]);

  const apiCardData = [
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
  ];

  // Make it type safe after it works
  const [inData, setInData] = useState(apiCardData);

  // function toggleBookmarked(apiId: number, item: IMockApi) {
  //   const itemsWithBookMarks = inData.map((data) => {
  //     if (data.id === apiId) {
  //       return {
  //         ...data,
  //         bookmarked: !data.bookmarked,
  //       };
  //     } else {
  //       return data;
  //     }
  //   });
  //   if (!item.bookmarked) {
  //     const newItem = {
  //       ...item,
  //       bookmarked: true,
  //     };
  //     setBookMarked(newItem);
  //   } else {
  //     setBookMarked(item);
  //   }
  //   setInData(itemsWithBookMarks);
  // }

  useEffect(() => {
    console.log(bookmarkedAPIs);
  }, [bookmarkedAPIs]);

  return (
    <DiscoveryLayout>
      <Navbar title="Library" />
      <BreadCrumbs breadCrumbActiveItem="Library" />
      {/* ↑ I would come fix this after I implement the filter for the save option. */}

      {/* THIS CONTAINS THE REST OF THE CONTENT - REMEMBER TO CLEAR OUT THIS PLACE BEFORE MAKING A PR */}
      <div className="p-4">
        {/* TOP SECTION */}
        <div className="flex justify-between">
          <div className="flex items-center border rounded-lg w-[40%] py-2 px-4 gap-1">
            <Icon
              icon="lets-icons:search-alt-light"
              className="text-mid-grey text-2xl"
            />
            <input
              type="search"
              placeholder="Search"
              className="text-base font-semibold focus:outline-none w-full"
            />
          </div>

          <div className="flex border p-2 rounded-lg items-center gap-2">
            <Icon icon="lets-icons:filter-big" className="text-mid-grey" />
            <p>Filter</p>
          </div>
        </div>

        {/* SECOND SECTION - THE VIEW SELECTORS */}
        <div className="hidden md:flex items-center gap-2 mt-6">
          <div className="p-3 rounded-lg text-mid-grey border text-sm">
            <p>Popular</p>
          </div>
          <div className="p-3 rounded-lg text-mid-grey border text-sm">
            <p>Newest</p>
          </div>
          <div className="p-3 rounded-lg text-mid-grey border text-sm">
            <p>Best rated</p>
          </div>
        </div>

        {/* THIRD SECTION - SECTION CONTAINING THE API CARDS */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {isfetchingApis ? (
              skels.map((item, index) => <Skeleton height={200} key={index} />)
            ) : fetchedApis.length > 0 ? (
              fetchedApis.map((item, index) => (
                <ApiCard
                  key={index}
                  img={""}
                  title={item.name}
                  category={item.lifeCycleStatus}
                  description={item.description}
                  bookmarked={true}
                  api={item}
                  onToggleBookmarked={() => {
                    unbookmarkApi(user?.customerCode as string, item.apiCode);
                  }}
                />
              ))
            ) : (
              <>
                <p>You Currently do not have any APIs</p>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DiscoveryLayout>
  );
}
