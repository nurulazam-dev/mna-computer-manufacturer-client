import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Calender = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
      />
    </div>
  );
};

export default Calender;
