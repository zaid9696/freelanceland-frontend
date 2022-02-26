import {useEffect, useState} from 'react';

import Router from 'next/router';

import Layout from '../components/Layout';
import useAuthHook from '../hooks/auth-hook';
import useSocket from '../hooks/useSocket';
import useHttpAxios from '../hooks/http-hook';
import {AuthContext} from '../context/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import cookie from 'js-cookie';




function MyApp({ Component, pageProps }) {

  const {result, setTokenOut ,userToken,logout, login ,isLogged, isLoggedLoading} = useAuthHook();
  const {sendRequest} = useHttpAxios();
  const [isLoading, setIsLoading] = useState(false);

  const [notification, setNotification] = useState([]);
  const [userMessages, setUserMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState({});

  Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  setIsLoading(true);

};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  setIsLoading(false);
  
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  setIsLoading(false);
  
};


const socket = useSocket('connect', () => {});


useSocket('isOnline', ({users, lastSeen}) => {

        
        setOnlineUsers(users);

});





const fetchUsersMessages = async () => {

    if(result){
        const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/messages/usersMessages/?limit=5`);
        const {usersMessages} = res.data;
        setUserMessages(usersMessages)
        
    }

}

 useSocket('message', (newMessage) => {

    
       

    if(!newMessage.isTyping && newMessage.message){
        const isTrueSendCurrent = [newMessage].some(item => item.sender.id.includes(result.id)); 
        const isTrueReceiverCurrent = [newMessage].some(item => item.receiver.id.includes(result.id)); 
    
        if(isTrueSendCurrent || isTrueReceiverCurrent){
    
           fetchUsersMessages()
        }
    }

})

useEffect(() => {

    if(result){

        socket.emit('isOnline', {userId: result.id, isOnline: true});
        fetchUsersMessages();
    }

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

});



  if(userToken && isLogged){
  console.log({result, userToken});
  console.log('Token Login');

  // console.log({result});
  if(userToken && isLogged){

  cookie.set('token', userToken, {expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)});
  }else{

  console.log('Token Logouot');
  
    cookie.set('token', 'logged out', {expires: 1 / 20});

  }




  return (
      <>
      {isLoading && <LoadingSpinner />}
      <AuthContext.Provider value={{notification,fetchUsersMessages ,userMessages,fetchNotifications, onlineUsers ,userAuth: result, logout,login ,isLogged, isLoggedLoading}}><Layout><Component {...pageProps} /></Layout></AuthContext.Provider>
      </>
    )
}

export default MyApp
