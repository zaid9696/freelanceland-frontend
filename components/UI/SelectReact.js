import {ErrorMessage, useField} from 'formik';
// import Select from 'react-select';
import Select, { Option, ReactSelectProps } from 'react-select'


const SelectReact = ({label, options ,...props}) => {

	const [field, meta] = useField(props);

  return (

    <>
    	<label>Select Here the Category of the bundle</label>
		<Select {...field}  value={(options ? options.find(option => option.value === field.value) : '') as any} options={options} />
    </>

  )
}

export default SelectReact;