import {useEffect} from 'react';
import io from 'socket.io-client'
const socket = io(`${process.env.NEXT_PUBLIC_URL}`);


const useSocket = (eventName,cb) => {


	useEffect(() => {




		socket.on(eventName, cb);
		return () => {
			socket.off(eventName, cb);
		}


	}, [eventName, cb])


	return socket;

}

export default useSocket;