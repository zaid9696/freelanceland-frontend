import {useEffect} from 'react';
import io from 'socket.io-client'
const socket = io(`${process.env.NEXT_PUBLIC_URL}`);


const useSocket = (eventName,cb) => {


	useEffect(() => {


		 // socket.on("connect", () => {
   //           console.log(socket.id); // x8WIv7-mJelg7on_ALbx
   //           // console.log(socket);
   // 		 });

		socket.on(eventName, cb);
		return () => {
			socket.off(eventName, cb);
		}


	}, [eventName, cb])


	return socket;

}

export default useSocket;