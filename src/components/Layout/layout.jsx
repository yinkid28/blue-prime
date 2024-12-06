import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import Sidebar from "../Layout/sidebars/sidebar";  // Ensure the path is correct

export default function Layout({ children, page, subPageText, secondaryElement }) {
  const toast = useToast();

  // Simulated error handling (replace with actual context data if needed)
  const errorMessage = null; // Example
  const errorStatus = "error"; // Example
  const setApiErrorMessage = () => {}; // Example

  useEffect(() => {
    if (errorMessage) {
      toast({
        description: errorMessage,
        status: errorStatus || "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    return () => {
      setApiErrorMessage(null);
    };
  }, [errorMessage, errorStatus, setApiErrorMessage, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[195px_1fr] h-screen font-inter gap-2 bg-[#F5F5F5]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col h-full overflow-scroll pt-5 sm:pt-8 gap-5 w-full">
        {/* Header */}
        <div className="flex items-center px-3 justify-between w-full">
          <div className="font-bold text-[32px]">
            {page}
            {subPageText && <span>{subPageText}</span>}
          </div>
          <div className="flex gap-3">
            {/* SearchBar (if needed later) */}
            <SearchBar />
            {secondaryElement}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-5 rounded-tl-xl shadow-lg flex-grow flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
