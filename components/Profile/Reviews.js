import {useState, useContext, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';

import RatingStar from '../UI/RatingStar';
import userAvatar from '../../assets/userAvatar.jpg';
import {AuthContext} from  '../../context/AuthContext';
import calculateAverage from '../../utils/calculateAverage';

export const ReviewProfile = styled.div`

			h2 {
    		font-size: 1.7rem;
		    border-bottom: 1px solid #634cc226;
		    padding-bottom: 5px;
    	}

    .user-profile-review{
    		padding: 1rem;
		    background: whitesmoke;
		    box-shadow: 0px 1px 6px 1px #02020224;
    	}

    	 span.inactve {
                filter: grayscale(1);
            }

        .rating {

        	display: flex;
		    justify-content: start;
		    align-items: center;
		    margin: 1rem 0;
            .rating-info {

                display: flex;
                align-items: center;
                margin-left: 2rem;
                @media (max-width: 500px) {
                    flex-wrap: wrap
                }

            }
        	&-num {

        		display: flex;
			    align-items: center;
			    font-size: 18px;
                @media (max-width: 500px){
                font-size: 12px;
                }
			    color: var(--orange);
        	}

        	.reviews-num {
        		margin-left: 9px;
			    font-weight: 100;
                @media (max-width: 500px){
                font-size: 12px;

                }
        	}
        }

        .review {

        	display: flex;
        	margin-bottom: 2.3000000000000007rem;
		    border-bottom: 1px solid #634cc252;
		    padding-bottom: 5px;
            &.sub-review {margin-top: 1.5rem;}
        	&-info {
        		display: flex;
        		flex-direction: column;
        		width: 100%;
        		&-rating {
        		display: flex;
				    justify-content: space-between;
				    width: 100%;	

				    a {
				    	font-size: 1.1rem;
                        @media (max-width: 500px) {

                        font-size: 0.8rem;


                        }
					    margin-left: 9px;
					    color: var(--black);
					    transition: var(--tranhover);
					    &:hover {
					    	color: var(--main);
					    }
        			}
        		span.num {
        			font-size: 16px;
                    @media (max-width: 500px){
                     font-size: 12px;
                     margin-top:3px;
                    }
				    font-weight: 100;
				    margin-left: -5px;
				    margin-right: 14px;
        		}

        	}
			&-message {
                p.review-bundle {
                    position: relative;
                    // top: -11px;
                }
				p {
					margin-left: 10px;
					font-weight: 100;
                @media (max-width: 500px){
                    font-size: 0.8rem;
                }
				}
				span {

				margin-left: 10px;
			    font-weight: 100;
			    font-size: 0.8rem;
                @media (max-width: 500px){
                font-size: 0.5rem;
                }
				}
			}

			.review-stars {

				display: flex;
                @media (max-width: 500px){
                    margin-top: -3px;
                }

			}


    }
 
  
`;

export const ReviewItems = ({item}) => {

    return (

            <div className='review'>
                    <div className='review-avatar img-circle'>
                        <Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${item.creator.photo}`} width={70} height={70} alt='review image' />
                    </div>
                    <div className='review-info'>
                        <div className='review-info-rating'>
                            <Link href={`/${item.creator.userName}`}><a>{item.creator.userName}</a></Link>
                            <div className='review-stars'>
                            <RatingStar width={15} height={15} rating={item.rating} />
                                <span className='num'>{item.rating}.0</span>
                            </div>
                        </div>

                        <div className='review-info-message'>
                            <p>{item.review}</p>
                            <span><ReactTimeAgo date={item.createdAt} /></span>
                        </div>
                    </div>
                </div>

        )
}

const Reviews = ({reviews, userName}) => {

    const [reviewType, setReviewType] = useState('seller');
    const [totalAve, setTotalAve] = useState(0);
    const [totalRatings, setTotalRatings] = useState();
    const [count, setCount] = useState(0);
    const {userAuth} =  useContext(AuthContext);
    let aveRating = [];
    
    useEffect(() => {

        const {total, counts} = calculateAverage(aveRating);
        setCount(counts);
        setTotalAve(total);

    }, [aveRating])

    
    if(!reviews) return null;

  return (
    	
    	<ReviewProfile className='user-profile-reviews'>
    			<h2>Reviews</h2>
    			<div className='user-profile-review'>
    				<div className='rating'>
                        <div className='rating-select'>
                            <select id='select' onChange={(e) => {setReviewType(e.target.value)}}>
                                <option value='seller'>As Seller</option>
                                <option value='buyer'>As Buyer</option>
                            </select>
                        </div>
                        <div className='rating-info'>
            				<div className='rating-num'>
        	    				<RatingStar width={20} height={20} rating={totalAve} />
            					{totalAve >= 1 ? totalAve.toFixed(1) : 0}
            				</div>
            				<span className='reviews-num'>{count} Reviews</span>
                            
                        </div>
    			</div>

    		  {
                
                reviews.map(item => {
                if(item.buyer.userName !== userName && item.creator.userName !== userName && reviewType == 'seller'){
                    aveRating.push(item.rating);
                    // calculateRates(aveRating);
            
                    return <ReviewItems key={item.id} item={item} />
                }

                if(item.buyer.userName == userName && item.reply && reviewType == 'buyer'){
                    aveRating.push(item.reply.rating);
                return <ReviewItems key={item.id} item={item.reply} />
                }
               
                
                })

              }


    			</div>
    		</ReviewProfile>

  )
}

export default Reviews;