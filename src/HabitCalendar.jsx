import {useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function HabitCalendar({habit}){

  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <>
      <Calendar value={date} onChange={handleDateChange} tileClassName={({ date, view }) =>
        view === 'month' &&  habit.completedDates.some(completedDate => 
        new Date(completedDate).toDateString() === date.toDateString())
        ? 'completed-days'
        : null
      }></Calendar>
    </>
  );
}
  
export default HabitCalendar