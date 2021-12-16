import React from 'react';

const truncateLetters = (words, num) => {

	if(words.length <= num){

		return words
	}

	return words.slice(0, num) + '...';

}

export default truncateLetters;