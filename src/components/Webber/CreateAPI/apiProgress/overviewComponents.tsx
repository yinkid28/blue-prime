import { useApi } from "@/context/ApiDiscoveryContext";

export function ApiDetailsCard() {
  const { api } = useApi();
  return (
    <div className="w-full border-[1px] flex flex-col  gap-3 border-light-grey rounded-lg p-3">
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="md:text-xl font-bold">{api?.name}</p>

        {/* add badge for created at */}
      </div>

      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Description
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.description}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">Provider</p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.provider}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">Context</p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.context}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">Version</p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          V {api?.version}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">Type</p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.type}
        </p>
      </div>
    </div>
  );
}
export function ApiConfigurationCard() {
  const { api } = useApi();
  return (
    <div className="w-full border-[1px] flex flex-col  gap-3 border-light-grey rounded-lg p-3">
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="md:text-xl text-mid-grey font-bold">Configuration</p>

        {/* add badge for created at */}
      </div>

      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Transports
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api && api?.transport?.length > 0
            ? api?.transport.map(
                (item, index) =>
                  `${item.toUpperCase()}${
                    index !== api.transport.length - 1 ? "," : ""
                  }`
              )
            : "HTTPS"}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          API Security
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {" "}
          {api && api?.securityScheme?.length > 0
            ? api?.securityScheme.map(
                (item, index) =>
                  `${item}${index !== api.securityScheme.length - 1 ? "," : ""}`
              )
            : "OAuth2_"}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Access Control
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.accessControl}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Visibility
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.visibility}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Business Plans
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          Gold, Unlimited
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">Tags</p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {" "}
          {api && api?.tags?.length > 0
            ? api?.tags.map(
                (item, index) =>
                  `${item}${index !== api.tags.length - 1 ? "," : ""}`
              )
            : "http"}
        </p>
      </div>
    </div>
  );
}
export function ApiEndpointCard() {
  const { api } = useApi();
  return (
    <div className="w-full border-[1px] flex flex-col  gap-3 border-light-grey rounded-lg p-3">
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="md:text-xl text-mid-grey font-bold">Endpoint</p>

        {/* add badge for created at */}
      </div>

      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Production Endpoint
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.endpointConfig
            ? api?.endpointConfig?.production_endpoints?.url
            : ""}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Sandbox Endpoint
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          {api?.endpointConfig
            ? api?.endpointConfig?.sandbox_endpoints?.url
            : ""}
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Production Endpoint Security
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">
          /sample/options
        </p>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <p className="w-fit md:w-[30%] font-semibold text-mid-grey">
          Sandbox Endpoint Security
        </p>
        <p className="w-fit md:w-[60%] font-normal text-mid-grey">public</p>
      </div>
    </div>
  );
}
