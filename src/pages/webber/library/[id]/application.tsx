
// import React from 'react'
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiMenuKebab } from "react-icons/ci";
import { UseToastOptions, useToast } from "@chakra-ui/react";
import { getFormattedDate } from "@/helper_utils/helpers";
import APIServices from "@/services/api_services/api_service";
import AddApp from "@/components/modals/addApp";

const AdminLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

type TableRowProps = {
  name: string;
  tokenQuota: string;
  renewDate: string;
  
 
};

type Application = {
  name: string;
  tokenQuota: string;
  renewDate: string;
};

const toastProps: UseToastOptions = {
  description: "successfully copied",
  status: "success",
  isClosable: true,
  duration: 800,
  position: "bottom-right",
};

export default function Application() {
  const toast = useToast();
  const { api, setApi } = useApi();
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { loading, setLoading, setSidebar, setApiErrorMessage } =
    useOnboarding();
  const [copied, setCopied] = useState<boolean>(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);

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



  function handleCopied() {
    navigator.clipboard
      .writeText("http://www.codehow.com/specs")
      .then(() => {
        setCopied(true);
        toast({ ...toastProps });
        setTimeout(() => setCopied(false), 800);
      })
      .catch((err) => {
        console.error("Error copying text to clipboard");
      });
  }

  return (
    <>
      <AdminLayout>
        <Navbar title={`Library`} />
        <BreadCrumbs
          breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`Application`}
        />
        <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-0 gap-6">
            <div className="flex items-center border rounded-lg w-[40%] py-2 px-4 gap-1">
              <Icon
                icon="lets-icons:search-alt-light"
                className="text-mid-grey text-2xl"
              />
              <input
                type="search"
                placeholder="Search"
                className="text-base font-semibold focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-3 lg:gap-6 lg:items-end">
              <div className="flex flex-col items-start sm:flex-row gap-[10px] sm:items-center whitespace-nowrap">
                <p>Base URL</p>
                <div className="flex items-center gap-2">
                  <div className="text-primary">
                    {api?.endpointConfig?.production_endpoints?.url
                      ? api?.endpointConfig?.production_endpoints?.url
                      : api?.endpointConfig?.sandbox_endpoints?.url
                      ? api?.endpointConfig?.sandbox_endpoints?.url
                      : ""}
                  </div>
                  <div onClick={handleCopied} className="cursor-pointer">
                    {copied ? (
                      <Icon icon="mdi-light:check" />
                    ) : (
                      <Icon
                        className="text-[#A4AAB2]"
                        icon="ion:copy-outline"
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={onOpen}
                className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit"
              >
                Add New App
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-mid-grey font-semibold">Applications</h3>
            {isLoadingApps ? (
              <p>Loading applications...</p>
            ) : applications.length > 0 ? (
              <Table>
                <Table.Header>
                  <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                    Application Name
                  </th>
                  <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                    Token Quota
                  </th>
                  <th className="w-1/5 px-6 py-2">Status</th>
                  <th className="w-1/5 px-6 py-2 whitespace-nowrap">
                     Date Added
                  </th>
                  <th className="w-[5%] px-6 py-2">Actions</th>
                </Table.Header>
                <Table.Body
                  data={applications}
                  render={(data: Application, index: number) => {
                    console.log("Rendering row:", data);
                    return (
                      <TableRow
                        name={data.name}
                        tokenQuota={data.tokenQuota}
                        renewDate={data.renewDate}
                        key={index}
                      />
                    );
                  }}
                />
              </Table>
            ) : (
              <p>No applications found.</p>
            )}
          </div>
        </div>

        <AddApp isOpen={isOpen} onClose={onClose} />
      </AdminLayout>
    </>
  );
}

function TableRow({ name, tokenQuota, renewDate }: TableRowProps) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <tr>
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 text-sm border-t">{tokenQuota}</td>
      <td className="px-6 py-4 text-sm border-t">{renewDate}</td>
      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton onClick={() => console.log(name)}>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" minH={"0"} h={"70px"}>
            <MenuItem
              onClick={() =>
                router.push(`/webber/library/${id}/application/${name}`)
              }
            >
              <p>View Details</p>
            </MenuItem>
            <MenuItem>
              <p>Cancel Subscription</p>
            </MenuItem>
            <MenuItem>
              <p>Edit Application</p>
            </MenuItem>
            <MenuItem>
              <p>Delete Application</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}





















// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Layout/Nav/navbar";
// import { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
// import { useApi } from "@/context/ApiDiscoveryContext";
// import { useOnboarding } from "@/context/OnboardingContext";
// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { Icon } from "@iconify/react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
// import { CiMenuKebab } from "react-icons/ci";
// import { UseToastOptions, useToast } from "@chakra-ui/react";
// // import { getFormattedDate } from "@/helper_utils/helpers";
// import APIServices from "@/services/api_services/api_service";
// import AddApp from "@/components/modals/addApp";

// const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
//   ssr: false,
// });

// type TableRowProps = {
  // name: string;
  // renewDate: string;
  // tokenQuota: string;
//   onDelete: (name: string) => void;
  
// };

// type Application = {
//   name: string;
//   renewDate: string;
//   tokenQuota: string;
// };

// const toastProps: UseToastOptions = {
//   description: "successfully copied",
//   status: "success",
//   isClosable: true,
//   duration: 800,
//   position: "bottom-right",
// };

// export default function Application() {
//   const toast = useToast();
//   const { api, setApi } = useApi();
//   const router = useRouter();
//   const { id } = router.query;
//   const { isOpen, onClose, onOpen } = useDisclosure();
//   const { loading, setLoading, setSidebar, setApiErrorMessage } =
//     useOnboarding();
//   const [copied, setCopied] = useState<boolean>(false);
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [isLoadingApps, setIsLoadingApps] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);



//   useEffect(() => {
//     setLoading(false);
//     setSidebar("apiProgressWeaver");
//   }, []);

//   // useEffect(() => {
//   //   if (id) {
//   //     // getApi(id as string);
//   //     getAllApplications();
//   //   }
//   // }, [id]);

//   useEffect(() => {
//     getAllApplications();
//   }, [])

//   useEffect(() => {
//     console.log("Current applications state:", applications);
//   }, [applications]);


//   const breadCrumbs: BreadCrumbItems[] = [
//     {
//       breadCrumbText: "Library",
//       breadCrumbPath: "/webber/library",
//     },
//   ];

  

//   const getFormattedDate = (dateString: string) => {
//     const date = new Date(dateString);
    
//     if (isNaN(date.getTime())) {
//       console.error('Invalid date:', dateString);
//       return 'Invalid Date';
//     }
  
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;
//   };

//   const getAllApplications = async () => {
//     setIsLoadingApps(true);
//     setError(null);
//     try {
//       const res = await APIServices.getWebberAllApplications();
//       if (res.statusCode === 200 && res.data && Array.isArray(res.data.list)) {
//         const formattedApplications = res.data.list.map((app: any) => ({
//           name: app.name,
//           tokenQuota: app.throttlingPolicy || "N/A",
//           renewDate: app.createdTime ? getFormattedDate(app.createdTime) : "N/A",
//         }));
//         setApplications(formattedApplications);
//         if (formattedApplications.length === 0) {
//           setError("No applications found.");
//         }
//       } else {
//         throw new Error("Invalid response structure");
//       }
//     } catch (error: any) {
     
//       const errorMessage =
//         error?.response?.data?.message;
//       setError(errorMessage);
//       setApiErrorMessage(errorMessage, "error");
//     } finally {
//       setIsLoadingApps(false);
//     }
//   };

//   useEffect(() => {
//     const filtered = applications.filter(app =>
//       app.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredApplications(filtered);
//   }, [searchTerm, applications]);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const deleteApplication = async (appco: string) => {
//     setLoading(true);
//     const id = appco;
//     try {
//       const response = await APIServices.deleteWebberApplication(appco);
//       if (response.statusCode === 200) {
//         setLoading(false);
//         toast({
//           title: "Delete Application",
//           description: "Application successfully deleted",
//           duration: 3000,
//           position: "bottom-right",
//         });
//         // getAllApplications(); 
//       }
//     } catch (error: any) {
//       setLoading(false);
//       const errorMessage = error?.response?.data?.message;
//       setApiErrorMessage(errorMessage, "error");
//     }
//   };


//   function handleCopied() {
//     navigator.clipboard
//       .writeText("http://www.codehow.com/specs")
//       .then(() => {
//         setCopied(true);
//         toast({ ...toastProps });
//         setTimeout(() => setCopied(false), 800);
//       })
//       .catch((err) => {
//         console.error("Error copying text to clipboard");
//       });
//   }

