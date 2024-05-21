import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import { BreadCrumbItems, BreadCrumbs } from "@/components/utils";
import dynamic from "next/dynamic";
import { useApi } from "@/context/ApiDiscoveryContext";
import CustomerJourneyCard from "@/components/Admin/CustomerJourneyCard";

const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});

const breadCrumbs: BreadCrumbItems[] = [
  {
    breadCrumbText: "API Product Management",
    breadCrumbPath: "/admin_back_office/api_product_management",
  },
];

export default function BusinessSolution() {
  const router = useRouter();
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  const { apiProduct } = useApi();

  useEffect(() => {
    setSidebar("ApiProductDetails");
    setLoading(false);
  }, []);

  //   const breadcrumbs[]

  return (
    <AdminLayout>
      <AdminNavbar title={apiProduct?.title as string} />
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={apiProduct?.title as string}
      />

      <div className="p-5">
        <div className="flex justify-between mb-4 items-center">
          <p className="font-semibold">Customer Journeys</p>

          <div
            className="border-2 border-primary text-primary text-sm font-semibold rounded-lg py-[10px] px-4 cursor-pointer"
            onClick={() =>
              router.push(
                "/admin_back_office/api_product_management/new_api_product"
              )
            }
          >
            Add New Customer Journey
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          <CustomerJourneyCard />
          <CustomerJourneyCard />
          <CustomerJourneyCard />
          <CustomerJourneyCard />
          <CustomerJourneyCard />
          <CustomerJourneyCard />
          <CustomerJourneyCard />
          <CustomerJourneyCard />
          <CustomerJourneyCard />
        </div>
      </div>
    </AdminLayout>
  );
}
