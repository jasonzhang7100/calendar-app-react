import React from 'react';
import moment from 'moment';

const Calendar = () => {
  const value = moment();
  const startDay = value.clone().startOf('month');
  return <div>{startDay.format('MM/DD')}</div>;
};

export default Calendar;
