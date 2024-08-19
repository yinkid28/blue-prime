import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../utils";
import { IPolicy, SwaggerOperation } from "@/models/api.model";
import { FaCircleMinus } from "react-icons/fa6";
import { useState } from "react";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  addEndpoint: (
    data: SwaggerOperation,
    swaggerPath: string,
    requestMethod: string
  ) => void;
  swaggerPaths: string[];
  policyLevel: string;
  policies: IPolicy[];
};
export default function AddEndpointModal({
  isOpen,
  onClose,
  addEndpoint,
  swaggerPaths,
  policyLevel,
  policies,
}: addEndpointModalProps) {
  const toast = useToast();
  const [swaggerPath, setSwaggerPath] = useState<string>("");
  const [requestMethod, setRequestMethod] = useState<string>("");
  const [data, setData] = useState<SwaggerOperation>({
    parameters: [
      {
        name: "",
        in: "",
        required: false,
        style: "",
        explode: true,
        schema: {
          type: "form",
        },
      },
    ],
    description: "",
    summary: "",
    responses: {
      "200": {
        description: "ok",
      },
    },
    security: [
      {
        default: [],
      },
    ],
    "x-auth-type": "None",
    "x-throttling-tier": "Unlimited",
    "x-wso2-application-security": {
      "security-types": ["oauth2"],
      optional: false,
    },
  });
  const handleInputChange = (index: number, event?: any, valuer?: any) => {
    const name = event?.target?.name || ""; // Safely access name
    const value = event?.target?.value || ""; // Safely access value

    const inputs = [...data.parameters];
    inputs[index] = { ...inputs[index], [name]: valuer || value };

    setData((prev) => ({
      ...prev,
      parameters: inputs,
    }));
  };
  const addSocialMediaInput = (event: any) => {
    event.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        parameters: [
          ...prev.parameters,
          {
            name: "",
            in: "",
            required: false,
            style: "",
            explode: true,
            schema: {
              type: "form",
            },
          },
        ],
      };
    });
  };
  const removeSocialMediaInput = (index: number) => {
    const inputs = [...data.parameters];
    inputs.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        parameters: inputs,
      };
    });
  };

  const createEndpoint = () => {
    if (swaggerPath === "") {
      toast({
        status: "error",
        description: "select a tag",
        duration: 2000,

        position: "bottom-right",
      });
      return;
    }
    if (requestMethod === "") {
      toast({
        status: "error",
        description: "select a tag",
        duration: 2000,
        size: "sm",
        position: "bottom-right",
      });
      return;
    }

    addEndpoint(data, swaggerPath, requestMethod);

    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent className="p-2 bg-light-grey" bg={"#F8F8F8"}>
        <ModalHeader className="text-mid-grey font-semibold">
          Add Endpoint
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-2">
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey"> API Tag</p>
              <select
                name="rateLimit"
                id="rateLimit"
                className="border-none outline-none"
                onChange={(e) => setSwaggerPath(e.target.value)}
              >
                <option value="">Chose a tag</option>
                {swaggerPaths.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Request Method</p>
              <select
                name="requestMethod"
                id="requestMethod"
                className="border-none outline-none"
                onChange={(e) => setRequestMethod(e.target.value)}
              >
                <option value="">Choose a method</option>
                <option value="get">GET</option>
                <option value="post">POST</option>
                <option value="patch">PATCH</option>
                <option value="put">PUT</option>
                <option value="delete">DELETE</option>
              </select>
            </div>
            {/* <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey"> Endpoint Name</p>
              <input type="text" className="outline-none border-none" />
            </div> */}
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <div className="flex items-center gap-2">
                <p className="text-xs text-dark-grey">Parameters</p>
                <Button
                  type="fit"
                  text="add"
                  onClick={(e) => {
                    addSocialMediaInput(e);
                  }}
                />
              </div>
              {data.parameters.map((item, index) => (
                <div className="grid grid-cols-3 gap-2" key={index}>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-mid-grey">Name</p>
                    <input
                      type="text"
                      name="name"
                      className="p-1 rounded-lg border-[1px] border-solid gorder-mid-grey"
                      value={item.name}
                      onChange={(e: any) => handleInputChange(index, e)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-mid-grey">Type</p>
                    <select
                      name="in"
                      id="requestMethod"
                      className="border-none outline-none"
                      value={item.in}
                      onChange={(e: any) => handleInputChange(index, e)}
                    >
                      <option value="">Choose Param Type</option>
                      <option value="query">Query</option>
                      <option value="header">Header</option>
                      <option value="cookie">Cookie</option>
                      {requestMethod !== "get" &&
                        requestMethod !== "delete" && (
                          <option value="body">Body</option>
                        )}
                      {/* <option value="DELETE">DELETE</option> */}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-mid-grey">
                      {" "}
                      Data Type
                    </p>
                    <select
                      name="schema"
                      id="requestMethod"
                      className="border-none outline-none"
                      value={item.schema.type}
                      onChange={(e: any) =>
                        handleInputChange(index, e, {
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose Data Type</option>
                      <option value="integer">Integer</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                      <option value="boolean">Boolean</option>
                      {item.in === "Body" && (
                        <option value="object">Object</option>
                      )}
                      {/* <option value="DELETE">DELETE</option> */}
                    </select>
                  </div>

                  <FaCircleMinus
                    className="text-red-600"
                    onClick={() => removeSocialMediaInput(index)}
                  />
                  {/* <div className="flex flex-col gap-1">
                    <Checkbox onChange={(e) => handleInputChange(index, e)}>
                      {" "}
                      Required
                    </Checkbox>
                  </div> */}
                </div>
              ))}
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Endpoint Policies</p>{" "}
              {policyLevel === "operation" ? (
                <select
                  name="rateLimit"
                  id="rateLimit"
                  className="border-none outline-none"
                  value={data["x-throttling-tier"]}
                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        "x-throttling-tier": e.target.value,
                      };
                    })
                  }
                >
                  <option value="">Choose a policy</option>
                  {policies.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="">
                  <p className="text-sm font-semibold">
                    Rate limiting is governed by API level
                  </p>
                </div>
              )}
              {/* <select
                name="rateLimit"
                id="rateLimit"
                className="border-none outline-none"
              >
                <option value="">Choose a policy</option>
                {policies.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Description</p>
              <textarea
                placeholder="Describe your Endpoint"
                name="endpointDescription"
                id="endpointDescription"
                rows={5}
                value={data.description}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      description: e.target.value,
                    };
                  });
                }}
              ></textarea>
            </div>
            <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
              <p className="text-xs text-dark-grey">Summary</p>
              <textarea
                placeholder="Describe your Endpoint"
                name="endpointDescription"
                id="endpointDescription"
                rows={5}
                value={data.summary}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      summary: e.target.value,
                    };
                  });
                }}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <Button
                type="fit"
                text="save"
                onClick={() => {
                  createEndpoint();
                }}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
