import {useState} from 'react';
import styled from 'styled-components';
import {ErrorMessage, useField} from 'formik';

import {LabelStyles} from '../../styles/InputStyles.js';

const TxAreaStyels = styled.textarea`

	padding: 10px 15px;
    border-radius: 7px;
    border: 2px solid #dbdbdb;
    box-shadow: 0px 0px 7px 1px #0202021a;
    margin-bottom: 1.5rem;
    width: 84%;

`

const TextAreaField = ({label, ...props}) => {

	const [field, meta] = useField(props);

  return (
    <>
    	<LabelStyles>{label}</LabelStyles>
    	<TxAreaStyels {...field} className={`input-textarea ${meta.touched && meta.error ? 'textarea-invalid' : ''}`} />
    	<ErrorMessage component='div' name={field.name} className='error' />

    </>
  )
}

export default TextAreaField;