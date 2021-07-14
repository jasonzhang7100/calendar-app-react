import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './styles.css';
import buildCalendar from './build';

const Calendar = () => {
  // calendar是matrix状态，value是时间点状态（初始值是通过moment获得的当天时间点）
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  // 如果不用useState，while让temp变动并赋值给calendar，calendar这一state变动导致rerender，导致重新从头执行while，以此反复
  // 让useEffect依据value值的变动来rerender
  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  const beforeToday = (day) => day.isBefore(new Date(), 'day');
  const isToday = (day) => day.isSame(new Date(), 'day');
  const isSelected = (day) => value.isSame(day, 'day');
  const dayStyles = (day) => {
    if (beforeToday(day)) return 'before';
    if (isToday(day)) return 'today';
    if (isSelected(day)) return 'selected';
    return '';
  };

  return (
    <div className="calendar">
      {calendar.map((week) => (
        <div key={week}>
          {week.map((day) => (
            <div
              className="day"
              key={day}
              onClick={() => {
                setValue(day);
              }}
            >
              {/* 使用moment自带比较是否同一天的方法来确定是否加选中的样式 */}
              <div className={dayStyles(day)}>{day.format('D').toString()}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
