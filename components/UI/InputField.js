import {ErrorMessage, useField} from 'formik';

import {InputFieldStyles, LabelStyles} from '../../styles/InputStyles.js';


const InputField = ({label, trim, type, ...props}) => {

	const [field, meta] = useField(props);

    // trim ? field.value = field.value.replace(/ /g, "") : null;
		//console.log(field.value);

  return (
    <>
      <LabelStyles htmlFor={field.name}>{label}</LabelStyles>
    	<InputFieldStyles type={type} className={`input-fields ${meta.touched && meta.error ? 'input-invalid' : ''}`}  {...field} {...props} />
    	<ErrorMessage component='div' name={field.name} className='error' />
    </>
  )
}

export default InputField;