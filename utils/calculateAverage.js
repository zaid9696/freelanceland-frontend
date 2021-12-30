import React from 'react';

const calculateAverage = (rates) => {



const total = rates.reduce((sum, result) => {
	return sum + result
},0) / rates.length;

	
  const counts = rates.length;
  return {total, counts};
}

export default calculateAverage;