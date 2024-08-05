import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner, useDisclosure } from "@chakra-ui/react";
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
export default function ApiDefinition() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const { apiCode } = router.query;
  const [view, setView] = useState<string>("info");
  const [code, setCode] = useState(JSON.stringify(SwaggerDefault));
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [revisions, setRevisions] = useState<IRevision[]>([]);
  const [swagger, setSwagger] = useState<any>();
  const [deployedrevisions, setDeployedRevisions] = useState<IRevision[]>([]);

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
    if (deployedrevisions) {
      console.log(deployedrevisions[0]?.id);
      getApiSwagger(deployedrevisions[0]?.id);
    }
  }, [deployedrevisions]);

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

  const handleEndpointConfigCheck = (api: IApi) => {
    if (api.endpointConfig) {
      return true;
    } else {
      return false;
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

  useEffect(() => {
    setLoading(false);
  }, []);
  const hightlightWithLineNumbers = (input: string, language: any) =>
    highlight(input, language)
      .split("\n")
      .map(
        (line: string, i: number) =>
          `<span class='editorLineNumber'>${i + 1}</span>${line}`
      )
      .join("\n");

  async function loadAndParseYaml(url: string) {
    const response = await fetch(url);
    const text = await response.text();
    return yaml.load(text);
  }
  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.name}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.name}-Endpoints`}
        />
        <div className="p-5 overflow-y-scroll h-[80vh] ">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
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
