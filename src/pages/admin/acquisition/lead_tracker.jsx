import SidebarLayout from '../../../components/Layout/sidebars/sidebar';
import { ComposedChart, Area, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { leadConvData } from '../acquisition/data/leadData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useState } from 'react';
import { faUser, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {leadOffiPerData} from '../acquisition/data/leadOffiPerData'

export default function LeadTrackerPage() {
  // Transform cumulative data into chart-friendly format
  const chartData = Object.keys(leadConvData).map((key) => ({
    name: key,
    value: leadConvData[key],
  })); 

  const [searchQuery, setSearchQuery] = useState("");

  const dataKeys = [
    { label: 'Leads Identified', key: 'LeadsIdentified' },
    { label: 'Initial Engagement', key: 'InitialEngagement' },
    { label: 'Proposal Stage', key: 'ProposalStage' },
    { label: 'Customer Onboarding', key: 'CustomerOnboarding' },
    { label: 'Relationship Building', key: 'RelationshipBuilding' },
  ];

  return (
    <SidebarLayout>
      <div className="w-full max-w-full">
        {/* Slim Box */}
        <div className="w-full max-w-[1051px] h-[48px] border border-[#EEEFF3] rounded-[8px] bg-white mx-auto my-[20px] flex items-center justify-center gap-[10px]">
          <div className="text-[#252525] ml-[10px] text-[16px] font-normal">Lead Tracker</div>
          <div className="text-[#767676] text-[12px] mr-[10px] text-right flex-grow">Description/Explanation about the page</div>
        </div>

        {/* Lead Performance Tracking Section */}
        <div className="w-full max-w-[1051px] border border-[#EEEFF3] rounded-[8px] bg-white mx-auto mt-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 bg-gray-100 p-4 rounded-t-md border-b border-[#EEEFF3]">
            <FontAwesomeIcon icon={faUser} className="text-black" />
            <div className="text-black text-[12px] font-medium">Lead Performance Tracking</div>
          </div>

          {/* Data Categories in Flex Layout */}
          <div className="flex justify-around mb-6 text-sm p-4">
            {dataKeys.map((item) => (
              <div
                key={item.key}
                className="text-gray-600 font-medium text-center flex flex-col items-center justify-center"
              >
                <span>{item.label}</span>
                <span className="text-black font-semibold text-lg mt-1">
                  {leadConvData[item.key]}
                </span>
              </div>
            ))}
          </div>

          {/* Composed Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics Table Section */}
        <div className="max-w-full gap-4 mt-8 border border-gray-200 rounded-t-md">
          <div className="overflow-x-auto">
            {/* Header Section */}
            <div className="flex items-center rounded-t-md p-2  justify-between mb-1 gap-2 w-full">
              {/* Left Section: Icon and Text */}
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                <span className="text-gray-700 font-medium text-base">Account Officers Performance</span>
              </div>
  
              {/* Right Section: Search and Filter */}
              <div className="flex items-center mt-3 gap-4">
                {/* Search Bar */}
                <div className="flex items-center border border-[#EEEFF3] rounded-md bg-white px-3 py-2 w-[300px]">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
                  <input
                  type="text"
                  placeholder="Search Account Officers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div>
                {/* Filter Button */}
                <button className="flex items-center gap-2 px-4 py-2 border border-[#EEEFF3] bg-[#F7F8FA] rounded-md text-gray-700 text-sm hover:bg-[#EDEFF1]">
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
                  Filter
                </button>
              </div>
            </div>


            {/* Metrics Table */}
            <table className="min-w-full bg-white border border-b border-[#EEEFF3] rounded-md shadow-sm">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Name</th>
                  <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Portfolio Managed (Customers)</th>
                  <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Conversion rate</th>
                  <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Active Customers</th>
                  <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">KPIs Achieved</th>
                </tr>
              </thead>         
              <tbody>
                {leadOffiPerData
                  .filter((metric) => 
                    metric.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((metric, index) => (
                    <tr key={index} className="border-b border-[#EEEFF3]">
                      <td className="px-4 py-2 text-gray-800 text-xs font-medium">{metric.name}</td>
                      <td className="px-4 py-2 text-gray-800 text-xs font-medium">{metric.portMaCustomer}</td>
                      <td className="px-4 py-2 text-gray-800 text-xs font-medium">{metric.convRate}</td>
                      <td className="px-4 py-2 text-gray-800 text-xs font-medium">{metric.kpiAchieved}</td> 
                      <td className="px-4 py-2 text-gray-800 text-xs font-medium">{metric.activeCustomers}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
