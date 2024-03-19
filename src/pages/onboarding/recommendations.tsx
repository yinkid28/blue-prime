import Image from "next/image";
import { useEffect, useState } from "react";
import org from "../../../public/icons/orgIconReg.svg";
import ind from "../../../public/icons/indIconReg.svg";
import OnboardingLayout from "@/components/onboarding/layout";
import { Button } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/router";
export default function Recommendations() {
  const options = [
    "module_1",
    "module_2",
    "module_3",
    "module_4",
    "module_5",
    "module_6",
    "module_7",
    "module_8",
    "module_9",
    "module_10",
    "module_11",
    "module_12",
    "module_13",
    "module_14",
    "module_15",
    "module_16",
    "module_17",
    "module_18",
    "module_19",
    "module_20",
  ];
  const fixedLength = 10;
  const initVals = options.slice(0, fixedLength); // More concise and clear
  const router = useRouter();
  const { progress, setProgress, setStage } = useOnboarding();

  const [selected, setSelected] = useState<string[]>([]);
  const [renderedOptions, setRenderedOptions] = useState<string[]>(initVals);

  useEffect(() => {
    // This might need adjustment based on deselection handling
    const filteredOptions = renderedOptions.filter(
      (item) => !selected.includes(item)
    );
    setRenderedOptions(filteredOptions);
  }, [selected]);

  useEffect(() => {
    updateRenderedOptions();
  }, [renderedOptions, selected]); // Added selected as a dependency to handle deselection

  const updateRenderedOptions = () => {
    const currentLength = renderedOptions.length;
    const availableSpace = fixedLength - currentLength;
    if (availableSpace <= 0) return;

    const startIndex = options.findIndex(
      (option) =>
        !renderedOptions.includes(option) && !selected.includes(option)
    );
    if (startIndex === -1) return; // All options are either selected or rendered

    const endIndex = Math.min(startIndex + availableSpace, options.length);
    const newOptions = options.slice(startIndex, endIndex);

    setRenderedOptions([...renderedOptions, ...newOptions]);
  };
  return (
    <OnboardingLayout
      title="API Industry, Please select as much as possible"
      step={4}
    >
      <div className="flex flex-col gap-5 item-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          {renderedOptions?.map((item, index) => (
            <div
              className={`w-full hover:shadow-md ease-in-out duration-500 slideInRight cursor-pointer rounded-lg h-fit bg-white border-[1px] relative p-3 flex gap-2`}
              onClick={() => {
                if (selected.includes(item)) {
                  setSelected(selected.filter((mod) => mod !== item));
                } else {
                  const updatedArr = [...selected];
                  updatedArr.push(item);
                  setSelected(updatedArr);
                }
              }}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="w-full  flex justify-center">
          <div className="w-full md:w-[50%]">
            <Button
              text="Confirm"
              type="full"
              onClick={() => {
                router.push({
                  pathname: "/onboarding/login",
                });
                setTimeout(() => {
                  setProgress(0);
                  setStage(0);
                }, 200);
              }}
            />
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
