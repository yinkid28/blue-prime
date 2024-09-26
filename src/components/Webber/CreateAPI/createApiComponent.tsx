import { Button } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { CreateAPI } from "@/models/api.model";
import { FileType } from "@/models/apidiscovery.model";
import APIServices from "@/services/api_services/api_service";
import { Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

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
    if (name == "" || context == "" || version == "") {
      toast({
        title: "Create API",
        description: "Kindly fill in all necessary details",
        status: "warning",
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }
    const obj = {
      name,
      version,
      category,
      context: `/${context}`,
      description,
    };
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
          placeholder="globally unique id"
          className="outline-none bg-transparent"
          value={context}
          onChange={(e) => setContext(`${e.target.value}`)}
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
      {/* <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
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
      </div> */}
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
    const data: any = {
      name: info.name,
      description: info.description,
      context: info.context,
      version: info.version,
      policies: ["Unlimited"],
      endpointConfig: {
        endpoint_type: "http",
        sandbox_endpoints: {
          url: "https://pokeapi.co/api/v2",
        },
        production_endpoints: {
          url: "https://pokeapi.co/api/v2",
        },
      },
      // gatewayType: "wso2/synapse",
      // provider: "admin",
      // categories: [info.category],
      // lifeCycleStatus: "CREATED",
      // responseCachingEnabled: false,
      // hasThumbnail: false,
      // isDefaultVersion: false,
      // enableSchemaValidation: false,
      // type: apiType,
      // transport: ["http", "https"],
      // tags: ["substract", "add"],
      // apiThrottlingPolicy: "Unlimited",
      // securityScheme: ["oauth2"],
      // maxTps: {
      //   production: 1000,
      //   sandbox: 1000,
      // },
      // visibility: "PUBLIC",
      // visibleRoles: [],
      // visibleTenants: [],
      // subscriptionAvailability: "CURRENT_TENANT",
      // additionalProperties: [
      //   {
      //     name: "AdditionalProperty",
      //     value: "PropertyValue",
      //     display: true,
      //   },
      // ],
      // accessControl: "NONE",
      // businessInformation: {
      //   businessOwner: "John Doe",
      //   businessOwnerEmail: "johndoe@wso2.com",
      //   technicalOwner: "Jane Roe",
      //   technicalOwnerEmail: "janeroe@wso2.com",
      // },
      // endpointConfig: {
      //   endpoint_type: "http",
      //   sandbox_endpoints: {
      //     url: "https://localhost:9443/am/sample/pizzashack/v1/api/",
      //   },
      //   production_endpoints: {
      //     url: "https://localhost:9443/am/sample/pizzashack/v1/api/",
      //   },
      // },
      // operations: [
      //   {
      //     target: "/order/{orderId}",
      //     verb: "POST",
      //     authType: "Application & Application User",
      //     throttlingPolicy: "Unlimited",
      //   },
      //   {
      //     target: "/menu",
      //     verb: "GET",
      //     authType: "Application & Application User",
      //     throttlingPolicy: "Unlimited",
      //   },
      // ],
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
        router.push(
          `/weaver/api_details/${res.data.name}/overview?apiCode=${res.data.apiCode}`
        );
      }
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
        <ApiScratch infor={info} />
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
              {/* <option value="SOAP">SOAP</option>
              <option value="GRAPHQL">GRAPHQL</option> */}
            </select>
          </div>
          <Button
            text="Next"
            type="full"
            onClick={() => {
              createApi();
              // router.push("/weaver/dashboard");
            }}
          />
        </>
      )}
    </div>
  );
}

