import { HiOutlineStar } from "react-icons/hi";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";

// All the views
export function OverviewView() {
  const data = [
    { name: "01:00", uv: 200, pv: 2400, amt: 2400 },
    { name: "05:00", uv: 345, pv: 1398, amt: 2210 },
    { name: "10:00", uv: 215, pv: 9800, amt: 2290 },
    { name: "15:00", uv: 768, pv: 3908, amt: 2000 },
    { name: "20:00", uv: 425, pv: 4800, amt: 2181 },
    { name: "25:00", uv: 565, pv: 3800, amt: 2500 },
    { name: "35:00", uv: 230, pv: 4300, amt: 2100 },
  ];

  const barChartData = [
    { name: "01:00", uv: 400, pv: 760, amt: 2400 },
    { name: "05:00", uv: 700, pv: 500, amt: 2210 },
    { name: "10:00", uv: 400, pv: 700, amt: 2290 },
    { name: "15:00", uv: 470, pv: 690, amt: 2000 },
    { name: "20:00", uv: 400, pv: 760, amt: 2181 },
    { name: "25:00", uv: 400, pv: 760, amt: 2500 },
    { name: "35:00", uv: 380, pv: 810, amt: 2100 },
  ];

  return (
    <div className="border rounded-xl p-4 h-[568px]">
      {/* To be made into the TopStatsOverview component */}
      <div className="grid grid-rows-[1fr_350px] gap-5">
        <div className="grid grid-cols-3 gap-5">
          <div className="p-4 border rounded-lg flex flex-col gap-3 font-semibold">
            <h3 className="text-mid-grey/75">Total Subscribers</h3>
            <p>24</p>
          </div>
          <div className="p-4 font-semibold border rounded-lg flex flex-col gap-3">
            <h3 className="text-mid-grey/75">Revenue Generated</h3>
            <p>$120.95</p>
          </div>
          <div className="p-4 border rounded-lg flex flex-col gap-3 font-semibold">
            <h3 className="text-mid-grey/75">API Ratings</h3>
            <div className="flex gap-2">
              <p>4.8</p>
              <ul className="flex items-center gap-1 text-yellow-400">
                <li>
                  <HiOutlineStar />
                </li>
                <li>
                  <HiOutlineStar />
                </li>
                <li>
                  <HiOutlineStar />
                </li>
                <li>
                  <HiOutlineStar />
                </li>
                <li>
                  <HiOutlineStar />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="border rounded-lg p-4">
            <div className="tableHeading flex justify-between items-center mb-3">
              <h3 className="text-mid-grey/75 font-semibold">
                Average Request Calls
              </h3>
              <select className="border px-3 py-1 rounded-lg outline-none text-mid-grey/75 bg-slate-100">
                <option value="minute"> Minute</option>
                <option value="hours"> Hours</option>
                <option value="days"> Days</option>
              </select>
            </div>
            <p className="font-semibold mb-4">2,560</p>
            {/* The line chart!!!!!! */}
            <div className="w-full">
              <LineChart
                width={500}
                height={240}
                data={data}
                className="text-center"
              >
                <Line type="monotone" dataKey="uv" stroke="#424CF9" />
                <CartesianGrid x={1} y={0} stroke="rgba(228, 228, 228, 0.20)" />
                <XAxis axisLine={false} dataKey="name" />
                <YAxis
                  axisLine={false}
                  tick={({ x, y, payload }) => (
                    <text x={x - 50} y={y} textAnchor="start">
                      {payload.value}
                    </text>
                  )}
                />
                <Tooltip />
              </LineChart>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-mid-grey/75 font-semibold mb-14">
              API Connection Activity
            </h3>
            <div className="w-full">
              <BarChart
                width={500}
                height={240}
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid x={1} y={0} stroke="rgba(228, 228, 228, 0.20)" />
                <XAxis axisLine={false} dataKey="name" />
                <YAxis axisLine={false} />
                <Tooltip />
                <Bar
                  dataKey="uv"
                  radius={[6, 6, 0, 0]}
                  barSize={10}
                  fill="#9BA6FA"
                />
                <Bar
                  dataKey="pv"
                  radius={[6, 6, 0, 0]}
                  barSize={10}
                  fill="#6979F8"
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function SubHistoryView() {
  return <div>This is the subscription history veiw.</div>;
}
export function FeedbackManagementView() {
  return <div>This is the view for managing feedbacks.</div>;
}
export function OwnershipManagementView() {
  return <div>This view to manage ownership.</div>;
}

// OverviewView sub components.
