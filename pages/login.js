import {useState, useContext} from 'react';
import styled from 'styled-components';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorModal from '../components/UI/ErrorModal';
import useHttpAxios from '../hooks/http-hook';
import LogInForm from '../components/LogInForm';
import {AuthContext} from '../context/AuthContext';
const LoginStyles = styled.div`

  grid-column: center-start / center-end;

 `

const login = (props) => {

  const {isLoading, error, sendRequest, clearError} = useHttpAxios();



  const auth = useContext(AuthContext);

  const loginHanlder = async (values) => {

      try {

          const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/login`, 'POST', values);
          auth.login();
      }catch(e){

          console.log(e);

      }

  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <LoginStyles>
      	<LogInForm loginHanlder={loginHanlder} />
      </LoginStyles>
    </>
  )
}

export default login;