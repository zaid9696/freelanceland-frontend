import {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import useAuthHook from '../hooks/auth-hook';
import useSocket from '../hooks/useSocket';
import useHttpAxios from '../hooks/http-hook';
import {AuthContext} from '../context/AuthContext';



function MyApp({ Component, pageProps }) {

  const {result, logout, login ,isLogged, isLoggedLoading} = useAuthHook();
  const {sendRequest} = useHttpAxios();
  const [notification, setNotification] = useState([]);




const socket = useSocket('connect', () => {})

const fetchUsersMessages = async () => {

    if(result){
        const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/messages/usersMessages/${result.id}/?limit=2`);
        const {usersMessages} = res.data;
    
        console.log({usersMessages});
    }

}

 useSocket('message', (newMessage) => {

    
    // console.log({newMessage});    

    if(!newMessage.isTyping && newMessage.message){
        const isTrueSendCurrent = [newMessage].some(item => item.sender.id.includes(result.id)); 
        const isTrueReceiverCurrent = [newMessage].some(item => item.receiver.id.includes(result.id)); 
    
        if(isTrueSendCurrent || isTrueReceiverCurrent){
    
           fetchUsersMessages()
        }
    }

})

useEffect(() => {

 result && socket.emit('isOnline', {userId: result.id, isOnline: true});

}, [result])

 const fetchNotifications = async () => {

        try{
            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/notifications?limit=5`);

            setNotification(res.data.notifications);

        }catch(err) {console.log(err);}

}

 useEffect(() => {


    fetchNotifications()


 }, [isLogged]);

useSocket('notifications', (newNotification) => {

    const isSender = newNotification.sender.includes(result.id)
    const isReceiver = newNotification.receiver.includes(result.id)
    if(!isReceiver && !isSender) return
    const pushNoti = [...notification];
    pushNoti.push(newNotification);
     pushNoti.sort((a,b) => {

        return new Date(b.createdAt) - new Date(a.createdAt);

        });
     setNotification(pushNoti);

})


  return (
      <AuthContext.Provider value={{notification, fetchNotifications ,userAuth: result, logout,login ,isLogged, isLoggedLoading}}><Layout><Component {...pageProps} /></Layout></AuthContext.Provider>
    )
}

export default MyApp
