import { useOnboarding } from "@/context/OnboardingContext";

import MainSidebar from "./sidebars/mainsidebar";
import ApiProductSidebar from "./sidebars/apiProductSidebar";
import { useApi } from "@/context/ApiDiscoveryContext";
import { IMockApi } from "@/models/apidiscovery.model";
import WebberSidebar from "./sidebars/webberSidebar";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};
export default function ApiLayout({ children }: LayoutProps) {
  const { sidebar } = useOnboarding();
  const { api } = useApi();
  switch (sidebar) {
    case "":
      return (
        <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[20%_1fr]  gap-2 bg-light-grey p-2">
          {/* Sidebar components */}
          <div className="">
            <MainSidebar />
          </div>
          {/* main component */}
          <div className="bg-white rounded-t overflow-y-scroll">
            {/* Navbar component */}
            {/* children components */}
            {children}
          </div>
        </div>
      );
    case "api":
      return (
        <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[25%_1fr]  gap-2 bg-light-grey p-2">
          {/* Sidebar components */}
          <div className="">
            <ApiProductSidebar api={api as IMockApi} />
          </div>
          {/* main component */}
          <div className="bg-white rounded-t overflow-y-scroll">
            {/* Navbar component */}
            {/* children components */}
            {children}
          </div>
        </div>
      );
    case "webber":
      return (
        <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[20%_1fr]  gap-2 bg-light-grey p-2">
          {/* Sidebar components */}
          <div className="">
            <WebberSidebar />
          </div>
          {/* main component */}
          <div className="bg-white rounded-t overflow-y-scroll">
            {/* Navbar component */}
            {/* children components */}
            {children}
          </div>
        </div>
      );

    default:
      break;
  }
}
