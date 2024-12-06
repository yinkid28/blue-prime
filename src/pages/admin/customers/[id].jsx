import { useRouter } from 'next/router';
import SidebarLayout from '../../../components/Layout/sidebars/sidebar';
import { customersStatData } from '../customers/data/customersStatData';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the left arrow icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faDollarSign, faUserShield } from '@fortawesome/free-solid-svg-icons'; // Example icons for each section

const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the customer using the `id` from the route
  const customer = customersStatData.find((customer) => customer.id === id);

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
  


  return (
    <SidebarLayout>
      <div className="w-full max-w-full">
        {/* Header section */}
        <div className="w-full max-w-[1051px] bg-white mx-auto my-[20px] px-[20px] py-[15px] border border-[#EEEFF3] rounded-[8px]">
          {/* Header title and back menu */}
          <div className="flex flex-col items-start gap-[10px]">
            {/* Header title */}
            <div className="text-[#252525] text-[16px] font-normal">Customers</div>

            {/* Horizontal gray line */}
            <div className="w-full h-[1px] bg-gray-300 my-[10px]"></div>

            {/* Back menu with the left arrow */}
            <div 
              className="flex items-center gap-[5px] text-[#252525] text-[12px] cursor-pointer" 
              onClick={() => router.push('/admin/customers')}
            >
              <FaArrowLeft size={14} /> {/* Left arrow icon */}
              <span>Customer</span>
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
           {/* Net Portfolio Value */}
<div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
  <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
    Net Portfolio Value
  </div>
  <div className="p-4 flex flex-col gap-2">
    <div className="text-lg font-semibold text-gray-800">${customer.portfolioSize}</div>

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



            {/* Revenue Generated */}
<div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
  <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
    Revenue Generated
  </div>
  <div className="p-4 flex flex-col gap-2">
    <div className="text-lg font-semibold text-gray-800">
      ${customer?.currentRevenue?.toLocaleString() || '0'}
    </div>

    {/* Calculate Percentage Change */}
    {(() => {
      const previousRevenue = customer?.previousRevenue || 0;
      const currentRevenue = customer?.currentRevenue || 0;
      const percentageChange = previousRevenue === 0
        ? 100
        : ((currentRevenue - previousRevenue) / previousRevenue) * 100;

      return (
        <div className="text-sm font-normal text-gray-500 mt-2">
          {/* Comparison Text */}
          <div className="flex justify-between items-center mb-2">
            <span>Compared to ${previousRevenue.toLocaleString()} last month</span>
            <span
              className={`${
                percentageChange > 0 ? 'text-green-500' : 'text-red-500'
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


            {/* Account Officer */}
            <div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
              <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
                <FontAwesomeIcon icon={faUserShield} className="text-gray-500" />
                Account Officer
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="text-xl font-medium text-gray-800">{customer.officer}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-[#EEEFF3] rounded-md shadow-sm">
              <div className="bg-gray-100 p-2 rounded-t-md text-black text-xs font-medium flex items-center gap-2 w-full">
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                Quick Actions
              </div>
              <div className="p-4 flex gap-4">
                <button className="bg-blue-500 text-white py-[10px] px-[15px] rounded-[5px]">
                  Edit Customer
                </button>
                <button className="bg-red-500 text-white py-[10px] px-[15px] rounded-[5px]">
                  Delete Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default CustomerDetails;
