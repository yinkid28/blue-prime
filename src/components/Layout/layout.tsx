import { useOnboarding } from "@/context/OnboardingContext";

import MainSidebar from "./sidebars/mainsidebar";
import ApiProductSidebar from "./sidebars/apiProductSidebar";
import { useApi } from "@/context/ApiDiscoveryContext";
import { IMockApi } from "@/models/apidiscovery.model";
import WebberSidebar from "./sidebars/webberSidebar";
import ApiProgressSidebar from "./sidebars/apiProgressSideBar";

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
          <div className="">
            <MainSidebar />
          </div>

          <div className="bg-white rounded-t overflow-y-scroll">{children}</div>
        </div>
      );
    case "api":
      return (
        <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[25%_1fr]  gap-2 bg-light-grey p-2">
          <div className="">
            <ApiProductSidebar api={api as IMockApi} />
          </div>

          <div className="bg-white rounded-t overflow-y-scroll">{children}</div>
        </div>
      );
    case "apiProgress":
      return (
        <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[20%_1fr]  gap-2 bg-light-grey p-2">
          <div className="">
            <ApiProgressSidebar api={api as IMockApi} />
          </div>

          <div className="bg-white rounded-t overflow-y-scroll">{children}</div>
        </div>
      );
    case "webber":
      return (
        <div className="grid grid-cols-1 font-urban h-screen md:grid-cols-[20%_1fr]  gap-2 bg-light-grey p-2">
          <div className="">
            <WebberSidebar />
          </div>

          <div className="bg-white rounded-t overflow-y-scroll">{children}</div>
        </div>
      );

    default:
      break;
  }
}
