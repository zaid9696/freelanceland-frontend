import styled from 'styled-components';
import Image from 'next/image';

import paymentIcon from '../../assets/icons/info/payment.svg';
import talkIcon from '../../assets/icons/info/talking.svg';
import customerIcon from '../../assets/icons/info/customer.svg';
import serviceIcon from '../../assets/icons/info/services.svg';


const InfoItemsStyels = styled.div`

	display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 880px) {
        grid-template-columns: 1fr;
    }
    text-align: center;
    gap: 11rem;
    row-gap: 3rem;

	.item {
		box-shadow: 0px 3px 5px 1px #02020238;
   		padding: 1.4rem;
   		border-right: 4px solid var(--main);
	}

	.info-img {
		margin-top:1rem;
	}

	h3 {
		margin-top: 0;
	}

	p {
		line-height: 1.7;
	}

`

const InfoItems = (props) => {
  return (
    <InfoItemsStyels>
    	<div className='item'>
    		<div className='info-img'>
    			<Image src={paymentIcon} width={80} height={80} alt='Secure payment icon' />
    		</div>
    		<h3> Payment Protection Guaranteed </h3>
    		<p>
    		With FreelanceLand, you have complete control over your projects from start to finish. Verify and ask for modifications if needed. The payment is only released to the freelancer when you’re completely satisfied and accept the work.
    		</p> 
    	</div>

    	<div className='item'>
    		<div className='info-img'>
    			<Image src={talkIcon} width={100} height={90} alt='Talking person icon' />
    		</div>
    		<h3>  Real-Time Communication </h3>
    		<p>
    		We don’t shackle or put barriers between your communication with the freelancers. Instead, we facilitate it with features like live chat, voice messages/calls, and screen sharing so you can clearly communicate your needs with the right talent.
    		</p> 
    	</div>

    		<div className='item'>
    		<div className='info-img'>
    			<Image src={customerIcon} width={100} height={90} alt='Customer service icon' />
    		</div>
    		<h3>  24/7 Dedicated Live Support </h3>
    		<p>
    			Having any issues with your project or a particular freelancer? You can contact us 24/7 and get on-time support from our customer support team to resolve them without any delay. This helps keep your business moving forward without wasting any valuable time.
    		</p> 
    	</div>

    		<div className='item'>
    		<div className='info-img'>
    			<Image src={serviceIcon} width={100} height={90} alt='Service icon' />
    		</div>
    		<h3>   Wide Variety of Services </h3>
    		<p>
    			Whether you want to build a stunning website or need to create professional, engaging videos for your brand, we have got you covered! Our freelancers offer a wide range of services from web development to content writing, logo design, and more.
    		</p> 
    	</div>
    </InfoItemsStyels>
  )
}

export default InfoItems;