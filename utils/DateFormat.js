import React from 'react';

const dateFormat = (dateFormat, notHour) => {

	if(notHour){

  	return new Date(dateFormat).toLocaleString('en-US', {month: 'short', day: '2-digit', year: 'numeric'});
	}


  return new Date(dateFormat).toLocaleString('en-US', {month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric'});
}

export default dateFormat;