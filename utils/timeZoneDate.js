import React from 'react';

const timeZoneDate = (timeZone) => {
  return new Date().toLocaleString("en-US", {timeZone: timeZone, hour: '2-digit', minute: '2-digit'});
}

export default timeZoneDate;