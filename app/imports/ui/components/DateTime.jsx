import React from 'react';

const DateTime = () => {
  const showDate = new Date();
  const displayDate = `Today is ${showDate.toDateString()}.`;
  const displayTime = `Right now it's ${showDate.getHours()}:${showDate.getMinutes()}.`;
  return (
    <h2>
      {displayDate} <br />
      {displayTime}
    </h2>
  );
};

export default DateTime;
