import { useOnboarding } from "@/context/OnboardingContext";
import Navbar from "@/components/Layout/Nav/navbar";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BreadCrumbs } from "@/components/utils";
import icon1 from "../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../public/images/api_icons/icon2.png";
import icon3 from "../../../public/images/api_icons/icon3.png";
import icon4 from "../../../public/images/api_icons/icon4.png";
import icon5 from "../../../public/images/api_icons/icon5.png";
import icon6 from "../../../public/images/api_icons/icon6.png";
import icon7 from "../../../public/images/api_icons/icon7.png";
import icon8 from "../../../public/images/api_icons/icon8.png";
import ApiCard from "@/components/apiDiscovery/apiLibraryCard";
import { Icon } from "@iconify/react";
import { useApi } from "@/context/ApiDiscoveryContext";
import { IMockApi } from "@/models/apidiscovery.model";
const DiscoveryLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export default function LibraryDashboard() {
  const { setSidebar, setLoading } = useOnboarding();
  //   const { libraryCardsData, setLibraryCardsData } = useApiDiscoveryContext();
  //   const [bookmarked, setBookmarked] = useState(false);
  const { setBookMarked, bookmarkedAPIs } = useApi();

  useEffect(() => {
    setSidebar("");
    setLoading(false);
  }, []);

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

  // function toggleBookmarked(apiId: number) {
  //   const itemsWithBookMarks = inData.map((data) =>
  //     data.id === apiId ? { ...data, bookmarked: !data.bookmarked } : data
  //   );

  //   setInData(itemsWithBookMarks);
  // }
  function toggleBookmarked(apiId: number, item: IMockApi) {
    const itemsWithBookMarks = inData.map((data) => {
      if (data.id === apiId) {
        return {
          ...data,
          bookmarked: !data.bookmarked,
        };
      } else {
        return data;
      }
    });
    if (!item.bookmarked) {
      const newItem = {
        ...item,
        bookmarked: true,
      };
      setBookMarked(newItem);
    } else {
      setBookMarked(item);
    }
    setInData(itemsWithBookMarks);
  }

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
          {/* bit of prop drilling in here */}
          {inData.map((item, index) => (
            <ApiCard
              key={index}
              img={item.img}
              title={item.title}
              category={item.category}
              description={item.description}
              bookmarked={item.bookmarked}
              item={item}
              onToggleBookmarked={toggleBookmarked}
            />
          ))}
        </div>
      </div>
    </DiscoveryLayout>
  );
}
