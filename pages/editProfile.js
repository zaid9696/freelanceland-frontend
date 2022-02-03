import {useContext, useState, useMemo, useEffect } from 'react';
import ct from 'countries-and-timezones';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';
var languages = require('language-list')();
import countryList from 'react-select-country-list';
import {Formik, Form, Field} from 'formik';
import Select from 'react-select';
import * as yup from 'yup';

import useHttpAxios from '../hooks/http-hook';
import cancelIcon from '../assets/icons/cancel.svg';
import ErrorModal from '../components/UI/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import UploadImage from '../components/UI/UploadImage';
import Button from '../components/UI/Button';
import {AuthContext} from '../context/AuthContext';
import InputField from '../components/UI/InputField';
import TextAreaField from '../components/UI/TextAreaField';


const EditProfileStyles = styled.div`


	grid-column: center-start / center-end;
	text-align: center;
	 @media (max-width: 1200px){
  		margin-top: 5rem;
  	 }
	.upload-content {
		display: flex;
		justify-content: center;
		flex-direction: column;
    	align-items: center;
	}

	.upload-user-image {
		font-size: 1.3rem;
    	font-weight: 500;
	}

	.editProfile-content {

		display: grid;
    	grid-template-columns: 1fr 1fr;
    	@media (max-width: 600px) {
    	grid-template-columns: 1fr;

    	}
    	text-align: left;
    	margin-top: 3rem;
	}

	.editProfile-input {

		input {
			
    	@media (max-width: 600px) {

    		width:90%;

			} 
		}

		&.down { 

		    margin-top: 1.5rem;
		 }

		label {
		margin-left: 1.8rem;
    	@media (max-width: 600px) {
		margin-left: 0rem;
		}
	    font-size: 1.19rem;
	    margin-bottom: 5px;
	    font-weight: 500;
	    display: block;
		}
	}

	.css-b62m3t-container {
		width: 90%;
    	margin-left: 1.8rem;
    	@media (max-width: 600px) {

    		width: 101%;
    		margin-left: 0rem;
    		margin-bottom: 1.5rem;

    	}
	}

	.update-user-btn {

		color: #fff;
		font-weight: 500;
		margin-top: 13px;
	}

	.update-footer {

		label{

			font-size: 1.7rem;
    		margin-bottom: 10px;
		}
		textarea {
			height: 230px;
			line-height: 1.7;
		    font-size: 1.4rem;
		    font-weight: 500;
    		@media (max-width: 600px) {
    			width: 90%;
    		}

		}
	}

	.my-skills {

		width: 70%;
    	@media (max-width: 600px) {
    		width: auto;
    	}
	    margin: auto;
	    background: #f3f3f3;
	    padding: 1rem;
	    border: 1px solid #634cc24d;
	    border-radius: 2px;
	    ul {
	    	display: flex;
		    justify-content: center;
		    flex-wrap: wrap;
		    margin-bottom: 1.5rem;
		    li {
	    	    display: flex;
			    margin: 7px;
			    border: dotted 2px #634cc2a1;
			    padding: 5px;
			    justify-content: center;
			    align-items: center;
			    font-weight: 600;	    
	    		}
		.remove-skill { 
			    background: var(--main);
			    padding: 2px;
			    display: inline-block;
			    padding-top: 3px;
			    padding-bottom: 0px;
			    border-radius: 5px;
			    margin-left: 4px;
			    cursor: pointer;

		}

	}
	.add-skill {
		input {
			padding: 6px 15px;
		    border: 1px solid var(--main);
		    border-radius: 5px;
		    @media (max-width:500px){
		    	margin-bottom:1.5rem;
		    }
		}

		button {

			border: 1px solid #fff;
		    padding: 6px;
		    background: var(--main);
		    color: #ffff;
		    font-weight: 500;
		    cursor: pointer;
		    border-radius: 5px;
		    margin-left: 10px;
		}
	}

  `;


const SkillItem = ({item, removeSkillHandler}) => {

		return (

    		    <li>
    		     {item}
    		       <span className='remove-skill' onClick={() => removeSkillHandler(item)}>
    		           <Image src={cancelIcon} width={20} height={20} /> 	  
    		    	</span>
    		    </li>

    		   )

}

