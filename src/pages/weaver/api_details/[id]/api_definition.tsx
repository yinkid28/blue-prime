import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import yaml from "js-yaml";
import APIServices from "@/services/api_services/api_service";
import { IApi, IRevision } from "@/models/api.model";
import { SwaggerDefault } from "../../../../../config";
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false, // Disable server-side rendering for this component
});
import "swagger-ui-react/swagger-ui.css";
import { IoCloudUploadOutline } from "react-icons/io5";
export default function ApiDefinition() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const toast = useToast();
  const { apiCode } = router.query;
  const [view, setView] = useState<string>("info");
  const [code, setCode] = useState(JSON.stringify(SwaggerDefault));
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [revisions, setRevisions] = useState<IRevision[]>([]);
  const [swagger, setSwagger] = useState<any>();
  const [deployedrevisions, setDeployedRevisions] = useState<IRevision[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const { loading, setLoading, setSidebar, setApiErrorMessage } =
    useOnboarding();
  useEffect(() => {
    // setLoading(false);
    if (apiCode) {
      getApi(apiCode as string);
      getApiRevisions(apiCode as string);
      getDeployedApiRevisions(apiCode as string);
      // getApiSwagger(apiCode as string);
      setSidebar("apiProgress");
    }
  }, [apiCode]);
  useEffect(() => {
    // if (deployedrevisions.length > 0) {
    //   getRevisionSwagger(deployedrevisions[0]?.revisionCode);
    // } else {
    // }
    getApiSwagger(apiCode as string);
  }, [deployedrevisions, apiCode]);

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

  const getApiRevisions = async (aco: string) => {
    try {
      const res = await APIServices.getApiRevisions(aco);
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
  const getApiSwagger = async (aco: string) => {
    try {
      const res = await APIServices.getApiSwaggerDefition(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setSwagger(res.data);
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
  const getRevisionSwagger = async (aco: string) => {
    try {
      const res = await APIServices.getRevisionSwaggerDefition(aco);
      console.log(res);
      if (res.statusCode === 200) {
        setSwagger(res.data);
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
  const getDeployedApiRevisions = async (aco: string) => {
    try {
      const res = await APIServices.getApiRevisions(aco, true);
      if (res.statusCode === 200) {
        setDeployedRevisions(res.data.list);
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
  const handleEndpointConfigCheck = (api: IApi) => {
    if (api.endpointConfig) {
      return true;
    } else {
      return false;
    }
  };
  const updateSwaggerDocument = async (aco: string, file: any) => {
    setIsUpdating(true);
    const fin = new FormData();
    fin.append("file", file);

    try {
      const res = await APIServices.updateApiSwaggerDefinitionFile(fin, aco);
      console.log(res);
      if (res.statusCode === 200) {
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
  const updateRevisionSwaggerDocument = async (aco: string, file: any) => {
    setIsUpdating(true);

    const fin = new FormData();
    fin.append("file", file);

    try {
      const res = await APIServices.updateRevisionSwaggerDefinition(fin, aco);
      console.log(res);
      if (res.statusCode === 200) {
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

  useEffect(() => {
    setLoading(false);
  }, []);
  const hightlightWithLineNumbers = (input: string, language: any) => {
    return highlight(input, language)
      .split("\n")
      .map(
        (line: string, i: number) =>
          `<span class='editorLineNumber'>${i + 1}</span>${line}`
      )
      .join("\n");
  };
  const hiddenFileInputTwo = useRef<HTMLInputElement>(null);

  const handleClickTwo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (hiddenFileInputTwo.current) {
      hiddenFileInputTwo.current?.click();
      // setFile(event.target.value);
    }
  };
  const handleChangeTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    setFile(file);
    updateSwaggerDocument(apiCode as string, file);
    // setDisabled(false);
    // setUrl("");
  };
  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Endpoints`}
        />
        <div className="flex items-center justify-end w-full">
          {" "}
          <div className="">
            <input
              type="file"
              ref={hiddenFileInputTwo}
              placeholder="click"
              accept=""
              onChange={(e) => handleChangeTwo(e)}
              style={{ display: "none" }}
            />
            <button
              className="flex gap-3 items-center w-fit  bg-primary border-[2px]   h-fit p-3 rounded-lg text-white"
              onClick={(e) => {
                handleClickTwo(e);
              }}
            >
              <IoCloudUploadOutline />
              <p className="text-sm font-semibold ">
                Upload file to update Api definition
              </p>
            </button>
          </div>
        </div>
        <div className="p-5 overflow-y-scroll h-[80vh] ">
          <Editor
            value={JSON.stringify(swagger)}
            onValueChange={(swagger) => setSwagger(swagger)}
            highlight={(swagger) =>
              swagger &&
              hightlightWithLineNumbers(
                JSON.stringify(swagger),
                languages.javascript
              )
            }
            padding={10}
            textareaId="codeArea"
            className="editor  bg-black  rounded-lg text-white"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
      </WebberLayout>
    </>
  );
}
