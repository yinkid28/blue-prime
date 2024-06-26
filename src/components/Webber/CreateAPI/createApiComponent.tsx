import { Button } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { CreateAPI } from "@/models/api.model";
import { FileType } from "@/models/apidiscovery.model";
import APIServices from "@/services/api_services/api_service";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

type CreateProp = {
  setStep: Dispatch<SetStateAction<number>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setTitle: Dispatch<SetStateAction<string>>;
};
export function ApiInformation({ setStep, setProgress, setTitle }: CreateProp) {
  const [name, setName] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const toast = useToast();
  useEffect(() => {
    setTitle("Build API");
  });
  const handleNext = () => {
    if (name == "" || context == "" || version == "" || category == "") {
      toast({
        title: "Create API",
        description: "Kindly fill in all necessary details",
        status: "warning",
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }
    const obj = { name, version, category, context, description };
    localStorage.setItem("info1", JSON.stringify(obj));
    setStep(2);
    setProgress(100);
  };
  return (
    <div className="flex flex-col gap-3">
      {" "}
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Name</p>
        <input
          type="text"
          name="name"
          placeholder="PizzaSnaksApi"
          className="outline-none bg-transparent"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Description</p>
        <textarea
          name="description"
          placeholder="PizzaSnaksApiDescription"
          className="outline-none bg-transparent"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Context</p>
        <input
          type="text"
          name="context"
          placeholder="/specs"
          className="outline-none bg-transparent"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Version</p>
        <input
          type="text"
          name="version"
          placeholder="V1.02"
          className="outline-none bg-transparent"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Category</p>
        <select
          className="outline-none bg-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Please select category</option>
          <option value="Finance">Finance</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <Button
        text="Next"
        type="full"
        onClick={() => {
          handleNext();
        }}
      />
    </div>
  );
}

export function ApiUpload({ setStep, setProgress, setTitle }: CreateProp) {
  const { user, setLoading, setApiErrorMessage } = useOnboarding();
  const [choice, setChoice] = useState<string>("scratch");
  const [apiType, setApiType] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [info, setInfo] = useState<any>();
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    setTitle("Choose API type");
    const info =
      typeof window !== undefined
        ? JSON.parse(localStorage.getItem("info1") as string)
        : null;
    setInfo(info);
  }, []);
  const createApi = async () => {
    if (apiType === "")
      toast({
        title: "API Creation",
        description: "Please Select API type",
        status: "error",
      });
    setLoading(true);
    const data: CreateAPI = {
      name: info.name,
      description: info.description,
      context: info.context,
      version: info.version,
      provider: "Admin",
      // categories: [info.category],
      lifeCycleStatus: "CREATED",
      responseCachingEnabled: false,
      hasThumbnail: false,
      isDefaultVersion: false,
      enableSchemaValidation: false,
      type: apiType,
      transport: ["http", "https"],
      tags: ["substract", "add"],
      policies: ["Unlimited"],
      apiThrottlingPolicy: "Unlimited",
      securityScheme: ["oauth2"],
      maxTps: {
        production: 1000,
        sandbox: 1000,
      },
      visibility: "PUBLIC",
      visibleRoles: [],
      visibleTenants: [],
      subscriptionAvailability: "CURRENT_TENANT",
      additionalProperties: [
        {
          name: "AdditionalProperty",
          value: "PropertyValue",
          display: true,
        },
      ],
      accessControl: "NONE",
      businessInformation: {
        businessOwner: "John Doe",
        businessOwnerEmail: "johndoe@wso2.com",
        technicalOwner: "Jane Roe",
        technicalOwnerEmail: "janeroe@wso2.com",
      },
      endpointConfig: {
        endpoint_type: "http",
        sandbox_endpoints: {
          url: "https://localhost:9443/am/sample/pizzashack/v1/api/",
        },
        production_endpoints: {
          url: "https://localhost:9443/am/sample/pizzashack/v1/api/",
        },
      },
      operations: [
        {
          target: "/order/{orderId}",
          verb: "POST",
          authType: "Application & Application User",
          throttlingPolicy: "Unlimited",
        },
        {
          target: "/menu",
          verb: "GET",
          authType: "Application & Application User",
          throttlingPolicy: "Unlimited",
        },
      ],
    };
    try {
      const res = await APIServices.createApi(
        data,
        user?.customerCode as string
      );
      if (res.statusCode === 201) {
        setLoading(false);
        toast({
          title: "API Creation",
          description: "Api successfully created",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        router.push("/weaver/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  const importwsdl = async () => {
    if (url === "")
      toast({
        title: "API Creation",
        description: "Please Input you api url",
        status: "error",
      });
    setLoading(true);
    const data = {
      name: info.name,
      version: info.version,
      context: info.context,
      endpointConfig: {
        endpoint_type: "http",
        sandbox_endpoints: {
          url: url,
        },
        production_endpoints: {
          url: url,
        },
      },
    };
    const formData = new FormData();
    formData.append("url", url);
    formData.append("additionalProperties", JSON.stringify(data));
    formData.append("implementationType", "SOAPTOREST");
    try {
      const res: any = await APIServices.importWsdl(
        formData
        // user?.customerCode as string
      );
      if (res.statusCode === 201) {
        setLoading(false);
        toast({
          title: "API Creation",
          description: "Api successfully created",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        // router.push("/weaver/dashboard");
      }
      console.log(res);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center gap-2">
        <div className="w-full flex items-center gap-2">
          <input
            type="radio"
            className="p-2"
            name="choice"
            value={"scratch"}
            checked={choice === "scratch"}
            onChange={(e) => setChoice(e.target.value)}
          />
          <p className="font-thin text-dark-grey">Build From Scratch</p>
        </div>
        <div className="w-full flex items-center gap-2">
          <input
            type="radio"
            className="p-2"
            name="choice"
            checked={choice === "import"}
            value={"import"}
            onChange={(e) => setChoice(e.target.value)}
          />
          <p className="font-thin text-dark-grey">Import API</p>
        </div>
      </div>
      {choice === "import" ? (
        <ApiScratch url={url} setUrl={setUrl} />
      ) : (
        <>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey">API TYPE</p>
            <select
              className="outline-none bg-transparent"
              value={apiType}
              onChange={(e) => setApiType(e.target.value)}
            >
              <option value="">Please select your api type</option>
              <option value="HTTP">HTTP</option>
              <option value="WS">WS</option>
              <option value="SOAPTOREST">SOAP TO REST</option>
              <option value="SOAP">SOAP</option>
              <option value="GRAPHQL">GRAPHQL</option>
              <option value="WEBSUB">WEB SUB</option>
              <option value="SSE">SSE</option>
              <option value="WEBHOOK">WEBHOOK</option>
              <option value="ASYNC">ASYNC</option>
            </select>
          </div>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey">Context URL</p>
            <input
              type="text"
              name="url"
              placeholder="Input Context URL"
              className="outline-none bg-transparent"
            />
          </div>
        </>
      )}
      <Button
        text="Next"
        type="full"
        onClick={() => {
          if (choice === "import") {
            importwsdl();
          } else {
            createApi();
          }
          // router.push("/weaver/dashboard");
        }}
      />
    </div>
  );
}

type Proppy = {
  setUrl: Dispatch<SetStateAction<string>>;
  url: string;
};

export default function ApiScratch({ setUrl, url }: Proppy) {
  const [apiType, setApiType] = useState("");

  const [firstName, setFirstName] = useState<any>();
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

  const apis = [
    { name: "SOAP", id: 1 },
    { name: "SOAPTOREST", id: 2 },
  ];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center w-full gap-3">
        {apis.map((item, index) => (
          <div
            className={`${
              apiType === item.name
                ? "text-primary font-semibold border-primary"
                : "text-mid-grey  border-light-grey"
            } hover:border-primaryFade hover:text-primary text-center rounded-lg border-[1px] p-3 cursor-pointer`}
            key={index}
            onClick={() => {
              setApiType(item.name);
            }}
          >
            <p className="">{item.name}</p>
          </div>
        ))}
      </div>
      {!file ? (
        <div className="">
          <input
            type="file"
            ref={hiddenFileInputTwo}
            placeholder="click"
            accept=".xlsx"
            onChange={(e) => handleChangeTwo(e)}
            style={{ display: "none" }}
          />
          <button
            className="flex flex-col gap-3 items-center w-full border-[2px] border-light-grey border-dashed h-fit p-3 rounded-lg text-mid-grey"
            onClick={(e) => {
              handleClickTwo(e);
            }}
          >
            <IoCloudUploadOutline />
            <p className="text-sm font-semibold ">Upload file</p>
            <p className="text-sm font-semibold ">JSON, X-YAML, YAML</p>
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
      <div className="w-full my-1 flex items-center justify-center text-xl text-mid-grey">
        <p className="">OR</p>
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey"> URL</p>
        <input
          type="text"
          name="url"
          placeholder="Input API URL"
          className="outline-none bg-transparent"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </div>
  );
}
