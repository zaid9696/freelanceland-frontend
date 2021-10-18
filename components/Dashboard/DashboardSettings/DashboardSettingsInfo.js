import styled from 'styled-components';
import Image from 'next/image';

import activeOrder from '../../../assets/icons/dashboard/activeOrder.svg';
import submitIcon from '../../../assets/icons/dashboard/submit.svg';
import cancelOrder from '../../../assets/icons/dashboard/cancelOrder.svg';
import newBundle from '../../../assets/icons/dashboard/newBundle.svg';
import compelteOrder from '../../../assets/icons/dashboard/compeletOrder.svg';
import editProfile from '../../../assets/icons/dashboard/editProfile.svg'

const DashboardSettingsInfoStyles = styled.div`
	
    border-bottom: 1px solid;
    padding-bottom: 18px;
    color: #634cc294;
    
    .dashboard-upper {

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;

      &-icon {
          background: var(--main);
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem 1rem;
          box-shadow:0px 1px 12px 2px #0202023b;
          border-radius: 8px;
          transition: var(--tranhover);

          &:hover {

            box-shadow: 0px 1px 12px 2px #634cc2;

          }

          img {
            // width: 100px;
            // height: 100px;
          }

          p{
            margin: 0;
            margin-top: 9px;
            color: #fff;
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 0.6px;
          }
      }
  
    }

  .dashboard-below {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
      gap: 2rem;
      &-wrap {
          box-shadow: 0px 3px 5px 1px #0202022b;
          border-radius: 6px;
          padding: 0rem 1rem;
          padding-top: 1.1rem;
          transition: var(--tranhover);
          &:hover {
            box-shadow: 0px 0px 9px 1px #634cc294;
          }
          span {
              color: var(--main);
              font-size: 1.7rem;
              margin: 0.3rem 0;
              display: block;
          }
          p {
              margin: 0;
              margin-top: 5px;
              font-weight: 500;
              color: var(--main);
              margin-bottom: 1rem;
          }
      }
  }

		
`

const DashboardSettingsInfo = (props) => {
  return (
    <DashboardSettingsInfoStyles>
    	 <div className='dashboard-upper'>
          <div className='dashboard-upper-icon'>
              <Image src={newBundle} width={40} height={40} alt='New Bundle Icon' />
              <p>New Bundle</p>
          </div>
          <div className='dashboard-upper-icon submit'>
              <Image width={40} height={40} src={submitIcon} alt='submit Icon' />
              <p>Submit Offer</p>
          </div>
           <div className='dashboard-upper-icon'>
              <Image width={40} height={40} src={editProfile} alt='Edit Profile Icon' />
              <p>Edit Profile</p>
          </div>
       </div>

       <div className='dashboard-below'>
         <div className='dashboard-below-wrap'>
            <div className='dashboard-below-icon'>
                <Image width={55} height={55}  src={compelteOrder} alt='Completed Order Icon' />
            </div>
            <div className='dashboard-below-txt'>
                <span>
                  5
                </span>
                <p>Completed Orders</p>
            </div>
         </div>

         <div className='dashboard-below-wrap'>
            <div className='dashboard-below-icon'>
                <Image width={50} height={50} src={activeOrder} alt='Active Order Icon' />
            </div>
             <div className='dashboard-below-txt'>
                  <span>
                    2
                  </span>
                  <p>Active Orders</p>
              </div>
         </div>

         <div className='dashboard-below-wrap'>
             <div className='dashboard-below-icon'>
                <Image width={50} height={50} src={cancelOrder} alt='Cancel Order Icon' />
            </div>
            
            <div className='dashboard-below-txt'>
                <span>
                  0
                </span>
                <p>Cancelled Order</p>
            </div>

         </div>
       </div>
    </DashboardSettingsInfoStyles>
  )
}

export default DashboardSettingsInfo;