import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbItems, BreadCrumbs, Table } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { UseToastOptions, useToast } from "@chakra-ui/react";
import { getFormattedDate } from "@/helper_utils/helpers";
import APIServices from "@/services/api_services/api_service";
import CopyIcon from "../../../../../../public/icons/copyicon";

// remember to use static generation here but for now we will use context to get current api
const WeaverLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});

export default function AppDetails() {
  const { api, setApi } = useApi();
  const router = useRouter();
  const { detailId } = router.query;
  const { setSidebar } = useOnboarding();
  const [view, setView] = useState<string>("prod");

  useEffect(() => {
    setSidebar("appDetails");
  }, []);

  const allGrants = [
    "Refresh Token",
    "SAML2",
    "Password",
    "device code",
    "code",
    "JWT",
    "IWA-NLTM",
    "Client Credientials",
    "urn:ietf:parama:oauth:grant-type:token-exchange",
  ];

  const breadCrumbs: BreadCrumbItems[] = [
    {
      breadCrumbText: "Library",
      breadCrumbPath: `/webber/library`,
    },
    {
      breadCrumbText: `${api?.name}-Overview`,
      breadCrumbPath: `/webber/library/${api?.name}/overview`,
    },
  ];

  return (
    <WeaverLayout>
      <Navbar title={`${api?.name}`} />
      {/* Fix the breadcrumbs before commiting. Use the commented code in api_manager.tsx as a guide */}
      <BreadCrumbs
        breadCrumbItems={breadCrumbs}
        breadCrumbActiveItem={`${detailId}`}
      />
      <div className="border rounded-xl p-4 mx-4 my-6 min-h-[80dvh] text-dark-txt">
        <div className="flex gap-4 items-center mb-6">
          <p className="font-semibold">Edu Student Portal</p>
          <Icon icon="fluent:edit-20-regular" className="text-mid-grey" />
          <Icon icon="fluent:delete-24-regular" className="text-mid-grey" />
        </div>

        <div className="flex gap-2 rounded mb-4">
          <div
            onClick={() => setView("prod")}
            className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer ${
              view === "prod" && "text-primary border-criteria"
            }`}
          >
            Production Keys
          </div>
          <div
            onClick={() => setView("test")}
            className={`border py-2 px-4 text-sm rounded-lg text-mid-grey cursor-pointer ${
              view === "test" && "text-primary border-criteria"
            }`}
          >
            Test Keys
          </div>
        </div>

        {view === "prod" ? (
          <>
            <div className="flex gap-4">
              <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <label htmlFor="secret-key" className="text-xs text-dark-grey">
                  Consumer Secret Key
                </label>
                <input
                  type="text"
                  name="secret-key"
                  id="secret-key"
                  // placeholder="Input JSON URL"
                  className="outline-none bg-transparent"
                  disabled
                  value="hi0qy-9pgeivgnqiv2w-0g3owi1je4gqp192-h[qgen4["
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                <label
                  htmlFor="consumer-key"
                  className="text-xs text-dark-grey"
                >
                  Consumer Key
                </label>
                <input
                  type="text"
                  id="consumer-key"
                  name="consumer-key"
                  // placeholder="Input JSON URL"
                  className="outline-none bg-transparent"
                  disabled
                  value="1-9ie41ighe4o1[39ghb49`-3io4bu38bgfi29-f1-ju30y9u"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <button className="mt-4 border-2 border-primaryFade text-sm py-2 px-[22px] rounded-lg font-semibold text-primary w-fit">
              Generate Access Token
            </button>

            <div className="flex gap-4 mt-6">
              <div className="border-light-grey border w-full rounded-lg p-4 flex flex-col gap-4">
                <p className="font-semibold text-mid-grey">
                  Application Configuration
                </p>
                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <label
                    htmlFor="callback-url"
                    className="text-xs text-dark-grey"
                  >
                    Consumer Key
                  </label>
                  <input
                    type="text"
                    id="callback-url"
                    name="callback-url"
                    placeholder="https://localhost:8000/customersupport/1.0.0%7C"
                    className="outline-none bg-transparent"
                    disabled
                    // value="1-9ie41ighe4o1[39ghb49`-3io4bu38bgfi29-f1-ju30y9u"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
                  <label
                    htmlFor="token-quota"
                    className="text-xs text-dark-grey"
                  >
                    Shared Token Quota
                  </label>
                  <select
                    name="token-quota"
                    id="token-quota"
                    className="border-none outline-none"
                    // value={category}
                    // onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">20 per min</option>
                    <option value="entertainment">40 per min</option>
                  </select>
                </div>

                {/* grant types */}
                <p className="capitalize text-dark-grey text-xs">grant types</p>

                <div className="flex flex-wrap gap-y-4 gap-x-9">
                  {allGrants.map((grant, i) => (
                    <div
                      key={i}
                      className="flex-none flex items-center gap-2 order-1 grow-0"
                    >
                      <input type="checkbox" name={grant} id={grant} />
                      <label
                        className="capitalize whitespace-nowrap"
                        htmlFor={grant}
                      >
                        {grant}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-light-grey border w-full rounded-lg p-4">
                <p className="font-semibold text-mid-grey">Key Configuration</p>
                <div className="flex flex-col gap-4 mt-4 text-sm">
                  <div className="grid grid-cols-[auto_auto_10%]">
                    <p className="font-semibold capitalize text-dark-grey">
                      token endpoint
                    </p>
                    <p className="text-dark-grey">
                      https://localhost:9443/oauth2/token
                    </p>
                    <CopyIcon />
                  </div>
                  <div className="grid grid-cols-[auto_auto_10%]">
                    <p className="font-semibold capitalize text-dark-grey">
                      revoke endpoint
                    </p>
                    <p className="text-dark-grey">
                      https://localhost:9443/oauth2/revoke
                    </p>
                    <CopyIcon />
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="font-semibold capitalize text-dark-grey">
                      application access
                    </p>
                    <p className="text-dark-grey">3600s</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="font-semibold capitalize text-dark-grey">
                      user access
                    </p>
                    <p className="text-dark-grey">4000s</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="font-semibold capitalize text-dark-grey">
                      refresh
                    </p>
                    <p className="text-dark-grey">1500s</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="font-semibold capitalize text-dark-grey">
                      ID
                    </p>
                    <p className="text-dark-grey">2500s</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </WeaverLayout>
  );
}

/* Frame 1321315714 */

/* Auto layout */
/*
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: flex-start;
align-content: flex-start;
padding: 0px;
gap: 16px 34px;

width: 432px;
height: 144px;
*/

/* Inside auto layout 
flex: none;
order: 1;
flex-grow: 0;*/
