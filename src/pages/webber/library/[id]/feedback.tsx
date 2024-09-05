import Navbar from "@/components/Layout/Nav/navbar";
import FeedbackView from "@/components/apiDiscovery/feedbackView";
import GlobalPagination, {
  BreadCrumbItems,
  BreadCrumbs,
} from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IComment } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export default function WeaverFeedback() {
  const [comments, setComments] = useState<IComment[]>([]);
  const { api, setApi } = useApi();
  const { loading, setLoading, setApiErrorMessage, setSidebar } =
    useOnboarding();

  const router = useRouter();
  const { id } = router.query;
  const [view, setView] = useState<string>("Overview");
  const [offset, setOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const limit = 10;
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/webber/library",
    },
  ];
  const getApiComments = async (aco: string, limit: number, offset: number) => {
    setIsLoadingComments(true);
    try {
      const res = await APIServices.getWebberCommentsByApiCode(
        aco,
        limit,
        offset
      );
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
    }
  }, [id]);

  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);
  return (
    <WeaverLayout>
      <Navbar title={`${api?.name}`} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.name}-Consumption Rate`}
      />
      {/* CONTENT */}
      <div className="p-5">
        <FeedbackView
          isLoading={isLoadingComments}
          feedbacks={comments}
          commentButtonDisplay
          canReply
          // getComments={getApiComments}
        />
        {/* <GlobalPagination
        onPageClick={handlePageClick}
        pageCount={pageCount <= 1 ? 1 : pageCount}
      /> */}
      </div>
    </WeaverLayout>
  );
}
