import {useEffect, useCallback ,useState, useMemo} from 'react';
import {useRouter} from 'next/router';

import useHttpAxios from '../hooks/http-hook';
import useSocket from '../hooks/useSocket';
import cookie from 'js-cookie';



const useAuthHook = (props) => {
 
	const {isLoading, error, sendRequest, clearError} = useHttpAxios();
	const [result, setResult] = useState('');
	const [userToken, setUserToken] = useState();
	const [isLogged, setIsLogged] = useState(false);
	const [tokenOut, setTokenOut] = useState(false);
	const [isLoggedLoading, setIsLoggedLoading] = useState(false);
	const router = useRouter();
	const logout = useCallback(async () => {



		try {

			setIsLoggedLoading(false);

			if(isLogged){

<<<<<<< HEAD
    			
=======
>>>>>>> 558dfef893ed10c253a7728bd8a901777f12f62e
				setTimeout(() => {

				window.location.href = '/';
				}, 2000)
<<<<<<< HEAD

				
=======
>>>>>>> 558dfef893ed10c253a7728bd8a901777f12f62e

			}

			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/logout`, 'POST');
  			
<<<<<<< HEAD
=======
			setUserToken('Logged Out');
>>>>>>> 558dfef893ed10c253a7728bd8a901777f12f62e
			setIsLogged(false);
			setResult(null);
		}catch(e) {
			setIsLogged(false);
			console.log(e)
		}


	})


	const login = useCallback(async () => {


		try {

			setIsLoggedLoading(true);
			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/isloggedin`);
			
			// console.log({res});


			if(res.data.noToken){
				setIsLogged(false);
				setIsLoggedLoading(false);
			}else {
				setResult(res.data.user);
				setUserToken(res.data.token);
				setIsLogged(true);
				setIsLoggedLoading(false);
			}

		}catch(err) {

			setIsLoggedLoading(false);

			if(err.status === 'fail'){

				setIsLoggedLoading(false);
				console.log(err);
				logout();
			}
			
		}

	}, [])
	
	 useEffect(async () => {

	 	login();

	}, [login]);


	return {result,setTokenOut ,userToken ,logout, login ,isLogged, isLoggedLoading};
}

export default useAuthHook;