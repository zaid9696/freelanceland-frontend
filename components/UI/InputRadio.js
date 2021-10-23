import {Field, useField, ErrorMessage} from 'formik';

const InputRadio = ({label, id, ...props}) => {

  return (

	    <Field {...props}>
    		{
    			({
    				field
    			}) => (
    			<label className='radio-label'>
    				<input   type='radio' {...field} />
    				<span>{label}</span>
    				<ErrorMessage component='div' name={field.name} className='error'/>
    			</label>
    			)
    		}
	    </Field>
	   
  )
}

export default InputRadio;