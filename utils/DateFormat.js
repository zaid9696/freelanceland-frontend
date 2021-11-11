import React from 'react';

const DateFormat = ({dateFormat}) => {
	

  return new Date(dateFormat).toLocaleString('en-US', {month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric'});
}

export default DateFormat;