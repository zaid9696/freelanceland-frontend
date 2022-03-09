import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {Formik, Form, Field} from 'formik';
import Select from 'react-select';
import Head from 'next/head';


import * as yup from 'yup';

import InputField from '../components/UI/InputField';
import TextAreaField from '../components/UI/TextAreaField';
import {AuthContext} from '../context/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorModal from '../components/UI/ErrorModal';
import UploadImage from '../components/UI/UploadImage';
import useHttpAxios from '../hooks/http-hook';
import Button from '../components/UI/Button';



const NewBundlePageStyles = styled.div` 


  grid-column: center-start / center-end;
  @media (max-width: 1090px){
  	margin-top: 7rem;
  }
  text-align: center;
  .uploading-images {

  	display: flex;
    justify-content: center;

    img {border-radius: 3px; border: 1px solid var(--main) !important}

  }

  form {
  	text-align:center;
  	width: 70%;
  @media (max-width: 1200px){
  	width: 90%;

  }
  	margin: auto;
  	label {
  		text-align: left;
  		margin-left: 74px;
  		@media (max-width: 500px){
	  		margin-left: 0;
	    	font-size: 1rem;
  		}
  	}

  	textarea {

    	margin-right: -33px;
  		@media (max-width: 500px){

    	margin-right: 0px;
    	width:95%;

  		}
    	height: 200px;

  	}

  	}

  	input {
  	
  	@media (max-width: 500px){
	  	width: 95%;
	  } 

  	}

  }

  .numbers-inputs__footer {

  	display: flex;
  	justify-content: space-between;
    margin-right: 44px;
  @media (max-width: 1090px){
  	display: block;
    margin-right: 0px;
  }
  	input {
  		margin-left: 44px; 
  		width: 79%;
  @media (max-width: 1090px){
  		width: 86%;
  		margin-left: 0px; 
  	}
  @media (max-width: 500px){
  	width: 95%;
  }


  }

  .new-bundle-btn {

  	color: #fff;
  	font-weight: 600;
  	margin-top: 3rem;
  }


 `;

 const SelectStyles = styled.div`

  	width: 88%;
  	@media (max-width: 500px){
  		width: 104%;
  	}
    margin: auto;
  	margin-bottom: 2rem;
    margin-right: 32px;
    text-align: left;
    label {

    	margin-left: 0.1rem !important;
	    font-size: 1.19rem;
	    margin-bottom: 5px;
	    font-weight: 500;
	    display: block;

    }

   `


const NewBundlePage = ({allCategories}) => {


	const [imageFileOne, setImageFileOne] = useState()
	const [imageFileTwo, setImageFileTwo] = useState();
	const [isImagesTrue, setIsImagesTrue] = useState(false);
	const {sendRequest, error, isLoading, clearError} = useHttpAxios();
	const {userAuth} = useContext(AuthContext);
	const router =  useRouter();
	useEffect(() => {

		if(imageFileOne && imageFileTwo) {

			setIsImagesTrue(true);
		}
	}, [imageFileOne, imageFileTwo])
	const options = allCategories.allCategories.map(item => {

		return {

			value: item.id,
			label: item.category
		}

	});
	const validate = yup.object({
		title: yup.string().max(80, ' Bundle title must not exceed more than 80 characters')
		.required("Bundle's title is Required"),
		description: yup.string().max(200, ' Bundle description must not exceed more than 200 characters')
		.required("Bundle's Description is Required"),
		price: yup.number().max(100000, 'One Hundred Thousand For a Bundle, I hope you not serious!')
			.required('The Price Field is Required'),
		deliverDays: yup.number().max(60, 'Bundle deliver Days must not exceed more than 60  days')
					.required('Deliver Days field is Required '),
		revisions: yup.number().max(100, 'Bundle revisions must not exceed more than 100 revisions')
			.required('revisions is Required'),
	});

	// const options = [
	// 	  { value: 'chocolate', label: 'Chocolate' },
	// 	  { value: 'strawberry', label: 'Strawberry' },
	// 	  { value: 'vanilla', label: 'Vanilla' }
	// 	]

	const defaultValues = (options, value) => {

		return options ? options.find(item => item.value === value) : ''
	}


	const submitNewBundleHandler = async (values) => {

	

		const form = new FormData();

		form.append('user', userAuth.id);
		form.append('images', values.imageFileOne);
		form.append('images', values.imageFileTwo);
		form.append('title', values.title);
		form.append('description', values.description);
		form.append('price', values.price);
		form.append('deliverDays', values.deliverDays);
		form.append('revisions', values.revisions);
		form.append('category', values.category);


		try{

			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/add`, 'POST', form);

			const {bundle} = res.data;
			router.push(`/bundle/${bundle.id}/${bundle.slug}`);
		

		}catch(err) {console.log(err);}


	}

  return (
  	<>
    <Head>
          <title> New Bundle | FreelanceLand</title>
      </Head>
  	<ErrorModal error={error} onCancel={clearError} />
  	{isLoading && <LoadingSpinner />}
    <NewBundlePageStyles>
   		 <h1>Create A New Bundle</h1>
   		 <div className='uploading-images'>
   		 	<UploadImage setImageFile={setImageFileOne} />
   		 	<UploadImage setImageFile={setImageFileTwo} />
   		 </div>
   		 <div>
   		 	  <Formik

     		initialValues={{
	     	 title: '',
	     	 description: '',
	     	 price: '',
	     	 deliverDays: '',
	     	 revisions: '',
	     	 category: '61d2edb7f3fbdd9bd6491315'
	     	}}
			validationSchema={validate}
			validateOnMount={true}
			onSubmit={values => {
				 const value = {
				 	...values,
				 	imageFileOne,
				 	imageFileTwo
				 }
				 submitNewBundleHandler(value);
			     
			 }}
		  >
		   {
		   	formik => (

		   		<Form>
                  <InputField label="What is going to be the bundle's title" type='text' name='title' />
                  <TextAreaField label="Describe the new bundle"  name='description' />
                       <div className='numbers-inputs'>
                  	<InputField label="Add here the price of the bundle" type='number' name='price' />
                  	<div className='numbers-inputs__footer'>
                  		<div>
	                  <InputField label="Add here the deliver days of the bundle" type='number' name='deliverDays' />
                  		</div>
                  		<div>
	                  	<InputField label="Add here the revisions of the bundle" type='number' name='revisions' />	
                  		</div>
                  		
                  	</div>
                  </div>
				  <SelectStyles className='select-category' id='select-category'>
				  	<label>Select Here the Category of the bundle</label>
				   	 <Select name='category' value={defaultValues(options, formik.values.category)} onChange={value => formik.setFieldValue('category', value.value)} options={options} />
				  </SelectStyles>
				  <Button disabled={(imageFileOne && imageFileTwo) ? !formik.isValid : true} className='new-bundle-btn' type='submit'>Create A Bundle</Button>	
		   		</Form>

		   		)
		   }  	

		   </Formik>
   		 </div>
    </NewBundlePageStyles>
    </>
  )
}




export async function getServerSideProps(context){

      // const {userName} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('token=')[1] : null;
      const tokenPure = token.split(';')[0];
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${tokenPure}`);
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


export default NewBundlePage;