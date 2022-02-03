import {useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import userAvatar from '../../assets/userAvatar.jpg';
import starIcon from '../../assets/icons/star.svg';
import {AuthContext} from '../../context/AuthContext';
import DashboardUserStyles from '../../styles/DashboardUserStyles';
import RatingStar from '../UI/RatingStar';
import dateFormat from '../../utils/DateFormat';
import ReactTimeAgo from 'react-timeago';

const AdditionalInfo = ({user}) => {


    return (

        <>
        <div className='user-about'>
            <h5>About Me</h5>
            <p>{user.aboutMe}</p>
        </div>

        <div className='user-add-info'>
            <h5>Info</h5>
            <div className='user-add-info-wrap'>
              <span>Member Since</span> <p>{dateFormat(user.createdAt, true)}</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Recent Delivery</span> <p><ReactTimeAgo date={user.recentDelivery} /></p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Local Time</span> <p>{new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
              })}</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Languages</span> <p> {user.preferredLang && user.preferredLang}{user.additionalLang &&  ` ,${user.additionalLang}`}</p>
            </div>
        </div>

        <div className='user-skills'>
            <h5>Skills</h5>
            {user.skills && <ul className='skills'>
            
                            {
                              user.skills.map((item,i) => <li key={i}>{item}</li>)
                            }
                            
                        </ul>}
        </div>

        </>

      )

}


const DashboardUser = ({user}) => {

  const {userAuth} = useContext(AuthContext);
  if(!user) return null;

  console.log({user});



  return (
    <DashboardUserStyles>
        <div className='user-info'>
        <div className='user-avatar img-circle'>
            <Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${user.photo}`} alt='user avatar' width={80} height={80} />
        </div>
        <div className='user-profile'>
            {user.userName}
        </div>
        
        <div className='user-data'>
              <div className='user-imgs'>
              
              <RatingStar width={15} height={15} rating={user.userRatingAverage} />
          
              </div>
              <div className='user-reviews'>
                  {user.userRatingAverage && user.userRatingAverage.toFixed(1)} <span>({user.userTotalReviews}) Reviews</span>
              </div>
          </div>

          { user.userName == userAuth.userName && <div className='profile-link'>
                    
                      <button className='user-edit-profile'>
                          <Link href='/editProfile'>
                              <a>Edit Profile</a>
                          </Link>
                      </button>        
                    </div>}
                  </div>
     {/*  <div className='user-numbers'>
                 <p>Delivered on Time</p>
                 <div className='user-progress-wrap'>
     
                   <div className='user-progress'>
                       <div role='progressbar' aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" className='progress-bar' style={{width: '100%'}}></div>
                   </div>
                   <span>100%</span>
     
                 </div>
             </div>  */}

          <div className='user-numbers'>
          <p>Completed Orders</p>
          <div className='user-progress-wrap'>

            <div className='user-progress'>
                <div role='progressbar' aria-valuenow={`${user.completedOrders.toFixed(2)}`} aria-valuemin="0" aria-valuemax="100" className='progress-bar' style={{width: `${user.completedOrders.toFixed(2)}%`}}></div>
            </div>
            <span>{user.completedOrders ? user.completedOrders.toFixed(2) : '0'}%</span>

          </div>
      </div>
     { /* Do not show this profile */}
      <div className='user-profit'>
          <p>Total Earned</p>
          <span>${user.totalEarned ? user.totalEarned : '0'}</span>
      </div>

      {<AdditionalInfo user={user} />}

    </DashboardUserStyles>
  )
}

export default DashboardUser;