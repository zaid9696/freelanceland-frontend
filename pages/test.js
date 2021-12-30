import {useState, useContext, useRef, useEffect} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import UploadImage from '../components/UI/UploadImage';
import useHttpAxios from '../hooks/http-hook';
import { AuthContext } from '../context/AuthContext';

const TestStyles = styled.div` 

    grid-column: center-start / center-end;
    

 `

const test = (props) => {

   const [imageFile, setImageFile] = useState();
   const {sendRequest} = useHttpAxios();
   const {userAuth} = useContext(AuthContext);
  console.log({userAuth: userAuth.photo});
    console.log({imageFile});
   const updateUserData = async (e) => {

        e.preventDefault();

           try{

            const form =  new FormData();
            form.append('email', 'zaid@TSgmail.com');
            form.append('photo', imageFile);
            console.log({imageFile});
            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/updateMe`, 'PATCH', form);
            console.log({res});
        }catch(e){console.log(e);}

    }

    console.log({imagePath:`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${userAuth.photo}`});
 
  return (
    <TestStyles> 
       <UploadImage setImageFile={setImageFile} user={true}/>
       <button onClick={updateUserData}> Save Image</button>
       {userAuth && <Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${userAuth.photo}`} width={50} height={50} />}
    </TestStyles>
  )
}

export default test;