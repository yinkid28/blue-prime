import { useState } from "react";
import { useApi } from "@/context/ApiDiscoveryContext";
import Link from "next/link";
import dynamic from "next/dynamic";

import yaml from "js-yaml";
import "swagger-ui-react/swagger-ui.css";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false, // Disable server-side rendering for this component
});
export type IMockFeedback = {
  name: string;
  comment: string;
  replies: number;
};

export default function DocumentationView() {
  const { api } = useApi();

  const [jsonData, setJsonData] = useState<any>({});
  // useEffect(() => {
  //   // This effect runs once on component mount
  //   window.MonacoEnvironment = {
  //     baseUrl: `${document.baseURI || window.location.href}dist/`,
  //   };
  // }, []);

  // useEffect(() => {
  //   fetch("/files/swagger.yaml") // Adjust the path if your YAML file is located elsewhere
  //     .then((response) => response.text())
  //     .then((yamlText) => {
  //       const data: any = yaml.load(yamlText);
  //       setJsonData(JSON.stringify(data));
  //     })
  //     .catch((error) => console.error("Error fetching YAML:", error));
  // }, []);
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between">
      <div className="w-full md:w-[65%]">
        <p className="text-sm mb-3 text-primary">{api?.categories[0]}</p>
        <p className="text-sm ">README</p>
        <div className="w-full">
          <SwaggerUI url={"https://104.40.209.29/files/output-online.yaml"} />
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
