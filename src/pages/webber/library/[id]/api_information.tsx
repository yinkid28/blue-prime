import Navbar from "@/components/Layout/Nav/navbar";
import {
  ApiInformationView,
  DocumentationView,
} from "@/components/Weaver/apiInformationComponents";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import APIServices from "@/services/api_services/api_service";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// remember to use static generation here but for now we will use context to get current api
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export default function ApiOverview() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const { id } = router.query;
  const { loading, setLoading, setSidebar, setApiErrorMessage } =
    useOnboarding();
  useEffect(() => {
    setLoading(false);
    setSidebar("apiProgressWeaver");
  }, []);
  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: "/webber/library",
    },
  ];

  const [apiInfoView, setApiInfoView] = useState<string>("api-information");
  const getApi = async (aco: string) => {
    try {
      const res = await APIServices.getSingleApiDev(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setApi(res.data);
        // setSandBoxurl(res.data.endpointConfig.sandbox_endpoints.url);
        // setProdurl(res.data.endpointConfig.production_endpoints.url);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  return (
    <>
      <WeaverLayout>
        <Navbar title={`${api?.name}`} />
        {/* Fix the breadcrumbs before commiting. Use the commented code in api_manager.tsx as a guide */}
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-API Information`}
        />
        {/* CONTENT */}
        <div className="mx-4 my-6">
          {/* VIEW CONTROLLERS */}
          <div className="flex gap-2 rounded mb-4">
            <div
              className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer ${
                apiInfoView === "api-information" &&
                "text-primary border-primary"
              }`}
              onClick={() => setApiInfoView("api-information")}
            >
              API Information
            </div>
            <div
              className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer hidden ${
                apiInfoView === "documentation" && "text-primary border-primary"
              }`}
              onClick={() => setApiInfoView("documentation")}
            >
              Documentation
            </div>
          </div>

          {/* API INFORMATION VIEW */}
          {apiInfoView === "api-information" && ApiInformationView()}
          {apiInfoView === "documentation" && DocumentationView()}
        </div>
      </WeaverLayout>
    </>
  );
}