const editProfile = (props) => {

	const {userAuth} = useContext(AuthContext);
	const {sendRequest, error,  isLoading, clearError} = useHttpAxios();
	const [imageFile, setImageFile] = useState();
	const [timeZone, setTimeZone] = useState(userAuth.localTimeZone || '');
	const [countryCode, setCountryCode] = useState('');
	const [mySkills, setMySkills] =  useState(userAuth.skills || []);
	const [skillValue, setSkillValue] = useState('');
	const [isTouched, setIsTouched] = useState(false)
  	const options = useMemo(() => countryList().getData(), []);
  	const allLanguages = languages.getData();

  	const languagesOptions = allLanguages.map(item => {

  		return {
  			value: item.language,
  			label: item.language
  		}
  	})
  	console.log({languagesOptions});

  	useEffect(() => {

  	 let country = ct.getCountry(userAuth.countryCode);
  	 timeZone.length > 0 ? country = ct.getCountry(countryCode) : ''
  	 userAuth.skills && setMySkills(userAuth.skills);
  	country && setTimeZone(country.timezones[0]);
  	console.log({country});

  	}, [timeZone,userAuth,countryCode])

	

	console.log({userAuth});

	const validate = yup.object({
		userName: yup.string(),
		aboutMe: yup.string().max(300, ' About Me must not exceed more than 300 characters'),
		firstName: yup.string().max(40, 'First Name must not exceed 40 characters'),
		lastName: yup.string().max(40, 'Last Name must not exceed 40 characters'),
		role: yup.string(),
		email: yup.string().email(),
		preferredLang: yup.string(),
		additionalLang: yup.string(),
		localTimeZone: yup.string(),
		phone:  yup.number(),
		skill: yup.string().max(20, 'Skill Name must not exceed 40 Characters')
	});
	
	const defaultValues = (options, value) => {

		return options ? options.find(item => item.value === value) : ''
	}

	const defaultValuesLang = (options, value) => {

		return languagesOptions ? languagesOptions.find(item => item.value === value) : ''
	}

	

	const addSkillHandler = () => {
		if(skillValue == '') return;
		setMySkills(prev => [...prev, skillValue]);
		setSkillValue('');
		setIsTouched(true);
	}

	const removeSkillHandler = (skill) => {

		const skillsArr = [...mySkills];

		const removedSkills = skillsArr.filter(item => item !== skill);
		setIsTouched(true);
		setMySkills(removedSkills);
	}

	const isTouchedByOneHandler = (dirty, isTouched)  => {

		console.log({dirty, isTouched});
		if(dirty == false || isTouched == false || imageFile) {

			return true
		}else {
			return false
		}

	}

	const updateUserInformation = async (values) => {

			try {

				const form = new FormData();
				form.append('aboutMe', values.aboutMe);
				form.append('additionalLang', values.additionalLang);
				form.append('preferredLang', values.preferredLang);
				form.append('countryCode', values.country);
				form.append('firstName', values.firstName);
				form.append('lastName', values.lastName);
				form.append('localTimeZone', values.localTimeZone);
				form.append('skills', values.skill);
				form.append('photo', imageFile);
				form.append('phone', values.phone);

				let res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/updateMe`, 'PATCH', form);

				console.log({res});

			 	window.location.href = '/editProfile';

			}catch(err) {console.log(err);}
	}

  return (

  	<>
  	  <Head>
          <title> Edit Your Profile | FreelanceLand</title>
      </Head>
  	<ErrorModal error={error} onCancel={clearError} />
  	{isLoading && <LoadingSpinner />}
    <EditProfileStyles>
    	<h1>Edit Profile</h1>
    	<div className='upload-user-image'>
    		 <UploadImage user userPhoto={userAuth.photo} setImageFile={setImageFile} />
    		 <span>Update Image</span>
    	</div>
    	<div>
    		
    		{userAuth && <Formik
    		
    		     		initialValues={{
    			     	 userName: userAuth.userName ,
    			     	 aboutMe: userAuth.aboutMe ? userAuth.aboutMe : '',
    			     	 role: userAuth.role,
    			     	 email: userAuth.email,
    			     	 skill: '',
    			     	 preferredLang: userAuth.preferredLang,
    			     	 additionalLang: userAuth.additionalLang,
    			     	 firstName: userAuth.firstName ? userAuth.firstName : '',
    			     	 lastName: userAuth.lastName ? userAuth.lastName : '',
    			     	 localTimeZone: `${userAuth.localTimeZone}`,
    			     	 country: userAuth.countryCode,
    			     	 phone: userAuth.phone ? userAuth.phone : ''
    			     	}}
    					validationSchema={validate}
    					validateOnMount={true}
    					onSubmit={values => {
    						 const value = {
    						 	...values,
    						 	skill: mySkills,
    						 	localTimeZone: timeZone,
    						 }
    						 
    						 updateUserInformation(value);

    					     console.log({value});
    					 }}
    				  >
    				   {
    				   	formik => (
    		
    				   		<Form>
    				   		<div className='editProfile-content'>
    				   		 <div className='editProfile-input'>
    		                   <InputField disabled label="User Name" type='text' name='userName' />
    				   		 </div> 
    				   		 <div className='editProfile-input'>
    		                   <InputField disabled label="Email" type='email' name='email' />		
    				   		 </div>
    				   		 <div className='editProfile-input'>
    		                   <InputField label="First Name" type='text' name='firstName' />		
    				   		 </div> 
    				   		 <div className='editProfile-input'>
    		                   <InputField label="Last Name" type='text' name='lastName' />		
    				   		 </div>
    				   		  <div className='editProfile-input'>
    		                   <InputField disabled value={timeZone} label="The Time Zone" type='text' name='localTimeZone' />		
    				   		 </div>
	 						<div className='editProfile-input'>
	    		                 <label>Select Country</label>
		                   		<Select name='country' value={defaultValues(options,formik.values.country)} onChange={value => {setCountryCode(value.value); formik.setFieldValue('country', value.value)}} options={options} />	
	    				    </div>
	    				   <div className='editProfile-input'>
	    		                 <label>Preferred Language</label>
		                   		<Select name='country' value={defaultValuesLang(languagesOptions,formik.values.preferredLang)} onChange={value => {formik.setFieldValue('preferredLang', value.value)}} options={languagesOptions} />	
	    				    </div>
	    				    	<div className='editProfile-input'>
	    		                 <label>Additional Language</label>
		                   		<Select name='additionalLang' value={defaultValuesLang(languagesOptions,formik.values.additionalLang)} onChange={value => {formik.setFieldValue('additionalLang', value.value)}} options={languagesOptions} />	
	    				    	</div>
    		                  <div className='editProfile-input down'>
    		                   <InputField disabled label="User Role" type='text' name='role' />		
    				   		 </div>
    				   		 <div className='editProfile-input down'>
    		                   <InputField  label="Phone Number" type='number' name='phone' />		
    				   		 </div>
    				   		</div>
    		                 <div className='update-footer'>
    		                  		<div className='text-area'>
    		                  			<TextAreaField label="About Me" name='aboutMe' />
    		                  		</div>
    		                 </div>	
    		                 <div className='my-skills'>
    		                 	<ul className='all-skill'>
    		                 		{
    		                 			mySkills.map((item, i) => <SkillItem item={item} key={i} removeSkillHandler={removeSkillHandler} />)
    		                 		}
    		                 	</ul>
    		                 	<div className='add-skill'>
    		                 		<input   onChange={(e) => setSkillValue(e.target.value)} value={skillValue} type='text' name='skill' placeholder="Add Skill" />
    		                 		<button onClick={addSkillHandler} type='button'>Add Skill</button>
    		                 	</div>
    		                 </div>
    		                 {
    		                 	
    		                 	console.log({from: formik})

    		                 	
    		                 }
    						 <Button disabled={!isTouchedByOneHandler(!formik.dirty, !isTouched)}  className='update-user-btn' type='submit'>Save Changes</Button>	
    				   		</Form>
    		
    				   		)
    				   }  	
    		
    				   </Formik>}

    	</div>
    </EditProfileStyles>
    </>
  )
}

export default editProfile;