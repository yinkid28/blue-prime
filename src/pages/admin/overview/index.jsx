import SidebarLayout from '../../../components/Layout/sidebars/sidebar';
import styles from './overview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendar, faUser, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { customerStats } from '../overview/data/customerStatsData';
import { totalAssetsData } from '../overview/data/totalAssetsData';
import { PieChart, Pie, Line, Cell, CartesianGrid, 
        ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, 
        Legend, Scatter, ResponsiveContainer } from 'recharts';
import { accOffiPerData } from './data/accOffiPerData';
import { leadConvData } from './data/LeadConvRatData';



export default function OverviewPage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [data, setData] = useState(accOffiPerData || []);


  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const calculatePercentageChange = (value, comparison) => {
    if (!comparison || comparison === 0) return 0;
    return ((value - comparison) / comparison) * 100;
  };

  const { title, conTitle, corTitle, chartData, details } = totalAssetsData;
  

  // Sort chartData and details by value to ensure consistent order
  const sortedData = chartData.sort((a, b) => b.value - a.value);

  //accOffiPer
  const calculateMetrics = (data) => {
    return data.map((officer) => {
      const leadsChange = calculatePercentageChange(officer.leadsCurrent, officer.leadsPrevious);
      return {
        ...officer,
        leadsChange,
      };
    });
  };

  const accountOfficerPerformanceData = calculateMetrics(accOffiPerData);   
 

  

  return (
    <SidebarLayout>
      <div className={styles.overviewContainer}> {/* Added parent container */}
        <div className={styles.slimBox}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <div className={styles.overviewHeader}>Overview Page</div>
          </div>

          {/* Content */}
          <div className={styles.content}>
            Description/Explanation about the page
          </div>
        </div>

        {/* Action Section */}
        <div className={styles.action}>
          <div className={styles.dateContainer} onClick={toggleDatePicker}>
            <FontAwesomeIcon icon={faCalendar} className={styles.dateIcon} />
            <div className={styles.date}>
              {startDate && endDate
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : ' Date '}
            </div>
            {isDatePickerOpen && (
              <div className={styles.calendar}>
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

          <div className={styles.filters}>
            <div className={styles.dropdown}>
              <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
              Region: All
            </div>
            <div className={styles.dropdown}>
              <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />
              Branch: All
            </div>
          </div>
        </div>

        {/* Customer Stats Section */}
        <div className={styles.customerStatsSection}>
          {customerStats.map((stat, index) => {
            const percentageChange = calculatePercentageChange(stat.value, stat.comparison);
            const percentageClass =
              percentageChange > 0 ? styles.positiveChange : styles.negativeChange;

            return (
              <div key={index} className={styles.customerStatCardWrapper}>
                <div className={styles.statHeader}>
                  <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                  {stat.header}
                </div>
                <div className={styles.customerStatCard}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statComparison}>
                    <span>Compared to {stat.comparison} last month</span>
                    <span className={`${styles.percentage} ${percentageClass}`}>
                      {percentageChange > 0 ? '+' : ''}
                      {percentageChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Assets Section */}
        <div className={styles.totalAssetsSection}>
          {/* Header */}
          <div className={styles.totalAssetsHeader}>
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            {title}
          </div>

          <div className={styles.totalAssetsWrapper}>
            {/* Pie Chart Section */}
            <div className={`${styles.totalAssetsCard}`}>
              <div className={styles.pieChartWrapper}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={totalAssetsData.chartData}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius="70%"
                      outerRadius="100%"
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {totalAssetsData.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.pieChartValue}>
                  ${totalAssetsData.chartData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </div>
                {/* Values Below the Pie Chart with Icons */}
                <div className={styles.chartValues}>
                  {totalAssetsData.chartData.map((entry, index) => (
                    <div className={styles.chartValue} key={index}>
                      {/* Left content (icon + label) */}
                      <div className={styles.chartValueLeft}>
                        <span
                          className={styles.circleIcon}
                          style={{ borderColor: entry.color }} // Set border color dynamically
                        ></span>
                        <span className={styles.chartValueLabel} style={{ marginLeft: "8px" }}>
                          {entry.label}
                        </span>
                      </div>
                      {/* Right content (percentage) */}
                      <span className={styles.chartValuePercentage}>
                        {entry.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Converted Customers Section */}
            <div className={styles.totalAssetsCard}>
              <div className={styles.ConCuSection}>
                <h2 className={styles.ConCuHeader}>
                  <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                  {conTitle}
                </h2>
                <div className={styles.ConCuSecValue}>
                  ${totalAssetsData.convertedCustomersData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </div>
                <div className={styles.progressBar2}>
                  {totalAssetsData.convertedCustomersData.map((segment, index) => (
                    <div
                      key={index}
                      className={styles.progressSegment}
                      style={{
                        flex: segment.value,
                        backgroundColor: segment.color,
                      }}
                    >
                    </div>
                  ))}
                </div>
                {/* Chart Values (Below Progress Bar) */}
                <div className={styles.chartValues}>
                  {totalAssetsData.chartData.map((entry, index) => (
                    <div className={styles.chartValue} key={index}>
                      {/* Left content (icon + label) */}
                      <div className={styles.chartValueLeft}>
                        <span
                          className={styles.circleIcon}
                          style={{ borderColor: entry.color }} // Set border color dynamically
                        ></span>
                        <span
                          className={styles.chartValueLabel}
                          style={{ marginLeft: "8px" }}
                        >
                          {entry.label}
                        </span>
                      </div>
                      {/* Right content (percentage) */}
                      <span className={styles.chartValuePercentage}>
                        {entry.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Corporate Customers Section */}
            <div className={styles.totalAssetsCard}>
              <div className={styles.CorCuSection}>
                <h2 className={styles.CorCuHeader}>
                  <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                  {corTitle}
                </h2>
                <div className={styles.CorCuSecValue}>
                  ${totalAssetsData.convertedCustomersData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </div>
                <div className={styles.progressBar2}>
                  {totalAssetsData.corporateCustomersData.map((segment, index) => (
                    <div
                      key={index}
                      className={styles.progressSegment}
                      style={{
                        flex: segment.value,
                        backgroundColor: segment.color,
                      }}
                    >
                    </div>
                  ))}
                </div>
                {/* Chart Values (Below Progress Bar) */}
                <div className={styles.chartValues}>
                  {totalAssetsData.chartData.map((entry, index) => (
                    <div className={styles.chartValue} key={index}>
                      {/* Left content (icon + label) */}
                      <div className={styles.chartValueLeft}>
                        <span
                          className={styles.circleIcon}
                          style={{ borderColor: entry.color }} // Set border color dynamically
                        ></span>
                        <span className={styles.chartValueLabel} style={{ marginLeft: "8px" }}>
                          {entry.label}
                        </span>
                      </div>
                      {/* Right content (percentage) */}
                      <span className={styles.chartValuePercentage}>
                        {entry.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.flexContainer}>
           {/* Account Officer Performance Section */}
<div className="w-full flex flex-col gap-4 p-4">
  {/* Header */}
  <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-8 w-full border border-gray-200 rounded-t-md text-sm font-medium px-3 flex items-center text-gray-700">
    <FontAwesomeIcon icon={faUser} className="mr-2" />
    Account Officer Performance
  </div>

  {/* Overall White Background Card */}
  <div className="bg-white border border-gray-200 rounded-md p-4 h-[470px] overflow-auto">
    {/* Account Officer Performance Data */}
    {accountOfficerPerformanceData.map((officer) => (
      <div
        key={officer.id}
        className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
      >
        {/* Officer Image */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
          <img
            src={officer.image}
            alt={officer.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Officer Data */}
        <div className="flex w-full items-center">
          {/* Officer Name */}
          <div className="text-gray-600 text-sm font-normal flex-grow truncate">
            {officer.name}
          </div>

          {/* Officer Leads */}
          <div className="text-gray-600 text-sm font-normal text-center w-1/3 flex justify-center items-center">
            {officer.leadsCurrent}
          </div>

          {/* Performance Percentage */}
          <div className="text-green-700 text-sm bg-gray-100 px-3 py-1 rounded-md w-fit">
            {officer.leadsChange > 0 ? '+' : ''}
            {officer.leadsChange.toFixed(2)}%
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


        
         {/* Lead Conversion Rate Section */}
         <div className="w-full flex flex-col gap-4 mt-4">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-8 w-full border border-gray-200 rounded-t-md text-sm font-medium px-3 flex items-center text-gray-700">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Lead Conversion Rate
      </div>

      {/* Lead Conversion Rate Card */}
      <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col gap-4 h-[470px]">
        {/* Dropdown and Date Selection */}
        <div className="flex items-center justify-between">
          {/* Account Officer Selection */}
          <div className="flex items-center gap-2">
            <label className="text-gray-600 text-sm font-medium">Account Officer:</label>
            <select className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
              <option value="all">All</option>
              {leadConvData.map((officer) => (
                <option key={officer.name} value={officer.name}>
                  {officer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          {leadConvData.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <span className="text-gray-500 text-xs font-medium">{item.name}</span>
              <span className="text-gray-700 text-lg font-semibold">{item.leadsCurrent}</span>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="w-full" style={{ height: "auto" }}>
          <ComposedChart
           width={500}
           height={400}
           data={leadConvData}
           margin={{
           top: 20,
           right: 20,
           bottom: 20,
           left: 20,
           }}
          >
          <CartesianGrid stroke="#ffff" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          </ComposedChart>
        </div>
      </div>
    </div>


        </div>
      </div>
    </SidebarLayout>
  );
}