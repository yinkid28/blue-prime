import SidebarLayout from '../../../components/Layout/sidebars/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendar, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { accOfficersData } from '../acquisition/data/account_officers';
import { accountStatsData } from '../acquisition/data/account_stats';


export default function AccountOfficersPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const calculatePercentageChange = (value, comparison) => {
    if (!comparison || comparison === 0) return 0;
    return ((value - comparison) / comparison) * 100;
  }; 

 
    const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarLayout>
      <div className="w-full max-w-full">
        {/* Slim Box */}
        <div className="w-full max-w-[1051px] h-[48px] border border-[#EEEFF3] rounded-[8ptx] bg-white mx-auto my-[20px] flex items-center justify-center gap-[10px]">
          <div className="text-[#252525] ml-[10px] text-[16px] font-normal">Account Officer</div>
          <div className="text-[#767676] text-[12px] mr-[10px] text-right flex-grow">Description/Explanation about the page</div>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between mx-auto my-[20px] max-w-[1051px] h-[32px] rounded-[8px] px-[10px]">
          {/* Date Container */}
          <div className="flex items-center justify-start border border-[#EEEFF3] rounded-[10px] bg-[#F7F8FA] px-[10px] py-[5px] h-[32px] font-[14px] text-[#252525] gap-[10px] cursor-pointer relative" onClick={toggleDatePicker}>
            <FontAwesomeIcon icon={faCalendar} className="text-[#767676] text-[16px]" />
            <div className="text-[#767676] text-[12px] font-normal">
              {startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : ' Date '}
            </div>
            {isDatePickerOpen && (
              <div className="absolute top-[40px] left-0 bg-white border border-[#EEEFF3] rounded-[8px] p-[10px] shadow-md z-[10]">
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-[20px] justify-end flex-2">
            <div className="flex items-center gap-[5px] text-[12px] font-normal px-[10px] py-[5px] border border-[#EEEFF3] rounded-[10px] bg-[#F7F8FA] text-[#767676] h-[32px] cursor-pointer">
              <FontAwesomeIcon icon={faChevronDown} className="text-[#767676] text-[16px]" />
              Region: All
            </div>
            <div className="flex items-center gap-[5px] text-[12px] font-normal px-[10px] py-[5px] border border-[#EEEFF3] rounded-[10px] bg-[#F7F8FA] text-[#767676] h-[32px] cursor-pointer">
              <FontAwesomeIcon icon={faChevronDown} className="text-[#767676] text-[16px]" />
              Branch: All
            </div>
          </div>
        </div>

        {/* Customer Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accOfficersData && Array.isArray(accOfficersData) && accOfficersData.length > 0 ? (
            accOfficersData.map((stat, index) => {
              const percentageChange = calculatePercentageChange(stat.value, stat.comparison);
              const percentageClass =
                percentageChange > 0 ? 'text-green-600' : 'text-red-600';

              return (
              
                <div key={index} className="bg-white border border-gray-150 rounded-md shadow-sm">
                  {/* Stat Card */}
                  <div>
                    {/* Header */}
                    <div className="bg-gray-100 p-2 rounded-t-md text-gray-700 text-xs font-medium flex items-center gap-2 w-full">
                      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                      {stat.header}
                    </div>

                    {/* Stat Value */}
                    <div className="p-4 flex flex-col gap-2">
                      <div className="text-x2 font-medium text-gray-800">{stat.value}</div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Compared to {stat.comparison} last month</span>
                        <span className={`${percentageClass} font-bold`}>
                          {percentageChange > 0 ? '+' : ''}
                          {percentageChange.toFixed(2)}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      {stat.showProgressBar && (
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                          <div
                            className="h-1 rounded-full"
                            style={{
                              width: `${Math.abs(percentageChange)}%`,
                              backgroundColor: percentageChange > 0 ? 'green' : 'red',
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-600">No data available</div>
          )}
        </div>


               {/* Account Officers Section */}
               <div className="max-w-full gap-4 mt-8 border border-gray-200 rounded-t-md">
          {/* Header with Search Bar and Filter */}
          <div className="flex items-center bg-gray-100 p-4 rounded-t-md">
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

          {/* Table */}
          <table className="min-w-full bg-white border border-[#EEEFF3] rounded-md shadow-sm mt-0">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Officer ID</th>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Name</th>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Department</th>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Region</th>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Active Status</th>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Portfolio Size</th>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Assigned KPIs</th>
                <th className="px-4 py-2 text-xs sm:text-sm text-left font-normal text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {accountStatsData
                .filter((officer) =>
                  officer.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((officer, index) => (
                  <tr key={index} className="border-b border-[#EEEFF3]">
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">{officer.id}</td>
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">{officer.name}</td>
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">{officer.department}</td>
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">{officer.region}</td>
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${officer.active ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span>{officer.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">{officer.portfolioSize}</td>
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">{officer.assignedKPIs}</td>
                    <td className="px-4 py-2 text-gray-800 text-xs font-medium">
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div
                          className="h-1 rounded-full"
                          style={{
                            width: `${officer.performance}%`,
                            backgroundColor: officer.performance >= 70 ? 'green' : 'green',
                          }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        
      </div>
    </SidebarLayout>
  );
}
