import Image from 'next/image';
import Link from 'next/link';

import userAvatar from '../../assets/userAvatar.jpg';
import starIcon from '../../assets/icons/star.svg';
import DashboardUserStyles from '../../styles/DashboardUserStyles';
import RatingStar from '../UI/RatingStar'

const AdditionalInfo = ({}) => {


    return (

        <>
        <div className='user-about'>
            <h5>About Me</h5>
            <p>I have more than 3 years experience in web development. I develop and design a website on WordPress. I develop a special template according to the client's desire</p>
        </div>

        <div className='user-add-info'>
            <h5>Info</h5>
            <div className='user-add-info-wrap'>
              <span>Member Since</span> <p>June 15, 2020</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Recent Delivery</span> <p>5 Days Ago</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Local Time</span> <p>{new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
              })}</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Languages</span> <p>Arabic, English</p>
            </div>
        </div>

        <div className='user-skills'>
            <h5>Skills</h5>
            <ul className='skills'>
                <li>HTML</li>
                <li>Css</li>
                <li>Javascript</li>
                <li>SASS</li>
                <li>WordPress</li>
                <li>Bootstrap</li>
                <li>Figam</li>
                <li>SEO</li>
            </ul>
        </div>

        </>

      )

}


const DashboardUser = (props) => {
  return (
    <DashboardUserStyles>
        <div className='user-info'>
        <div className='user-avatar img-circle'>
            <Image src={userAvatar} alt='user avatar' width={80} height={80} />
        </div>
        <div className='user-profile'>
            <Link href='#'>Zaid96</Link>
        </div>
        
        <div className='user-data'>
              <div className='user-imgs'>
              
              <RatingStar width={15} height={15} rating={3} />
          
              </div>
              <div className='user-reviews'>
                  3.0 <span>4 Reviews</span>
              </div>
          </div>

          <div className='profile-link'>
          {/*<Link href='#'>
                        <a> View My Profile </a>
                    </Link> */}
            <button className='user-edit-profile'>
                <Link href='#'>
                    <a>Edit Profile</a>
                </Link>
            </button>        
          </div>
        </div>
        <div className='user-numbers'>
            <p>Delivered on Time</p>
            <div className='user-progress-wrap'>

              <div className='user-progress'>
                  <div role='progressbar' aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" className='progress-bar' style={{width: '100%'}}></div>
              </div>
              <span>100%</span>

            </div>
        </div>

          <div className='user-numbers'>
          <p>Completed Orders</p>
          <div className='user-progress-wrap'>

            <div className='user-progress'>
                <div role='progressbar' aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" className='progress-bar' style={{width: '70%'}}></div>
            </div>
            <span>70%</span>

          </div>
      </div>
     { /* Do not show this profile */}
      <div className='user-profit'>
          <p>Total Earned</p>
          <span>$300</span>
      </div>

      <div className='user-profit'>
          <p>Earned in {new Date().toLocaleString('en-us', {month: 'long'})}</p>
          <span>$0</span>
      </div>

      {<AdditionalInfo />}

    </DashboardUserStyles>
  )
}

export default DashboardUser;