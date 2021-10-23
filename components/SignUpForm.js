import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';


import InputField from '../components/UI/InputField';
import InputRadio from '../components/UI/InputRadio';
import {SignUpFormStyles, InputRadioWrapStyles} from '../styles/InputStyles';



const SignUpForm = (props) => {

	

	const validate = yup.object({
		userName: yup.string()
		.required('User name is required'),
      role: yup.string().required('Please choice your type of account'),
      email: yup.string().email('Invalid Eamil').required('Email is required'),
      password: yup.string().required('Password is required').min(4, 'Password must be at leat 4 characters')
	})



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

     		console.log(values);
     	}}
     >
     	
     	{
     		formik => (


     			<SignUpFormStyles>
     				<h1>Sign Up</h1>
     				<Form>
     					<InputField label='User Name' type='text' name='userName' trim />
                  <InputField label='Email' type='email' name='email' trim />
                  <InputField label='Password' type='password' name='password' trim />
                  <InputRadioWrapStyles className='input-radio-wrap'>
     					<InputRadio  type='radio' label='Client' name='role' value='client' />
                  <InputRadio id='test'  type='radio' label='Freelancer' name='role' value='freelancer' />
            
     					</InputRadioWrapStyles>
     					<button type='submit' disabled={!formik.isValid} >Sign Up</button>
     				</Form>
     			</SignUpFormStyles>

     		)
     	}

     </Formik>
  )
}

export default SignUpForm;