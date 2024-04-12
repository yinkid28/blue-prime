import Navbar from "@/components/Layout/Nav/navbar";
import ApiInfomationView from "@/components/Webber/CreateAPI/apiProgress/ApiInformationView";
import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { FileType } from "@/models/apidiscovery.model";
import { Checkbox, Spinner, Switch } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiProgressEndpoints() {
  const { api } = useApi();
  const router = useRouter();
  const [view, setView] = useState<string>("info");

  const { loading, setLoading } = useOnboarding();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.title}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.title}-Endpoints`}
        />
        <div className="p-5">
          <div className="p-5 flex flex-col w-full gap-3 border border-light-grey rounded-lg">
            <div className="flex flex-col w-full md:flex-row gap-3">
              <div className="w-full rounded-lg p-5 flex flex-col gap-3">
                <p className=" text-dark-grey">Endpoint</p>

                <Checkbox>HTTP/REST Endpoint</Checkbox>
                <Checkbox>Service Endpoint</Checkbox>
                <Checkbox>HTTP/SOAP Endpoint</Checkbox>
                <Checkbox>Dynamic Endpoint</Checkbox>
                <Checkbox>Mock Implementation</Checkbox>
                <Checkbox>AWS Lambda</Checkbox>
              </div>
              <div className="w-full rounded-lg p-5 flex flex-col gap-3">
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Production Endpoint</p>
                  <input
                    type="text"
                    name="prodendpoint"
                    placeholder="https://loacalhost:8494/pg/sample/opinions"
                    className="outline-none bg-transparent"
                  />
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Sandbox Endpoint</p>
                  <input
                    type="text"
                    name="sandendpoint"
                    placeholder="https://loacalhost:8494/pg/sample/opinions"
                    className="outline-none bg-transparent"
                  />
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">
                    General Endpoint Configuration
                  </p>
                  <select
                    name="apiCat"
                    id="apiCat"
                    className="border-none outline-none"
                  >
                    <option value="">Choose a Configuration</option>
                    {/* <option value="entertainment">Entertainment</option> */}
                  </select>
                </div>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">
                    Load Balance and Fallover Configuration
                  </p>
                  <select
                    name="apiCat"
                    id="apiCat"
                    className="border-none outline-none"
                  >
                    <option value="">Choose a Configuration</option>
                    {/* <option value="entertainment">Entertainment</option> */}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center w-full justify-end gap-2 md:flex-row flex-col-reverse">
              <button className="border-primaryFade border rounded-lg w-fit px-5 py-2 text-primary">
                Reset
              </button>
              <Button text="Save" onClick={() => {}} type="fit" />
            </div>
          </div>
        </div>
      </WebberLayout>
    </>
  );
}
