import { Button } from "@/components/utils";
import { FileType } from "@/models/apidiscovery.model";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

type CreateProp = {
  setStep: Dispatch<SetStateAction<number>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setTitle: Dispatch<SetStateAction<string>>;
};
export function ApiInformation({ setStep, setProgress, setTitle }: CreateProp) {
  useEffect(() => {
    setTitle("Build API");
  });
  return (
    <div className="flex flex-col gap-3">
      {" "}
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Name</p>
        <input
          type="text"
          name="userName"
          placeholder="AZY Corporation"
          className="outline-none bg-transparent"
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Context</p>
        <input
          type="text"
          name="context"
          placeholder="/specs"
          className="outline-none bg-transparent"
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Base URL</p>
        <input
          type="text"
          name="url"
          placeholder="http://www.codehow.com"
          className="outline-none bg-transparent"
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Version</p>
        <input
          type="text"
          name="version"
          placeholder="V1.02"
          className="outline-none bg-transparent"
        />
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Category</p>
        <select className="outline-none bg-transparent">
          <option value="">Please select category</option>
          <option value="">Finance</option>
        </select>
      </div>
      <Button
        text="Next"
        type="full"
        onClick={() => {
          setStep(2);
          setProgress(100);
        }}
      />
    </div>
  );
}

export function ApiUpload({ setStep, setProgress, setTitle }: CreateProp) {
  const [choice, setChoice] = useState<string>("import");
  useEffect(() => {
    setTitle("Choose API type");
  });
  const router = useRouter();
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
        <ApiScratch />
      ) : (
        <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
          <p className="text-xs text-dark-grey"> URL</p>
          <input
            type="text"
            name="url"
            placeholder="Input JSON URL"
            className="outline-none bg-transparent"
          />
        </div>
      )}
      <Button
        text="Next"
        type="full"
        onClick={() => {
          router.push("/webber/dashboard");
        }}
      />
    </div>
  );
}

export default function ApiScratch() {
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
    { name: "REST API", id: 1 },
    { name: "SOAP API", id: 2 },
    { name: "Graph SQL", id: 3 },
    { name: "Streaming API", id: 4 },
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
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey"> URL</p>
        <input
          type="text"
          name="url"
          placeholder="Input JSON URL"
          className="outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
