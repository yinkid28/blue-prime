import Navbar from "@/components/Layout/Nav/navbar";
import FeedbackView from "@/components/apiDiscovery/feedbackView";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export default function WeaverFeedback() {
  const { api } = useApi();
  const { setLoading, setSidebar } = useOnboarding();

  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/weaver/library",
    },
  ];
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);
  return (
    <WeaverLayout>
      <Navbar title={`${api?.title}`} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${api?.title}-Consumption Rate`}
      />
      {/* CONTENT */}
      <div className="p-5">
        <FeedbackView commentButtonDisplay ratingButton />
      </div>
    </WeaverLayout>
  );
}
