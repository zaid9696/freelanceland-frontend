import {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import axios from 'axios';
import {useRouter} from 'next/router';

import useCountDown from '../../hooks/countDown-hook';
import userAvatar from '../../assets/userAvatar.jpg';
import bundleImage from '../../assets/bundleImage.png';
import OrderedPageStyles from '../../styles/OrderedPageStyles';
import useHttpAxios from '../../hooks/http-hook';
import Button from '../../components/UI/Button';
import dateFormat from '../../utils/DateFormat';
import acceptIcon from '../../assets/icons/accept.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import refuseIcon from '../../assets/icons/refuse.svg';
import deliverIcon from '../../assets/icons/deliver.svg';
import starIcon from '../../assets/icons/starReview.svg';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorModal from '../../components/UI/ErrorModal';
import {AuthContext} from '../../context/AuthContext';
import useSocket from '../../hooks/useSocket';
import ReviewFields from './ReviewFields';
import RatingStar from '../../components/UI/RatingStar';


const OrderedPage = ({result}) => {

  const {isLogged, userAuth, logout} = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState({});
  const [orders, setOrders] = useState(result.order || []);
  const [timeStampOrderBuy, setTimeStampOrderBuy] = useState();
  const [timeStampOrderSell, setTimeStampOrderSell] = useState();
  const [deliverDesc, setDeliverDesc] = useState('');
  // console.log({order: result.order});
  const [orderState, setOrderState] = useState({
    isAccepted: false,
    isNotAccepted: false,
    isDelivered: false,
    isCancelled: false,
  });
  
  const router = useRouter();
  const deliverDate = result.order.deliverDate;
  const {isLoading, sendRequest, error, clearError} = useHttpAxios();
  const bundle = result.order.bundle;
  const {accepted, notAccepted, delivered, cancelled, deliveredDesc ,user} = result.order;

  // console.log({order:orders});
  
  const {isUser} = result;

  
  const socket = useSocket('orders', (updatedOrder) => {

      console.log({updatedOrder});
    const isTrueSellerMe = updatedOrder.seller.includes(userAuth.id)
    const isTrueBuyerMe = updatedOrder.user.id.includes(userAuth.id)
    const isTrueSellerUser = updatedOrder.seller.includes(orders.user.id)
    const isTrueBuyerUser = updatedOrder.user.id.includes(orders.user.id)

    if((isTrueBuyerUser || isTrueSellerUser) && (isTrueSellerMe || isTrueBuyerMe)){

        setOrders(updatedOrder)

      }
  })



  const updateOrderState = async (values, orderState) => {

        try{


            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/orders/${result.order.id}`, 'PATCH', values);

            console.log(res);
         
            socket.emit('orders', res.data.order);
            // setOrders(res.data.order);
        }catch(err) {
          console.log(err);
        }

  }

   const updateNotificationState = async (notiState) => {

        try{

            const values = {
              orderId: orders.orderId,
              status: notiState,
              buyer: orders.user.userName,
              title: bundle.title,
              sender: orders.user,
              receiver: orders.seller,
              creator: userAuth.id
            }
            
            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/notifications`, 'POST', values);
            console.log('notifications test');
            console.log({res: res.data.newNotification});
         
            socket.emit('notifications', res.data.newNotification);
            
        }catch(err) {
          console.log(err);
        }

  }

  const  {daysCountDown, hoursCountDown, minutesCountDown, secondsCountDown, remainingTimer}
   = useCountDown({deliverDate, updateOrderState, accepted, delivered, cancelled, notAccepted}); 

  // When timer ends the order will automaticlly considred REFUSED;

const OrderStateElms = ({title, desc, clsName, icon, timeSt, rate}) => {

    return (

          <div className={`order-${clsName} order-stl`}>
                  <div className='icon'>
                      <Image src={icon} width={65} height={65} alt='Deliver Icon' />
                  </div>
                  <div className='content'>
                      <div className='header'>
                        <h3>{title}</h3>
                        <span className='order-rate'>
                        {rate}  {rate && <div className='stars'><RatingStar width={20} height={20} rating={rate} /></div>}
                          
                        </span>
                      </div>
                        <div className='content-info'>
                         { desc && <p>{desc}</p> }
                          <span>{dateFormat(timeSt)}</span>
                        </div>
                  </div>
              </div>
         

      )

}

const modalHandler = (values) => {

  setOpenModal(true);
  setModalType(values);
  
}



const closeModalHanlder = () => {

  setOpenModal(false)

}
 

const confirmOrderHandler = (type) => {

    // Update only the order state of the clicked button;
    closeModalHanlder();
    if(modalType.type === 'accept')
      { 
        updateOrderState({accepted: true, active: false});
        updateNotificationState('Accepted');

      };
    if(modalType.type === 'refuse') {
        updateOrderState({notAccepted: true,active: false});
        updateNotificationState('Refused');

      };
    if(modalType.type === 'deliver') {
       updateOrderState({delivered: true,deliveredDesc: deliverDesc});
       updateNotificationState('Delivered');
    };
    if(modalType.type === 'cancel') {
      updateOrderState({cancelled: true, active: false});
       updateNotificationState('Cancelled');

    };
}




  return (
    <>
      <Head>
          <title> Order #{result.order.orderId} | FreelanceLand</title>
      </Head>
    <ErrorModal error={error} onCancel={clearError} />
    {isLoading && <LoadingSpinner />}
    <Modal isVisible={openModal} hideModel={closeModalHanlder} header={`${modalType.type} The Order`} footer={
        <div><Button className='main' type='button' onClick={confirmOrderHandler}>Confrim</Button>
        <Button type='button' className='inverse' onClick={closeModalHanlder}>Cancel</Button></div>
    }>

    {
        modalType.type === 'deliver' ? 

            <form>
                <textarea placeholder='Your message to the Buyer' onChange={(e) => setDeliverDesc(e.target.value)} />
            </form>

           : (

            <p>
                { `Are you sure to ${modalType.type} the order if you click confirm, You will not be able to undo this action.`}
            </p>

          )
    }

    </Modal>
      <OrderedPageStyles>

         { ((!orders.accepted && !orders.notAccepted) && !orders.cancelled) && <> <div className='count-down'>
                       <div className='count days'>
                         <span>{daysCountDown}</span>
                         Days
                       </div>
                       <span className='semi-column'>:</span>
                         <div className='count hours'>
                         <span>{hoursCountDown}</span>
                         Hours
                       </div>
                       <span className='semi-column'>:</span>
         
                       <div className='count mintues'>
                       <span>{minutesCountDown}</span>
                         Minutes
                       </div>
                       <span className='semi-column'>:</span>
         
                       <div className='count seconds'>
                       <span>{secondsCountDown}</span>
                         Seconds
                       </div>
                   </div> 
                   <div  className='warning'>When the timer ends, the order will automatically be considered  REFUSED if not delivered.</div>
                   </>
                 }

          <div className='bundle'>
            <div className='bundle-wrap'>
                
              <div className='bundle-img'>
                  <Image src={bundle.images[0] ? `${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/bundles/${bundle.images[0]}` : bundleImage} width={300} height={200} alt='Bundle Image' />
              </div>
              <div className='bundle-content'>
                  <h2><Link href={`/bundle/${bundle.id}/${bundle.slug}`}><a>{bundle.title}</a></Link></h2>
                  <div className='bundle-buyer'>
                      <div className='img-circle'><Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${orders.user.photo}`} width={40} height={40} alt="Buyer's  avatar " /></div>
                      <Link href={`/${orders.user.userName}`}><a>Buyer: {orders.user.userName}</a></Link>
                  </div>
                  <div className='bundle-order'>
                      <ul>
                        <li>Order ID: #{result.order.orderId}</li>
                        <li>{dateFormat(result.order.createdAt)}</li>
                      </ul>
                  </div>
              </div>

            </div>


              <div className='bundle-price'>
                  <ul>
                    <li><span> Bundle's Price </span><span>${bundle.price}</span></li>
                  </ul>
              </div>
          </div>
         
         {(orders.delivered) && <OrderStateElms title={`${isUser ? 'The Seller' : 'You'} have marked this order as delivered.`} desc={deliveredDesc || deliverDesc} clsName='deliver' timeSt={orders.timeStampSeller} icon={deliverIcon} />}

        { (orders.cancelled) && <OrderStateElms title={`${isUser ? 'The Seller' : 'You'} cancelled this order.`}  clsName='cancelled' timeSt={orders.timeStampSeller} icon={cancelIcon} />}

        {(orders.accepted) && <OrderStateElms title={`The order accepted by ${isUser ? 'you' : 'the buyer'}.`}  clsName='accepted' timeSt={orders.timeStampBuyer} icon={acceptIcon} />}

         {(orders.notAccepted) && <OrderStateElms title={`${isUser ? 'You' : 'The buyer'}  refused to accept the order`}  clsName='refused' timeSt={orders.timeStampBuyer} icon={refuseIcon} />}

               
          { (!orders.delivered && !orders.cancelled) && (!orders.accepted && !orders.notAccepted) && !isUser && <div className='order-btns'>
                      <Button type='button' onClick={() => modalHandler({type: 'deliver'})}>Deliver The Order</Button>
                      <Button type='button'  onClick={() => modalHandler({type: 'cancel'})} >Cancel The Order</Button>
                    </div>
          }

          {
            (orders.delivered && !orders.accepted && !orders.notAccepted) && !isUser &&  <div className='waitingAccept'>
              
                Waiting the Buyer to accept the order.

            </div>
          }

          {
          ( (!orders.accepted && !orders.notAccepted) && (!orders.delivered && !orders.cancelled) ) && isUser &&  <div className='waitingAccept'>
              
                Waiting The Seller To Deliver The Order.

            </div>
          }

          {

           orders.buyerReview && <OrderStateElms title={`${orders.buyerReview.buyer === userAuth.id ? 'You' : 'The buyer'} rated this order.`} desc={orders.buyerReview.review} clsName='review' rate={orders.buyerReview.rating} timeSt={orders.buyerReview.createdAt} icon={starIcon} />
          }

           {

           orders.sellerReview && <OrderStateElms updateNotificationState={updateNotificationState} title={`${orders.sellerReview.seller === userAuth.id ? 'You' : 'The Seller'} have replied to buyer feedback.`} desc={orders.sellerReview.review} clsName='review' rate={orders.sellerReview.rating} timeSt={orders.sellerReview.createdAt} icon={starIcon} />
          }


          {(!orders.accepted && !orders.notAccepted) && orders.delivered && isUser && <div className='order-btns'>
                      <Button type='button' onClick={() => modalHandler({type: 'accept'})}>Accept The Order</Button>
                      <Button type='button' onClick={() => modalHandler({type: 'refuse'})}>Refuse The Order</Button>
                    </div>
          }
          {orders.accepted && orders.user.id == userAuth.id && !orders.buyerReview && <ReviewFields updateNotificationState={updateNotificationState} orders={orders} updateOrderState={updateOrderState} />}
          {orders.accepted && orders.buyerReview && orders.seller == userAuth.id && !orders.sellerReview && <ReviewFields updateNotificationState={updateNotificationState} orders={orders} updateOrderState={updateOrderState} text='The is the Seller' sellerRev={orders.buyerReview.id} />}
      </OrderedPageStyles>
    </>
  )
}


export async function getServerSideProps(context){

      const {orderId} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/orders/${orderId}`,{
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
                result: data
            }
        }
  
  

}


export default OrderedPage;