import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Switch,
  Checkbox,
  useDisclosure,
  RadioGroup,
  Radio,
  Select,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { GiPadlock } from "react-icons/gi";
import AddEndpointModal from "@/components/modals/addEndpointModal";
import AddTagModal from "@/components/modals/addTagModal";
import { ImockTag } from "./test";
import APIServices from "@/services/api_services/api_service";
import {
  DeployRevisionDto,
  IApi,
  IPolicy,
  IRevision,
  SwaggerOperation,
  SwaggerParam,
} from "@/models/api.model";
import { FaCircleMinus } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import DeleteEndpointModal from "@/components/modals/deleteEndpoint";
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export type ImockEndpoint = {
  id: number;
  method: string;
  url: string;
  description: string;
  criteria?: { name: string; description: string };
};

type RequestMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

type ApiOperation = {
  tags?: string[];
  operationId?: string;
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  security?: any[];
  [key: string]: any; // Allow additional properties
};

type ApiPathItem = {
  [method in RequestMethod]?: ApiOperation;
};

type ApiPaths = {
  [path: string]: ApiPathItem;
};
function getUniqueTags(apiPaths: ApiPaths): string[] {
  const tagSet = new Set<string>();

  for (const path in apiPaths) {
    const pathItem = apiPaths[path];
    for (const method in pathItem) {
      const operation = pathItem[method as RequestMethod];

      // Check if operation is defined before proceeding
      if (operation) {
        // If the tags property is missing, create it and assign ["*"]
        if (!operation.tags) {
          operation.tags = ["*"];
        }

        // Add the tags to the Set to ensure uniqueness
        operation.tags.forEach((tag) => tagSet.add(tag));
      }
    }
  }

  return Array.from(tagSet);
}

