import axios from 'axios';
import styled from 'styled-components';

import useHttpAxios from '../hooks/http-hook';
import SignUpForm from '../components/SignUpForm';


const SignUpStyles = styled.div`

	grid-column: center-start / center-end;

`;

const signup = (props) => {


	const {isLoading, sendRequest, error,  clearError} = useHttpAxios();


	const signupHandler = async () => {

		try {


				const data = {
					
					userName: 'Zaid9649',
					email: 'zaid46w@gmail.com',
					password: 'test'
				}

			const res = await sendRequest('http://localhost:5000/api/users/signup', 'POST', data);

			console.log(res);
		}catch(err){

			console.log(err);
		}

	} 


 return (
    <SignUpStyles>
    	<SignUpForm />
    </SignUpStyles>
  )
}

export default signup;