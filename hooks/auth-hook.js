import {useEffect, useCallback ,useState, useMemo} from 'react';
import {useRouter} from 'next/router';

import useHttpAxios from '../hooks/http-hook';
import useSocket from '../hooks/useSocket';



const useAuthHook = (props) => {
 
	const {isLoading, error, sendRequest, clearError} = useHttpAxios();
	const [result, setResult] = useState('');
	const [userToken, setUserToken] = useState();
	const [isLogged, setIsLogged] = useState(false);
	const [isLoggedLoading, setIsLoggedLoading] = useState(false);
	const router = useRouter();
	const logout = useCallback(async () => {



		try {

			setIsLoggedLoading(false);

			if(isLogged){

				window.location.href = '/';

			}

			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/logout`, 'POST');
  			
				
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


	return {result, userToken ,logout, login ,isLogged, isLoggedLoading};
}

export default useAuthHook;