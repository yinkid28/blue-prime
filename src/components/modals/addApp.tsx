import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import APIServices from "@/services/api_services/api_service";
import { useOnboarding } from "@/context/OnboardingContext";
import { useApi } from "@/context/ApiDiscoveryContext";
import { createApplication } from "@/models/api.model";
import { useState } from "react";

interface addAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddApp({ isOpen, onClose }: addAppProps) {
  const { setApiErrorMessage, setLoading } = useOnboarding();
  const { api, setApi } = useApi();
  const [state, setState] = useState<createApplication>({
    name: "",
    throttlingPolicy: "",
    description: "",
    tokenType: "JWT",
    groups: [],
    attributes: {},
    subscriptionScopes: [],
  });
  const { name, throttlingPolicy, description } = state;
  const toast = useToast();
  const createApplication = async () => {
    setLoading(true);

    const data: createApplication = state;
    console.log(data, "damnn");
    try {
      const res = await APIServices.createApplication(data);
      if (res.statusCode === 201) {
        console.log(res);
        subscribeApplication(
          api?.apiCode as string,
          res.data.throttlingPolicy,
          res.data.appCode
        );
        // setSandBoxurl(res.data.endpointConfig.sandbox_endpoints.url);
        // setProdurl(res.data.endpointConfig.production_endpoints.url);
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const subscribeApplication = async (
    aco: string,
    thrott: string,
    appco: string
  ) => {
    try {
      const res = await APIServices.subscribeApptoApi(aco, thrott, appco);
      console.log(res, "damnn");
      if (res.statusCode === 201) {
        toast({
          description:
            "You have successfully created an application on this api",
          position: "bottom-right",
          status: "success",
          duration: 3000,
        });
      }
      setLoading(false);
      onClose();
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const handlechange = (e: any) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Add Application
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <p className="my-3">Input details of your website</p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs">
                Application Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="New App"
                value={name}
                onChange={handlechange}
                className="border-mid-grey p-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="throttlingPolicy" className="text-xs">
                Shared Token Quota
              </label>
              <select
                className="border-mid-grey p-2 border rounded-md"
                name="throttlingPolicy"
                id="throttlingPolicy"
                value={throttlingPolicy}
                onChange={handlechange}
              >
                <option value={"10PerMin"}>10 per min</option>
                <option value={"20PerMin"}>20 per min</option>
                <option value={"50PerMin"}>50 per min</option>
                <option value={"Unlimited"}>Unlimited</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-xs">
                Descriptions
              </label>
              <textarea
                rows={5}
                placeholder="description"
                name="description"
                value={description}
                onChange={handlechange}
              />
            </div>

            <Button
              text="Save"
              onClick={() => createApplication()}
              className="w-20 ml-auto mt-2"
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