export default function ApiModules() {
  const { api } = useApi();
  const router = useRouter();
  const toast = useToast();
  const { apiCode } = router.query;
  const [view, setView] = useState<string>("");
  const [view2, setView2] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<ImockTag>();
  const { loading, setLoading, setApiErrorMessage } = useOnboarding();
  const [swagger, setSwagger] = useState<any>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [swaggerPaths, setTags] = useState<string[]>([]);
  const [operationsWithPath, setOperationsWithPath] = useState<any>();
  const [operations, setOperations] = useState<any[]>([]);
  const [selectedoperation, setSelectedOperation] = useState<any>();
  const [overallPolicy, setOverallPolicy] = useState<string>("Unlimited");
  const [policies, setPolicies] = useState<IPolicy[]>([]);
  const [policyLevel, setPolicyLevel] = useState<string>("api");
  const [revisions, setRevisions] = useState<IRevision[]>([]);
  const [current, setCurrent] = useState<string>(apiCode as string);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isTagOpen,
    onOpen: onTagOpen,
    onClose: onTagClose,
  } = useDisclosure();
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
  function getOperationsByTag(apiPaths: ApiPaths, tag: string) {
    const operations = [];

    // Iterate over each path in the apiPaths object
    for (const path in apiPaths) {
      const pathItem = apiPaths[path];

      // Iterate over each method within the current path
      for (const method in pathItem) {
        // Ensure the method is a valid RequestMethod and convert it to lowercase
        const methodLower = method.toLowerCase() as RequestMethod;

        // Retrieve the operation associated with the current method
        const operation = pathItem[methodLower];

        // Check if the operation exists and includes the specified tag
        if (operation && operation.tags && operation.tags.includes(tag)) {
          operations.push({
            path,
            method: methodLower,
            operation,
          });
        }
      }
    }

    return operations;
  }
  const getApiSwagger = async (aco: string) => {
    try {
      const res = await APIServices.getApiSwaggerDefition(aco);
      if (res.statusCode === 200) {
        setSwagger(res.data);
        const paths = getUniqueTags(res.data.paths);
        setView(paths[0]);
        setTags(paths);
        setOperationsWithPath(res.data.paths);
        setOperations(getOperationsByTag(res.data.paths, paths[0]));
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const getOutofTheBoxPolicies = async (policyLevel: string) => {
    try {
      const res = await APIServices.getOutofTheBoxPolicies(policyLevel, 0, 25);
      if (res.statusCode === 200) {
        setPolicies(res.data.list);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  const getApiRevisions = async (aco: string) => {
    // setIsLoadingRevisions(true);
    try {
      const res = await APIServices.getApiRevisions(aco);
      console.log(res);
      if (res.statusCode === 200) {
        // setIsLoadingRevisions(false);

        setRevisions(res.data.list);
        // setLifeStatus(res.data.lifeCycleStatus.toLowerCase());
        // handleLifeCycle(res.data.lifeCycleStatus);
      }
      // setLoading(false);
    } catch (error: any) {
      // setIsLoadingRevisions(false);

      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  const addEndpoint = (
    data: SwaggerOperation,
    swaggerPath: string,
    requestMethod: string,
    endpointPath: string
  ) => {
    setView(swaggerPath);
    const updatedOperations = { ...operationsWithPath };
    updatedOperations[endpointPath] = { [requestMethod]: data };
    setOperationsWithPath(updatedOperations);
    const newOps = getOperationsByTag(updatedOperations, swaggerPath);
    console.log(newOps, "change");

    // Set the new operations to state
    setOperations(newOps);
  };
  const removeEndpoint = (swaggerPath: string, requestMethod: string) => {
    setView(view);
    console.log(swaggerPath, "heheheheheh");
    const updatedOperations = { ...operationsWithPath };
    const getoperation = updatedOperations[swaggerPath];
    const { [requestMethod]: _, ...rest } = getoperation;

    const finals = getOperationsByTag(updatedOperations, view).filter(
      (item) => item.method !== requestMethod
    );
    setOperations(finals);
    setOperationsWithPath((prev: any) => {
      return {
        ...prev,
        [swaggerPath]: rest,
      };
    });
    toast({
      description:
        "Endpoint Removed, ensure you save your changes before you proceed",
      duration: 3000,
      position: "bottom-right",
      status: "success",
    });
    onDeleteClose();
  };
  const addPath = (path: string) => {
    if (swaggerPaths.includes(path)) {
      toast({
        description: "Tag already exists, Kindly use another name",
        status: "warning",
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }
    setTags([...swaggerPaths, path]);
    // setOperationsWithPath(existingPath);
  };
  useEffect(() => {
    getOutofTheBoxPolicies(policyLevel === "api" ? "api" : "subscription");
  }, [policyLevel]);
  const handleInputChange = (
    index: number,
    item: any,
    path: string,
    method: string,
    event?: any,
    valuer?: any
  ) => {
    const name = event?.target?.name || ""; // Safely access name
    const value = event?.target?.value || ""; // Safely access value

    const inputs = [...item.parameters];
    inputs[index] = { ...inputs[index], [name]: valuer || value };
    const updatedOperations = { ...operationsWithPath };
    updatedOperations[path][method].parameters = inputs;
    const newOps = getOperationsByTag(updatedOperations, item.tags[0]);
    console.log(newOps, "change");
    setOperations(newOps);
    // setData((prev) => ({
    //   ...prev,
    //   parameters: inputs,
    // }));
  };
  const addnewParemeter = (
    event: React.FormEvent, // Assuming you're using React
    item: any,
    path: string,
    method: string
  ) => {
    event.preventDefault();

    const updatedOperations = { ...operationsWithPath };
    // console.log(path);
    const operation = updatedOperations[path][method];
    console.log(operation);
    // Initialize parameters array if it doesn't exist
    if (!operation.parameters) {
      operation.parameters = [];
    }

    // Add the new parameter
    operation.parameters.push({
      name: "",
      in: "",
      required: false,
      style: "",
      explode: true,
      schema: {
        type: "form",
      },
    });

    console.log(updatedOperations, "while adding");
    const newOps = getOperationsByTag(updatedOperations, item.tags[0]);
    console.log(newOps, "change");

    // Set the new operations to state
    setOperations(newOps);
    // Uncomment and complete the setData call if necessary
    // setData(prev => ({
    //   ...prev,
    //   parameters: [...prev.parameters, /* New parameter here */],
    // }));
  };

  const handleOperationChange = (
    event: any, // Assuming you're using React
    item: any,
    path: string,
    method: string
  ) => {
    event.preventDefault();

    // Destructure operationsWithPath for immutability and better React state management
    const updatedOperations = { ...operationsWithPath };

    // Get the specific operation
    const operation = updatedOperations[path][method];

    // Update the operation with the new value from the event
    operation[event.target.name] = event.target.value;

    // Log the updated operations for debugging
    console.log(updatedOperations, "while handling operations");

    // Get updated operations by tag
    const newOps = getOperationsByTag(updatedOperations, item.tags[0]);
    console.log(newOps, "change");

    // Set the new operations to state
    setOperations(newOps);
  };
  const removeParameter = (
    index: number,
    item: any,
    path: string,
    method: string
  ) => {
    const updatedOperations = { ...operationsWithPath };
    const operation = updatedOperations[path][method];
    console.log(operation);
    // Initialize parameters array if it doesn't exist
    if (!operation.parameters) {
      operation.parameters = [];
    }

    operation.parameters.splice(index, 1);
    const newOps = getOperationsByTag(updatedOperations, item.tags[0]);
    console.log(newOps, "change");

    // Set the new operations to state
    setOperations(newOps);
  };
  const updateSwaggerDocument = async (aco: string, deploy?: boolean) => {
    if (!handleEndpointConfigCheck(api as IApi)) {
      toast({
        description:
          "Ensure you have configured your endpoints before carrying out this action",
        duration: 3000,
        position: "bottom-right",
        status: "error",
      });
    }
    setIsUpdating(true);
    const data = {
      ...swagger,
      paths: operationsWithPath,
    };
    if (policyLevel === "api") {
      data["x-throttling-tier"] = overallPolicy;
    }
    const fin = JSON.stringify(data);

    try {
      console.log(data);
      const res = await APIServices.updateApiSwaggerDefinition(fin, aco);
      console.log(res);
      if (res.statusCode === 200) {
        if (deploy) {
          await createRevision(aco);
        }
        toast({
          description:
            "Api successfully updated, ensure you deploy a new revision before you test again",
          position: "bottom-right",
          duration: 3000,
          status: "success",
        });
      }
      setLoading(false);
      setIsUpdating(false);
    } catch (error: any) {
      setIsUpdating(false);
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const updateRevisionSwaggerDocument = async (
    aco: string,
    deploy?: boolean
  ) => {
    setIsUpdating(true);
    const data = {
      ...swagger,
      paths: operationsWithPath,
    };
    if (policyLevel === "api") {
      data["x-throttling-tier"] = overallPolicy;
    }
    const fin = JSON.stringify(data);

    try {
      console.log(data);
      const res = await APIServices.updateRevisionSwaggerDefinition(fin, aco);
      console.log(res);
      if (res.statusCode === 200) {
        if (deploy) {
          await createRevision(aco);
        }
        toast({
          description: "Api definition successfully updated",
          position: "bottom-right",
          duration: 3000,
          status: "success",
        });
      }
      setLoading(false);
      setIsUpdating(false);
    } catch (error: any) {
      setIsUpdating(false);
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const getRevisionSwagger = async (aco: string) => {
    try {
      const res = await APIServices.getRevisionSwaggerDefition(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setSwagger(res.data);
        const paths = getUniqueTags(res.data.paths);
        setView(paths[0]);
        setTags(paths);
        setOperationsWithPath(res.data.paths);
        setOperations(getOperationsByTag(res.data.paths, paths[0]));
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const deployRevivision = async (aco: string, rco: string) => {
    setLoading(true);
    try {
      const data: DeployRevisionDto[] = [
        {
          name: "Default",
          vhost: "localhost",
          displayOnDevportal: true,
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
  const createRevision = async (apiCode: string) => {
    setLoading(true);
    const data = { description: "updated Revision" };
    try {
      const res = await APIServices.createRevision(data, apiCode);
      if (res.statusCode === 201) {
        setLoading(false);
        await deployRevivision(apiCode, res.data.revisionCode);
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  useEffect(() => {
    if (apiCode) {
      // getApiSwagger(apiCode as string);
      setCurrent(apiCode as string);
      getApiRevisions(apiCode as string);
    }
  }, [apiCode]);

  useEffect(() => {
    console.log(operations, "state");
  }, [operations]);
  useEffect(() => {
    if (current) {
      if (current.includes("API")) {
        getApiSwagger(apiCode as string);
      } else {
        getRevisionSwagger(current);
      }
    }
  }, [current, apiCode]);

  return (
    <WebberLayout>
      <Navbar title={`${api?.name}`} />
      <div className="flex items-center  justify-between">
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Module`}
        />

        <div className="w-[30%]">
          <Select value={current} onChange={(e) => setCurrent(e.target.value)}>
            <option value={apiCode}>Current API</option>
            {revisions?.map((item, index) => (
              <option value={item.revisionCode} key={index}>
                {item.displayName}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row bg-white items-center p-3 rounded-lg ">
        <div className="w-full flex flex-col gap-2">
          <p className="font-semibold text-xl">Resources Configuration</p>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-mid-grey">Rate limiting level</p>

            <div className="flex gap-2 items-center">
              <RadioGroup
                onChange={(e) => {
                  setPolicyLevel(e);
                }}
                value={policyLevel}
              >
                <div className="flex item-center gap-3">
                  <Radio value="api">API Level</Radio>
                  <Radio value="operation">Operation Level</Radio>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="w-full">
          {policyLevel === "api" ? (
            <Select
              value={overallPolicy}
              onChange={(e) => setOverallPolicy(e.target.value)}
            >
              <option value="">Rate Limiting Policies</option>
              {policies?.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </Select>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-sm">
                You may change the rate limiting policies per operation
              </p>
              <p className="font-semibold text-xs">
                Expand an operation below to select a rate limiting policy for
                an operation
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3 p-5 justify-between">
        <div className="w-full md:w-[20%] flex flex-col gap-2">
          <div className="w-full text-mid-grey items-center border-bottom-[1px] border-light-grey py-2 flex justify-between">
            <p className="">API Tags</p>
            <MdAdd className="cursor-pointer" onClick={onTagOpen} />
          </div>
          <div className="w-full lg:h-[80vh] overflow-scroll bg-light-grey rounded text-mid-grey flex flex-col gap-1">
            {swaggerPaths.map((item, index) => (
              <div
                className={`px-3 py-1 flex hover:bg-[#F8F8F8] ${
                  view === item ? "bg-[#F8F8F8]" : "bg-transparent"
                } items-center gap-2 cursor-pointer`}
                key={index}
                onClick={() => {
                  setView(item);
                  // setSelectedTag(item);

                  const newPaths = getOperationsByTag(operationsWithPath, item);
                  setOperations(newPaths);
                }}
              >
                {view === item ? <FaChevronDown /> : <FaChevronRight />}
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-[80%]  flex flex-col gap-2">
          <div className="py-2 flex items-center justify-end ">
            <button
              className="border-primaryFade px-3 font-semibold py-1 rounded-lg w-fit flex items-center gap-2 text-primary border"
              onClick={onOpen}
            >
              <MdAdd />
              <p className="text-sm">Add Endpoint</p>
            </button>
          </div>
          <div className="flex lg:h-[80vh] overflow-scroll  flex-col gap-2">
            <Accordion allowToggle>
              {operations.map((item, index) => (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            className={`${
                              item.method.toUpperCase() === "POST"
                                ? "bg-success"
                                : item.method.toUpperCase() === "DELETE"
                                ? "bg-error"
                                : item.method.toUpperCase() === "GET"
                                ? "bg-info"
                                : "bg-warning"
                            } w-fit h-fit px-5 py-2 text-white rounded-lg`}
                          >
                            {item.method.toUpperCase()}
                          </button>
                          <div className="flex items-start flex-col gap-1">
                            <p className="text-sm font-semibold text-mid-grey">
                              {item?.path}
                            </p>
                            <p className="text-xs font-semibold text-dark-grey">
                              {item.operation.description || ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <LuTrash2
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOperation(item);
                              onDeleteOpen();
                            }}
                          />
                          <AccordionIcon />
                        </div>
                      </div>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <div className="flex w-full flex-col items-center gap-2">
                      <div className="flex w-full flex-col gap-2">
                        <p className="text-mid-grey text-sm font-semibold">
                          Description
                        </p>
                        <div className="flex flex-col gap-2 md:flex-row">
                          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                            <p className="text-xs text-dark-grey">
                              Description
                            </p>
                            <textarea
                              placeholder="Describe your Endpoint"
                              name="description"
                              id="endpointDescription"
                              rows={5}
                              value={item.operation.description || ""}
                              onChange={(e) => {
                                handleOperationChange(
                                  e,
                                  item.operation,
                                  item?.path,
                                  item.method
                                );
                              }}
                            ></textarea>
                          </div>
                          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                            <p className="text-xs text-dark-grey">Summary</p>
                            <textarea
                              placeholder="Describe your Endpoint"
                              name="summary"
                              id="endpointDescription"
                              rows={5}
                              value={item.operation.summary || ""}
                              onChange={(e) => {
                                handleOperationChange(
                                  e,
                                  item.operation,
                                  item?.path,
                                  item.method
                                );
                              }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <p className="text-mid-grey text-sm font-semibold">
                          Operation Governance
                        </p>
                        {/* <div className="flex items-center gap-2">
                          <p className="text-mid-grey text-sm">Security</p>
                          <Switch size="sm" />
                        </div> */}
                        <p className="text-xs text-dark-grey">
                          {" "}
                          Rate limiting policy
                        </p>
                        {policyLevel === "operation" ? (
                          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                            <select
                              name="x-throttling-tier"
                              id="rateLimit"
                              className="border-none outline-none"
                              value={item.operation["x-throttling-tier"]}
                              onChange={(e) =>
                                handleOperationChange(
                                  e,
                                  item.operation,
                                  view,
                                  item.method
                                )
                              }
                            >
                              <option value="">Choose a policy</option>
                              {policies?.map((item, index) => (
                                <option key={index} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="">
                            <p className="text-sm font-semibold">
                              Rate limiting is governed by API level
                            </p>
                          </div>
                        )}
                        {/* <div className="flex flex-col md:flex-row items-center gap-2">
                          <div className="md:w-[80%] w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                            <p className="text-xs text-dark-grey">
                              {" "}
                              Rate limiting policy
                            </p>
                            <select
                              name="rateLimit"
                              id="rateLimit"
                              className="border-none outline-none"
                            >
                              <option value="">Choose a policy</option>
                              <option value="entertainment">finance</option>
                            </select>
                          </div>
                          <button className="border-primaryFade px-3 font-semibold py-1 rounded-lg w-fit flex items-center gap-2 text-primary border">
                            <MdAdd />
                            <p className="text-sm">Add New Scope</p>
                          </button>
                        </div> */}
                      </div>
                      <div className="w-full rounded-lg   flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-mid-grey">
                            Parameters
                          </p>
                          <Button
                            type="fit"
                            text="add"
                            onClick={(e) => {
                              addnewParemeter(
                                e,
                                item.operation,
                                item.path,
                                item.method
                              );
                            }}
                          />
                        </div>
                        {item.operation.parameters?.map(
                          (it: SwaggerParam, index: number) => (
                            <div
                              className="flex w-full justify-between items-end gap-2"
                              key={index}
                            >
                              <div className="flex flex-col gap-1">
                                <p className="text-xs font-semibold text-mid-grey">
                                  Name
                                </p>
                                <input
                                  type="text"
                                  name="name"
                                  className="p-1 rounded-lg border-[1px] border-solid gorder-mid-grey"
                                  value={it.name}
                                  onChange={(e: any) =>
                                    handleInputChange(
                                      index,
                                      item.operation,
                                      item.path,
                                      item.method,
                                      e
                                    )
                                  }
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-xs font-semibold text-mid-grey">
                                  Type
                                </p>
                                <select
                                  name="in"
                                  id="requestMethod"
                                  className="border-none outline-none"
                                  value={it.in}
                                  onChange={(e: any) =>
                                    handleInputChange(
                                      index,
                                      item.operation,
                                      item.path,
                                      item.method,
                                      e
                                    )
                                  }
                                >
                                  <option value="">Choose Param Type</option>
                                  <option value="query">Query</option>
                                  <option value="header">Header</option>
                                  <option value="cookie">Cookie</option>
                                  {item.method !== "get" &&
                                    item.method !== "delete" && (
                                      <option value="body">Body</option>
                                    )}
                                  {/* <option value="DELETE">DELETE</option> */}
                                </select>
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-xs font-semibold text-mid-grey">
                                  {" "}
                                  Data Type
                                </p>
                                <select
                                  name="schema"
                                  id="requestMethod"
                                  className="border-none outline-none"
                                  value={it.schema.type}
                                  onChange={(e: any) =>
                                    handleInputChange(
                                      index,
                                      item.operation,
                                      item.path,
                                      item.method,
                                      e,
                                      { type: e.target.value }
                                    )
                                  }
                                >
                                  <option value="">Choose Data Type</option>
                                  <option value="integer">Integer</option>
                                  <option value="number">Number</option>
                                  <option value="string">String</option>
                                  <option value="boolean">Boolean</option>
                                  {it.in === "Body" && (
                                    <option value="object">Object</option>
                                  )}
                                  {/* <option value="DELETE">DELETE</option> */}
                                </select>
                              </div>

                              <FaCircleMinus
                                className="text-red-600 cursor-pointer"
                                onClick={() =>
                                  removeParameter(
                                    index,
                                    item.operation,
                                    item.path,
                                    item.method
                                  )
                                }
                              />
                              {/* <div className="flex flex-col gap-1">
                    <Checkbox onChange={(e) => handleInputChange(index, e)}>
                      {" "}
                      Required
                    </Checkbox>
                  </div> */}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="justify-end my-5 flex w-full">
            <Menu>
              <MenuButton>
                <Button
                  type="fit"
                  text="Save"
                  onClick={() => {}}
                  loading={isUpdating}
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    if (current.includes("API")) {
                      updateSwaggerDocument(apiCode as string);
                    } else {
                      updateRevisionSwaggerDocument(current);
                    }
                  }}
                >
                  Save
                </MenuItem>
                {/* <MenuItem
                  onClick={() => {
                    if (current.includes("API")) {
                      updateSwaggerDocument(apiCode as string, true);
                    } else {
                      updateRevisionSwaggerDocument(current, true);
                    }
                  }}
                >
                  Save & Deploy
                </MenuItem> */}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
      <AddEndpointModal
        isOpen={isOpen}
        onClose={onClose}
        addEndpoint={addEndpoint}
        swaggerPaths={swaggerPaths}
        policyLevel={policyLevel}
        policies={policies}
      />
      <DeleteEndpointModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        deleteEndpoint={() => {
          removeEndpoint(selectedoperation.path, selectedoperation.method);
        }}
      />
      <AddTagModal isOpen={isTagOpen} onClose={onTagClose} addPath={addPath} />
    </WebberLayout>
  );
}
