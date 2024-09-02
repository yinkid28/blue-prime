import Navbar from "@/components/Layout/Nav/navbar";
import CreateRevision from "@/components/modals/createRevisionModal";
import DeployRevision from "@/components/modals/deployRevision";
import { toTitleCase } from "@/components/utils";
import { BreadCrumbs } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IApi, IRevision } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

// remember to use static generation here but for now we will use context to get current api
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

type TableRowProps = {
  revision: IRevision;
  onOpen: () => void;
  setSelectedRevision: Dispatch<SetStateAction<IRevision | undefined>>;
  getRevisions: (aco: string) => void;
};

export default function Deploy() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const { apiCode } = router.query;
  const toast = useToast();
  const { loading, setLoading } = useOnboarding();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpenDeploy,
    isOpen: isOpenDeploy,
    onClose: onDeployClose,
  } = useDisclosure();
  const [revisions, setRevisions] = useState<IRevision[]>([]);
  const [selectedRivision, setSelectedRevision] = useState<IRevision>();
  const [isLoadingRevisions, setIsLoadingRevisions] = useState<boolean>(false);
  const { setApiErrorMessage } = useOnboarding();
  useEffect(() => {
    setLoading(false);
  }, []);

  const getApiRevisions = async (aco: string) => {
    setIsLoadingRevisions(true);
    try {
      const res = await APIServices.getApiRevisions(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setIsLoadingRevisions(false);

        setRevisions(res.data.list);
        // setLifeStatus(res.data.lifeCycleStatus.toLowerCase());
        // handleLifeCycle(res.data.lifeCycleStatus);
      }
      // setLoading(false);
    } catch (error: any) {
      setIsLoadingRevisions(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const getApi = async (aco: string) => {
    try {
      const res = await APIServices.getSingleApi(aco);
      if (res.statusCode === 200) {
        setApi(res.data);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  useEffect(() => {
    if (apiCode) {
      getApiRevisions(apiCode as string);
      getApi(apiCode as string);
    }
  }, [apiCode]);
  const handleEndpointConfigCheck = (api: IApi) => {
    if (
      api.endpointConfig?.sandbox_endpoints ||
      api.endpointConfig?.production_endpoints
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Deploy`}
        />
        <div className="flex flex-col-reverse md:flex-row md:justify-between p-5 h-[80dvh] md:h-fit -translate-y-60 md:-translate-y-0">
          <div className="rounded-lg border overflow-scroll w-full md:w-[75%] gap-2">
            {isLoadingRevisions ? (
              <Skeleton w={"100%"} h={10} />
            ) : (
              <table className="w-full ">
                <thead className="bg-[#f8f8f8] text-mid-grey rounded-lg">
                  <tr className="text-left text-sm">
                    <th className="w-1/4 px-6 py-2">Name</th>
                    <th className="w-1/4 px-6 py-2">Description</th>
                    <th className="w-1/4 px-6 py-2">Deployment Status</th>

                    <th className="w-[5%] px-6 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {revisions.map((data, index) => (
                    <TableRow
                      key={index}
                      revision={data}
                      onOpen={onOpenDeploy}
                      setSelectedRevision={setSelectedRevision}
                      getRevisions={getApiRevisions}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="w-full md:w-[25%] flex justify-end mb-3 md:mb-0">
            <button
              className="flex gap-2 items-center rounded-lg text-primary h-fit border-2 w-[25%] md:w-[80%] border-light-grey py-2 justify-center"
              onClick={() => {
                if (revisions.length === 5) {
                  toast({
                    title: "Create Revision",
                    description:
                      "You have reached a maximum of 5 revisions per API, kindly delete one before proceeding",
                    status: "error",
                    position: "bottom-right",
                    duration: 3000,
                  });
                  return;
                }
                if (!handleEndpointConfigCheck) {
                  toast({
                    title: "Create Revision",
                    description:
                      "Ensure you have provided either a sandbox or production url before creating a revision",
                    status: "error",
                    position: "bottom-right",
                    duration: 3000,
                  });
                  router.push(
                    `/weaver/api_details/${toTitleCase(
                      api!.name,
                      true
                    )}/endpoints?apiCode=${apiCode}`
                  );
                  return;
                }
                onOpen();
              }}
            >
              <p className="text-sm font-semibold tracking-normal">
                Create Revision
              </p>
            </button>
          </div>
        </div>
        <CreateRevision isOpen={isOpen} onClose={onClose} />
        <DeployRevision
          isOpen={isOpenDeploy}
          onClose={onDeployClose}
          revision={selectedRivision as IRevision}
          api={api as IApi}
        />
      </WebberLayout>
    </>
  );
}

// creating the table component in here for now!
function TableRow({
  revision,
  onOpen,
  setSelectedRevision,
  getRevisions,
}: TableRowProps) {
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  const { api, setApi } = useApi();
  const toast = useToast();
  const router = useRouter();
  const updateApiLifeCycle = async (
    aco: string,
    action: string,
    life?: string
  ) => {
    setLoading(true);
    // console.log(item);
    if (revision.deploymentInfo.length < 1) {
      setLoading(false);
      toast({
        title: "Publish",
        description:
          "You can not publish this revision as it is not deployed yet",
        position: "bottom-right",
        duration: 3000,
        status: "error",
      });
      return;
    }

    if (api) {
      const { apiCode, customerCode, ...restApiProps } = api;

      try {
        const res = await APIServices.updateApiLifeCycle(aco, action, life);

        if (res.statusCode === 200) {
          // setLoading(false);
          // updateStatusCycle();
          // setStatus(item.toLowerCase());

          toast({
            title: "Publish Revision",
            description: "You have successfully published this revision",
            duration: 3000,
            status: "success",
            position: "bottom-right",
          });
          // getApi(apiCode as string);
          router.reload();
        }
      } catch (error: any) {
        setLoading(false);
        const errorMessage = error?.response?.data?.message;
        setApiErrorMessage(errorMessage, "error");
      }
    }
  };
  const deleteRevisions = async (aco: string, rco: string) => {
    setLoading(true);
    try {
      const res = await APIServices.deleteApiRevision(aco, rco);
      console.log(res);
      if (res.statusCode === 200) {
        setLoading(false);
        toast({
          title: "Revisions",
          description: "You have successfully deleted this revision",
          position: "bottom-right",
          duration: 3000,
          status: "success",
        });
        await getRevisions(api?.apiCode as string);
        // setRevisions(res.data.list);
        // setLifeStatus(res.data.lifeCycleStatus.toLowerCase());
        // handleLifeCycle(res.data.lifeCycleStatus);
      }
      // setLoading(false);
    } catch (error: any) {
      setLoading(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  return (
    <tr>
      <td className="px-6 py-4 text-sm border-t whitespace-nowrap sm:whitespace-pre-wrap">
        {revision.displayName}
      </td>
      <td className="px-6 py-4 text-sm border-t">{revision.description}</td>
      <td className="px-6 py-4 text-sm border-t">
        {revision.deploymentInfo.length > 0 ? "Deployed" : "Not Deployed"}
      </td>

      <td className="px-6 py-4 text-sm border-t">
        <Menu>
          <MenuButton>
            <CiMenuKebab />
          </MenuButton>
          <MenuList minW="0" w={"128px"} className="space-y-3 text-sm">
            <MenuItem
              onClick={() => {
                setSelectedRevision(revision);
                onOpen();
              }}
            >
              {revision.deploymentInfo.length > 0 ? "Undeploy" : "Deploy"}
            </MenuItem>
            <MenuItem
            // onClick={() =>
            //   // updateApiLifeCycle(api?.apiCode as string, "Publish")
            // }
            >
              Request Publishing
            </MenuItem>
            {/* <MenuItem>Restore</MenuItem> */}
            <MenuItem
              onClick={() => {
                deleteRevisions(api?.apiCode as string, revision.revisionCode);
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}
