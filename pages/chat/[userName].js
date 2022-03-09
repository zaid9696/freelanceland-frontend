import {useState, useEffect, useContext, useRef, useCallback} from 'react';
import io from 'socket.io-client'
import Head from 'next/head';
const socketUser = io(`${process.env.NEXT_PUBLIC_URL}`);
import styled from 'styled-components';


import useSocket from '../../hooks/useSocket';
import {AuthContext} from '../../context/AuthContext';
import ChatPanel from '../../components/Chat/ChatPanel'
import ChatList from '../../components/Chat/ChatList';
import useHttpAxios from '../../hooks/http-hook';


const ChatPageStyles = styled.div`


    grid-column: center-start / center-end;
    display: grid;
    @media (max-width:1090px){
    margin-top: 7rem;
    }
    grid-template-columns: 1fr 70%;
    @media (max-width:1200px){
    grid-template-columns: 1fr;
      
    }
    margin-top: 2rem;
    gap: 2rem;


`;

const isMessageReceived = (message, updatedMessages) => {

     message.map((item, i) => {
         
         updatedMessages.map(elm => {
              if(elm.id === item.id){

                  item.read = elm.read;
              }

         })
      });

       const newMessages = [...message];

      return newMessages;
}

const chatPage = ({result}) => {
 
  const {user, messages, usersMessages} = result;

  const [message, setMessage] = useState(messages || []);
  
  const [newMessages, setNewMessages] = useState(null);
  const [usersMessagesState, setUsersMessagesState] = useState(usersMessages || {});
  const [field, setField] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [userTime, setUserTime] = useState(user.localTimeZone || []);
  const [lastSeen, setLastSeen] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const {userAuth, fetchUsersMessages} = useContext(AuthContext);
  const  {isLoading, sendRequest, error, clearError} = useHttpAxios();
  


  useEffect(() => {


    
    setMessage(messages);
    setUserTime(user.localTimeZone);
    let lastSeenCon;
    socketUser.on('isOnline', ({users, lastSeen}) => {


        setOnlineUsers(users);
        lastSeenCon = lastSeen
        
    })

    const isTrue = Object.keys(onlineUsers).map(item =>  onlineUsers[item].includes(user.id)).includes(true);

    setIsOnline(isTrue)
    setLastSeen(lastSeenCon);

    

  }, [result])

const fetchUsersMessagesChat = async (isRead) => {

    try{


        if(newMessages || isRead){

        const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/messages/usersMessages`);
        const {usersMessages} = res.data;
        
        setUsersMessagesState(usersMessages)
        
        }

    }catch(err) {console.log(err);}

}

useEffect(() => {


    fetchUsersMessagesChat()


}, [newMessages])




const socket = useSocket('message', (newMessage) => {


      
      // displaying  typing indicator only to the receiver;
      newMessage.sender !== userAuth.id && newMessage.receiver == userAuth.id && newMessage.sender === user.id && setIsTyping(newMessage.isTyping);
      // setting the new messages; 
    if(!newMessage.isTyping && newMessage.message){

        const isTrueSendUser = [newMessage].some(item => item.sender.id.includes(user.id)); 
        const isTrueReceiverUser = [newMessage].some(item => item.receiver.id.includes(user.id)); 
        const isTrueSendCurrent = [newMessage].some(item => item.sender.id.includes(userAuth.id)); 
        const isTrueReceiverCurrent = [newMessage].some(item => item.receiver.id.includes(userAuth.id)); 

        if((isTrueSendUser || isTrueReceiverUser) || (isTrueSendCurrent || isTrueReceiverCurrent)){
        
           setNewMessages(newMessage) 
        }
        if((isTrueSendUser || isTrueReceiverUser) && (isTrueSendCurrent || isTrueReceiverCurrent)){
           setIsTyping(false); 
           setMessage(message => [...message, newMessage]);

        }

    }   

      

});



useSocket('isOnline',({users, lastSeen}) => {

    setOnlineUsers(users);
    setLastSeen(lastSeen);
     const isTrue = Object.keys(users).map(item =>  users[item].includes(user.id)).includes(true);

     setIsOnline(isTrue)
    
});


// }

// func()




useSocket('updatedMessage', updatedMessages => {


  
    // let messAryList = []

    //  once the user receives message it will send received;
    const messageAry = isMessageReceived(message, updatedMessages);
    
     setMessage(messageAry);


})




useEffect(() => {

    const results = message.filter(item => item.receiver.id === userAuth.id && item.sender.id === user.id && !item.read);

    

    if(results.length !== 0){
       

        let messIds = [];

        results.map( item => messIds.push(item.id));
        fetchUsersMessages();
        fetchUsersMessagesChat(true);
       
        socket.emit('updatedMessage', messIds);

    }
    


  }, [message, userAuth]);


 const messagesHandlder = (e) => {

      
      e.preventDefault();
      setIsTyping(false);
      const emittingValues = {
        message: field,
        sender: userAuth.id,
        receiver: user.id,
        userName: userAuth.userName,
        isTyping: false,
      }
      socket.emit('message', emittingValues);
      socket.on('connect', () => {

            

      });
      setField('');
 }


const inputFieldHandler = (e) => {

      e.preventDefault();
      setField(e.target.value);
      if(e.target.value.length !== 0){

        
   
        socket.emit('message', {isTyping: true, sender: userAuth.id,receiver: user.id});
        // if the user did not type for 15 seconds, Typing indicator will disappear
        setTimeout(() => {

          socket.emit('message', {isTyping: false, sender: userAuth.id, receiver: user.id});
          
        }, 15000);

      }else {

        socket.emit('message', {isTyping: false, sender: userAuth.id, receiver: user.id});

      }


}

  


  return (
    <>
    <Head>
          <title> Chat with {user.userName} | FreelanceLand</title>
      </Head>
    <ChatPageStyles>
        <ChatList  usersMessages={usersMessagesState} onlineUsers={onlineUsers} user={user}/>
       <ChatPanel messages={message} field={field} inputFieldHandler={inputFieldHandler} user={user} userTime={userTime} isTyping={isTyping} messagesHandlder={messagesHandlder} lastSeen={lastSeen} isOnline={isOnline}  />
    </ChatPageStyles>
    </>
  )
}



export async function getServerSideProps(context){

  const {userName} = context.query;
  const token = context.req.headers.cookie ? context.req.headers.cookie.split('token=')[1] : null;
  const tokenPure = token.split(';')[0];
   console.log({token}); 
   console.log({tokenPure}); 

  const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${tokenPure}`);
       
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/messages/${userName}`,{
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