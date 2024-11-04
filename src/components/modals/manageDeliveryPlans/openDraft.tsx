import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";

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
  BeforeSaveEventArgs,
  SaveCompleteEventArgs,
} from "@syncfusion/ej2-react-spreadsheet";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import {
  DataManager,
  Query,
  UrlAdaptor,
  WebApiAdaptor,
} from "@syncfusion/ej2-data";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { handleLastModified } from "@/helper_utils/helpers";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { getJWT } from "@/services/httpInstance/wrappedinstance";
import ADPServices from "@/services/adp_services/adp_services";
import { useOnboarding } from "@/context/OnboardingContext";
import { Skeleton } from "@chakra-ui/react";
import CustomWebApiAdaptor from "@/helper_utils/customApiAdaptor";
import { IADPTemplate, IUploadError } from "@/models/adp.model";
import { BiError } from "react-icons/bi";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plan: IADPTemplate;
};
export default function OpenDraft({
  isOpen,
  onClose,
  plan,
}: addEndpointModalProps) {
  const router = useRouter();
  const toast = useToast();
  const { year, product } = router.query;
  const [file, setfile] = useState<File>();
  const [preclose, setPreclose] = useState<boolean>(false);
  const [showValidations, setShowValidations] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IUploadError[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [draft, setDraft] = useState(false);
  const [isSavingdraft, setIsSavingDraft] = useState(false);
  const { setApiErrorMessage, user } = useOnboarding();
  const spreadsheetRef = useRef<SpreadsheetComponent | null>(null);
  const uploadFile = async (
    year: number,
    product: string,
    uploadedBy: string,
    file: File
  ) => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file as File);
      formData.append("templateYear", year.toString());
      formData.append("product", product);
      formData.append("uploadedBy", uploadedBy);

      try {
        const res = await ADPServices.UploadAdp(formData);
        if (res.templateId !== undefined) {
          setLoading(false);

          router.push(
            {
              pathname: router.pathname,
              query: { templateId: res.templateId },
            },
            undefined,
            { shallow: true }
          );
        }
      } catch (error: any) {
        console.log(error);
        router.push(
          {
            pathname: router.pathname,
            query: { year, product },
          },
          undefined,
          { shallow: true }
        );
        setLoading(false);
        const errors = error?.response?.data?.errors;
        setErrors(errors);
        return;
      }
    }
  };
  const uploadasDraft = async (
    year: number,
    product: string,
    uploadedBy: string,
    file: File
  ) => {
    setLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file as File);
      formData.append("templateYear", year.toString());
      formData.append("product", product);
      formData.append("uploadedBy", uploadedBy);

      try {
        const res = await ADPServices.UploadAdpasDraft(formData);
        if (res.templateId !== undefined) {
          setLoading(false);
          onClose();
        }
      } catch (error: any) {
        console.log(error);
        router.push(
          {
            pathname: router.pathname,
            query: { year, product },
          },
          undefined,
          { shallow: true }
        );
        setLoading(false);
        const errors = error?.response?.data?.errors;
        setErrors(errors);
        return;
      }
    }
  };

  const onCreated = () => {
    setIsInitialized(true);
    const spreadsheet = spreadsheetRef.current;
    if (spreadsheet) {
      // Apply styles to the specified range in the active sheet.
      spreadsheet.cellFormat(
        { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
        "A1:Z1"
      );
      spreadsheet.open({ file: file as File });
      setLoading(false);
      // spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "A2:A500");
      // spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "C2:C500");
      // spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "D2:D500");
      // spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "I2:I500");
      // Apply format to the specified range in the active sheet.
      // spreadsheet.numberFormat("$#,##0.00", "F2:F31");
      // The default format code for the date format is 'm/d/yyyy'.
      // spreadsheet.numberFormat("m/d/yyyy", "E2:E30");
      // let usedRange: UsedRangeModel = spreadsheet.sheets[0].usedRange;
      // let sheetHeight: number =
      //   spreadsheet.element.querySelector(".e-main-panel").clientHeight;
      // if (usedRange.rowIndex) {
      //   let height: number = Math.floor(sheetHeight / usedRange.rowIndex);
      //   spreadsheet.setRowsHeight(height);
      // }
    }
  };

  const beforeSave = (args: BeforeSaveEventArgs): void => {
    args.needBlobData = true; // To trigger the saveComplete event.
    args.isFullPost = false; // Get the spreadsheet data as blob data in the saveComplete event.
  };
  const triggerSave = () => {
    if (spreadsheetRef.current) {
      spreadsheetRef.current.save({
        fileName: "modified.xlsx",
        saveType: "Xlsx", // Choose the desired format
      });
      setLoading(true);
    }
  };
  useEffect(() => {
    if (plan) {
      fetchFile(plan);
    }
  }, [plan]);
  const fetchFile = async (template: IADPTemplate) => {
    setLoading(true);
    try {
      const response = await fetch(template.filePath);

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileBlob = await response.blob();
      const file = new File([fileBlob], "draft.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      setfile(file);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching the file:", error);
    }
  };
  const saveComplete = (args: SaveCompleteEventArgs): void => {
    // To obtain the blob data.
    console.log("Spreadsheet BlobData :", args.blobData);
    const file = new File([args.blobData], "modified.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    if (draft) {
      uploadasDraft(
        parseInt(year as string),
        product as string,
        user?.name as string,
        file
      );
    } else {
      uploadFile(
        parseInt(year as string),
        product as string,
        user?.name as string,
        file
      );
    }
  };
  const onDataBound = () => {
    const spreadsheet = spreadsheetRef.current;

    // if (spreadsheet && isInitialized) {
    //   spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "A2:A500");
    //   spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "C2:C500");
    //   spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "D2:D500");
    //   spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "I2:I500");
    // }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent className="p-2 " bg={"#05211340"}>
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="w-full">
            <div className="flex flex-col w-full">
              <div
                className={`${
                  preclose ? "block" : "hidden"
                } w-full bg-error-bg transition-all ease-in-out duration-700 flex items-center justify-between px-5 py-2 mb-3 rounded-lg`}
              >
                <p className="text-error">
                  Do you want to save this template as a draft
                </p>
                <div className="flex items-center gap-3">
                  <button
                    className={`w-fit h-fit flex px-3 text-[#353535] py-1 items-center gap-2 rounded-full 
               bg-[#D5D5D5]
               
              `}
                    onClick={() => {
                      setDraft(true);
                      triggerSave();
                    }}
                  >
                    Save as Draft
                  </button>
                  <button
                    className={`w-fit h-fit flex px-3 py-1 bg-red-600 text-white items-center gap-2 rounded-full`}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Close
                  </button>
                  <RxCross2
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      setPreclose(false);
                    }}
                  />
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
                    <g clipPath="url(#clip0_129_1435)">
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
                      {/* last updated {handleLastModified(file as File)} */}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ">
                  <button
                    className={`w-fit h-fit flex px-3 py-1 items-center gap-2 rounded-full ${
                      !isInitialized ? "bg-[#D5D5D5]" : "bg-primary"
                    }`}
                    disabled={!isInitialized}
                    onClick={() => {
                      triggerSave();
                    }}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <>
                        <MdCheck />
                        Submit
                      </>
                    )}
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
                    showValidations ? " w-[70%]" : "w-full"
                  }  ease-in-out duration-700`}
                >
                  <SpreadsheetComponent
                    openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
                    saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
                    ref={spreadsheetRef}
                    created={onCreated}
                    dataBound={onDataBound}
                    beforeSave={beforeSave}
                    saveComplete={saveComplete}
                    allowSave
                    showRibbon={false}

                    //   style={{ height: "100%" }}
                  >
                    <SheetsDirective>
                      <SheetDirective name={file?.name}>
                        <RangesDirective>
                          <RangeDirective></RangeDirective>
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
                    showValidations ? "w-[30%]" : "w-[5%]"
                  } ease-in-out text-[#353535] duration-700 flex bg-white p-5 flex-col gap-4`}
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
                  <p
                    className={`ease-in-out duration-700 ${
                      showValidations
                        ? "block text-ellipsis overflow-hidden text-nowrap w-[60%]"
                        : "hidden "
                    } `}
                  >
                    {errors.length} error{errors.length > 1 ? "s" : ""} found
                  </p>

                  {errors.map((item, index) => (
                    <div className="flex  gap-2 p-2 text-sm" key={index}>
                      <BiError className="text-red-600 mt-2" />
                      <div className="flex flex-col ">
                        <p
                          className={`ease-in-out font-[700] duration-700 ${
                            showValidations ? "" : "hidden "
                          } `}
                        >
                          {item.Message}
                        </p>
                        <div className="flex items-center gap-2">
                          <p
                            className={`ease-in-out  duration-700 ${
                              showValidations ? "" : "hidden "
                            } `}
                          >
                            column: {item.ColumnName}
                          </p>
                          <p
                            className={`ease-in-out duration-700 ${
                              showValidations ? "" : "hidden "
                            } `}
                          >
                            row: {item.Row}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
