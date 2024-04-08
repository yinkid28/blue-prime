import { MdAdd } from "react-icons/md";
import FeedbackCard from "./feedbackCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FeedBackCardDetails from "./feedbackDetails";
import { useApi } from "@/context/ApiDiscoveryContext";
import Link from "next/link";
import dynamic from "next/dynamic";
// @ts-ignore
const SwaggerEditor = dynamic(() => import("swagger-editor"), {
  ssr: false,
});
// import SwaggerEditor from "";

import "swagger-editor/dist/swagger-editor.css";
import yaml from "js-yaml";
import SwaggerUI from "swagger-ui-react";
export type IMockFeedback = {
  name: string;
  comment: string;
  replies: number;
};

export default function DocumentationView() {
  const { api } = useApi();

  const [jsonData, setJsonData] = useState<any>({});
  useEffect(() => {
    // This effect runs once on component mount
    window.MonacoEnvironment = {
      baseUrl: `${document.baseURI || window.location.href}dist/`,
    };
  }, []);

  useEffect(() => {
    fetch("/files/swagger.yaml") // Adjust the path if your YAML file is located elsewhere
      .then((response) => response.text())
      .then((yamlText) => {
        const data: any = yaml.load(yamlText);
        setJsonData(data);
      })
      .catch((error) => console.error("Error fetching YAML:", error));
  }, []);
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between">
      <div className="w-full md:w-[65%]">
        <p className="text-sm mb-3 text-primary">{api?.category}</p>
        <p className="text-sm ">README</p>
        <div className="w-full">
          <SwaggerUI
            url={
              "https://raw.githubusercontent.com/quaddss52/portfoliomain/main/public/documents/output-onlineyamltools.txt?token=GHSAT0AAAAAACHJAWWBOO23R3OIDGPKDIZGZQTW2HQ"
            }
          />
        </div>
      </div>
      <div className="md:w-[35%] w-full flex justify-end">
        <div className="p-2 rounded-lg border-mid-grey h-fit border-[1px] bg-light-grey flex flex-col  gap-2">
          <p className="text-primary font-semibold">Resources and links</p>
          <Link href={"#"} className="text-dark-grey text-sm">
            https://www.dnncw8h,com/dju/djvb
          </Link>
        </div>
      </div>
    </div>
  );
}