//   return (
//     <>
//       <WeaverLayout>
//         <Navbar title={`Library`} />
//         <BreadCrumbs
//           breadCrumbItems={breadCrumbs}
//           breadCrumbActiveItem={`Application`}
//         />
//         <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh]">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-0 gap-6">
//             <div className="flex items-center border rounded-lg w-[40%] py-2 px-4 gap-1">
//               <Icon
//                 icon="lets-icons:search-alt-light"
//                 className="text-mid-grey text-2xl"
//               />
  
//               <input
//                 type="search"
//                 placeholder="Search"
//                 className="text-base font-semibold focus:outline-none w-full"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>

//             <div className="flex flex-col gap-3 lg:gap-6 lg:items-end">
//               <div className="flex flex-col items-start sm:flex-row gap-[10px] sm:items-center whitespace-nowrap">
//                 <p>Base URL</p>
//                 <div className="flex items-center gap-2">
//                   <div className="text-primary">
//                     {api?.endpointConfig?.production_endpoints?.url
//                       ? api?.endpointConfig?.production_endpoints?.url
//                       : api?.endpointConfig?.sandbox_endpoints?.url
//                       ? api?.endpointConfig?.sandbox_endpoints?.url
//                       : ""}
//                   </div>
//                   <div onClick={handleCopied} className="cursor-pointer">
//                     {copied ? (
//                       <Icon icon="mdi-light:check" />
//                     ) : (
//                       <Icon
//                         className="text-[#A4AAB2]"
//                         icon="ion:copy-outline"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={onOpen}
//                 className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit"
//               >
//                 Add New App
//               </button>
//             </div>
//           </div>

//           <div>
//             <h3 className="mb-4 text-mid-grey font-semibold">Applications</h3>
//             {isLoadingApps ? (
//               <p>Loading applications...</p>
//             ) : filteredApplications.length > 0 ? (
//               <Table>
//                 <Table.Header>
//                   <th className="w-1/5 px-6 py-2 whitespace-nowrap">
//                     Application Name
//                   </th>
//                   <th className="w-1/5 px-6 py-2 whitespace-nowrap">
//                     Token Quota
//                   </th>

//                   <th className="w-1/5 px-6 py-2 whitespace-nowrap">
//                      Date Added
//                   </th>
//                   <th className="w-[5%] px-6 py-2">Actions</th>
//                 </Table.Header>
//                 <Table.Body
//             data={filteredApplications}
//             render={(data: Application, index: number) => {
//               console.log("Rendering row:", data);
//               return (
//                 <TableRow
//                   name={data.name}
//                   tokenQuota={data.tokenQuota}
//                   renewDate={data.renewDate}
//                   onDelete={deleteApplication}
//                   key={index}
//                 />
//               );
//             }}
//           />
//               </Table>
//             ) : (
//               <p>No applications found.</p>
//             )}
//           </div>
//         </div>

//         <AddApp isOpen={isOpen} onClose={onClose} />
//         </WeaverLayout>
//     </>
//   );
// }

// function TableRow({ name, tokenQuota, renewDate, onDelete }: TableRowProps) {
//   const router = useRouter();
//   const { id } = router.query;

//   return (
//     <tr>
//       <td className="px-6 py-4 text-sm border-t whitespace-nowrap">{name}</td>
//       <td className="px-6 py-4 text-sm border-t">{tokenQuota}</td>
//       <td className="px-6 py-4 text-sm border-t">{renewDate}</td>
//       <td className="px-6 py-4 text-sm border-t">
//         <Menu>
//           <MenuButton onClick={() => console.log(name)}>
//             <CiMenuKebab />
//           </MenuButton>
//           <MenuList minW="0" minH={"0"} h={"70px"}>
//             <MenuItem
//               onClick={() =>
//                 router.push(`/webber/library/${id}/application/${name}`)
//               }
//             >
//               <p>View Details</p>
//             </MenuItem>
//             <MenuItem>
//               <p>Cancel Subscription</p>
//             </MenuItem>
//             <MenuItem>
//               <p>Edit Application</p>
//             </MenuItem>
//             <MenuItem 
//             onClick={() => onDelete(name)}
//             >
//               <p>Delete Application</p>
//             </MenuItem>
//           </MenuList>
//         </Menu>
//       </td>
//     </tr>
//   );
// }




















