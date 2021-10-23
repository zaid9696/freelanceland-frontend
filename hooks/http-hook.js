import {useState, useCallback} from 'react';
import axios from 'axios';


const useHttpAxios = () => {


	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = useCallback(async (url, method = 'GET', data = null) => {

			setIsLoading(true);
			
			try{

				const res = await axios({
				method,
				url,
				data
				});


				setIsLoading(false);
				return res;
			}catch(err) {

				setIsLoading(false);
				setError(err.response.data.message);
				throw err.response.data;

			}



	}, []);

	const clearError = () => setError(null);

	return {isLoading, sendRequest, error, clearError}
};

export default useHttpAxios



