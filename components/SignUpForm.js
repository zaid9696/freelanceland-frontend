import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';

import SocialButton from './SocialLogin';
import InputField from '../components/UI/InputField';
import InputRadio from '../components/UI/InputRadio';
import {FormStyles, InputRadioWrapStyles, SubmitButtonStyles} from '../styles/InputStyles';


const SignUpForm = ({signupHandler,...props}) => {

	const validate = yup.object({
		userName: yup.string().min(4, ' User name must be at least 4 characters')
		.required('User name is required'),
      role: yup.string().required('Please choice your type of account'),
      email: yup.string().email('Invalid Eamil').required('Email is required'),
      password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters')
	});




  return (
     <Formik

     	initialValues={{
     		userName: '',
     		role: '',
         email: '',
         password: ''

     	}}
     	validationSchema={validate}
      validateOnMount={true}
     	onSubmit={values => {
     		signupHandler(values);
     	}}
     >
     	
     	{
     		formik => (

     			<FormStyles>
     				<h1>Sign Up</h1>
     				<Form>
     					<InputField label='User Name' type='text' name='userName' trim />
                  <InputField label='Email' type='email' name='email' trim />
                  <InputField label='Password' type='password' name='password' trim passIcon />
                 
                  <InputRadioWrapStyles className='input-radio-wrap'>
     					
                     <InputRadio  type='radio' label='Client' name='role' value='client' />
                     <InputRadio id='test'  type='radio' label='Freelancer' name='role' value='freelancer' />
            
     					</InputRadioWrapStyles>
     					<SubmitButtonStyles type='submit' disabled={!formik.isValid} >Sign Up</SubmitButtonStyles>
     				</Form>
     			</FormStyles>

     		)
     	}

     </Formik>
  )
}

export default SignUpForm;