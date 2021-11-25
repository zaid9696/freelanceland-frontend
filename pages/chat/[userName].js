import {useState,useEffect, useContext} from 'react';
import io from 'socket.io-client'
import styled from 'styled-components';
const socketT = io(`http://localhost:5000`);


import useSocket from '../../hooks/useSocket';
import {AuthContext} from '../../context/AuthContext';
import ChatPanel from '../../components/Chat/ChatPanel'
import ChatList from '../../components/Chat/ChatList';

const ChatPageStyles = styled.div`


    grid-column: center-start / center-end;
    display: grid;
    grid-template-columns: 1fr 70%;
    margin-top: 2rem


`;

const chatPage = ({result}) => {
 
  console.log(result);
  const {user, messages} = result;
  const [message, setMessage] = useState(messages || []);
  const [testMess, setTestMess] = useState(messages || []);
  const [field, setField] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const {userAuth} = useContext(AuthContext);


const socket = useSocket('message', newMessage => {

      console.log(newMessage, userAuth.id);
      newMessage.sender !== userAuth.id && setIsTyping(newMessage.isTyping);
    !newMessage.isTyping && newMessage.message && setMessage(message => [...message, newMessage])

});

useSocket('updatedMessage', updatedMessages => {


  console.log({updatedMessages, messageAry});
    // let messAryList = []

    // updatedMessages.map(item => messAryList.push(item.id));
   
     
    const tess = message.map((item, i) => {
         const res = updatedMessages.map(elm => {
              if(elm.id == item.id){

                  item.message = elm.message;
              }

         })

    })
    const messageAry = [...message];
    setMessage(messageAry);


})


  useEffect(() => {

    const results = messages.filter(item => item.receiver.id == userAuth.id && !item.read);

    if(results.length !== 0){
        console.log('updatedMessage');

        let messIds = [];

        results.map( item => messIds.push(item.id));
       console.log(messIds);
        socket.emit('updatedMessage', messIds);

    }
    

  }, [messages, userAuth])


 const messagesHandlder = (e) => {

      
      e.preventDefault();
      setIsTyping(false);
      const emittingValues = {
        message: field,
        sender: userAuth.id,
        receiver: user.id,
        isTyping: false
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
        socket.emit('message', {isTyping: true, sender: userAuth.id});
        // if the user did not type for 15 seconds, Typing indicator will disappear
        setTimeout(() => {

          socket.emit('message', {isTyping: false, sender: userAuth.id});
          
        }, 15000);

      }else {

        socket.emit('message', {isTyping: false, sender: userAuth.id});

      }


}


  return (
    <ChatPageStyles>
        <ChatList />
       <ChatPanel messages={message} field={field} inputFieldHandler={inputFieldHandler} user={user} isTyping={isTyping} messagesHandlder={messagesHandlder}  />
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
    
        // if(error || !data){

        //   return {
        //     redirect: {
        //       destination: '/',
        //       permanent: false
        //     }
        //   }
       // }/*/

        return {
            props: {
                result: data
            }
        }

}

export default chatPage;