import {useState} from 'react';
import {ErrorMessage, useField} from 'formik';
import Image from 'next/image';


import hidePass from '../../assets/icons/hidePass.svg';
import showPass from '../../assets/icons/showPass.svg';
import {InputFieldStyles, LabelStyles, InputPasswordIconsStyles} from '../../styles/InputStyles.js';


const InputField = ({label, trim, type, passIcon , ...props}) => {

	const [field, meta] = useField(props);
  const [passToggle, setPassToggle] = useState(false);
    trim ? field.value = field.value.replace(/ /g, "") : null;
		//console.log(field.value);

          let passToTxt
    const passwordHideAndShowHandle = () => {

          setPassToggle(prev => !prev);
           passToTxt =  'text';

    }

  return (
    <>
      <LabelStyles htmlFor={field.name}>{label}</LabelStyles>
    	<InputFieldStyles>
          <input type={passToggle ? passToTxt : type} className={`input-fields ${meta.touched && meta.error ? 'input-invalid' : ''}`}  {...field} {...props} />

        { passIcon && <InputPasswordIconsStyles onClick={passwordHideAndShowHandle}><Image src={passToggle ? showPass : hidePass} width={25} height={25} /></InputPasswordIconsStyles>}
      </InputFieldStyles>
    	<ErrorMessage component='div' name={field.name} className='error' />
    </>
  )
}

export default InputField;