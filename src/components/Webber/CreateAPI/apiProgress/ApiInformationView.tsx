import { Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IApi } from "@/models/api.model";
import { FileType } from "@/models/apidiscovery.model";
import APIServices from "@/services/api_services/api_service";
import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function ApiInfomationView() {
  const { api } = useApi();
  const { setApiErrorMessage } = useOnboarding();
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState<string>(api?.name as string);
  const [description, setDescription] = useState<string>(
    api?.description as string
  );
  const [category, setCategory] = useState<string>(
    api?.categories[0] as string
  );
  const [preview, setPreview] = useState<string>();
  const [context, setContext] = useState<string>(api?.context as string);
  const [version, setVersion] = useState<string>(api?.version as string);
  const router = useRouter();
  const toast = useToast();

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
    const reader = new FileReader();
    if (reader) {
      var url = reader.readAsDataURL(file as File);
      reader.onloadend = () => {
        setPreview(reader.result as string);
        // setPic(true);

        console.log(reader.result);
      };

      setFile(file as FileType);
    }
  };
  const updateApi = async (aco: string) => {
    if (api) {
      const { apiCode, ...restApiProps } = api;

      const data = {
        ...restApiProps,
        name,
        description,
        categories: [category],
        context,
        version,
        monetization: {
          enabled: false,
          properties: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
      };
      try {
        const res = await APIServices.updateApi(data, aco);

        if (res.statusCode === 200) {
          toast({
            title: "Update Api",
            description: "API successfully Updated",
            duration: 3000,
            position: "bottom-right",
          });
          router.reload();
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        setApiErrorMessage(errorMessage, "error");
      }
    }
  };

  const updateApiImg = async (aco: string) => {
    if (api) {
      const data = new FormData();
      data.append("file", file);
      try {
        const res = await APIServices.updateApiImg(data, aco);
        console.log(res);
        // if (res === 200) {
        //   toast({
        //     title: "Update Api",
        //     description: "API successfully Updated",
        //     duration: 3000,
        //     position: "bottom-right",
        //   });
        //   router.reload();
        // }
      } catch (error: any) {
        console.log(error);
        console.error("Caught error:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An unknown error occurred";
        setApiErrorMessage(errorMessage, "error");
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-3">
        <div className="w-full flex flex-col gap-3">
          <p className="text-xs text-dark-grey"> Basic Information</p>
          <div className="w-full flex flex-col">
            {!preview ? (
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
                  <p className="text-sm font-semibold ">
                    Upload API Product Image/Logo
                  </p>
                  {/* <p className="text-sm font-semibold ">JSON, X-YAML, YAML</p> */}
                </button>
              </div>
            ) : (
              <div className="flex gap-2 items-center relative h-[150px] w-full md:w-[60%] p-4  h-fit  rounded-lg">
                <Image
                  src={preview}
                  alt="uploadIcon"
                  width={300}
                  height={300}
                  className="h-[150px] w-full rounded-lg "
                />
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setPreview(undefined)}
                  className="cursor-pointer absolute top-5 right-0"
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
            )}
          </div>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey"> API Name</p>
            <input
              type="text"
              name="url"
              placeholder="Input JSON URL"
              className="outline-none bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey"> Description</p>
            <textarea
              name="apiDescription"
              id="apiDescription"
              placeholder="Enter Description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey"> Category/Industry</p>
            <select
              name="apiCat"
              id="apiCat"
              className="border-none outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a category</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-xs text-dark-grey"> API Details</p>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey"> Context</p>
            <input
              type="text"
              name="context"
              placeholder="/Specs"
              className="outline-none bg-transparent"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey">Base URL</p>
            <input
              type="text"
              name="context"
              placeholder="http://www.codehow.com"
              className="outline-none bg-transparent"
            />
          </div>
          <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
            <p className="text-xs text-dark-grey"> Version</p>
            <input
              type="text"
              name="version"
              placeholder="V1.02"
              className="outline-none bg-transparent"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button
          text="Save"
          type="fit"
          onClick={() => {
            updateApi(api?.apiCode as string);
            // updateApiImg(api?.apiCode as string);
          }}
        />
      </div>
    </>
  );
}
