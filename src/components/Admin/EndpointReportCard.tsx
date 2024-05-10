import { ImockEndpoint } from "@/pages/webber/api_details/[id]/modules";

type CardProps = {
  endpoint: ImockEndpoint;
};
export default function EndpointReportCard({ endpoint }: CardProps) {
  return (
    <div className="w-full border border-light-grey p-1 rounded-lg">
      <div className="flex items-center p-2 justify-between">
        <div className="flex items-center  gap-2">
          <button
            className={`${
              endpoint.method === "POST"
                ? "bg-success"
                : endpoint.method === "PUT"
                ? "bg-warning"
                : endpoint.method === "GET"
                ? "bg-info"
                : "bg-error"
            } w-fit h-fit px-5 py-2 text-white rounded-lg`}
          >
            {endpoint.method}
          </button>
          <div className="flex endpoints-start flex-col gap-1">
            <p className="text-sm font-semibold text-mid-grey">
              {endpoint.url}
            </p>
            <p className="text-xs font-semibold text-light-grey">
              {endpoint.description}
            </p>
          </div>
        </div>
        <div className="w-fit">
          <div className="w-full flex endpoints-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-fit h-fit rounded-full px-3 py-1 bg-criteriaBg text-criteria">
                <p className="text-sm">{endpoint.criteria?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-lightest-grey rounded p-2 flex flex flex-col gap-3">
        <div
          className={`w-fit bg-success-bg text-success px-3 py-1 rounded-full`}
        >
          <p>Approved</p>
        </div>
        <p className="text-sm text-sm">Follows criteria rules</p>
      </div>
    </div>
  );
}
