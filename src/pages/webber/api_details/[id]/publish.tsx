import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import { Progress } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Button } from "@/components/utils";

import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Publish() {
  const router = useRouter();
  const { api } = useApi();
  const { progress, stage, setProgress, setStage } = useOnboarding();

  // On initial render
  useEffect(() => {
    setTimeout(() => {
      setProgress(25);
      setStage(1);
    }, 200);
  }, []);

  const modules = [
    {
      url: "/pets",
      methods: ["POST", "PUT", "GET", "DELETE"],
    },
    {
      url: "/store",
      methods: ["POST", "GET", "DELETE"],
    },
    {
      url: "/users",
      methods: ["POST", "PUT", "GET"],
    },
    {
      url: "/owners",
      methods: ["POST", "GET", "DELETE"],
    },
  ];

  return (
    <div className="w-full font-urban flex flex-col justify-center px-6">
      <OnboardingNavbar />

      <div className="w-full flex items-center justify-center flex-col">
        <div className="max-w-[473px]">
          <Progress
            colorScheme="blue"
            size="sm"
            value={progress}
            borderRadius={8}
          />
          {/* This is just for styling, I would have to include the changing value later, the value that depends on the state. */}
          <div className="flex items-center gap-3 mt-4">
            <Icon
              icon="material-symbols-light:chevron-left"
              className="text-5xl cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            {/* CONVERT THE FONT USED IN THIS DIV TO MANROPE, I TRIED BUT FAILED */}
            <div className="text-sm space-y-3">
              <p className="leading-none text-dark-grey">Step {stage} of 4</p>
              {/* ↑ changes ☑️*/}
              <p className="font-semibold leading-none">Publish your API</p>
              {/* ↑ Stays constant*/}
              <p className="leading-none text-dark-grey">
                {stage === 1 &&
                  "Confirm if the API Basic information is correct"}
                {stage === 2 && "Confirm if the API Configuration is correct"}
                {stage === 3 &&
                  "Confirm if the endpoint configurations are correct"}
                {stage === 4 && "Confirm if the Modules are correct"}
              </p>
              {/* ↑ changes*/}
            </div>
          </div>

          {stage === 1 && (
            <PublishAPICard title="API Basic Information">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-6 rounded bg-mid-grey overflow-hidden">
                  <Image
                    src={api.img}
                    alt="icon"
                    width={200}
                    height={200}
                    className="w-full h-full"
                  />
                </div>
                <div className="">
                  <p className="font-semibold text-base">{api.title}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Description</h3>
                  <p className="text-mid-grey">
                    Translate text to 100+ languages. Fast processing,
                    cost-saving. Free up to 100,000 characters per month
                  </p>
                </div>
                <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Provider</h3>
                  <p className="text-mid-grey">MajekFashek_</p>
                </div>
                <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Context</h3>
                  <p className="text-mid-grey">/sample/options</p>
                </div>
                <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Version</h3>
                  <p className="text-mid-grey">V 1.01</p>
                </div>
                <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Type</h3>
                  <p className="text-mid-grey">https</p>
                </div>
              </div>
            </PublishAPICard>
          )}
          {stage === 2 && (
            <PublishAPICard title="Configuration">
              <div className="flex flex-col space-y-4">
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Transfer</h3>
                  <p className="text-mid-grey">HTTPS</p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">API Security</h3>
                  <p className="text-mid-grey">OAuth2_</p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">
                    Access Control
                  </h3>
                  <p className="text-mid-grey">None</p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Visibility</h3>
                  <p className="text-mid-grey">public</p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">
                    Business Plans
                  </h3>
                  <p className="text-mid-grey">Gold, Unlimited</p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">Tags</h3>
                  <p className="text-mid-grey">https</p>
                </div>
              </div>
            </PublishAPICard>
          )}
          {stage === 3 && (
            <PublishAPICard title="Endpoint Configuration">
              <div className="flex flex-col space-y-4">
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm overflow-scroll">
                  <h3 className="font-semibold text-dark-grey">
                    Production Endpoint
                  </h3>
                  <p className="text-mid-grey">
                    https://loacalhost:8494/pg/sample/opinions
                  </p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm overflow-scroll ">
                  <h3 className="font-semibold text-dark-grey">
                    Sandbox Endpoint
                  </h3>
                  <p className="text-mid-grey">
                    https://loacalhost:8494/pg/sample/opinions
                  </p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">
                    Production Endpoint Security
                  </h3>
                  <p className="text-mid-grey">/sample/options</p>
                </div>
                <div className="gap-3 sm:gap-0 grid grid-cols-[35%_1fr] w-full text-sm">
                  <h3 className="font-semibold text-dark-grey">
                    Sandbox Endpoint Security
                  </h3>
                  <p className="text-mid-grey">public</p>
                </div>
              </div>
            </PublishAPICard>
          )}
          {stage === 4 && (
            <PublishAPICard title="Modules">
              <div className="flex flex-col space-y-6">
                {modules.map((module, index) => (
                  <div
                    className="grid grid-cols-[35%_1fr] w-full text-sm"
                    key={index}
                  >
                    <h3 className="font-semibold text-dark-grey">
                      {module.url}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {module.methods.map((method, index) => (
                        <div
                          className={`${
                            method === "POST"
                              ? "bg-success"
                              : method === "PUT"
                              ? "bg-warning"
                              : method === "GET"
                              ? "bg-info"
                              : "bg-error"
                          } w-[75px] py-2 flex justify-center items-center rounded text-white text-xs font-semibold`}
                          key={index}
                        >
                          <p className="text-xs text-white">{method}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </PublishAPICard>
          )}

          <div className="flex gap-[10px] mt-6">
            <button className="flex gap-2 items-center rounded-lg text-primary h-fit border-2 w-full border-light-grey py-2 justify-center">
              <p className="text-sm font-semibold tracking-normal">Skip</p>
            </button>
            <Button
              text={stage === 4 ? "Publish" : "Next"}
              // After I am done with styling and whatnot I would covert these to switch case statements.
              onClick={() => {
                if (stage === 1) {
                  setStage(2);
                  setProgress(50);
                }

                if (stage === 2) {
                  setStage(3);
                  setProgress(75);
                }

                if (stage === 3) {
                  setStage(4);
                  setProgress(100);
                }

                if (stage === 4) {
                  setStage(1);
                  setProgress(25);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type PublishAPICardProps = {
  title: string;
  children: React.ReactNode;
};

// Before I include children, I would make it fixed first.
function PublishAPICard({ title, children }: PublishAPICardProps) {
  return (
    <div className="border rounded-lg w-full min-w-full sm:min-w-[473px] h-fit sm:h-[380px] p-4 mt-6">
      <div className="flex mb-4 justify-between">
        <p className="text-mid-grey font-semibold tracking-wider">{title}</p>
        <div className=" w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M13.9906 6.24146L18.2586 10.5094M13.9906 6.24146L4.98046 15.2516C4.36482 15.8673 3.96546 16.666 3.84233 17.5279L3.51038 19.8516C3.41554 20.5155 3.9846 21.0845 4.64851 20.9897L6.97218 20.6577C7.83408 20.5346 8.6328 20.1353 9.24844 19.5196L18.2586 10.5094M13.9906 6.24146L15.1107 5.12139C16.2823 3.94982 18.1944 3.96249 19.366 5.13406C20.5376 6.30563 20.5503 8.2178 19.3787 9.38937L18.2586 10.5094"
              stroke="#8697A2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* THE CARD CONTENT BASED ON THE STAGE AND WHATNOT */}
      {children}
    </div>
  );
}
