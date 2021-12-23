import Link from 'next/link';
import Image from 'next/image';
import ReactTimeAgo from 'react-timeago';

import acceptIcon from '../../assets/icons/accept.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import refuseIcon from '../../assets/icons/refuse.svg';
import deliverIcon from '../../assets/icons/deliver.svg';
import purchaseIcon from '../../assets/icons/purchase.svg';
import startReviewIcon from '../../assets/icons/starReview.svg';

import truncateLetters from '../../utils/truncateLetters';


const notificationIcons = (iconName) => {

   switch(iconName){

    case 'Delivered': return deliverIcon;
    case 'Accepted':  return acceptIcon;
    case 'Refused':   return refuseIcon;
    case 'Cancelled': return cancelIcon;
    case 'Purchased': return purchaseIcon;
    case 'Reviewed': return startReviewIcon;


  }

}


const NotificationItems = ({item, myId, userName, markingReadNotification, dropdownNotiCloseHandler}) => {
 

	let readStatus = item.read;
  
    return (

        <Link href={`/ordered/${item.orderId}`}>
            <a onClick={() => {
              markingReadNotification(item.id);
              dropdownNotiCloseHandler();
            }}>
              <li>
                <div className={`notification-icons ${item.status}`}>
                  <Image src={notificationIcons(item.status)} width={30} height={30} alt={`${item.status} Icon`} />
                </div>
                <div className='notification-content'>
                  {item.status !== 'Reviewed' ? <p>{item.creator == myId ? 'You' : item.buyer == userName  ? 'Seller' : item.status == 'Purchased' ? item.buyer : 'Buyer'} {item.status} the Order {item.orderId} {truncateLetters(item.title, 25)}
                                    </p>
                     :
                     <p>
                       {item.creator == myId ? `You ${item.buyer !== userName ? 'have replied to the Buyer feedback': 'Reviewed' }` : item.buyer == userName  ? 'Seller have replied to Your feedback' : item.status == 'Reviewed' ? item.buyer + ' Reviewed' : 'Buyer'}  the Order {item.orderId} {truncateLetters(item.title, 25)}
                     </p>
                   }
                  <span className='notification-date'><ReactTimeAgo date={item.createdAt} /></span>
                  <span className={`notification-unread ${readStatus && 'read'}`}></span>

                </div>
              </li>
            </a>
        </Link>

      )

}

export default NotificationItems;