import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import RatingStar from '../UI/RatingStar';
import userAvatar from '../../assets/userAvatar.jpg';


const ReviewProfile = styled.div`

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
		    justify-content: center;
		    align-items: center;
		    margin: 1rem 0;

        	&-num {

        		display: flex;
			    align-items: center;
			    font-size: 18px;
			    color: var(--orange);
        	}

        	.reviews-num {
        		margin-left: 9px;
			    font-weight: 100;

        	}
        }

        .review {

        	display: flex;
        	margin-bottom: 2.3000000000000007rem;
		    border-bottom: 1px solid #634cc252;
		    padding-bottom: 5px;

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
					    margin-left: 9px;
					    color: var(--black);
					    transition: var(--tranhover);
					    &:hover {
					    	color: var(--main);
					    }
        			}
        		span.num {
        			font-size: 16px;
				    font-weight: 100;
				    margin-left: -5px;
				    margin-right: 14px;
        		}

        	}
			&-message {
				p {
					margin-left: 10px;
					font-weight: 100;
				}
				span {

				margin-left: 10px;
			    font-weight: 100;
			    font-size: 0.8rem;
				}
			}

			.review-stars {

				display: flex;

			}

    }

 
  
`;

const Reviews = (props) => {
  return (
    	
    	<ReviewProfile className='user-profile-reviews'>
    			<h2>Reviews</h2>
    			<div className='user-profile-review'>
    				<div className='rating'>
    				<div className='rating-num'>
	    				<RatingStar width={20} height={20} rating={4} />
    					{`4.0`}
    				</div>
    				<span className='reviews-num'>5 Reviews</span>
    			</div>

    			<div className='review'>
    				<div className='review-avatar img-circle'>
    					<Image src={userAvatar} width={70} height={70} alt='review image' />
    				</div>
    				<div className='review-info'>
    					<div className='review-info-rating'>
    						<Link href={`#`}><a>Zaid96</a></Link>
    						<div className='review-stars'>
    						<RatingStar width={15} height={15} rating={5} />
    							<span className='num'>5.0</span>
    						</div>
    					</div>

    					<div className='review-info-message'>
    						<p>replies fast and fixed all issues, highly recommended</p>
    						<span>Since 3 months</span>
    					</div>
    				</div>
    			</div>

    			<div className='review'>
    				<div className='review-avatar img-circle'>
    					<Image src={userAvatar} width={70} height={70} alt='review image' />
    				</div>
    				<div className='review-info'>
    					<div className='review-info-rating'>
    						<Link href={`#`}><a>Zaid96</a></Link>
    						<div>
    						<RatingStar width={15} height={15} rating={5} />
    							<span className='num'>5.0</span>
    						</div>
    					</div>

    					<div className='review-info-message'>
    						<p>replies fast and fixed all issues, highly recommended</p>
    					</div>
    				</div>
    			</div>

    			<div className='review'>
    				<div className='review-avatar img-circle'>
    					<Image src={userAvatar} width={70} height={70} alt='review image' />
    				</div>
    				<div className='review-info'>
    					<div className='review-info-rating'>
    						<Link href={`#`}><a>Zaid96</a></Link>
    						<div>
    						<RatingStar width={15} height={15} rating={5} />
    							<span className='num'>5.0</span>
    						</div>
    					</div>

    					<div className='review-info-message'>
    						<p>replies fast and fixed all issues, highly recommended</p>
    					</div>
    				</div>
    			</div>


    			</div>
    		</ReviewProfile>

  )
}

export default Reviews;