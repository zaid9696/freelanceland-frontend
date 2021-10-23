import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import DashboardUser from './Dashboard/DashboardUser';
import BundleItems from './Bundles/BundleItems';
import starIcon from '../assets/icons/star.svg';
import userAvatar from '../assets/userAvatar.jpg';
import RatingStar from './UI/RatingStar';

const ProfileStyles = styled.div`

	grid-column: center-start / center-end;
	display: grid;
    grid-template-columns: 26% 1fr;
    gap: 2rem;
    margin-top: 2rem;

    	h2 {
    		font-size: 1.7rem;
		    border-bottom: 1px solid #634cc226;
		    padding-bottom: 5px;
    	}
    .user-profile-bundles {


    	&-items {

    		display: grid;
		    grid-template-columns: 1fr 1fr 1fr;
		    gap: 2rem;
    	}

    }

    .user-profile-reviews {

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
        	  margin-bottom: 1.3rem;
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
				    margin-left: 4px;
				    margin-right: 14px;
        		}

        	}
			&-message {
				p {
					margin-left: 10px;
					font-weight: 100;
				}
			}

        }


    }

`;

const Profile = ({bundles}) => {
  return (
    <ProfileStyles>
    	<DashboardUser />
    	<div className='user-profile'>
    		<div className='user-profile-bundles'>
    			<h2>Bundles</h2>
    			<div className='user-profile-bundles-items'>
    				{bundles.map(item => <BundleItems key={item.id} item={item} />)}
    			</div>
    		</div>

    		<div className='user-profile-reviews'>
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
    		</div>
    	</div>
    </ProfileStyles>
  )
}

export default Profile;