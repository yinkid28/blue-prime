import AdminNavbar from "@/components/Layout/Nav/adminNavbar";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const AdminLayout = dynamic(() => import("@/components/Layout/adminLayout"), {
  ssr: false,
});
export default function CategoryManager() {
  const { setSidebar, loading, setLoading, setApiErrorMessage } =
    useOnboarding();
  useEffect(() => {
    setSidebar("categoryManager");
    setLoading(false);
  }, []);
  return (
    <AdminLayout>
      <AdminNavbar title="Category Management" />
      <BreadCrumbs breadCrumbActiveItem="Category Management" />
      <div className="p-5">Category Management , hello</div>
    </AdminLayout>
  );
}
