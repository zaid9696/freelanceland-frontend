import {useState, useEffect, useContext, useRef, useCallback} from 'react';
import io from 'socket.io-client'
const socketUser = io(`http://localhost:5000`);
import styled from 'styled-components';


import useSocket from '../../hooks/useSocket';
import {AuthContext} from '../../context/AuthContext';
import ChatPanel from '../../components/Chat/ChatPanel'
import ChatList from '../../components/Chat/ChatList';
import useHttpAxios from '../../hooks/http-hook';


const ChatPageStyles = styled.div`


    grid-column: center-start / center-end;
    display: grid;
    grid-template-columns: 1fr 70%;
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
 
  console.log(result);
  const {user, messages, usersMessages} = result;

  const [message, setMessage] = useState(messages || []);
  console.log({message});
  const [newMessages, setNewMessages] = useState(null);
  const [usersMessagesState, setUsersMessagesState] = useState(usersMessages || {});
  const [field, setField] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [userTime, setUserTime] = useState(user.localTimeZone || []);
  const [lastSeen, setLastSeen] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const {userAuth} = useContext(AuthContext);
  const  {isLoading, sendRequest, error, clearError} = useHttpAxios();
  


  useEffect(() => {


    
    setMessage(messages);
    setUserTime(user.localTimeZone);
    let lastSeenCon;
     socketUser.on('isOnline', ({users, lastSeen}) => {


        setOnlineUsers(users);
        lastSeenCon = lastSeen
        
        console.log({lastSeen, id: user.id, users});
    })

    const isTrue = Object.keys(onlineUsers).map(item =>  onlineUsers[item].includes(user.id)).includes(true);

    setIsOnline(isTrue)
    setLastSeen(lastSeenCon);

    

  }, [result])

useEffect(() => {

    const fetchUsersMessages = async () => {

        try{


            if(newMessages){

            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/messages/usersMessages/${userAuth.id}`);
            const {usersMessages} = res.data;
            console.log({res});
            setUsersMessagesState(usersMessages)
            
            }

        }catch(err) {console.log(err);}

    }

    fetchUsersMessages()


}, [newMessages])

console.log({usersMessagesState});


const socket = useSocket('message', (newMessage) => {


      console.log(newMessage);
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
     // console.log(isTrue);
});


// }

// func()




useSocket('updatedMessage', updatedMessages => {


  console.log({updatedMessages});
    // let messAryList = []

    //  once the user receives message it will send received;
    const messageAry = isMessageReceived(message, updatedMessages);
    console.log({messageAry});
     setMessage(messageAry);


})




useEffect(() => {

    const results = message.filter(item => item.receiver.id === userAuth.id && item.sender.id === user.id && !item.read);

    // console.log(results);

    if(results.length !== 0){
        console.log('updatedMessage');

        let messIds = [];

        results.map( item => messIds.push(item.id));
       console.log(messIds);
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

            console.log(socket.id);

      });
      setField('');
 }


const inputFieldHandler = (e) => {

      e.preventDefault();
      setField(e.target.value);
      if(e.target.value.length !== 0){

        
        // setIsTyping(true);
        // console.log({isTyping});
        socket.emit('message', {isTyping: true, sender: userAuth.id,receiver: user.id});
        // if the user did not type for 15 seconds, Typing indicator will disappear
        setTimeout(() => {

          socket.emit('message', {isTyping: false, sender: userAuth.id, receiver: user.id});
          
        }, 15000);

      }else {

        socket.emit('message', {isTyping: false, sender: userAuth.id, receiver: user.id});

      }


}

  console.log({message});


  return (
    <ChatPageStyles>
        <ChatList  usersMessages={usersMessagesState} onlineUsers={onlineUsers} user={user}/>
       <ChatPanel messages={message} field={field} inputFieldHandler={inputFieldHandler} user={user} userTime={userTime} isTyping={isTyping} messagesHandlder={messagesHandlder} lastSeen={lastSeen} isOnline={isOnline}  />
    </ChatPageStyles>
  )
}



export async function getServerSideProps(context){

  const {userName} = context.query;
  const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;


    const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
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