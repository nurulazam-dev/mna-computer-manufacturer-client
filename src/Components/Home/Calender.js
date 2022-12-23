import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calender = () => {
    const [selectedDay, setSelectedDay] = useState(new Date())

    const footer = selectedDay ? (
        <p className='mt-4 text-center'>You selected <span className='text-green-900 font-semibold'>{format(selectedDay, 'PP')}</span>.</p>
    ) : (
        <p className='mt-4 text-center text-red-800'>Please pick a day.</p>
    );

    return (
        <div>
            <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            footer={footer}
        />
        </div>
        
    );
};

export default Calender;