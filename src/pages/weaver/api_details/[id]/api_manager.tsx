import Navbar from "@/components/Layout/Nav/navbar";
import {
  FeedbackManagementView,
  OverviewView,
  SubHistoryView,
} from "@/components/Webber/CreateAPI/apiProgress/apiManagerComponents";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import APIServices from "@/services/api_services/api_service";
import { Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// remember to use static generation here but for now we will use context to get current api
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

const breadCrumbs: BreadCrumbItems[] = [
  {
    breadCrumbText: "Text Translator",
    breadCrumbPath: "/weaver/TextTranslator/overview",
  },
];

export default function ApiManager() {
  const { api, setApi } = useApi();
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  const router = useRouter();
  const { apiCode } = router.query;

  useEffect(() => {
    setLoading(false);
  }, []);

  const [view, setView] = useState<string>("Overview");
  const getApi = async (aco: string) => {
    try {
      const res = await APIServices.getSingleApi(aco);
      if (res.statusCode === 200) {
        setApi(res.data);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  useEffect(() => {
    if (apiCode) {
      getApi(apiCode as string);
    }
  }, [apiCode]);

  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-API Manager`}
        />
        <div className="p-5">
          <div className="hidden md:flex items-center gap-3">
            <div
              className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                view === "Overview"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              }  bg-transparent border-[1px]`}
              onClick={() => {
                setView("Overview");
              }}
            >
              <p>Overview</p>
            </div>
            <div
              className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                view === "Subscription"
                  ? "text-primary border-primary "
                  : "text-mid-grey border-mid-grey"
              }  bg-transparent border-[1px]`}
              onClick={() => {
                setView("Subscription");
              }}
            >
              <p>Subscription History</p>
            </div>
            <div
              className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                view === "Manage-feedbacks"
                  ? "text-primary border-primary"
                  : "text-mid-grey border-mid-grey"
              }  bg-transparent border-[1px]`}
              onClick={() => {
                setView("Manage-feedbacks");
              }}
            >
              <p>Manage feedbacks</p>
            </div>
          </div>
          <div className="my-5">
            {view === "Overview" && <OverviewView />}
            {view === "Subscription" && <SubHistoryView />}
            {view === "Manage-feedbacks" && <FeedbackManagementView />}
          </div>
        </div>
      </WebberLayout>
    </>
  );
}
