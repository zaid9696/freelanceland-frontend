import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import userAvatar from '../../assets/userAvatar.jpg';

const PanelRequestStyles = styled.div`

	background: whitesmoke;
    height: fit-content;
    padding: 1.5rem 1rem;
  	border-radius: 3px;
	box-shadow: 0px 1px 6px 1px #02020224;
    .col-6 {
    	grid-template-columns: 1fr 30% 1fr 1fr 1fr 1fr;
    	display: grid;
    }

    .panel-columns {

    	border-bottom: 1px solid #43434338;
    	padding-bottom: 10px;
    	gap: 1rem;
    	.panel-col {
    		font-size: 0.8rem;
    		font-weight: 600;
    	}
    }

    .panel-columns-content {

    	grid-template-columns: 1fr 30% 1fr 1fr 1fr 1fr;
    	font-size: 0.8rem;
    	font-weight: 400;
    	line-height: 1.4;
    	gap: 15px;
    	margin-top: 20px;
    	border-bottom: 1px solid #43434338;
  
    	a {
    		display: block;
    		margin-bottom: 5px;
    	}
    }

    .panel-user-link {

    	margin-top: 4px;
    	display: block;
    }

    .budget-col {

    	button:nth-child(1) {
    	font-size: 0.7rem;
	    background: var(--green);
	    color: #fff;
	    border: none;
	    padding: 5px;
	    margin-bottom: 8px;
	    margin-top: 9px;
	    border-radius: 2px;

    	}

    	button:nth-child(2) {
  			font-size: 0.7rem;
		    background: var(--main);
		    color: #fff;
		    border: none;
		    padding: 5px 12px;
		    margin-bottom: 8px;
		    margin-top: 0;
		    border-radius: 2px;

    	}

    }

`

const PanelRequest = (props) => {
  return (
    <PanelRequestStyles>
    	<div className='panel-columns col-6'>
    		<div className='panel-col'>Buyer</div>
    		<div className='panel-col'>Request</div>
    		<div className='panel-col'>Delivery</div>
    		<div className='panel-col'>Published On</div>
    		<div className='panel-col'>Expiry</div>
    		<div className='panel-col'>Budget</div>
    	</div>
    	<div className='panel-columns-content col-6'>

    		<div className='panel-col-content'>
    			<div className='panel-user-img img-circle'><Image src={userAvatar} alt='user Image' height={40} width={40} /></div>
    			<span className='panel-user-link'><Link href='#'>Zaid96</Link></span>
    		</div>

    		<div className='panel-col-content'>
    			<Link href='#'>Web Programming</Link>
    			<span>Hello I have some problems I want change product list or grid view in category </span>
    		</div>

    		<div className='panel-col-content'>
    			<span>2 Day</span>
    		</div>

    		<div className='panel-col-content'>
    			<span>Mar 02 - 8:48 PM</span>
    		</div>

    		<div className='panel-col-content'>
    			<span>29 Days 20 Hours 23 Minutes</span>
    		</div>

    		<div className='panel-col-content'>
    			<span> 10$ - 100$</span>
    			<div className='budget-col'>
    				<button type='button'>Send Offer</button>
    				<button type='button'>Contact</button>
    			</div>
    		</div>
    	</div>

    	<div className='panel-columns-content col-6'>

    		<div className='panel-col-content'>
    			<div className='panel-user-img img-circle'><Image src={userAvatar} alt='user Image' height={40} width={40} /></div>
    			<span className='panel-user-link'><Link href='#'>Zaid96</Link></span>
    		</div>

    		<div className='panel-col-content'>
    			<Link href='#'>Web Programming</Link>
    			<span>Hello I have some problems I want change product list or grid view in category </span>
    		</div>

    		<div className='panel-col-content'>
    			<span>2 Day</span>
    		</div>

    		<div className='panel-col-content'>
    			<span>Mar 02 - 8:48 PM</span>
    		</div>

    		<div className='panel-col-content'>
    			<span>29 Days 20 Hours 23 Minutes</span>
    		</div>

    		<div className='panel-col-content'>
    			<span> 10$ - 100$</span>
    			<div className='budget-col'>
    				<button type='button'>Send Offer</button>
    				<button type='button'>Contact</button>
    			</div>
    		</div>
    	</div>
    </PanelRequestStyles>
  )
}

export default PanelRequest;