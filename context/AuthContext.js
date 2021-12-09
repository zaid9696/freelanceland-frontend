import {createContext} from 'react';



export const AuthContext = createContext({
	userAuth: '', 
	logout: () => {},
	login: () => {},
	isLogged: false,
	isLoggedLoading: false,
})