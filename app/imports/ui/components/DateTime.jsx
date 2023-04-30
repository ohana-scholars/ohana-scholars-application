import React from 'react';

const DateTime = () => {
  const showDate = new Date();
  const displayDate = `Today is ${showDate.toDateString()}.`;
  const displayTime = `Right now it's ${showDate.getHours()}:${showDate.getMinutes()}.`;
  return (
    <h4>
      {displayDate} <br />
      {displayTime}
    </h4>
  );
};

export default DateTime;
