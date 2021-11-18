import {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/router';

import useCountDown from '../../hooks/countDown-hook';
import userAvatar from '../../assets/userAvatar.jpg';
import bundleImage from '../../assets/bundleImage.png';
import OrderedPageStyles from '../../styles/OrderedPageStyles';
import useHttpAxios from '../../hooks/http-hook';
import Button from '../../components/UI/Button';
import DateFormat from '../../utils/DateFormat';
import acceptIcon from '../../assets/icons/accept.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import refuseIcon from '../../assets/icons/refuse.svg';
import deliverIcon from '../../assets/icons/deliver.svg';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorModal from '../../components/UI/ErrorModal';
import {AuthContext} from '../../context/AuthContext';


const OrderedPage = ({result}) => {

  const {isLogged, userAuth, logout} = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [bo, setBo] = useState(false);
  const [modalType, setModalType] = useState({});
  const [timeStampOrderBuy, setTimeStampOrderBuy] = useState();
  const [timeStampOrderSell, setTimeStampOrderSell] = useState();
  const [deliverDesc, setDeliverDesc] = useState('');

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


  
  const {isUser} = result;

  

  const updateOrderState = async (values, orderState) => {

        try{


            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/orders/${result.order.id}`, 'PATCH', values);

            setBo(true);
            console.log(res);
         
            setTimeStampOrderSell(res.data.order.timeStampSeller);
            setTimeStampOrderBuy(res.data.order.timeStampBuyer);
            setOrderState(orderState);
        }catch(err) {
          console.log(err);
        }

  }

  const  {daysCountDown, hoursCountDown, minutesCountDown, secondsCountDown, remainingTimer}
   = useCountDown({deliverDate, updateOrderState, accepted, delivered, cancelled, notAccepted}); 

  // When timer ends the order will automaticlly considred REFUSED;
  


const OrderStateElms = ({title, desc, clsName, icon, timeSt}) => {

    return (

          <div className={`order-${clsName} order-stl`}>
                  <div className='icon'>
                      <Image src={icon} width={65} height={65} alt='Deliver Icon' />
                  </div>
                  <div className='content'>
                        <h3>{title}</h3>
                        <div className='content-info'>
                         { desc && <p>{desc}</p>}
                          <span>{<DateFormat dateFormat={timeSt} />}</span>
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
    if(modalType.type === 'accept') updateOrderState({accepted: true, active: false}, {isAccepted: true});
    if(modalType.type === 'refuse') updateOrderState({notAccepted: true,active: false}, {isNotAccepted: true});
    if(modalType.type === 'deliver') updateOrderState({delivered: true,deliveredDesc: deliverDesc}, {isDelivered: true});
    if(modalType.type === 'cancel') updateOrderState({cancelled: true, active: false}, {isCancelled: true});
}




// This is a test to see if the description of the delivery sent to the database
  return (
    <>
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

         { (((!accepted && !orderState.isAccepted) && (!notAccepted && !orderState.isNotAccepted)) && (!cancelled && !orderState.isCancelled)) && <> <div className='count-down'>
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
                   <div className='warning'>When the timer ends, the order will automatically be considered  REFUSED if not delivered.</div>
                   </>
                 }

          <div className='bundle'>
            <div className='bundle-wrap'>
                
              <div className='bundle-img'>
                  <Image src={bundleImage} width={300} height={200} alt='Bundle Image' />
              </div>
              <div className='bundle-content'>
                  <h2><Link href={`/bundle/${bundle.id}/${bundle.slug}`}><a>{bundle.title}</a></Link></h2>
                  <div className='bundle-buyer'>
                      <div className='img-circle'><Image src={userAvatar} width={40} height={40} alt="Buyer's  avatar " /></div>
                      <Link href={`#`}><a>Buyer: Zaid96</a></Link>
                  </div>
                  <div className='bundle-order'>
                      <ul>
                        <li>Order ID: #{result.order.orderId}</li>
                        <li>{<DateFormat dateFormat={result.order.createdAt} />}</li>
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
         
         {(delivered || orderState.isDelivered) && <OrderStateElms title={`${isUser ? 'The Seller' : 'You'} have marked this order as delivered.`} desc={deliveredDesc || deliverDesc} clsName='deliver' timeSt={result.order.timeStampSeller || timeStampOrderSell} icon={deliverIcon} />}

        { (cancelled || orderState.isCancelled) && <OrderStateElms title={`${isUser ? 'The Seller' : 'You'} cancelled this order.`}  clsName='cancelled' timeSt={result.order.timeStampSeller || timeStampOrderSell} icon={cancelIcon} />}

        {(orderState.isAccepted || accepted) && <OrderStateElms title={`The order accepted by ${isUser ? 'you' : 'the buyer'}.`}  clsName='accepted' timeSt={result.order.timeStampBuyer || timeStampOrderBuy} icon={acceptIcon} />}

         {(notAccepted || orderState.isNotAccepted) && <OrderStateElms title={`${isUser ? 'You' : 'The buyer'}  refused to accept the order`}  clsName='refused' timeSt={result.order.timeStampBuyer || timeStampOrderBuy} icon={refuseIcon} />}

               
          { ((!delivered && !orderState.isDelivered) && (!cancelled && !orderState.isCancelled)) && ((!accepted && !orderState.isAccepted) && (!notAccepted && !orderState.isNotAccepted)) && !isUser && <div className='order-btns'>
                      <Button type='button' onClick={() => modalHandler({type: 'deliver'})}>Deliver The Order</Button>
                      <Button type='button'  onClick={() => modalHandler({type: 'cancel'})} >Cancel The Order</Button>
                    </div>
          }

          {
            ((delivered || orderState.isDelivered) && (!accepted && !notAccepted)) && !isUser &&  <div className='waitingAccept'>
              
                Waiting the Buyer to accept the order.

            </div>
          }

          {
            ( (!accepted && !notAccepted) && (!delivered && !cancelled) ) && isUser &&  <div className='waitingAccept'>
              
                Waiting The Seller To Deliver The Order.

            </div>
          }

          {((!accepted && !orderState.isAccepted) && (!notAccepted && !orderState.isNotAccepted)) && delivered && isUser && <div className='order-btns'>
                      <Button type='button' onClick={() => modalHandler({type: 'accept'})}>Accept The Order</Button>
                      <Button type='button' onClick={() => modalHandler({type: 'refuse'})}>Refuse The Order</Button>
                    </div>
          }
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