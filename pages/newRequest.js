import {useState, useContext} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Formik, Form, Field} from 'formik';
import Select from 'react-select';
import * as yup from 'yup';


import InputField from '../components/UI/InputField';
import TextAreaField from '../components/UI/TextAreaField';
import useHttpAxios from '../hooks/http-hook';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorModal from '../components/UI/ErrorModal';
import {AuthContext} from '../context/AuthContext';


const NewRequestPageStyles = styled.div` 

	 grid-column: center-start / center-end;

	  @media (max-width: 1090px){
    margin-top: 7rem;
  }
    width: 75%;
    @media (max-width: 1200px){
      width: 95%;
    }
    margin: auto;

    @media (max-width: 600px){
      h1 {font-size: 1.7rem;}
    }

	.select-category {

  	
    margin: auto;
    // margin-right: 32px;
    text-align: left;
    margin-bottom: 2rem;
    label {

    	margin-left: 0.1rem;
	    font-size: 1.19rem;
    @media (max-width: 600px){
      font-size: 1rem;
      
    }
	    margin-bottom: 5px;
	    font-weight: 500;
	    display: block;

    }
  }

  textarea {

  	width: 96.8%;
    @media (max-width: 600px){
    width: 90%;

    }
  	height: 130px;

  }

  .request-textarea {
  	label {margin: 0; margin-bottom: 0.7rem}
  }

  .request-inputs {

  	display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 600px){
    grid-template-columns: 1fr;
    }
    column-gap: 5rem;
    input {
      @media (max-width: 600px){
    	width: 90%;
      
     }
    }
    label, div {
    	margin: 0;
    	margin-bottom: 0.7rem
    }

  }

  .btn-wrap {
  	text-align: center;
  }

   .new-bundle-btn {
	  	color: #fff;
	  	font-weight: 600;
  	}

 `

const NewRequestPage = ({allCategories}) => {



	const {userAuth} = useContext(AuthContext);
  const router = useRouter();
	const {sendRequest,  error,  isLoading, clearError} = useHttpAxios();
	const validate = yup.object({
		
		requestDescription: yup.string().max(150, ' Request description must not exceed more than 150 characters')
		.required("Request Description is Required"),
		expiryDays: yup.number().max(60, 'Expiration Days must not exceed 60 days')
			.required('The Expiration Days Field is Required'),
		deliverDays: yup.number().max(60, 'Request deliver Days must not exceed more than 60  days')
					.required('Deliver Days field is Required '),
		firstBudget: yup.number().max(100000, ' budget must not exceed 100,000 ')
			.required('First Budget Field is Required'),
		secondBudget: yup.number().max(100000, ' budget must not exceed 100,000 ')
			.required('Second Budget Field is Required'),
	});

	const options = allCategories.allCategories.map(item => {

		return {

			value: item.id,
			label: item.category
		}

	});

	const defaultValues = (options, value) => {

		return options ? options.find(item => item.value === value) : ''
	}

	const createRequestHandler = async (values) => {

		const value = {
			...values,
			request: values.requestDescription,
			delivery: values.deliverDays,
			expiry: values.expiryDays,
			buyer: userAuth.id
		}

		try{

			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/offers`, 'POST', value);
			console.log({res});
      router.push(`/requests`);

		}catch(err) {console.log(err)}

	}

  return (

  	<>
    <Head>
          <title> New Request | FreelanceLand</title>
      </Head>
  	<ErrorModal error={error} onCancel={clearError} />
  	{isLoading && <LoadingSpinner />}
    <NewRequestPageStyles>

    	<h1>Create New Request</h1>

    	<div>
    		<Formik
     		initialValues={{
	     	 requestDescription: '',
	     	 expiryDays: '',
	     	 deliverDays: '',
	     	 firstBudget: '',
	     	 secondBudget: '',
	     	 category: '61d2edb7f3fbdd9bd6491315'
	     	}}
			validationSchema={validate}
			validateOnMount={true}
			onSubmit={values => {
				
				 createRequestHandler(values);
			     console.log({values});
			 }}
		  >
		   {
		   	formik => (

		   		<Form>
		   		<div className='select-category'>
				  	<label>Select Here the Category of the bundle</label>
				   	 <Select name='category' value={defaultValues(options, formik.values.category)} onChange={value => formik.setFieldValue('category', value.value)} options={options} />
				  </div>
				  <div className='request-textarea'>
				  	
                  <TextAreaField label="Describe the new Request"  name='requestDescription' />
				  </div>
                  <div className='request-inputs'>
                  <div className='request-input'>
                  	<InputField label="Deliver Days" type='number' name='deliverDays' />
                  </div>
                  <div className='request-input'>
                  	<InputField label="Expiration Days" type='number' name='expiryDays' />
                  </div>

                   <div className='request-input'>
                  	<InputField label="First Budget" type='number' name='firstBudget' />
                  </div>

                   <div className='request-input'>
                  	<InputField label="Second Budget" type='number' name='secondBudget' />
                  </div>
                  	
                  </div>
                   
                   <div className='btn-wrap'>
				  	<Button disabled={!formik.isValid}  className='new-bundle-btn' type='submit'>Create Request</Button>	
                   </div>
		   		</Form>

		   		)
		   }  	

		   </Formik>
    	</div>
    </NewRequestPageStyles>
    </>

  )
}

export async function getServerSideProps(context){

      // const {userName} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/categories`,{
          method: 'GET',
          headers: myHeaders
        });
    
        
      const allCategories = await res.json();
    
        

      return {
            props: {
                allCategories
            }
      }
}

export default NewRequestPage;