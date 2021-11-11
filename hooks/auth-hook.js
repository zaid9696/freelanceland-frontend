import {useEffect, useCallback ,useState, useMemo} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

import useHttpAxios from '../hooks/http-hook';

const useAuthHook = (props) => {
 
	const {isLoading, error, sendRequest, clearError} = useHttpAxios();
	const [result, setResult] = useState('');
	const [isLogged, setIsLogged] = useState(false);
	const [isLoggedLoading, setIsLoggedLoading] = useState(false);

	const logout = useCallback(async () => {

		try {


			setIsLoggedLoading(false)
			const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/logout`, 'POST');

			console.log(res);

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

			// console.log(res);
			if(res.data.noToken){
				setIsLogged(false);
				setIsLoggedLoading(false);
			}else {
				setResult(res.data.user);
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


	return {result, logout, login ,isLogged, isLoggedLoading};
}

export default useAuthHook;