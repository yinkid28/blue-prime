import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useToast,
  Switch,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { DeployRevisionDto, IApi, IRevision } from "@/models/api.model";
import { useRouter } from "next/router";
import APIServices from "@/services/api_services/api_service";
import { useOnboarding } from "@/context/OnboardingContext";
import { useEffect, useState } from "react";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  api: IApi;
  revision: IRevision;
};
export default function DeployRevision({
  isOpen,
  onClose,
  api,
  revision,
}: addEndpointModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deployName, setDeployname] = useState<string>("Default");
  const [vhost, setVhost] = useState<string>("localhost");
  const [displayOnDevportal, setDisplayOnDevportal] = useState<boolean>(false);
  const { setApiErrorMessage } = useOnboarding();
  const toast = useToast();
  const deployRevivision = async (aco: string, rco: string) => {
    setLoading(true);
    try {
      const data: DeployRevisionDto[] = [
        {
          name: deployName,
          vhost,
          displayOnDevportal,
        },
      ];
      const response = await APIServices.deployRevision(data, aco, rco);
      if (response.statusCode === 201) {
        setLoading(false);

        toast({
          title: "Revision",
          description: "Revision successfully deployed",
          duration: 3000,
          position: "bottom-right",
          status: "success",
        });
        router.reload();
      }
    } catch (error: any) {
      setLoading(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const undeployRevivision = async (aco: string, rco: string) => {
    setLoading(true);
    try {
      const data: DeployRevisionDto[] = [
        {
          name: deployName,
          vhost,
          displayOnDevportal,
        },
      ];
      const response = await APIServices.undeployRevision(data, aco, rco);
      if (response.statusCode === 201) {
        setLoading(false);

        toast({
          title: "Revision",
          description: "Revision successfully undeployed",
          duration: 3000,
          position: "bottom-right",
          status: "success",
        });
        router.reload();
      }
    } catch (error: any) {
      setLoading(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  useEffect(() => {
    if (revision?.deploymentInfo.length > 0) {
      setDisplayOnDevportal(revision.deploymentInfo[0].displayOnDevportal);
    }
    console.log(revision);
  }, [revision]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          {revision?.deploymentInfo.length > 0
            ? "Undeploy Revision"
            : "Deploy Revision"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Name</p>
              <input
                placeholder="name"
                name="name"
                id="name"
                disabled
                value={deployName}
                // onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Gateway Url</p>
              <select
                className="w-full bg-transparent border-none outline-none"
                value={vhost}
                onChange={(e) => setVhost(e.target.value)}
              >
                <option value="localhost">Localhost</option>
              </select>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex  gap-2">
              <p className="text-xs text-dark-grey">Display on Dev Portal</p>
              <Switch
                // value={displayOnDevportal}
                disabled={revision?.deploymentInfo.length > 0}
                onChange={(e) => setDisplayOnDevportal(e.target.checked)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex justify-end gap-3">
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-light-grey  text-dark-grey font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-primaryFade text-primary font-semibold"
              onClick={() => {
                if (revision?.deploymentInfo.length > 0) {
                  undeployRevivision(api?.apiCode, revision?.revisionCode);
                } else {
                  deployRevivision(api?.apiCode, revision?.revisionCode);
                }
              }}
            >
              {loading ? <Spinner size={"sm"} /> : "Confirm"}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
