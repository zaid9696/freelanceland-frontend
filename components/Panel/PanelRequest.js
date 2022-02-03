import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';

import DateFormat from '../../utils/DateFormat';
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
        @media (max-width: 500px){
            font-size: 0.5rem;

        }
    		font-weight: 600;
    	}
    }

    .panel-columns-content {

    	grid-template-columns: 1fr 30% 1fr 1fr 1fr 1fr;
        @media (max-width: 500px){
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        font-size: 0.5rem;
        }
    	font-size: 0.8rem;
    	font-weight: 400;
    	line-height: 1.4;
    	gap: 15px;
    	margin-top: 20px;
    	border-bottom: 1px solid #43434338;

      
  
    	a {
    		display: block;
    		margin-bottom: 5px;
            color: var(--main);
            font-weight: 500;
    	}
    }

    .panel-user-link {

    	margin-top: 4px;
    	display: block;
    }

    .budget-col {

    	button:nth-child(1) {
  			font-size: 0.7rem;
        @media (max-width: 500px){
            font-size: 0.5rem;
            padding: 4px;
        }
		    background: var(--main);
		    color: #fff;
		    border: none;
		    padding: 5px 12px;
		    margin-top: 8px;
		    border-radius: 2px;
            cursor: pointer;
            text-transform: Uppercase;

    	}

    }

`

const PanelRequestItems = ({item}) => {

    return (

            <div className='panel-columns-content col-6'>

            <div className='panel-col-content'>
                <div className='panel-user-img img-circle'><Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${item.buyer.photo}`} alt='user Image' height={40} width={40} /></div>
                <span className='panel-user-link'><Link href={`/${item.buyer.userName}`}><a>{item.buyer.userName}</a></Link></span>
            </div>

            <div className='panel-col-content'>
                <Link href={`/categories/${item.category.categorySlug}`}><a>{item.category.category}</a></Link>
                <span>{item.request}</span>
            </div>

            <div className='panel-col-content'>
                <span>{item.delivery} Days</span>
            </div>

            <div className='panel-col-content'>
                <span>{DateFormat(item.createdAt)}</span>
            </div>

            <div className='panel-col-content'>
                <span><ReactTimeAgo date={item.expiry} /></span>
            </div>

            <div className='panel-col-content'>
                <span> {item.firstBudget}$ - {item.secondBudget}$</span>
                <div className='budget-col'>
                    <Link href={`/chat/${item.buyer.userName}`}>
                        <a>
                        <button type='button'>Contact</button>    
                        </a>
                    </Link>
                </div>
            </div>
        </div>

        )

}


const PanelRequest = ({offers}) => {
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
    
        {
            offers.map(item =>  <PanelRequestItems key={item.id} item={item} />)
        }
    	
    </PanelRequestStyles>
  )
}

export default PanelRequest;