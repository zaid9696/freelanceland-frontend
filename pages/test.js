import {useState, useContext, useRef, useEffect} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import UploadImage from '../components/UI/UploadImage';
import useHttpAxios from '../hooks/http-hook';

const TestStyles = styled.div` 

    grid-column: center-start / center-end;

 `

const test = (props) => {

    const [imageFile, setImageFile] = useState();
   const {sendRequest} = useHttpAxios();

   const updateUserData = async (e) => {

        e.preventDefault();

           try{

            const form =  new FormData();
            form.append('email', 'zaid@TSgmail.com');
            form.append('photo', fileValue);
            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/updateMe`, 'PATCH', form);
            console.log({res});
        }catch(e){console.log(e);}

    }

    console.log({imageFile});
 
  return (
    <TestStyles> 
       <UploadImage setImageFile={setImageFile} user={true}/>
    </TestStyles>
  )
}

export default test;