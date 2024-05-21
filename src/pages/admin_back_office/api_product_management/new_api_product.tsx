import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { IMockApi } from "@/models/apidiscovery.model";
import { Progress } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/utils";

import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function NewApiProduct() {
  const router = useRouter();
  const { api } = useApi();
  const { progress, stage, setProgress, setStage } = useOnboarding();

  useEffect(() => {
    // This will only run once, on the client, after mounting
    setProgress(50);
    setStage(1);
  }, []);

  const categories = [
    { title: "Entertainment" },
    { title: "Agriculture" },
    { title: "Sports" },
    { title: "User Authentication" },
    { title: "Banking and Finance" },
    { title: "Gaming" },
    { title: "Education" },
    { title: "Logistics" },
    { title: "Visual Recognition" },
    { title: "Text Analysis" },
    { title: "Payments" },
    { title: "E-Commerce" },
    { title: "Data Analysis" },
  ];

  return (
    <div className="w-full font-urban flex flex-col justify-center px-6">
      <OnboardingNavbar />

      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-[473px]">
          <Progress
            colorScheme="blue"
            size="sm"
            value={progress}
            borderRadius={8}
          />

          <div className="flex items-center gap-3 mt-4 w-full">
            <Icon
              icon="material-symbols-light:chevron-left"
              className="text-5xl cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            <div className="text-sm space-y-3">
              <p className="leading-none text-dark-grey">Step {stage} of 2</p>
              <p className="font-semibold leading-none">New API Product</p>
            </div>
          </div>

          <form className="space-y-3 mt-6 px-14">
            <div className="border rounded-lg flex flex-col px-4 py-2">
              <label className="text-xs text-dark-txt" htmlFor="business-name">
                Name
              </label>
              <input
                type="text"
                placeholder="API Product Business Solutions"
                id="business-name"
                className="text-base mt-1 outline-none border-none text-dark-txt"
              />
            </div>

            <div className="border rounded-lg flex flex-col px-4 py-2">
              <label className="text-xs text-dark-txt" htmlFor="description">
                Description
              </label>
              <textarea
                placeholder="A carefully curated set of functional and integral solutions to improve the working process of the XYZ sector"
                id="description"
                className="text-base mt-1 outline-none border-none text-dark-txt"
                rows={3}
              ></textarea>
            </div>

            <div className="border rounded-lg flex flex-col px-4 py-2">
              <label className="text-xs text-dark-txt" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="text-mid-grey outline-none w-full px-0"
              >
                {categories.map((category, index) => (
                  <option className="px-0" key={index}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <Button
              text="Next"
              className="translate-y-3"
              onClick={() =>
                router.push(
                  `/admin_back_office/api_product_management/apiProductDetails${1}`
                )
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
}