// // import React from 'react'
// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Layout/Nav/navbar";
// import { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
// import { useApi } from "@/context/ApiDiscoveryContext";
// import { useOnboarding } from "@/context/OnboardingContext";
// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { Icon } from "@iconify/react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { CiMenuKebab } from "react-icons/ci";
// import { UseToastOptions, useToast } from "@chakra-ui/react";
// import { getFormattedDate } from "@/helper_utils/helpers";
// import APIServices from "@/services/api_services/api_service";
// import AddApp from "@/components/modals/addApp";

// const AdminLayout = dynamic(() => import("@/components/Layout/layout"), {
//   ssr: false,
// });

// type TableRowProps = {
//   name: string;
//   calls: string;
//   status: string;
//   renewDate: string;
// };

// type Application = {
//   name: string;
//   calls: number;
//   status: string;
//   renewDate: string;
// };

// const toastProps: UseToastOptions = {
//   description: "successfully copied",
//   status: "success",
//   isClosable: true,
//   duration: 800,
//   position: "bottom-right",
// };

// export default function Application() {
//   const toast = useToast();
//   const { api, setApi } = useApi();
//   const router = useRouter();
//   const { id } = router.query;
//   const { isOpen, onClose, onOpen } = useDisclosure();
//   const { loading, setLoading, setSidebar, setApiErrorMessage } =
//     useOnboarding();
//   const [copied, setCopied] = useState<boolean>(false);
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [isLoadingApps, setIsLoadingApps] = useState(true);

//   useEffect(() => {
//     setLoading(false);
//     setSidebar("apiProgressWeaver");
//   }, []);

//   useEffect(() => {
//     if (id) {
//       getApi(id as string);
//       getAllApplications();
//     }
//   }, [id]);

//   useEffect(() => {
//     console.log("Current applications state:", applications);
//   }, [applications]);

//   const breadCrumbs: BreadCrumbItems[] = [
//     {
//       breadCrumbText: "Library",
//       breadCrumbPath: "/webber/library",
//     },
//   ];

//   const getApi = async (aco: string) => {
//     try {
//       const res = await APIServices.getSingleApiDev(aco);
//       console.log("API Response:", res);
//       if (res.statusCode === 200) {
//         setApi(res.data);
//       }
//       setLoading(false);
//     } catch (error: any) {
//       setLoading(false);
//       const errorMessage = error?.response?.data?.message;
//       setApiErrorMessage(errorMessage, "error");
//     }
//   };

//   const getAllApplications = async () => {
//     setIsLoadingApps(true);
//     try {
//       const res = await APIServices.getWebberAllApplications();
//       console.log("getAllApplications Response:", res);
//       if (res.statusCode === 200 && res.data && Array.isArray(res.data.list)) {
//         const formattedApplications = res.data.list.map((app: any) => ({
//           name: app.name,
//           calls: app.requestCalls || 0,
//           status: app.status || "Unknown",
//           renewDate: app.renewDate ? getFormattedDate(app.renewDate) : "N/A",
//         }));
//         console.log("Formatted Applications:", formattedApplications);
//         setApplications(formattedApplications);
//       }
//     } catch (error: any) {
//       console.error("Error fetching applications:", error);
//       const errorMessage =
//         error?.response?.data?.message ||
//         "An error occurred while fetching applications";
//       setApiErrorMessage(errorMessage, "error");
//     } finally {
//       setIsLoadingApps(false);
//     }
//   };

//   function handleCopied() {
//     navigator.clipboard
//       .writeText("http://www.codehow.com/specs")
//       .then(() => {
//         setCopied(true);
//         toast({ ...toastProps });
//         setTimeout(() => setCopied(false), 800);
//       })
//       .catch((err) => {
//         console.error("Error copying text to clipboard");
//       });
//   }

//   return (
//     <>
//       <AdminLayout>
//         <Navbar title={`Library`} />
//         <BreadCrumbs
//           breadCrumbItems={breadCrumbs}
//           breadCrumbActiveItem={`Application`}
//         />
//         <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh]">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:gap-0 gap-6">
//             <div className="flex items-center border rounded-lg w-[40%] py-2 px-4 gap-1">
//               <Icon
//                 icon="lets-icons:search-alt-light"
//                 className="text-mid-grey text-2xl"
//               />
//               <input
//                 type="search"
//                 placeholder="Search"
//                 className="text-base font-semibold focus:outline-none w-full"
//               />
//             </div>

