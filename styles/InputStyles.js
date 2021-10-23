import styled from 'styled-components';

export const InputRadioWrapStyles = styled.div`

    display: flex;
    justify-content: space-around;
    margin: 1rem 0;

    input[type=radio] {

      width: 18px;
      height: 18px;

    }

    .radio-label {
      display: flex;
    }

    span {
      margin-left: 5px;
      font-size: 1.14rem;
      font-weight: 500;
    }

`

export const SignUpFormStyles = styled.div`
	
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: var(--shadow);
    margin-top: 45px;
    border: 1px solid #634cc26e;
    padding: 1rem;
    border-radius: 2px;

    form {
    	width: 100%;
    	display: flex;
    	flex-direction: column;
    }
`

export const LabelStyles = styled.label`
	
	margin-left: 1.8rem;
   	font-size: 1.19rem;
	margin-bottom: 5px;
	font-weight: 500;
	display: block;



`;

export const InputFieldStyles = styled.input`
    

      width: 86%;
      align-self: center;
      padding: 10px 15px;
      border-radius: 7px;
      border: 2px solid #dbdbdb;
      box-shadow: 0px 0px 7px 1px #0202021a;
      margin-bottom: 1.5rem;
      &.input-invalid {

      outline-color: var(--red);
      border: 1px solid var(--red);

  }
`