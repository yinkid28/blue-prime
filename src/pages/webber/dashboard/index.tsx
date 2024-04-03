import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, SearchBar } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import icon1 from "../../../../public/images/api_icons/icon1.jpg";
import icon2 from "../../../../public/images/api_icons/icon2.png";
import icon3 from "../../../../public/images/api_icons/icon3.png";
import icon4 from "../../../../public/images/api_icons/icon4.png";
import ApiCardWebber from "@/components/Webber/ApiCardWebber";
import { useRouter } from "next/router";
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function WebberDashboard() {
  const router = useRouter();
  const { loading, setLoading, setSidebar } = useOnboarding();
  useEffect(() => {
    setLoading(false);
    setSidebar("webber");
  }, []);
  const tsr = [
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
      img: icon4,
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
      img: icon4,
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
  ];
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <WebberLayout>
          <Navbar title="Home" />
          <BreadCrumbs
            // breadCrumbItems={breadCrumbs}
            breadCrumbActiveItem={"Home"}
          />
          <div className="p-5 flex flex-col gap-5">
            <div className="flex flex-col-reverse md:flex-row w-full">
              <div className="w-[60%] w-full ">
                <SearchBar />
              </div>
              <div className="w-[40%] w-full flex items-center justify-end">
                <button
                  className="w-fit h-fit px-5 py-2 font-semibold border-primaryFade border-[1px] text-primary rounded-lg"
                  onClick={() => {
                    router.push("/webber/create_api");
                  }}
                >
                  Create API
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tsr.map((item, index) => (
                <ApiCardWebber
                  img={item.img}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  key={index}
                />
              ))}
            </div>
          </div>
        </WebberLayout>
      )}
    </>
  );
}