//             <div className="flex flex-col gap-3 lg:gap-6 lg:items-end">
//               <div className="flex flex-col items-start sm:flex-row gap-[10px] sm:items-center whitespace-nowrap">
//                 <p>Base URL</p>
//                 <div className="flex items-center gap-2">
//                   <div className="text-primary">
//                     {api?.endpointConfig?.production_endpoints?.url
//                       ? api?.endpointConfig?.production_endpoints?.url
//                       : api?.endpointConfig?.sandbox_endpoints?.url
//                       ? api?.endpointConfig?.sandbox_endpoints?.url
//                       : ""}
//                   </div>
//                   <div onClick={handleCopied} className="cursor-pointer">
//                     {copied ? (
//                       <Icon icon="mdi-light:check" />
//                     ) : (
//                       <Icon
//                         className="text-[#A4AAB2]"
//                         icon="ion:copy-outline"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={onOpen}
//                 className="border border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit"
//               >
//                 Add New App
//               </button>
//             </div>
//           </div>

//           <div>
//             <h3 className="mb-4 text-mid-grey font-semibold">Applications</h3>
//             {isLoadingApps ? (
//               <p>Loading applications...</p>
//             ) : applications.length > 0 ? (
//               <Table>
//                 <Table.Header>
//                   <th className="w-1/5 px-6 py-2 whitespace-nowrap">
//                     Application Name
//                   </th>
//                   <th className="w-1/5 px-6 py-2 whitespace-nowrap">
//                     Token Quota
//                   </th>
//                   <th className="w-1/5 px-6 py-2">Status</th>
//                   <th className="w-1/5 px-6 py-2 whitespace-nowrap">
//                      Date Added
//                   </th>
//                   <th className="w-[5%] px-6 py-2">Actions</th>
//                 </Table.Header>
//                 <Table.Body
//                   data={applications}
//                   render={(data: Application, index: number) => {
//                     console.log("Rendering row:", data);
//                     return (
//                       <TableRow
//                         name={data.name}
//                         calls={data.calls.toLocaleString()}
//                         status={data.status}
//                         renewDate={data.renewDate}
//                         key={index}
//                       />
//                     );
//                   }}
//                 />
//               </Table>
//             ) : (
//               <p>No applications found.</p>
//             )}
//           </div>
//         </div>

//         <AddApp isOpen={isOpen} onClose={onClose} />
//       </AdminLayout>
//     </>
//   );
// }

// function TableRow({ name, calls, status, renewDate }: TableRowProps) {
//   const router = useRouter();
//   const { id } = router.query;

//   return (
//     <tr>
//       <td className="px-6 py-4 text-sm border-t whitespace-nowrap">{name}</td>
//       <td className="px-6 py-4 text-sm border-t">{calls}</td>
//       <td className="px-6 py-4 text-sm border-t items-center">
//         <p
//           className={`rounded-full w-fit px-3  whitespace-nowrap
//             ${status === "Paid" && "bg-[#F0FFEB] text-[#298413]"}
//             ${status === "Awaiting Renewal" && " bg-[#fffecf] text-[#97930b]"}
//             ${status === "Failed" && " bg-[#ffe9e9] text-[#f13636]"}
//             `}
//         >
//           {status}
//         </p>
//       </td>
//       <td className="px-6 py-4 text-sm border-t">{renewDate}</td>
//       <td className="px-6 py-4 text-sm border-t">
//         <Menu>
//           <MenuButton onClick={() => console.log(name)}>
//             <CiMenuKebab />
//           </MenuButton>
//           <MenuList minW="0" minH={"0"} h={"70px"}>
//             <MenuItem
//               onClick={() =>
//                 router.push(`/webber/library/${id}/application/${name}`)
//               }
//             >
//               <p>View Details</p>
//             </MenuItem>
//             <MenuItem>
//               <p>Cancel Subscription</p>
//             </MenuItem>
//             <MenuItem>
//               <p>Edit Application</p>
//             </MenuItem>
//             <MenuItem>
//               <p>Delete Application</p>
//             </MenuItem>
//           </MenuList>
//         </Menu>
//       </td>
//     </tr>
//   );
// }
