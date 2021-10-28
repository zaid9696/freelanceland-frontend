// import '../styles/globals.css'
import Layout from '../components/Layout';
import useAuthHook from '../hooks/auth-hook';
import {AuthContext} from '../context/AuthContext';

function MyApp({ Component, pageProps }) {

  const {result, logout, login ,isLogged, isLoggedLoading} = useAuthHook();

  return (
      <AuthContext.Provider value={{userAuth: result, logout,login ,isLogged, isLoggedLoading}}><Layout><Component {...pageProps} /></Layout></AuthContext.Provider>
    )
}

export default MyApp
