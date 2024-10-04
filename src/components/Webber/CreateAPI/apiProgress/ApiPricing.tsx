import { Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { CreatePricingDto } from "@/models/api.model";
import APIServices from "@/services/api_services/api_service";
import { Checkbox, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ApiPricingView() {
  const [value, setValue] = useState<string>("1");
  const [pricingModel, setPricingModel] = useState<string>("FREE");
  const [currency, setCurrency] = useState<string>("");
  const [billingCycle, setBillingCycle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [priceSet, setPriceSet] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [pricePlan, setPricePlan] = useState();
  const { api } = useApi();
  const { setApiErrorMessage } = useOnboarding();
  const toast = useToast();
  const createPrice = async (aco: string) => {
    setLoading(true);
    if (api) {
      const data: CreatePricingDto = {
        pricingModel,
        currency,
        price,
        billingCycle: "MONTHLY",
      };

      try {
        const res = await APIServices.createApiPricing(aco, data);
        console.log(res);
        if (res === 201) {
          setLoading(false);
          toast({
            title: "Update Api",
            description: "API Thumbnail successfully Updated",
            duration: 3000,
            position: "bottom-right",
          });
          getApiPricing(api.apiCode);
          // router.reload();
        }
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        console.error("Caught error:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An unknown error occurred";
        setApiErrorMessage(errorMessage, "error");
      }
    }
  };
  const getApiPricing = async (aco: string) => {
    try {
      const res = await APIServices.getApiPricing(aco);
      console.log(res);
      if (res.data.id !== undefined) {
        // setApi(res.data);
        setPriceSet(true);
      }
      // setLoading(false);
    } catch (error: any) {
      // setLoading(false);
      const errorMessage = error?.response?.data?.message;
      setApiErrorMessage(errorMessage, "error");
    }
  };

  useEffect(() => {
    if (api) {
      getApiPricing(api.apiCode);
    }
  }, [api]);
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-sm text-mid-grey">Price per request</p>

      <div className="flex flex-col  gap-1">
        <p className="text-xs text-dark-grey">Pricing Model</p>
        <select
          className="outline-none border w-full p-2 rounded-lg"
          onChange={(e) => setPricingModel(e.target.value)}
        >
          <option value="FREE">Free</option>
          <option value="BASIC">Basic</option>
          <option value="STANDARD">Standard</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>
      <div className="flex flex-col  gap-1">
        <p className="text-xs text-dark-grey">Currency</p>
        <select
          className="outline-none border w-full p-2 rounded-lg"
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="NGR">NGR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Price</p>
        <input
          type="number"
          name="price"
          placeholder="$2"
          className="outline-none bg-transparent"
          // disabled
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
      </div>

      <div className="flex w-full justify-end">
        <Button
          type="fit"
          text={priceSet ? "Request Price Update" : "Create Price Plan"}
          loading={loading}
          onClick={() => {
            if (api) {
              !priceSet && createPrice(api?.apiCode);
            }
          }}
        />
      </div>
    </div>
  );
}
