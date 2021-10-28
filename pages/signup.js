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

			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/signup`, 'POST', values);

			// console.log(res);
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