export default function ApiScratch({ infor }: any) {
  const { user, setLoading, setApiErrorMessage } = useOnboarding();
  const [apiType, setApiType] = useState("SOAP");
  const [firstName, setFirstName] = useState<any>();
  const [implementationType, setImplementationType] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [file, setFile] = useState<any>(null);
  const [url, setUrl] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [info, setInfo] = useState<any>(infor);
  const router = useRouter();
  const toast = useToast();
  const hiddenFileInputTwo = useRef<HTMLInputElement>(null);

  const importwsdl = async (cco: string) => {
    if (file === null && url === "") {
      toast({
        title: "API Creation",
        description: "Please Either Import a Wsdl file or insert wsdl url",
        status: "error",
        position: "bottom-right",
      });
      return;
    }
    if (implementationType === "") {
      toast({
        title: "API Creation",
        description: "Please Select an implementation type",
        position: "bottom-right",
        status: "error",
      });
      return;
    }

    setLoading(true);
    const data = {
      name: info.name,
      version: info.version,
      context: info.context,
      // endpointConfig: {
      //   endpoint_type: "http",
      //   sandbox_endpoints: {
      //     url: url,
      //   },
      //   production_endpoints: {
      //     url: url,
      //   },
      // },
    };
    const formData = new FormData();
    if (file !== null) {
      formData.append("file", file);
    } else {
      formData.append("url", url);
    }
    formData.append("additionalProperties", JSON.stringify(data));
    formData.append("implementationType", implementationType);
    try {
      const res: any = await APIServices.importWsdl(formData, cco);
      console.log(res);
      if (res.statusCode === 201) {
        setLoading(false);
        toast({
          title: "API Creation",
          description: "Api successfully created",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        router.push(
          `/weaver/api_details/${res.data.name}/overview?apiCode=${res.data.apiCode}`
        );
      }
      console.log(res);
    } catch (error: any) {
      setFile(null);
      setImplementationType("");
      setUrl("");
      console.log(error);
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      console.log(errorMessage, "ïyaayyaay");
      toast({
        title: "API Creation",
        description: errorMessage,
        position: "bottom-right",
        status: "error",
      });

      // setApiErrorMessage(errorMessage, "error");
    }
  };

  const importopenApi = async (cco: string) => {
    if (file === null && url === "") {
      toast({
        title: "API Creation",
        description:
          "Please Either Import an open api file or insert open api url",
        status: "error",
        position: "bottom-right",
      });
      return;
    }
    // if (implementationType === "") {
    //   toast({
    //     title: "API Creation",
    //     description: "Please Select an implementation type",
    //     position: "bottom-right",
    //     status: "error",
    //   });
    //   return;
    // }

    setLoading(true);
    const data = {
      name: info.name,
      version: info.version,
      context: info.context,
      // endpointConfig: {
      //   endpoint_type: "http",
      //   sandbox_endpoints: {
      //     url: url,
      //   },
      //   production_endpoints: {
      //     url: url,
      //   },
      // },
    };
    const formData = new FormData();
    if (file !== null) {
      formData.append("file", file);
    } else {
      formData.append("url", url);
    }
    formData.append("additionalProperties", JSON.stringify(data));
    // formData.append("implementationType", implementationType);
    try {
      const res: any = await APIServices.importOpenApi(formData, cco);
      console.log(res);
      if (res.statusCode === 201) {
        setLoading(false);
        toast({
          title: "API Creation",
          description: "Api successfully created",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        router.push(
          `/weaver/api_details/${res.data.name}/overview?apiCode=${res.data.apiCode}`
        );
      }
    } catch (error: any) {
      setFile(null);
      setUrl("");
      console.log(error);
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      console.log(errorMessage, "ïyaayyaay");
      toast({
        title: "API Creation",
        description: errorMessage,
        position: "bottom-right",
        status: "error",
      });

      // setApiErrorMessage(errorMessage, "error");
    }
  };
  const validateApi = async (file?: any, url?: string) => {
    setIsValidating(true);
    const formData = new FormData();
    if (file !== null) {
      formData.append("file", file);
    } else {
      formData.append("url", url as string);
    }
    // formData.append("implementationType", implementationType);
    try {
      let res;
      if (apiType === "SOAP") {
        res = await APIServices.validateWsdl(formData);
      } else {
        res = await APIServices.validateOpenApi(formData);
      }
      console.log(res);
      if (res.data.isValid) {
        setIsValidating(false);
        toast({
          title: "API Creation",
          description: "Validation successful, go ahead and import your api",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
        setDisabled(false);
        // router.push("/weaver/dashboard");
      } else {
        setIsValidating(false);
        toast({
          title: "API Creation",
          description: "Unable to retrieve api definition from resource",
          status: "error",
          duration: 3000,
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      setIsValidating(false);
      setFile(null);
      setUrl("");
      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      console.log(errorMessage, "ïyaayyaay");
      toast({
        title: "API Creation",
        description: errorMessage,
        position: "bottom-right",
        status: "error",
      });

      // setApiErrorMessage(errorMessage, "error");
    }
  };

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
    validateApi(file);
    // setDisabled(false);
    setUrl("");
  };
  useEffect(() => {
    if (file === null && url === "") {
      setDisabled(true);
    }
  }, [url, file]);
  const apis = [
    { name: "SOAP", id: 1 },
    { name: "REST", id: 2 },
  ];

  useEffect(() => {
    console.log(disabled, "des");
  }, [disabled]);
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
              setFile(null);
              setUrl("");
            }}
          >
            <p className="">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="flex text-dark-grey items-center gap-2">
        <MdErrorOutline />

        <p className="text-xs">
          Ensure your API strictly conforms with the{" "}
          {apiType === "SOAP" ? (
            <span className="font-semibold">SOAP 1.1 or 1.2 </span>
          ) : (
            <span className="font-semibold">OpenApi 3.0.1 </span>
          )}{" "}
          guidelines before importing
        </p>
      </div>
      {apiType === "SOAP" && (
        <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
          <p className="text-xs text-dark-grey">Implementation Type</p>
          <select
            value={implementationType}
            onChange={(e) => setImplementationType(e.target.value)}
          >
            <option value="">Select Implemetation Type</option>
            <option value="SOAP">Soap</option>
            <option value="SOAPTOREST">Soap To Rest</option>
          </select>
        </div>
      )}
      {!file ? (
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
            className="flex flex-col gap-3 items-center w-full border-[2px] border-light-grey border-dashed h-fit p-3 rounded-lg text-mid-grey"
            onClick={(e) => {
              handleClickTwo(e);
            }}
          >
            <IoCloudUploadOutline />
            <p className="text-sm font-semibold ">Upload file</p>
            <p className="text-sm font-semibold ">
              {apiType === "SOAP" ? `.WSDL` : "Open API definition"}
            </p>
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
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="url"
            placeholder="Input API URL"
            className="outline-none bg-transparent w-full"
            value={url}
            disabled={file !== null ? true : false}
            onChange={(e) => {
              setFile(null);
              setUrl(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value !== "") {
                validateApi(null, e.target.value);
              }
            }}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        {isValidating ? <Spinner color="blue" /> : null}
      </div>
      <Button
        text="Next"
        type="full"
        disabled={disabled}
        onClick={() => {
          if (apiType === "SOAP") {
            importwsdl(user!.customerCode);
          } else {
            importopenApi(user!.customerCode);
          }
          // createApi();
          // router.push("/weaver/dashboard");
        }}
      />
    </div>
  );
}
