import Navbar from "@/components/Layout/Nav/navbar";
import ApiInfomationView from "@/components/Webber/CreateAPI/apiProgress/ApiInformationView";
import { BreadCrumbs } from "@/components/utils";
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
export default function ApiRuntime() {
  const { api } = useApi();
  const router = useRouter();
  const [view, setView] = useState<string>("info");
  const [file, setFile] = useState<any>(null);
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
    console.log(file);

    setFile(file as FileType);
  };

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
          breadCrumbActiveItem={`${api?.title}-Runtime`}
        />
        <div className="p-5 flex flex-col w-full md:flex-row gap-3">
          <div className="border border-light-grey w-full rounded-lg p-5 flex flex-col gap-3">
            <p className=" text-dark-grey"> Response</p>
            <p className="text-xs text-dark-grey"> Transport Level Security</p>
            <Checkbox>HTTP</Checkbox>
            <Checkbox>HTTPS</Checkbox>
            <Checkbox>Add SSL</Checkbox>
            <p className="text-xs text-dark-grey">
              {" "}
              Application Level Security
            </p>
            {!file ? (
              <div className="h-[150px] w-full md:w-[60%] rounded-lg  border-[2px] border-light-grey border-dashed flex items-center justify-center p-3 ">
                <input
                  type="file"
                  ref={hiddenFileInputTwo}
                  placeholder="click"
                  accept=""
                  onChange={(e) => handleChangeTwo(e)}
                  style={{ display: "none" }}
                />
                <button
                  className="flex flex-col gap-3 items-center justify-center w-full h-full rounded-lg text-mid-grey"
                  onClick={(e) => {
                    handleClickTwo(e);
                  }}
                >
                  <IoCloudUploadOutline />
                  <p className="text-sm font-semibold ">Add Cerificate</p>
                  {/* <p className="text-sm font-semibold ">JSON, X-YAML, YAML</p> */}
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center w-full border-[1px] border-[#E2E8F0] border-solid h-fit p-3 rounded-lg">
                {/* <Image
                src="/icons/csvFileIcon.svg"
                alt="uploadIcon"
                w={35}
                h={35}
              /> */}
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="">
                      <p className="font-[500] text-sm">{file?.name}</p>
                      <p className="text-sm">
                        {(file?.size / (1024 * 1024)).toFixed(4)} MB
                      </p>
                    </div>
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setFile(null)}
                      className="cursor-pointer"
                    >
                      <path
                        d="M10.666 3.66667L10.0878 11.7617C10.038 12.4594 9.45738 13 8.75786 13H3.24084C2.54132 13 1.96073 12.4594 1.9109 11.7617L1.33268 3.66667M4.66602 6.33333V10.3333M7.33268 6.33333V10.3333M7.99935 3.66667V1.66667C7.99935 1.29848 7.70087 1 7.33268 1H4.66602C4.29783 1 3.99935 1.29848 3.99935 1.66667V3.66667M0.666016 3.66667H11.3327"
                        stroke="#4A5568"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <p className="text-xs text-dark-grey"> CORS Configuration</p>
              <Switch size={"sm"} />
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-xs text-dark-grey"> Schema Validation</p>
              <Switch size={"sm"} />
            </div>
          </div>
          <div className="border border-light-grey w-full rounded-lg p-5 flex flex-col gap-3">
            <p className=" text-dark-grey"> Backend</p>
            <p className="text-xs text-dark-grey">
              {" "}
              Maximum Backend Throughput
            </p>
            <Checkbox>Unlimited</Checkbox>
            <Checkbox>Custom</Checkbox>
            {/* <Checkbox>Add SSL</Checkbox> */}
            <p className="text-xs text-dark-grey"> Endpoint</p>

            <div className="flex gap-2 items-center">
              <p className="text-xs font-bold text-dark-grey">
                {" "}
                Production Endpoint
              </p>
              <p className="text-xs  text-dark-grey">
                https://loacalhost:8494/pg/sample/opinions
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-xs font-bold text-dark-grey">
                {" "}
                Sandbox Endpoint
              </p>
              <p className="text-xs  text-dark-grey">
                https://loacalhost:8494/pg/sample/opinions
              </p>
            </div>
          </div>
        </div>
      </WebberLayout>
    </>
  );
}
