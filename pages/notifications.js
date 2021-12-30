import {useState, useContext} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';

import {AuthContext} from '../context/AuthContext';
import useHttpAxios from '../hooks/http-hook';
import acceptIcon from '../assets/icons/accept.svg';
import cancelIcon from '../assets/icons/cancel.svg';
import refuseIcon from '../assets/icons/refuse.svg';
import deliverIcon from '../assets/icons/deliver.svg';
import purchaseIcon from '../assets/icons/purchase.svg';
import startReviewIcon from '../assets/icons/starReview.svg';


const NotificationsPageStyles = styled.div`

	grid-column: center-start / center-end;


	h1 {

		margin-top: 2rem;
		text-align: center;

	}
	ul {

			width: 75%;
	    margin: auto;
	    margin-top: 2rem;
	    box-shadow: 0px 1px 5px 1px #02020238;
	    padding: 1.5rem;
	    background: #f9f9f9;
	    border-radius: 2px;

	}

	li {
		display: flex;
	    justify-content: center;
	    align-items: center;
	    margin-bottom: 1rem;
	    border-bottom: 1px solid #eee;
	    padding-bottom: 14px;
	}

	.notification-icon {

		background: #e93232;
	    padding: 7px;
	    display: flex;
	    border-radius: 6px;

	  &.Delivered {background: var(--main);}
      &.Cancelled {background: #e93232;}
      &.Accepted {background: var(--green);}
      &.Refused {background: #e93232;}
      &.Purchased {background: #8acfff;}
      &.Reviewed {background: #FFC107;}


	}

	.notification-content {

		margin-left: 1rem;

		p{
			line-height: 1.5;
		    color: var(--black);
		    font-weight: 500;
		    transition: var(--tranhover);
		    &:hover {color: var(--main)}
		}

		span.date {

			font-weight: 100;
    	font-size: 0.86rem;
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
		

   span.notification-unread {
          background: var(--red);
          width: 15px;
          height: 15px;
          display: block;
          border-radius: 50%;
          &.read {display: none}
      }

	}

`


const notificationIcons = (iconName) => {

   switch(iconName){

    case 'Delivered': return deliverIcon;
    case 'Accepted': return acceptIcon;
    case 'Refused': return refuseIcon;
    case 'Cancelled': return cancelIcon;
    case 'Purchased': return purchaseIcon;
    case 'Reviewed': return startReviewIcon;



  }

}


const notificationsPage = ({result}) => {
	const {notifications} = result;

	const {userAuth, fetchNotifications} = useContext(AuthContext);
	const {sendRequest} = useHttpAxios();

	const markingReadNotification = async (notificationId) => {

	const isNotificationRead = notifications.map(item => item.id.includes(notificationId) && item.read === true).includes(true);
    
    if(isNotificationRead) return;

  	try {

  		const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/notifications/${notificationId}`, 'PATCH');
  		fetchNotifications()
    	// console.log({fromNoti: res});

  	}catch(err) {console.log(err);}


	}

  console.log({result});
  return (
    <NotificationsPageStyles>
    		<h1>All Notifications</h1>
    		<ul>
    			{notifications.map(item => {

    			 return (
    			 	<li key={item.id}>
					<div className={`notification-icon ${item.status}`}>
						<Image src={notificationIcons(item.status)} width={60} height={60} alt={`Notification status ${item.status}`} />
					</div>
					<div className='notification-content'>
					<Link href={`/ordered/${item.orderId}`}>
						<a onClick={() => {
								markingReadNotification(item.id);
						}}>
						<p>
						{item.creator == userAuth.id ? 'You' : item.buyer == userAuth.userName  ? 'Seller' : item.status == 'Purchased' ? item.buyer : 'Buyer'} {item.status} the Order {item.orderId} {item.title}
             			</p>
						</a>
					</Link>
						<span className='date'>
						<ReactTimeAgo date={item.createdAt} />
							<span className={`notification-unread ${item.read && 'read'}`}></span>
						</span>
					</div>
				</li>
    				)

    			})}
    		</ul>
    </NotificationsPageStyles>
  )
}


export async function getServerSideProps(context){

  // const {userName} = context.query;
  const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

    const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/notifications`,{
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

export default notificationsPage;