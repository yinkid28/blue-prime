'use client'
import { useRouter } from 'next/router';
import SidebarLayout from '../../../components/Layout/sidebars/sidebar';
import { accountStatsData, pieData, custRetRatData } from './data/account_stats';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the left arrow icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowUp, faPhone, faTimes, faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Example icons for each section
import { useRef, useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart, Pie, Cell, 
} from "recharts";



const COLORS = ["#2FDED4", "#4FE1DC", "#2FDED4", "#36D2D7"];


const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Hooks should always be called unconditionally
  const [showPopup, setShowPopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('Activity');

  const chartRef = useRef(null);

  // Handle toggling the popup visibility
  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  // Handle step progression
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Show loading until `id` is available
  if (!id) {
    return <p>Loading...</p>;
  }

  // Finding the customer data using the `id`
  const customer = accountStatsData.find((customer) => customer.id === id);

  if (!customer) {
    return <div>Customer not found! Ensure the ID is correct.</div>;
  }

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 100; // Avoid division by zero
    return ((current - previous) / previous) * 100;
  };

  const percentageChange = calculatePercentageChange(
    customer.portfolioSize,
    customer.previousPortfolioSize
  );

  const totalValue = pieData && pieData.length > 0 
  ? pieData.reduce((acc, entry) => acc + entry.value, 0) 
  : 0;
  const dataWithPercentage = pieData.map(entry => ({
    ...entry,
    percentage: ((entry.value / totalValue) * 100).toFixed(2)
  }));




  const renderOptionContent = () => {
    switch (selectedOption) {
      case 'Activity':
  return (
    <div className="flex-[1.3] max-w-full bg-white border border-[#EEEFF3] rounded-md shadow-sm">
      {/* Header Section */}
      <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full ">
        <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
        <h3 className="text-xs font-medium text-black">Activity</h3>
      </div>

      {/* Card Section */}
      <div className="bg-white p-4 rounded-b-lg shadow-md space-y-3">
        {/* Date */}
        <p className="text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>

        {/* Activity Examples */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-700">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
            <span>Account Officer assigned to customer</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FontAwesomeIcon icon={faArrowUp} className="mr-2 text-gray-500" />
            <span>KPI goal met</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
            <span>Customer called for follow-up</span>
          </div>
          {/* Add more activities as needed */}
        </div>
      </div>
    </div>
  );

  case 'Portfolio':
  return (
    <div className="flex space-x-2">
      {/* Portfolio Insights Card */}
      <div className="flex-[2]">
        {/* Header */}
        <div className="flex items-center bg-gray-100 p-2 rounded-t-lg shadow-sm">
          <FontAwesomeIcon icon={faUser} className="text-[#35383D] text-xs mr-2" />
          <h3 className="text-xs font-medium text-[#35383D]">Transaction Volume</h3>
        </div>

        {/* Content */}
        <div className="bg-white p-4 rounded-b-lg shadow-md">
          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={portfolioData}
              margin={{
                top: 0,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* Legend */}
              <Legend
                layout="horizontal"
                verticalAlign="top"
                align="left"
                formatter={(value) => (value === 'pv' ? '2023' : '2024')}
              />

              {/* X and Y Axes */}
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 60000]} 
                tickCount={7}
                tickFormatter={(tick) => `${tick / 1000}k`} // Format ticks to display as '1k', '2k', etc.
              />
              <Tooltip />

              {/* Bars */}
              <Bar
                dataKey="pv"
                stackId="a"
                fill="#0095FF"
                radius={[0, 0, 0, 0]} 
                barSize={30}
                strokeWidth={1}
              />
              <Bar
                dataKey="uv"
                stackId="a"
                fill="#A5D0EF"
                radius={[10, 10, 0, 0]} // Curved edges
                barSize={30} // Reduce bar width
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio Breakdown Card */}
      <div className="flex-[1]">
        {/* Header */}
        <div className="flex items-center bg-gray-100 p-2 rounded-t-lg shadow-sm">
          <FontAwesomeIcon icon={faUser} className="text-[#35383D] text-xs mr-2" />
          <h3 className="text-xs font-medium text-[#35383D]">Portfolio Breakdown</h3>
        </div>

        {/* Content */}
        <div className="bg-white p-4 rounded-b-lg shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart style={{ marginTop: '-70px' }}>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              
              {/* Tooltip */}
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length > 0) {
                    const { name, value, percentage } = payload[0].payload;
                    return (
                      <div
                        style={{
                          backgroundColor: 'grey',
                          color: 'white',
                          padding: '10px',
                          borderRadius: '10px',
                          fontSize: '14px',
                        }}
                      >
                        {name}: {percentage}% 
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div style={{
               marginTop: '-26px',
               display: 'flex',
               flexWrap: 'wrap', // Enable wrapping for two items per row
              justifyContent: 'space-between', // Space out the items evenly
  }}
>
  {dataWithPercentage.map((entry, index) => (
    <div
    key={`legend-${index}`}
    className="flex items-center w-[45%] mb-2.5"
  >
    <div
      className={`w-5 h-5 mr-2.5`}
      style={{ backgroundColor: COLORS[index % COLORS.length] }} // Dynamic color needs to stay in inline style
    />
    <span className="font-medium text-gray-500 text-xs">{entry.name}</span>
    <span className="ml-auto text-black">{entry.percentage}%</span>
  </div>
  
  ))}
          </div>
        </div>
      </div>
    </div>
  );



  
      case 'ValueChain':
        return (
          <div className="p-4 border rounded-lg shadow-md bg-white space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Value Chain Analysis</h3>
            <p className="text-gray-600">Value Chain-related content goes here.</p>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <SidebarLayout>
      <div className="w-full max-w-full">
        {/* Header section */}
        <div className="w-full max-w-[1051px] bg-white mx-auto my-[20px] px-[20px] py-[15px] border border-[#EEEFF3] rounded-[8px]">
          {/* Header title and back menu */}
          <div className="flex flex-col items-start gap-[10px]">
            {/* Header title */}
            <div className="text-[#252525] text-[16px] font-normal">Stakeholders</div>

            {/* Horizontal gray line */}
            <div className="w-full h-[1px] bg-gray-300 my-[10px]"></div>

            {/* Back menu with the left arrow */}
            <div 
              className="flex items-center gap-[5px] text-[#252525] text-[12px] cursor-pointer" 
              onClick={() => router.push('/admin/acquisition/account_officers')}
            >
              <FaArrowLeft size={14} /> {/* Left arrow icon */}
              <span>Account Officer</span>
            </div>
          </div>
        </div>

        {/* Layout for Profile and Right Menus (containing the 4 sections) */}
<div className="flex gap-4">
  {/* Profile Section */}
<div className="flex-[1.3] max-w-[400px] bg-white border border-[#EEEFF3] rounded-md shadow-sm">
  {/* Header Section */}
  <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
    Profile
  </div>

  {/* Card Content */}
  <div className="p-4 flex flex-col gap-4">
    {/* Top Section */}
    <div className="flex justify-between items-start">
      {/* ID Number */}
      <span className="text-[#8F8F8F] text-xs font-normal">{customer.id}</span>
      {/* Type */}
      <span className="text-[#4D94C8] bg-blue-100 border border-[#4D94C8] text-xs font-medium rounded-md px-3 py-1">
        {customer.type}
      </span>
    </div>

    {/* Company Name */}
    <div className="mt-2 text-sm font-medium text-[#35383D]">
      {customer.name}
    </div>

    {/* Options */}
    <div className="mt-4 space-y-2 text-xs font-normal">
      <div>
        <span className="text-blue-400 font-normal">Industry:</span> <span className="text-[#35383D] text-sm pl-2">{customer.department}</span>
      </div>
      <div>
        <span className="text-blue-400 font-normal">Email Address:</span> <span className="text-[#8F8F8F] text-sm pl-2">{customer.email || 'N/A'}</span>
      </div>
      <div>
        <span className="text-blue-400 font-normal">Phone Number:</span> <span className="text-[#8F8F8F] text-sm pl-2">{customer.phone || 'N/A'}</span>
      </div>
      <div>
        <span className="text-blue-400 font-normal">Billing Address:</span> <span className="text-[#8F8F8F] text-sm pl-2">{customer.billingAddress || 'N/A'}</span>
      </div>
    </div>
  </div>
</div>



          {/* Right Menus containing the 4 sections */}
          <div className="flex-[3] grid grid-cols-2 gap-4">
           {/* Net Customers Acquired */}
<div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
  <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
    New Customers Acquired
  </div>
  <div className="p-4 flex flex-col gap-2">
    <div className="text-lg font-semibold text-gray-800">{customer.newCustomers}</div>

    {/* Calculate Percentage Change */}
    {(() => {
      const previousValue = customer.previousPortfolioSize || 0;
      const currentValue = customer.portfolioSize;
      const percentageChange = previousValue === 0
        ? 100
        : ((currentValue - previousValue) / previousValue) * 100;

      return (
        <div className="text-sm font-normal text-gray-500 mt-2">
          {/* Comparison Text */}
          <div className="flex justify-between text-xs font-normal text-[#8F8F8F] items-center mb-2">
            <span>Compared to {previousValue.toLocaleString()} last month</span>
            <span
              className={`${
                percentageChange > 0 ? 'text-[#00900E]' : 'text-red-500'
              } font-medium`}
            >
              {percentageChange > 0 ? '+' : ''}
              {percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
      );
    })()}
  </div>
</div>



<div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
  <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
    Customer Retention Rate
  </div>
  <div className="p-4 flex flex-col gap-4">
    {custRetRatData.map((stat, index) => {
      const previousRevenue = stat.previousRevenue || 0;
      const currentRevenue = stat.currentRevenue || 0;
      const percentageChange =
        previousRevenue === 0
          ? 100
          : ((currentRevenue - previousRevenue) / previousRevenue) * 100;
      const progressWidth = Math.min(Math.abs(percentageChange), 100);

      return (
        <div key={index} className="text-sm font-normal text-gray-500 mt-2">
          {/* Revenue Display */}
          <div className="text-lg font-medium text-gray-800">
            ${currentRevenue.toLocaleString() || '0'}
          </div>

          {/* Progress Bar */}
          {stat.showProgressBar && (
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div
                className="h-1 rounded-full"
                style={{
                  width: `${progressWidth}%`,
                  backgroundColor: percentageChange > 0 ? 'green' : 'red',
                }}
              ></div>
            </div>
          )}

          {/* Comparison Text */}
          <div className="flex justify-between text-xs font-normal text-[#8F8F8F] items-center mb-2">
            <span>Compared to ${previousRevenue.toLocaleString()} last month</span>
            <span
              className={`${
                percentageChange > 0 ? 'text-[#00900E]' : 'text-red-500'
              } font-medium`}
            >
              {percentageChange > 0 ? '+' : ''}
              {percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>


           {/* Account Officer */}
<div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
  <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
    Account Officer
  </div>
  <div className="p-4 flex flex-col gap-4">
    {/* Officer Image and Name in a Flex Container */}
    <div className="flex items-center gap-4">
      <img
        src="/images/avatar.jpg" 
        alt="Officer"
        className="w-6 h-6 rounded-full object-cover"
      />
      <div className="text-base font-medium text-[#35383D] truncate">{customer.officer}</div>
    </div>

    {/* Department and Branch in a Flex Container */}
    <div className="flex flex-col gap-2">
      <div className="text-sm text-[#8F8F8F]">
        <span className="text-blue-400 text-xs font-normal">Department:</span> {customer.department}
      </div>
      <div className="text-sm text-[#8F8F8F]">
        <span className="text-blue-400 text-xs font-normal">Branch:</span> {customer.region}
      </div>
    </div>
  </div>
</div>

            {/* Quick Actions */}
      <div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
        <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
          <FontAwesomeIcon icon={faUser} className="text-gray-500" />
          Quick Actions
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div
            className="text-[#212879] text-xs font-semibold flex items-center gap-3 cursor-pointer"
            onClick={handlePopupToggle}
          >
            <FontAwesomeIcon icon={faArrowUp} className="text-gray-500" />
            Assign/Reassign Account Officer
          </div>
          <div className="text-[#212879] text-xs font-semibold flex items-center gap-3">
            <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
            Contact Client
          </div>
        </div>
      </div>

      {/* Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-2/3 max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#212879]">Assign Account Officer</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-500 cursor-pointer"
                onClick={handlePopupToggle}
              />
            </div>
            <hr className="mb-4" />

            {/* Body */}
{currentStep === 1 && (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Prospective Customer</h3>
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 flex-grow">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search customers"
          className="w-full focus:outline-none text-sm"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Filter
      </button>
    </div>

    <div className="overflow-hidden border border-gray-300 rounded-md">
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-gray-200">
        
            <tr key={customer.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.industry}</td>
              <td className="p-2">{customer.type}</td>
            </tr>
         
        </tbody>
      </table>
    </div>

    <div className="flex justify-end gap-2 mt-4">
      <button
        className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
        onClick={handlePopupToggle}
      >
        Cancel
      </button>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        onClick={handleNextStep}
      >
        Next
      </button>
    </div>
  </div>
)}


            {currentStep === 2 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Further Details</h3>
                <p className="text-sm text-gray-600">This is the next step placeholder. Add your content here.</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={handlePopupToggle}
                  >
                    Cancel
                  </button>
                  <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
          </div>
        </div>


      </div>  



      {/* Option Bar */}
      <div className="mt-6 flex flex-col items-left space-y-6">
        <div className="flex justify-between items-center w-[356px] h-[34px] border border-gray-300 rounded-[20px] bg-transparent shadow-sm">
          {['Activity', 'Portfolio', 'ValueChain'].map((option) => (
            <button
              key={option}
              className={`flex-1 text-center py-1 text-[14px] font-semibold transition-colors ${
                selectedOption === option
                  ? 'bg-white text-[#212879] shadow-[4px_0px_6px_rgba(0,0,0,0.1),_-4px_0px_6px_rgba(0,0,0,0.1)]'
                  : 'bg-transparent text-[#35383D] hover:bg-gray-200 '
              } rounded-[20px]`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Render selected option's content */}
        <div className="w-full">{renderOptionContent()}</div>
      </div>

    </SidebarLayout>
  );
};

export default CustomerDetails;
