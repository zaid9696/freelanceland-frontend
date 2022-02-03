import {useState, useEffect}  from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import DashboardUser from '../Dashboard/DashboardUser';
import Reviews from './Reviews';
import BundleItems from '../Bundles/BundleItems';
import starIcon from '../../assets/icons/star.svg';
import userAvatar from '../../assets/userAvatar.jpg';
import RatingStar from '../UI/RatingStar';

const ProfileStyles = styled.div`

	grid-column: center-start / center-end;
	display: grid;
    grid-template-columns: 26% 1fr;
    @media (max-width: 1050px){
    grid-template-columns: 36% 1fr;
    margin-top: 7rem;
    }
    @media (max-width: 975px){
    grid-template-columns: 1fr;
            
    }

    gap: 2rem;
    margin-top: 2rem;

    
    .user-profile-bundles {


    	&-items {

    		display: grid;
		    grid-template-columns: 1fr 1fr 1fr;
            @media (max-width: 1050px){
            grid-template-columns: 1fr 1fr;

            }
            @media (max-width: 975px){
            grid-template-columns: 1fr;

            }
		    gap: 2rem;
    	}

    }

    
`;

const Profile = ({bundles, reviews,user , userName}) => {

    const [profileReviews, setProfileReviews] =  useState(reviews || []);

    useEffect(() => {

        setProfileReviews(reviews);

    }, [userName])

    console.log({userName, reviews});
  return (
    <ProfileStyles>
    	<DashboardUser user={user} />
    	<div className='user-profile'>
    		<div className='user-profile-bundles'>
    			<h2>Bundles</h2>
    			<div className='user-profile-bundles-items'>
    				{bundles.map(item => <BundleItems key={item.id} item={item} />)}
    			</div>
    		</div>

    		<Reviews reviews={profileReviews} userName={userName} />
    	</div>
    </ProfileStyles>
  )
}

export default Profile;