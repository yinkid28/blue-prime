"use client";
import {
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  RangesDirective,
  RangeDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective,
  ColumnDirective,
  UsedRangeModel,
} from "@syncfusion/ej2-react-spreadsheet";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { defaultData } from "../../../constants";
import { Dispatch, SetStateAction, useState } from "react";
import { handleLastModified } from "@/helper_utils/helpers";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
type steponeProps = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  file: File | null;
  onClose: () => void;
};
export default function StepTwo({
  setStep,
  step,
  file,
  onClose,
}: steponeProps) {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [preclose, setPreclose] = useState<boolean>(false);
  const [showValidations, setShowValidations] = useState<boolean>(true);
  let spreadsheet: any;
  const boldRight = { fontWeight: "bold", textAlign: "right" };
  const bold = { fontWeight: "bold" };
  const onCreated = () => {
    // Apply styles to the specified range in the active sheet.
    spreadsheet.cellFormat(
      { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
      "A1:F1"
    );
    // Apply format to the specified range in the active sheet.
    spreadsheet.numberFormat("$#,##0.00", "F2:F31");
    // The default format code for the date format is 'm/d/yyyy'.
    spreadsheet.numberFormat("m/d/yyyy", "E2:E30");
    // let usedRange: UsedRangeModel = spreadsheet.sheets[0].usedRange;
    // let sheetHeight: number =
    //   spreadsheet.element.querySelector(".e-main-panel").clientHeight;
    // if (usedRange.rowIndex) {
    //   let height: number = Math.floor(sheetHeight / usedRange.rowIndex);
    //   spreadsheet.setRowsHeight(height);
    // }
  };
  const handlesetNextStep = () => {
    const nextStep = step + 1;
    localStorage.setItem("step", `${nextStep}`);
    setStep(nextStep);
  };
  const handlesetPrevStep = () => {
    const prevStep = step - 1;
    localStorage.setItem("step", `${prevStep}`);
    setStep(prevStep);
  };
  setTimeout(() => {
    setDisabled(false);
  }, 2000);
  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div
          className={`${
            preclose ? "block" : "hidden"
          } w-full bg-error-bg transition-all ease-in-out duration-700 flex items-center justify-between px-5 py-2 mb-3 rounded-lg`}
        >
          <p className="text-error">
            Are you sure you want to close this ADP upload process?
          </p>
          <div className="flex items-center gap-3">
            <button
              className={`w-fit h-fit flex px-3 text-[#353535] py-1 items-center gap-2 rounded-full 
               bg-[#D5D5D5]
               
              `}
              onClick={() => setPreclose(false)}
            >
              Cancel
            </button>
            <button
              className={`w-fit h-fit flex px-3 py-1 bg-red-600 text-white items-center gap-2 rounded-full`}
              onClick={() => {
                onClose();
                handlesetPrevStep();
              }}
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex w-full justify-between text-white bg-[#052113] rounded-t-xl p-3">
          <div className="flex items-center  gap-2 w-fit">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="10" fill="#F5F5F5" />
              <g clip-path="url(#clip0_129_1435)">
                <path
                  d="M10.859 10.877L23.429 9.08197C23.5 9.07179 23.5723 9.07699 23.641 9.0972C23.7098 9.11741 23.7734 9.15216 23.8275 9.1991C23.8817 9.24605 23.9251 9.30408 23.9549 9.36928C23.9846 9.43447 24 9.5053 24 9.57697V30.423C24 30.4945 23.9846 30.5653 23.9549 30.6304C23.9252 30.6955 23.8819 30.7535 23.8279 30.8004C23.7738 30.8473 23.7103 30.8821 23.6417 30.9024C23.5731 30.9227 23.5009 30.928 23.43 30.918L10.858 29.123C10.6196 29.089 10.4015 28.9702 10.2437 28.7883C10.0859 28.6065 9.99903 28.3738 9.99902 28.133V11.867C9.99903 11.6262 10.0859 11.3935 10.2437 11.2116C10.4015 11.0297 10.6196 10.9109 10.858 10.877H10.859ZM12 12.735V27.265L22 28.694V11.306L12 12.735ZM25 27H28V13H25V11H29C29.2652 11 29.5196 11.1053 29.7071 11.2929C29.8947 11.4804 30 11.7348 30 12V28C30 28.2652 29.8947 28.5195 29.7071 28.7071C29.5196 28.8946 29.2652 29 29 29H25V27ZM18.2 20L21 24H18.6L17 21.714L15.4 24H13L15.8 20L13 16H15.4L17 18.286L18.6 16H21L18.2 20Z"
                  fill="#007A3D"
                />
              </g>
              <defs>
                <clipPath id="clip0_129_1435">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(8 8)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="flex flex-col">
              <p className="font-[500]">{file?.name}</p>
              <p className="font-[500] text-xs text-[#757575]">
                last updated {handleLastModified(file as File)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 ">
            <button
              className={`w-fit h-fit flex px-3 py-1 items-center gap-2 rounded-full ${
                disabled ? "bg-[#D5D5D5]" : "bg-primary"
              }`}
              onClick={handlesetNextStep}
            >
              <MdCheck />
              Submit
            </button>
            <RxCross2
              className="text-2xl cursor-pointer"
              onClick={() => {
                setPreclose(true);
              }}
            />
          </div>
        </div>
        <div className="flex ">
          <div
            className={`${
              showValidations ? "w-[80%]" : "w-full"
            } ease-in-out duration-700`}
          >
            <SpreadsheetComponent
              openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
              saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
              ref={(ssObj) => {
                spreadsheet = ssObj;
              }}
              created={onCreated}
              //   style={{ height: "100%" }}
            >
              <SheetsDirective>
                <SheetDirective name="Car Sales Report">
                  <RangesDirective>
                    <RangeDirective dataSource={defaultData}></RangeDirective>
                  </RangesDirective>
                  <RowsDirective>
                    <RowDirective index={30}>
                      <CellsDirective>
                        <CellDirective
                          index={4}
                          value="Total Amount:"
                          //   style={boldRight}
                        ></CellDirective>
                        <CellDirective
                          formula="=SUM(F2:F30)"
                          //   style={bold}
                        ></CellDirective>
                      </CellsDirective>
                    </RowDirective>
                  </RowsDirective>
                  <ColumnsDirective>
                    <ColumnDirective width={180}></ColumnDirective>
                    <ColumnDirective width={130}></ColumnDirective>
                    <ColumnDirective width={130}></ColumnDirective>
                    <ColumnDirective width={180}></ColumnDirective>
                    <ColumnDirective width={130}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                  </ColumnsDirective>
                </SheetDirective>
              </SheetsDirective>
            </SpreadsheetComponent>
          </div>
          <div
            className={`${
              showValidations ? "w-[20%]" : "w-[5%]"
            } ease-in-out d ration-700 flex bg-white p-5 flex-col gap-4`}
          >
            <div className=" text-[#353535] flex items-center justify-between">
              <p
                className={`ease-in-out duration-700 ${
                  showValidations
                    ? "block text-ellipsis overflow-hidden text-nowrap w-[60%]"
                    : "hidden "
                } `}
              >
                Validation Error
              </p>
              {showValidations ? (
                <ChevronRightIcon
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setShowValidations(false);
                  }}
                />
              ) : (
                <ChevronLeftIcon
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setShowValidations(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
