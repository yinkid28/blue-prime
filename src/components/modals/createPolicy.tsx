import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Stack,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { useState } from "react";
import AdminServices from "@/services/admin_services/admin_services";
import { CreateApplicationPolicyDTO } from "@/models/admin.model";
import { useOnboarding } from "@/context/OnboardingContext";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function CreatePolicy({
  isOpen,
  onClose,
}: addEndpointModalProps) {
  const [value, setValue] = useState("1");
  const [policyName, setPolicyName] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [dataUnit, setDataUnit] = useState<string>("");
  const [dataAmount, setDataAmount] = useState<string>("");
  const [requestCount, setRequestCount] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<string>("");
  const [unitTime, setUnitTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { setApiErrorMessage } = useOnboarding();
  const createApplicationPolicy = async () => {
    setLoading(true);
    const data: CreateApplicationPolicyDTO = {
      policyName,
      description,
      defaultLimit: {
        type: value === "1" ? "REQUESTCOUNTLIMIT" : "BANDWIDTHLIMIT",
        requestCount:
          value === "1"
            ? {
                timeUnit,
                unitTime,
                requestCount,
              }
            : null,
        bandwidth:
          value === "2"
            ? {
                dataAmount,
                dataUnit,
                timeUnit,
                unitTime,
              }
            : null,
        eventCount: null,
      },
    };

    console.log(data, "data");
    setLoading(false);
    // try {
    //   const res = await AdminServices.createApplicationPolicy(data);
    //   setLoading(false);
    // } catch (error: any) {
    //   console.log(error);
    //   console.error("Caught error:", error);
    //   const errorMessage =
    //     error?.response?.data?.message ||
    //     error?.message ||
    //     "An unknown error occurred";
    //   setApiErrorMessage(errorMessage, "error");
    // }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          New Application Policy
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Policy Name</p>
              <input
                type="text"
                className="outline-none border-none"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
              />
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Description</p>
              <textarea
                placeholder="Describe your Endpoint"
                name="endpointDescription"
                id="endpointDescription"
                rows={5}
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center flex-col md:flex-row gap-3">
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row">
                  <Radio value="1">Request Count</Radio>
                  <Radio value="2">Request Bandwidth</Radio>
                </Stack>
              </RadioGroup>
            </div>
            {value === "1" ? (
              <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <p className="text-xs text-dark-grey">Request Count</p>
                <input
                  type="number"
                  className="outline-none border-none"
                  value={requestCount}
                  onChange={(e) => setRequestCount(e.target.value)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-[80%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Data Bandwidth</p>
                  <input
                    type="number"
                    className="outline-none border-none"
                    value={dataAmount}
                    onChange={(e) => setDataAmount(e.target.value)}
                  />
                </div>
                <div className="w-[20%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <p className="text-xs text-dark-grey">Data Unit</p>
                  <select
                    name="dataUnit"
                    id="dataUnit"
                    className="border-none outline-none"
                    value={dataUnit}
                    onChange={(e) => setDataUnit(e.target.value)}
                  >
                    <option value="">Choose data unit</option>
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-[60%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <p className="text-xs text-dark-grey">Unit Time</p>
                <input
                  type="number"
                  className="outline-none border-none"
                  value={unitTime}
                  onChange={(e) => setUnitTime(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[40%] rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <p className="text-xs text-dark-grey">Time Option</p>
                <select
                  name="rateLimit"
                  id="rateLimit"
                  className="border-none outline-none"
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                >
                  <option value="">Choose Time option</option>
                  <option value="min">Minutes</option>
                  <option value="hour">Hours</option>
                  <option value="day">Days</option>
                  <option value="week">Weeks</option>
                  <option value="month">Months</option>
                  <option value="year">Years</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="fit" text="Save" onClick={() => {}} />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
