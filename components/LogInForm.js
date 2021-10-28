import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';


import InputField from '../components/UI/InputField';
import {FormStyles, SubmitButtonStyles} from '../styles/InputStyles';


const LogInForm = ({loginHanlder}) => {

  const validate = yup.object({
  		userNameOrEmail: yup.string().min(4, 'must be at least 4 characters').required('This field is required'),
  		password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  })

  return (
    <Formik

    initialValues={
    {
    	userNameOrEmail: '',
    	password: ''
    }
    }
    validationSchema={validate}
    validateOnMount={true}
    onSubmit={values => {

    	loginHanlder(values)

    }}
    >
    	{
    		formik => (

    			<FormStyles>
    				<h1>Login</h1>
    				<Form>
    					<InputField name='userNameOrEmail' label='User Name / Email' type='text' />
    					<InputField label='Password' type='password' name='password' trim passIcon />
    					<SubmitButtonStyles type='submit' disabled={!formik.isValid} >Login</SubmitButtonStyles>
    				</Form>
    			</FormStyles>

    		)
    	}
    </Formik>
  )
}

export default LogInForm;