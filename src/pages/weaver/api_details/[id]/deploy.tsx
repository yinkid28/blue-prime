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
};

export default function Deploy() {
  const { api } = useApi();
  const router = useRouter();
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
  const { setApiErrorMessage } = useOnboarding();
  useEffect(() => {
    setLoading(false);
  }, []);

  const getApiRevisions = async (aco: string) => {
    try {
      const res = await APIServices.getApiRevisions(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setRevisions(res.data.list);
        // setLifeStatus(res.data.lifeCycleStatus.toLowerCase());
        // handleLifeCycle(res.data.lifeCycleStatus);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  useEffect(() => {
    if (api) {
      getApiRevisions(api.apiCode);
    }
  }, [api]);

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
                  />
                ))}
              </tbody>
            </table>
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
function TableRow({ revision, onOpen, setSelectedRevision }: TableRowProps) {
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
                if (revision.deploymentInfo.length > 0) {
                  console.log("Undeploy");
                } else {
                  setSelectedRevision(revision);
                  onOpen();
                }
              }}
            >
              {revision.deploymentInfo.length > 0 ? "Undeploy" : "Deploy"}
            </MenuItem>
            <MenuItem>Publish</MenuItem>
            <MenuItem>Restore</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
}
