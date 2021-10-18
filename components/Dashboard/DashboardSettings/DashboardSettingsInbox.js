import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import userAvatar from '../../../assets/userAvatar.jpg';

const DashboardSettingsInboxStyles = styled.div`

	 
    .dashboard-title {

        display: flex;
        align-items: center;
        h2 {
          font-size: 1.8rem;
          letter-spacing: 1px;
          margin-right: 7px;

        }
    }

    .dashboard-inbox {

      padding: 1rem;
      display: flex;
      background: var(--secondary);
      box-shadow: 0px 3px 5px 1px #0202022b;
      border-radius: 2px;
      margin-bottom: 1.8rem;

    }

    .dashboard-inbox-txt {
        width: 100%;

        .dashboard-inbox-link {

          display: flex;
          justify-content: space-between;
          width: 100%;
          a {
            font-size: 1.2rem;
            margin-left: 11px;
            color: var(--black);
            transition: var(--tranhover);
            &:hover {

              color: var(--main);

            }
          }

          span {

              font-size: 0.8rem;
              font-weight: 100;

          }

        }
    }

    .dashboard-message {

        p {

            margin-left: 11px;
            font-weight: 100;
        }
    }

`;


const DashboardSettingsInbox = (props) => {
  return (
    <DashboardSettingsInboxStyles>
      <div className='dashboard-title'>
          <h2>Inbox</h2> <span>(3 Unread)</span>
      </div>
    	<div className='dashboard-inbox'>
          <div className='dashboard-inbox-avatar img-circle'>
              <Image src={userAvatar} width={50} height={50} />
          </div>
          <div className='dashboard-inbox-txt'>
            <div className='dashboard-inbox-link'>

                <Link href='#'> 
                  <a>Zaid96</a>
                </Link>
                <span>Since 4 Days </span>

            </div>

            <div className='dashboard-message'>
              
              <p>Hello Freelancer</p>

            </div>

          </div>
      </div>

        <div className='dashboard-inbox'>
          <div className='dashboard-inbox-avatar img-circle'>
              <Image src={userAvatar} width={50} height={50} />
          </div>
          <div className='dashboard-inbox-txt'>
            <div className='dashboard-inbox-link'>

                <Link href='#'> 
                  <a>Zaid96</a>
                </Link>
                <span>Since 4 Days </span>

            </div>

            <div className='dashboard-message'>
              
              <p>Hello Freelancer</p>

            </div>

          </div>
      </div>
    </DashboardSettingsInboxStyles>
  )
}

export default DashboardSettingsInbox;