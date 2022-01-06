import {useState , useEffect, useCallback ,useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import uniqid from 'uniqid';
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";

import CheckoutPageStyles from '../../../styles/CheckoutPageStyles';
import bundleImage from '../../../assets/bundleImage.png';
import userAvatar from '../../../assets/userAvatar.jpg';
import Button from '../../../components/UI/Button.js';
import useHttpAxios from '../../../hooks/http-hook';
import {AuthContext} from '../../../context/AuthContext';
import ErrorModal from '../../../components/UI/ErrorModal';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import Modal from '../../../components/UI/Modal';
import useSocket from '../../../hooks/useSocket';

const PaypalButton = ({orderBundleHandler, bundleId}) => {


  return (

      <PayPalScriptProvider options={{"client-id":  "AStWyarG84TtXbtG2cfj7j2EzPzOlaJUC2dIqPukkzPwoiiEbqcLCUs4D_wmyggIEZVaqxW8mMFl1Ro8"}}>
            <PayPalButtons 
                style={{ color: "blue", shape: "pill", label: "pay", height: 55 }}
                createOrder={function () {
                  return fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/orders/create-order`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      items: {id: bundleId},
                    }),
                  })
                    .then(res => {
                      if (res.ok) return res.json()
                      return res.json().then(json => Promise.reject(json))
                    })
                    .then(({ id }) => {
                      console.log({id});
                      return id
                    })
                    .catch(e => {
                      console.error(e.error)
                    })
                }}
                onApprove={function (data, actions) {
                      // console.log({actions, data});
                      orderBundleHandler();
                  return actions.order.capture()
                  }
                }
                onCancel={function (data, actions) {
                      console.log('The order cancelled');
      
                }}
                    
                // }}
                // onError={this.onError}
            />
        </PayPalScriptProvider>

    )

}

const CheckoutPage = ({result}) => {
  
  const router = useRouter();
  const {bundle} = result;
  const [showModal, setShowModal] = useState(false);
  // const [newOrder, setNewOrder] = useState([])
  console.log({bundle})
  const [randomId, setRandomId] = useState('');
  const auth = useContext(AuthContext);

  useEffect(() => {

      setRandomId(uniqid.process('ID' +  Math.random().toString(12).slice(2)));

  }, [])

  // console.log(uniqid.process());

  const {isLoading, sendRequest, error ,clearError} = useHttpAxios();


  const socket = useSocket('connect', () => {console.log('socket Connect');})

const createNotification = useCallback(async (newOrder) => {

        console.log({newOrder});
         const values = {
              orderId: newOrder.orderId,
              status: 'Purchased',
              buyer: newOrder.user.userName,
              title: bundle.title,
              sender: newOrder.user,
              receiver: newOrder.seller,
              creator: auth.userAuth.id
            }

        try{

          const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/notifications`, 'POST', values);
            socket.emit('notifications', res.data.newNotification);
          // console.log({res});

        }catch(err) {console.log(err);}

})

      // console.log(auth.userAuth.id);
  const orderBundleHandler =  async () => {


      const deliverDate = new Date(Date.now() + bundle.deliverDays * 24 * 60 * 60 * 1000);

      const values = {

              orderId: randomId,
              active: true,
              deliverDate,
              bundle: bundle.id,
              user: auth.userAuth.id,
              seller: bundle.user.id

          }

          try{

          
              const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/orders/`, 'POST', values);
              // console.log(randomId);

              console.log({res});
              // setNewOrder(res.data.newOrder);
              createNotification(res.data.newOrder)
              if(res.status === 201){

                setShowModal(true)
                setTimeout(() => {

                  router.push(`/ordered/${randomId}`);
                }, 4000)
              }

          }catch(err) {

              console.log(err);

          }

  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <Modal isVisible={showModal} header='Success'>
        <p>You have purchased successfully the bundle</p>
      </Modal>
      <CheckoutPageStyles>
        <div className='content'>
            <header>
                <div className='header-img'>
                    <Image src={bundleImage} width={350} height={250} alt="Bundle's Image" />
                </div>
                <div className='header-content'>
                    <h2>{bundle.title}</h2>
                    <div className='header-user'>
                        <div className='img-circle'><Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${bundle.user.photo}`} width={60} height={60} alt="User's Image" /></div>
                        <span><Link href={`/${bundle.user.userName}`}><a>{bundle.user.userName}</a></Link></span>
                    </div>
                </div>
            </header>
            <ul>
                <li>
                  <span className='title'>Revisions:</span>
                  <span className='desc'>{bundle.revisions}</span>
                </li>

                <li>
                  <span className='title'>Delivery Days:</span>
                  <span className='desc'>{bundle.deliverDays} Days</span>
                </li> 

                <li>
                  <span className='title'>Order ID:</span>
                  <span className='desc'>#{randomId}</span>
                </li> 
                
                <li>
                  <span className='title'>Price:</span>
                  <span className='desc'>${bundle.price}</span>
                </li> 
            </ul>
        </div>

        {auth.userAuth.id && <div className='paypal-btn'><PaypalButton bundleId={bundle.id} orderBundleHandler={orderBundleHandler} /></div>}
        
      </CheckoutPageStyles>
      </>
  )
}


export async function getServerSideProps(context){

      const {bundleId} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
       const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/${bundleId}`,{
          method: 'GET',
          headers: myHeaders
        });
 
 
        const data = await res.json();
        
        let error = data.error ? data.error.statusCode : null;
    
        if(error || !data){

          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
       }

        return {
            props: {
                result: data,
            }
        }
  
  

}




export default CheckoutPage;