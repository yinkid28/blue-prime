import {
  ApiInformation,
  ApiUpload,
} from "@/components/Webber/CreateAPI/createApiComponent";
import OnboardingNavbar from "@/components/onboarding/onboardingNavbar";
import { Button, Loader } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Progress, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function CreateApi() {
  const router = useRouter();
  const { loading, setLoading } = useOnboarding();
  const [progress, setProgress] = useState<number>(50);
  const [title, setTitle] = useState<string>("Build API");
  const [step, setStep] = useState<number>(1);
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
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full font-urban flex justify-center">
          <div className="w-[80%] md:w-[95%] flex flex-col gap-3 items-center">
            <OnboardingNavbar />

            <div className="w-full md:w-[60%] lg:w-[40%] flex items-center flex-col gap-3">
              <div className="w-full">
                <Progress
                  size={"sm"}
                  colorScheme="blue"
                  value={progress}
                  borderRadius={8}
                />
                <div
                  className="flex my-2 items-center cursor-pointer flex-row gap-3"
                  onClick={() => {
                    if (step === 1) {
                      router.back();
                    } else {
                      setStep(1);
                      setProgress(50);
                    }
                  }}
                >
                  <FaChevronLeft />

                  <div className="flex flex-col gap-2">
                    {step && <p className="text-dark-grey">Step {step} of 2</p>}
                    <p className="font-[14px] font-semibold">{title}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-[70%]">
                {step === 1 ? (
                  <>
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
                      {context !== "" && (
                        <p className="text-xs text-mid-grey">
                          Your api would be exposed in {`${context}/${version}`}
                        </p>
                      )}
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
                  </>
                ) : (
                  <ApiUpload
                    setProgress={setProgress}
                    setStep={setStep}
                    setTitle={setTitle}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
