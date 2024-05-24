export default function convertDateTime(inputDateTimeStr: string): string {
    try {
        const inputDateTime: Date = new Date(inputDateTimeStr);
        const options: Intl.DateTimeFormatOptions = { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: false 
        };
        const outputDateTimeStr: string = inputDateTime.toLocaleString('en-US', options);
        return outputDateTimeStr;
    } catch (error) {
        return "No date";
    }
}
