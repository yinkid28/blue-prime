import { useApi } from "@/context/ApiDiscoveryContext";
import Image, { StaticImageData } from "next/image";
import profileImage from "../../../public/images/profile-img.svg";
import Link from "next/link";

export function ApiInformationView() {
  const { api } = useApi();

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full p-4">
      <div className="w-full md:w-[32%] space-y-4 pt-6 px-4">
        <div className="space-y-[19px]">
          <div className="flex flex-col lg:flex-row gap-3">
            <Image
              src={api?.img as StaticImageData}
              alt="icon"
              width={42}
              height={42}
            />
            <div className="flex flex-col gap-[2px]">
              <h3 className="text-sm font-semibold">{api?.title}</h3>
              <div className="flex gap-2">
                <Image
                  src={profileImage}
                  alt="person-profile"
                  width={16}
                  height={16}
                />
                <p>Mr MajekFashek_</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-dark-grey text-xs whitespace-nowrap font-semibold">
              Created: 12th Dec 2024
            </p>
            <p className="bg-dark-grey-fade whitespace-nowrap text-xs text-blue-dark rounded-full px-2 py-[1.5px]">
              Version 1
            </p>
          </div>
          <p className="text-blue-dark text-xs font-semibold">Entertainment</p>
        </div>
        <p className="text-base text-dark-grey">
          The app is a comprehensive resource that can help you stay up-to-date
          on everything that&apos;s happening at the company. You can find news
          articles, blog posts, videos, and presentations about company
          initiatives, product launches, and employee successes. You can also
          find information about upcoming events, training opportunities, and
          resources for your work.
        </p>
        {/* resources and links section */}
        <div className="space-y-2 p-4 bg-resources-bg rounded-lg border-light-grey border">
          <p className="text-blue-dark font-bold">Resources and Links</p>
          <p className="text-mid-grey font-bold">
            https://www.dnncw8h,com/dju/djvb
          </p>
        </div>
      </div>

      <div className="border rounded-lg space-y-4 w-full md:w-[65%] p-4 h-fit lg:h-[70dvh]">
        <h2 className="text-mid-grey font-bold">Basic Information</h2>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">Base URL</p>
          <p className="whitespace-nowrap text-dark-txt">
            https://howtocode.com
          </p>
        </div>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">Context</p>
          <p className="whitespace-nowrap text-dark-txt">/specs</p>
        </div>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">Type</p>
          <p className="whitespace-nowrap text-dark-txt">https</p>
        </div>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">Transports</p>
          <p className="whitespace-nowrap text-dark-txt">HTTPS</p>
        </div>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">API Security</p>
          <p className="whitespace-nowrap text-dark-txt">OAuth2_</p>
        </div>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">Access Control</p>
          <p className="whitespace-nowrap text-dark-txt">None</p>
        </div>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">Production Endpoint</p>
          <p className="md:whitespace-nowrap text-dark-txt">
            https://loacalhost:8494/pg/sample/opinions
          </p>
        </div>
        <div className="flex flex-col items-start lg:grid lg:grid-cols-2 w-[50%] h-fit">
          <p className="font-semibold text-dark-grey">Sandbox Endpoint</p>
          <p className="md:whitespace-nowrap text-dark-txt">
            https://loacalhost:8494/pg/sample/opinions
          </p>
        </div>
      </div>
    </div>
  );
}

export function DocumentationView() {
  return (
    <div>
      <p className="text-blue-dark text-xs font-semibold mb-[10px]">
        Entertainment
      </p>
      <div className="text-sm space-y-4">
        <h2>README</h2>
        <div className="space-y-4">
          <span className="text-base my-2">Crunchbase API Overview</span>
          <p>
            Enterprise and Applications licensees have access to the full
            Crunchbase API. Basic Access licensees are limited to the
            /odm-organizations and /odm-people collection endpoints which return
            data from the{" "}
            <Link href={"https://data.crunchbase.com/v3.1/docs/open-data-map"}>
              Open Data Map
            </Link>
            . Pricing plans available
            <ol className="list-decimal ml-5">
              <li>Basic free plan - unlimited access to ODM data only.</li>
              <li>
                Full access to the Crunchbase Dataset - please contact us at
                support@rapidapi.com
              </li>
            </ol>
          </p>
        </div>
        <div className="space-y-4">
          <span className="text-base my-2">Collections</span>
          <p>
            The Crunchbase API provides Collection endpoints to retrieve the
            entire set and core properties of many of the important Item types
            in the Crunchbase Dataset. The Crunchbase API returns 100 items per
            page.
          </p>
        </div>
        <div className="space-y-4">
          <span className="text-base my-2">Item Details</span>
          <p>
            Further, the Crunchbase API provides Item Detail endpoints to
            retrieve not only the core properties of each Node but also the
            details of related Items. The Crunchbase API returns 10 items per
            relationship type. For example, you might get 10 investments. Then
            you can use the investments endpoint
            /organizations/:permalink/investments for an entity to get a further
            1000 investments per page if you require more.
          </p>
        </div>
        <div className="space-y-4">
          <span className="text-base my-2">Relationship Names</span>
          <p>
            To narrow your search, you can provide a relationship name as part
            of the API request:
            <Link
              href={
                "https://data.crunchbase.com/docs/organization#section-relationships"
              }
            ></Link>
            Organization RelationshipsPeople RelationshipsAcquisitions
            RelationshipsIPO RelationshipsFunds Relationships
          </p>
        </div>
      </div>
    </div>
  );
}
