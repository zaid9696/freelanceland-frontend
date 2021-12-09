import {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import useHttpAxios from '../hooks/http-hook';
import SignUpForm from '../components/SignUpForm';
import Modal from '../components/UI/Modal';
import ErrorModal from '../components/UI/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const SignUpStyles = styled.div`

	grid-column: center-start / center-end;

`;

const signup = (props) => {


	const {isLoading, sendRequest, error,  clearError} = useHttpAxios();

	const [isVisible, setIsVisible] = useState(false);

	const modalHandler = () => {

		setIsVisible(prev => !isVisible);

	}

	const hideModel = () => {

		setIsVisible(false);
	}

	const signupHandler = async (values) => {

		try {

			const ipResult = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${process.env.NEXT_PUBLIC_IP_LOOK_UP_KEY}`)
			const ipData = await ipResult.json();
			const {timezone, geo} = ipData;
		
			const body = {
				...values,
				localTimeZone: timezone,
				countryCode: geo.country_code2,
				lastSeen: Date.now()
			}
		
			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/signup`, 'POST', body);

			console.log(res);
		}catch(err){

			console.log(err.message);
		}

	} 


	// console.log(`${process.env.NEXT_PUBLIC_URL_PATH}/users/signup`)
 return (
 	<>
 		<ErrorModal error={error} onCancel={clearError} />
 		{isLoading && <LoadingSpinner />}
    <SignUpStyles>
    	<SignUpForm signupHandler={signupHandler} />
    </SignUpStyles>
   </>
  )
}

export default signup;