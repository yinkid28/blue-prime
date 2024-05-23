import Navbar from "@/components/Layout/Nav/navbar";
import ApiHero from "@/components/apiDiscovery/hero";
import dynamic from "next/dynamic";
const DiscoveryLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

import { BreadCrumbs, SearchBar } from "@/components/utils";
import icon1 from "../../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../../public/images/api_icons/icon2.png";
import icon3 from "../../../../public/images/api_icons/icon3.png";
import icon4 from "../../../../public/images/api_icons/icon4.png";
import icon5 from "../../../../public/images/api_icons/icon5.png";
import icon6 from "../../../../public/images/api_icons/icon6.png";
import icon7 from "../../../../public/images/api_icons/icon7.png";
import icon8 from "../../../../public/images/api_icons/icon8.png";
import icon9 from "../../../../public/images/api_icons/icon9.jpg";

import { useEffect, useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner } from "@chakra-ui/react";
import { RegisterUserDto } from "@/models/onboarding.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { IMockApi } from "@/models/apidiscovery.model";
import { useApi } from "@/context/ApiDiscoveryContext";
import ApiCard from "@/components/apiDiscovery/apiLibraryCard";
import ApiProductCard from "@/components/apiDiscovery/apiProductCard";
export default function APIProductWeaver() {
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const { setBookMarked, bookmarkedAPIs } = useApi();
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
  const [allApis, setAllApis] = useState<IMockApi[]>(rec);

  function toggleBookmarked(apiId: number) {
    // const itemsWithBookMarks = allApis.map((data) =>
    //   data.id === apiId ? { ...data, bookmarked: !data.bookmarked } : data
    // );
    // const filteredApi = allApis.filter((api) => api.bookmarked === true);
    // console.log(filteredApi, "filtered");
    // setBookMarked([...bookmarkedAPIs, ...filteredApi]);
    // setAllApis(itemsWithBookMarks);
    console.log("first");
  }
  useEffect(() => {
    setSidebar("");
    setLoading(false);
  }, []);
  return (
    <DiscoveryLayout>
      <Navbar title="API Product" />
      <BreadCrumbs breadCrumbActiveItem="API Product" />
      <ApiHero />
      <div className="p-5">
        <div className="my-5 flex justify-between flex-col gap-2 md:flex-row">
          <div className="w-full md:w-[60%]">
            <SearchBar />
          </div>
          <div className="flex md:justify-end gap-3 items-center">
            <div className="w-fit rounded-lg px-3 py-1 border border-light-grey">
              Popular
            </div>
            <div className="w-fit rounded-lg px-3 py-1 border border-light-grey">
              Newest
            </div>
            <div className="w-fit rounded-lg px-3 py-1 border border-light-grey">
              Best Rated
            </div>
            <div className="w-fit rounded-lg px-3 py-1 border border-light-grey">
              Filter
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {rec.map((item, index) => (
            <ApiProductCard
              key={index}
              img={item.img}
              title={item.title}
              category={item.category}
              description={item.description}
              bookmarked={item.bookmarked as boolean}
              item={item}
              onToggleBookmarked={toggleBookmarked}
            />
          ))}
        </div>
      </div>
    </DiscoveryLayout>
  );
}
