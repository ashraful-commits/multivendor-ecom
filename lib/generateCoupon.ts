export function generateCoupon(title: string, date: string | undefined | Date = "23/5/2024") {
  let dateStr: Date;

  if (typeof date === "string") {
    dateStr = new Date(date);
  } else {
    dateStr = date || new Date("23/5/2024"); // Default value if date is undefined
  }

  if (isNaN(dateStr.getTime())) {
    // If the date parsing fails, return an error message or handle the error as needed
    return "Invalid date";
  }

  let day = dateStr.getDate();
  let month = dateStr.getMonth() + 1;
  let year = dateStr.getFullYear();

  let formattedDay = (day < 10) ? '0' + day : day;
  let formattedMonth = (month < 10) ? '0' + month : month;

  // Return the date in the desired format (DD/MM/YYYY)
  return title.toUpperCase().trim().split(" ").join("") + "-" + formattedDay + formattedMonth + year;
}
