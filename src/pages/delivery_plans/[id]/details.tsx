import Layout from "@/components/Layout/layout";
import { Button, Goback } from "@/components/utils";
import { GrFilter } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
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
import { useEffect, useRef, useState } from "react";
import ADPServices from "@/services/adp_services/adp_services";
import { useOnboarding } from "@/context/OnboardingContext";
import { Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PiUsersThree } from "react-icons/pi";
import { FiCalendar } from "react-icons/fi";
import { RiShipLine } from "react-icons/ri";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { recdata } from "../../../../constants";
import { AdpDashboardData } from "@/models/adp.model";
import { formatNumber, months } from "@/helper_utils/helpers";

export default function DeliveryPlanDetails() {
  const router = useRouter();
  const { id, name } = router.query;
  const [offset, setOffset] = useState<number>(0);
  const [templateData, setTemplateData] = useState<AdpDashboardData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [monthlyTrend, setMonthlytrend] = useState<any[]>([]);
  const [buyerTrend, setBuyertrend] = useState<any[]>([]);

  const { setApiErrorMessage, user } = useOnboarding();
  const spreadsheetRef = useRef<SpreadsheetComponent | null>(null);

  const getExcelRecords = async (id: number) => {
    setLoading(true);
    try {
      const res = await ADPServices.getExcelRecordsById(id);
      if (res) {
        setData(res);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  const getDashboardData = async (id: number) => {
    setLoading(true);
    try {
      const res = await ADPServices.getTemplateData(id);
      if (res.status === "OK") {
        setTemplateData(res.data);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  const getMonthlyTrend = async (id: number) => {
    setLoading(true);
    try {
      const res = await ADPServices.getMonthlyTrend(id);
      if (res.status === "OK") {
        const data: {
          cargo_Count: number;
          month: number;
        }[] = res.data;
        const newData = data.map((item, index) => {
          return {
            ...item,
            month: months[item.month - 1],
          };
        });
        setMonthlytrend(newData);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  const getBuyerTrend = async (id: number) => {
    setLoading(true);
    try {
      const res = await ADPServices.getBuyerTrend(id);
      if (res.status === "OK") {
        const data: {
          cargo_Count: number;
          top_Buyer: number;
          month: number;
        }[] = res.data;
        const newData = data.map((item, index) => {
          return {
            ...item,
            month: months[item.month - 1],
          };
        });
        setBuyertrend(newData);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  useEffect(() => {
    if (id) {
      getExcelRecords(parseInt(id as string));
      getDashboardData(parseInt(id as string));
      getMonthlyTrend(parseInt(id as string));
      getBuyerTrend(parseInt(id as string));
    }
  }, [id]);
  const onCreated = () => {
    // setIsInitialized(true);
    const spreadsheet = spreadsheetRef.current;
    if (spreadsheet) {
      // Apply styles to the specified range in the active sheet.
      spreadsheet.cellFormat(
        { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
        "A1:Z1"
      );
      setLoading(false);
      spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "A2:A500");
      spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "C2:C500");
      spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "D2:D500");
      spreadsheet.numberFormat("m/d/yyyy hh:mm AM/PM", "I2:I500");
      const lastColumnIndex = spreadsheet.sheets?.[0]?.usedRange?.colIndex ?? 0;

      // Define the range from the first cell (A1) to the last column in the first row
      const range = `A1:${String.fromCharCode(65 + lastColumnIndex)}1`; // 65 is ASCII for 'A'

      // Apply the background color to the first row up to the last used column
      spreadsheet.cellFormat(
        { backgroundColor: "#f5f5f5" }, // Set your desired color
        range
      );
      spreadsheet.setRowHeight(50);
    }
  };
  return (
    <Layout
      page={`ADP Summary: `}
      subPageText={
        <span className="text-[#757575] font-[400]">{name as string} </span>
      }
    >
      <div className="flex flex-col gap-8 w-full">
        <Goback />
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="w-fit bg-secondaryBg h-fit p-3 rounded-lg text-secondary">
                <PiUsersThree />
              </div>
              <div className="flex flex-col">
                <p className="text-[#474A57] text-xl font-[500]">
                  {templateData?.total_BUYERS}
                </p>
                <p className="text-[#757575] text-xs font-[500]">Buyer#</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-fit bg-secondaryBg h-fit p-3 rounded-lg text-secondary">
                <FiCalendar />
              </div>
              <div className="flex flex-col">
                <p className="text-[#474A57] text-xl font-[500]">
                  {templateData?.total_CARGOS}
                </p>
                <p className="text-[#757575] text-xs font-[500]">Cargo#</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-fit bg-secondaryBg h-fit p-3 rounded-lg text-secondary">
                <FiCalendar />
              </div>
              <div className="flex flex-col">
                <p className="text-[#474A57] text-xl font-[500]">
                  {templateData &&
                    formatNumber(templateData?.total_QTY as number)}
                </p>
                <p className="text-[#757575] text-xs font-[500]">
                  Quantity (M3)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-fit bg-secondaryBg h-fit p-3 rounded-lg text-secondary">
                <RiShipLine />
              </div>
              <div className="flex flex-col">
                <p className="text-[#474A57] text-xl font-[500]">
                  {templateData?.busiest_TERMINAL}
                </p>
                <p className="text-[#757575] text-xs font-[500]">
                  Busiest Receiving Terminal
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-2">
              <div className="w-fit bg-secondaryBg h-fit p-3 rounded-lg text-secondary">
                <FaRegUserCircle />
              </div>
              <div className="flex flex-col">
                <p className="text-[#474A57] text-xl font-[500]">31</p>
                <p className="text-[#757575] text-xs font-[500]">
                  Most Active Buyer
                </p>
              </div>
            </div> */}
          </div>
          <Button
            type="fit"
            text="Submit"
            onClick={() => {
              router.push(`/delivery_plans/${id as string}/activities`);
            }}
            className="font-semibold rounded-xl"
          />
        </div>

        <div className="w-full flex items-center gap-8">
          <div className="w-full flex flex-col gap-3">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                data={monthlyTrend}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cargo_Count"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-sm font-[600] text-[#757575]">
              Monthly Delivery trend for ADP Year
            </p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                data={buyerTrend}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="top_Buyer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cargo_Count"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-sm font-[600] text-[#757575]">
              Monthly Delivery trend the most active buyer
            </p>
          </div>
        </div>
        {loading ? (
          <Skeleton width={"100%"} height={500} />
        ) : (
          <SpreadsheetComponent
            ref={spreadsheetRef}
            created={onCreated}
            allowSave={false}
            allowEditing={false}
            allowOpen={false}
            showRibbon={false}
          >
            <SheetsDirective>
              <SheetDirective name={name as string}>
                <RangesDirective>
                  <RangeDirective dataSource={data}></RangeDirective>
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
        )}
      </div>
    </Layout>
  );
}
