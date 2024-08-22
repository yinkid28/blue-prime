import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "swagger-ui-react/swagger-ui.css";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false, // Disable server-side rendering for this component
});
import yaml from "js-yaml";
import { useRouter } from "next/router";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function EndpointView() {
  const router = useRouter();
  const { id } = router.query;
  // const [jsonData, setJsonData] = useState<any>({});
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
  //       setJsonData(data);
  //     })
  //     .catch((error) => console.error("Error fetching YAML:", error));
  // }, []);
  return (
    <div className="">
      {/* <SwaggerUI url={"https://104.40.209.29:443/files/output-online.yaml"} /> */}
      {/* for testing purpoosees remove after */}
      <SwaggerUI
        url={`${BASE_URL}/api-manager/api/v1/apim-api/get-trimmed-api-swagger-definition?aco=${id}`}
      />
    </div>
  );
}
