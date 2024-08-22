import Navbar from "@/components/Layout/Nav/navbar";
import EndpointView from "@/components/apiDiscovery/EndpointsView";
import DocumentationView from "@/components/apiDiscovery/documentation";
import FeedbackView from "@/components/apiDiscovery/feedbackView";
import PriceView from "@/components/apiDiscovery/pricingView";

import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { IComment } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";
import { Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ApiLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiProduct() {
  const router = useRouter();
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const [comments, setComments] = useState<IComment[]>([]);

  const [offset, setOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const limit = 10;
  const { id } = router.query;
  const [view, setView] = useState<string>("Endpoint");
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Dashboard",
      breadCrumbPath: "/api_discovery",
    },
  ];
  const getApiComments = async (aco: string, limit: number, offset: number) => {
    setIsLoadingComments(true);
    try {
      const res = await APIServices.getCommentsByApiCode(aco, limit, offset);
      if (res.statusCode === 200) {
        setIsLoadingComments(false);
        setComments(res.data.list);
        const count = Math.ceil(res.data.count / limit);
        setPageCount(count);
      }
      // setLoading(false);
    } catch (error: any) {
      // setLoading(false);
      setIsLoadingComments(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  useEffect(() => {
    if (id) {
      getApiComments(id as string, limit, offset);
      setSidebar("api");
      setLoading(false);
    }
  }, [id]);

  return (
    <>
      <ApiLayout>
        <Navbar title={id as string} />
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={id as string}
        />
        <div className="border-t-[1px] border-light-grey p-5">
          <div className="flex  items-center w-full justify-between">
            <div className="hidden md:flex items-center gap-3">
              <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Endpoint"
                    ? "text-primary border-primary"
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Endpoint");
                }}
              >
                <p>Endpoint</p>
              </div>
              {/* <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Documentation"
                    ? "text-primary border-primary "
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Documentation");
                }}
              >
                <p>Documentation</p>
              </div> */}
              <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Feedback"
                    ? "text-primary border-primary"
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Feedback");
                }}
              >
                <p>Feedbacks & Discussions</p>
              </div>
              <div
                className={`w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 hover:border-primary rounded-xl hover:text-primary ${
                  view === "Pricing"
                    ? "text-primary border-primary"
                    : "text-mid-grey border-mid-grey"
                }  bg-transparent border-[1px]`}
                onClick={() => {
                  setView("Pricing");
                }}
              >
                <p>Pricing</p>
              </div>
            </div>
            <div className="w-fit h-fit cursor-pointer px-5 py-2 ease-in-out duration-700 border-[1px] border-mid-grey  rounded-xl  bg-transparent border-[1px]">
              <select className="border-none outline-none">
                <option value="version-1"> Version 1</option>
              </select>
            </div>
          </div>
          <div className="my-5">
            {view === "Endpoint" ? <EndpointView /> : null}
            {/* {view === "Documentation" ? <DocumentationView /> : null} */}
            {view === "Feedback" ? (
              <>
                <FeedbackView
                  isLoading={isLoadingComments}
                  feedbacks={comments}
                  // commentButtonDisplay
                  // getComments={getApiComments}
                />
              </>
            ) : null}
            {view === "Pricing" ? <PriceView /> : null}
          </div>
        </div>
      </ApiLayout>
    </>
  );
}
