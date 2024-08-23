import { Button } from "@/components/utils";
import { Checkbox } from "@chakra-ui/react";

export default function ApiPricingView() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-sm text-mid-grey">Price per request</p>

      <div className="flex items-center gap-2">
        <Checkbox>Free</Checkbox>
        <Checkbox>Custom Price</Checkbox>
      </div>

      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Price</p>
        <input
          type="number"
          name="url"
          placeholder="$2"
          className="outline-none bg-transparent"
          disabled
          //   value={name}
          //   onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-dar-grey">Rate Limit</p>
        <div className="flex items-center gap-2">
          <Checkbox>Free</Checkbox>
          <Checkbox>Custom Price</Checkbox>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
          <p className="text-xs text-dark-grey"> Request calls</p>
          <input
            type="number"
            name="url"
            placeholder="200"
            className="outline-none bg-transparent"
            disabled
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
          <p className="text-xs text-dark-grey">Time</p>
          <select
            name="apiCat"
            id="apiCat"
            className="border-none outline-none"
            //   value={category}
            //   onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Second</option>
            <option value="entertainment">Minute</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
          <p className="text-xs text-dark-grey"> hard limit</p>
          <input
            type="number"
            name="url"
            placeholder="1200"
            className="outline-none bg-transparent"
            disabled
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full rounded-lg border-light-grey border-[1px] p-2 flex flex-col">
        <p className="text-xs text-dark-grey">Billing Frequency</p>
        <select
          name="apiCat"
          id="apiCat"
          className="border-none outline-none"
          //   value={category}
          //   onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">weekly</option>
          <option value="entertainment">Monthly</option>
          <option value="e">Annually</option>
        </select>
      </div>
      <div className="flex w-full justify-end">
        <Button type="fit" text="Save" onClick={() => {}} />
      </div>
    </div>
  );
}
