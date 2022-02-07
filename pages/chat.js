import {useContext, useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import ChatList from '../components/Chat/ChatList';
import useSocket from '../hooks/useSocket';
import {AuthContext} from '../context/AuthContext';
import useHttpAxios from '../hooks/http-hook';

const ChatPageStyles = styled.div` 

	grid-column: center-start / center-end;
  @media (max-width:1090px){
    margin-top: 7rem;
  }


    width: 81%;
  @media (max-width:1090px){
    width: 98%;
  }
    margin: auto;
    margin-top: 2rem;

 `

const chatPage = ({result}) => {

	const {usersMessages} = result;
	const {userAuth} = useContext(AuthContext);
	const [onlineUsers, setOnlineUsers] = useState({});
	const {sendRequest} = useHttpAxios();
	const [usersMessage, setUserMessage] = useState(usersMessages || {});

	const fetchUsersMessages = async () => {

     const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/messages/usersMessages/?limit=5`);
        const {usersMessages} = res.data;
        setUserMessage(usersMessages)
        
	}



	useSocket('isOnline', ({users, lastSeen}) => {

		setOnlineUsers(users);

	})

	useSocket('message', (newMessage) => {

		if(!newMessage.isTyping && newMessage.message){

        const isTrueSendCurrent = [newMessage].some(item => item.sender.id.includes(userAuth.id)); 
        const isTrueReceiverCurrent = [newMessage].some(item => item.receiver.id.includes(userAuth.id)); 
    
        if(isTrueSendCurrent || isTrueReceiverCurrent){
    
           fetchUsersMessages()
        }
    }

	})


  return (
    <>
    <Head>
          <title> All Chats | FreelanceLand</title>
      </Head>
    <ChatPageStyles>
    	<h1>All Chats</h1>
    	<ChatList usersMessages={usersMessage} onlineUsers={onlineUsers} />
    </ChatPageStyles>
    </>
  )
}


export async function getServerSideProps(context){

  const {userName} = context.query;
  const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;


    const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/messages/usersMessages`,{
        method: 'GET',
        headers: myHeaders
      });


       const data = await res.json();
        
        let error = data.error ? data.error.statusCode : null;
    
        if(error || !data){

          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
       }

        return {
            props: {
                result: data
            }
        }

}

export default chatPage;