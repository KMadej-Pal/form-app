import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isSunday,
  startOfMonth,
  startOfWeek,
  subMonths
} from "date-fns";
import { useState } from "react";
import { HolidayType } from "../types/holiday";

const availableTimes: string[] = ["12:00", "14:00", "16:30", "18:30", "20:00"];

type IProps =  {
    holidays: HolidayType[];
    onChange:(value: any) => void;
};

export type InputProps = IProps;

const InputCalendar = ({ holidays,onChange,...props}: IProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selecteTime, setSelectedTime] = useState<string | null>(null);

  const isNationalHoliday = (date: Date) => {
    return holidays
      .filter((holiday) => holiday.type === "NATIONAL_HOLIDAY") 
      .some((holiday) => holiday.date === format(date, "yyyy-MM-dd")); 
  };

  const isObservance = (date: Date) => {
    return holidays
      .filter((holiday) => holiday.type === "OBSERVANCE") 
      .some((holiday) => holiday.date === format(date, "yyyy-MM-dd")); 
  };

  const getObservanceInfo = (date: Date) => {
    return holidays
      .filter((holiday) => holiday.type === "OBSERVANCE") 
      .find((holiday) => holiday.date === format(date, "yyyy-MM-dd"))?.name; 
  };


  const combineDateAndTime = (chosenDate:Date , time:string ) => {
    const date = new Date(chosenDate);

    const [hours, minutes] = time.split(":").map(Number); 
    date.setHours(hours); 
    date.setMinutes(minutes); 

    return date.toISOString();
  };

  const setChosenDate = (time:string)=>{
    setSelectedTime(time)
    if(selectedDate)
    onChange(combineDateAndTime(selectedDate ,time))
  }

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="flex gap-7 flex-wrap">
      <div>
      <span>Date</span>
      <div className="w-80 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-gray-500 hover:text-black">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 16.866C8.83333 16.4811 8.83333 15.5189 9.5 15.134L18.5 9.93782C19.1667 9.55292 20 10.034 20 10.8038L20 21.1962C20 21.966 19.1667 22.4471 18.5 22.0622L9.5 16.866Z" fill="#CBB6E5"/>
          </svg>
          </button>
          <h2 className="text-base font-medium text-custom-text">{format(currentMonth, "MMMM yyyy")}</h2>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-gray-500 hover:text-black">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 16.866C23.1667 16.4811 23.1667 15.5189 22.5 15.134L13.5 9.93782C12.8333 9.55292 12 10.034 12 10.8038L12 21.1962C12 21.966 12.8333 22.4471 13.5 22.0622L22.5 16.866Z" fill="#CBB6E5"/>
          </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm font-medium text-custom-text">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} >{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 ">
          {days.map((day, index) => {
            const isSelected = selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
            const timestamp = Math.floor(new Date(day).getTime() / 1000)
            return (
              <div
                key={timestamp}
                onClick={() =>  setSelectedDate(day)}
                className={`text-center py-2  cursor-pointer transition-all duration-200 text-base font-normal text-custom-text
                  ${!isSameMonth(day, monthStart) ? "text-white" : 
                  isNationalHoliday(day) ? "text-custom-grey-purple cursor-not-allowed" :
                  isSelected ? "bg-custom-accent text-white rounded-full" : 
                  isSunday(day) ? "text-custom-grey-purple cursor-not-allowed" : 
                  "hover:bg-gray-200 rounded-full"}
                `}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      </div>

    </div>

    {selectedDate && (
      isObservance(selectedDate) ?  <div className="flex">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17C7.41775 17 5.87104 16.5308 4.55544 15.6518C3.23985 14.7727 2.21447 13.5233 1.60897 12.0615C1.00347 10.5997 0.84504 8.99113 1.15372 7.43928C1.4624 5.88743 2.22433 4.46197 3.34315 3.34315C4.46197 2.22433 5.88743 1.4624 7.43928 1.15372C8.99113 0.845037 10.5997 1.00346 12.0615 1.60896C13.5233 2.21447 14.7727 3.23985 15.6518 4.55544C16.5308 5.87103 17 7.41775 17 9C17 11.1217 16.1571 13.1566 14.6569 14.6569C13.1566 16.1571 11.1217 17 9 17ZM8.00667 13C8.00667 13.2652 8.11203 13.5196 8.29956 13.7071C8.4871 13.8946 8.74145 14 9.00667 14C9.27189 14 9.52624 13.8946 9.71378 13.7071C9.90131 13.5196 10.0067 13.2652 10.0067 13V8.40667C10.0067 8.27535 9.9808 8.14531 9.93055 8.02398C9.88029 7.90266 9.80664 7.79242 9.71378 7.69956C9.62092 7.6067 9.51068 7.53304 9.38935 7.48279C9.26803 7.43253 9.13799 7.40667 9.00667 7.40667C8.87535 7.40667 8.74531 7.43253 8.62399 7.48279C8.50266 7.53304 8.39242 7.6067 8.29956 7.69956C8.2067 7.79242 8.13305 7.90266 8.08279 8.02398C8.03254 8.14531 8.00667 8.27535 8.00667 8.40667V13ZM9 4C8.77321 4 8.55152 4.06725 8.36295 4.19325C8.17438 4.31925 8.02741 4.49833 7.94062 4.70786C7.85383 4.91738 7.83113 5.14794 7.87537 5.37037C7.91961 5.5928 8.02882 5.79712 8.18919 5.95748C8.34955 6.11785 8.55387 6.22706 8.7763 6.2713C8.99873 6.31555 9.22929 6.29284 9.43881 6.20605C9.64834 6.11926 9.82743 5.97229 9.95342 5.78372C10.0794 5.59515 10.1467 5.37346 10.1467 5.14667C10.1467 4.84255 10.0259 4.55089 9.81082 4.33585C9.59578 4.12081 9.30412 4 9 4Z" fill="#CBB6E5"/>
        </svg>
        <span className="text-sm text-custom-text">{getObservanceInfo(selectedDate)}</span></div>: 
      <div>
      <span>Time</span>
          <div className="flex sm:flex-col flex-row gap-2 flex-wrap">
            {availableTimes.map((time) => (
              <button  
              key={time}
              className={`py-2 px-4 border rounded-lg hover:ring-2 hover:ring-custom-accent  bg-white ${selecteTime ===time ? 'ring-2 ring-custom-accent' : 'ring-0'}`}
                onClick={()=>setChosenDate(time)}
              >
                {time}
              </button>
            ))}
          </div>
      </div>
      )}
    </div>
  );
};

export default InputCalendar;

