import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';
import {ReviewProfile} from './Profile/Reviews';

import RatingStar from './UI/RatingStar';
const ReviewItems = ({item}) => {

    return (

            <div className='review'>
                    <div className='review-avatar img-circle'>
                        <Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${item.buyer.photo}`} width={70} height={70} alt='review image' />
                    </div>
                    <div className='review-info'>
                        <div className='review-info-rating'>
                            <Link href={`/${item.buyer.userName}`}><a>{item.buyer.userName}</a></Link>
                            <div className='review-stars'>
                            <RatingStar width={15} height={15} rating={item.rating} />
                                <span className='num'>{item.rating}.0</span>
                            </div>
                        </div>

                        <div className='review-info-message'>
                            <p className='review-bundle'>{item.review}</p>
                            <span><ReactTimeAgo date={item.createdAt} /></span>
                        </div>
		                  {  
		                  	item.reply && <div className='review sub-review'>
	                     <div className='review-avatar img-circle'>
	                   		 <Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${item.seller.photo}`} width={70} height={70} alt='review image' />
	                		</div>
	                    	<div className='review-info'>
	                    		
	                        	<div className='review-info-rating'>
	                            <Link href={`/${item.seller.userName}`}><a>{item.seller.userName}</a></Link>
	                            <div className='review-stars'>
	                            <RatingStar width={15} height={15} rating={item.reply.rating} />
	                                <span className='num'>{item.reply.rating}.0</span>
	                            </div>
	                        	</div>

	                        <div className='review-info-message'>
	                            <p className='review-bundle'>{item.reply.review}</p>
	                            <span><ReactTimeAgo date={item.reply.createdAt} /></span>
	                        </div>

	                    	</div>
	                    </div>}
                    </div>
                </div>

        )
}

const BundleReviews = ({reviews, avgRating, totalCount}) => {

    if(!reviews) return ;

  return (
   <ReviewProfile className='user-review-bundle'>
    			<h2>Reviews</h2>
    			<div className='user-profile-review'>
    				<div className='rating'>
                        
                        <div className='rating-info'>
            				<div className='rating-num'>
        	    				<RatingStar width={20} height={20} rating={avgRating} />
            					{avgRating >= 1 ? avgRating.toFixed(1) : 0}
            				</div>
            				<span className='reviews-num'>{totalCount} Reviews</span>
                            
                        </div>
    			</div>

  				{
  					reviews.map(item =>  <ReviewItems key={item.id} item={item} />)
  				}

    			</div>
    		</ReviewProfile>
  )
}

export default BundleReviews;