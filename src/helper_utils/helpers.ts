export function getFormattedDate(date: string) {
  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Array of abbreviated month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //  Get the current date
  // const now = new Date();
  // Get the day of the week, day of the month, month, and year
  const newdate = new Date(date);
  const weekday = weekdays[newdate.getDay()];
  const day = String(newdate.getDate()).padStart(2, "0");
  const month = months[newdate.getMonth()];
  const year = newdate.getFullYear();

  // Format the date
  const formattedDate = `${weekday} ${day} ${month}, ${year}`;
  return formattedDate;
}
