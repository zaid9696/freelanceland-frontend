import {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import useAuthHook from '../hooks/auth-hook';
import useSocket from '../hooks/useSocket';
import {AuthContext} from '../context/AuthContext';



function MyApp({ Component, pageProps }) {

  const {result, logout, login ,isLogged, isLoggedLoading} = useAuthHook();



const socket = useSocket('connect', () => {})


useEffect(() => {

 result && socket.emit('isOnline', {userId: result.id, isOnline: true});

}, [result])
 




  return (
      <AuthContext.Provider value={{userAuth: result, logout,login ,isLogged, isLoggedLoading}}><Layout><Component {...pageProps} /></Layout></AuthContext.Provider>
    )
}

export default MyApp
