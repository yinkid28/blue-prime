import MainSidebar from "../sidebars/mainsidebar";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};
export default function DiscoveryLayout({ children }: LayoutProps) {
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
}
