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


const OrderedPage = ({result}) => {


  const deliverDate = result.order.deliverDate
  const {isloading, sendRequest, error, clearError} = useHttpAxios();
  const  {daysCountDown, hoursCountDown, minutesCountDown, secondsCountDown}
   = useCountDown({deliverDate}); 
  const bundle = result.order.bundle;
  const {accepted, notAccepted, delivered, cancelled} = result.order;


  console.log({accepted, notAccepted, delivered, cancelled});

  const updateOrderState = async () => {

        try{

            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/orders/${result.order.id}`);

            console.log(res);

        }catch(err) {
          console.log(err);
        }

  } 

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
 

  return (
    <>
      <OrderedPageStyles>
          <div className='count-down'>
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
         
         {delivered && <OrderStateElms title='You have marked this order as delivered.' desc='I have made all of what you have asked, and I hope you accept this great work of mine.' clsName='deliver' timeSt={result.order.timeStampSeller} icon={deliverIcon} />}

        { cancelled && <OrderStateElms title='You have cancelled this order.'  clsName='cancelled' timeSt={result.order.timeStampSeller} icon={cancelIcon} />}

        { accepted && <OrderStateElms title='The order accepted by the buyer.'  clsName='accepted' timeSt={result.order.timeStampBuyer} icon={acceptIcon} />}

         {notAccepted && <OrderStateElms title='The buyer refused to accept the order'  clsName='refused' timeSt={result.order.timeStampBuyer} icon={refuseIcon} />}

               
          <div className='order-btns'>
            <Button type='button'>Deliver The Order</Button>
            <Button type='button'>Cancel The Order</Button>
          </div>
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