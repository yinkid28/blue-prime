import Navbar from "@/components/Layout/Nav/navbar";
import ApiHero from "@/components/apiDiscovery/hero";
import dynamic from "next/dynamic";
const DiscoveryLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

import { BreadCrumbs } from "@/components/utils";
import icon1 from "../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../public/images/api_icons/icon2.png";
import icon3 from "../../../public/images/api_icons/icon3.png";
import icon4 from "../../../public/images/api_icons/icon4.png";
import icon5 from "../../../public/images/api_icons/icon5.png";
import icon6 from "../../../public/images/api_icons/icon6.png";
import icon7 from "../../../public/images/api_icons/icon7.png";
import icon8 from "../../../public/images/api_icons/icon8.png";
import icon9 from "../../../public/images/api_icons/icon9.jpg";
import ApiCard from "@/components/apiDiscovery/apiCard";
import { useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner } from "@chakra-ui/react";

export default function ApiDiscoveryDashboard() {
  const { setSidebar, loading, setLoading } = useOnboarding();
  const rec = [
    {
      img: icon1,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon2,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon3,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon4,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
  ];
  const tfa = [
    {
      img: icon5,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon6,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon7,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon8,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
  ];
  const tsr = [
    {
      img: icon9,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon2,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon4,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
    {
      img: icon5,
      title: "Text Translator",
      description:
        "Translate text to 100+ languages. Fast processing, cost-saving. Free up to 100,000 characters  per month",
      category: "Banking and finance",
    },
  ];
  useEffect(() => {
    setSidebar("");
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <DiscoveryLayout>
          <Navbar title="Dashboard" />
          <BreadCrumbs breadCrumbActiveItem="Dashboard" />
          <ApiHero />
          <div className="p-5">
            <div className="my-3 flex justify-between flex-col gap-2 md:flex-row">
              <p className=" font-semibold text-dark-grey">Recommended</p>
              <button className="bg-transparent w-fit border-none text-mid-grey">
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {rec.map((item, index) => (
                <ApiCard
                  img={item.img}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="my-3 flex justify-between flex-col gap-2 md:flex-row">
              <p className=" font-semibold text-dark-grey">Top Finance API’s</p>
              <button className="bg-transparent w-fit border-none text-mid-grey">
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tfa.map((item, index) => (
                <ApiCard
                  img={item.img}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="my-3 flex justify-between flex-col gap-2 md:flex-row">
              <p className=" font-semibold text-dark-grey">
                Top Speech Recognition
              </p>
              <button className="bg-transparent w-fit border-none text-mid-grey">
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tsr.map((item, index) => (
                <ApiCard
                  img={item.img}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  key={index}
                />
              ))}
            </div>
          </div>
        </DiscoveryLayout>
      )}
    </>
  );
}
