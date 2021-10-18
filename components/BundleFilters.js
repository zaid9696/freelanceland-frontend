import React, {useState , useEffect} from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import tick from '../assets/icons/filter/tick.svg';
import badReview from '../assets/icons/filter/badReview.svg';
import goodReview from '../assets/icons/filter/goodReview.svg';
import highPrice from '../assets/icons/filter/highPrice.svg';
import lowPrice from '../assets/icons/filter/lowPrice.svg';

const BundleFiltersStyles = styled.div`

	grid-column: center-start / center-end;
	margin: 3rem 0;
	.filters{
		display: grid;
	    grid-template-columns: repeat(4, 1fr);
	    gap: 2rem;
	    width: 75%;
	    margin: auto;
	    box-shadow: 0px 2px 8px 0px #02020238;
	    padding: 2rem 0rem;
	    border: 1px solid #634cc261;
	    border-radius: 2px;

	}

	.filter {
		display: flex;
	    flex-direction: column;
	    align-items: center;
	}

	.input-checkbox {
		input {
			position: absolute;
			z-index: -1;
			opacity: 0;
		}

		label {
			width: 35px;
		    height: 35px;
		    background: var(--secondary);
		    display: block;
		    border-radius: 50%;
		    position: relative;
		    box-shadow: 0px 0px 9px 0px #0202021f;
   			border: 1px solid #d7d7d7;
		    &.active {
		    	background: var(--main);
		    	border-color: transparent;
		    }
			&.active::after {
				content: "";
				background: no-repeat 50%/50% 50%;
				background-image: url(${tick.src});
			    width: 2.5rem;
			    height: 2.5rem;
			    display: block;
			    position: absolute;
			    top: -2px;
    			left: -2.9px;	

			}
		}
	}

	.filter-txt {
		h4 {
			font-size: 0.9rem;
    		margin: 0.7rem 0;	
		}
	}

`

// Hide input checkbox
// position: absolute;
    // z-index: -1;
    // opacity: 0;
// }
const BundleFilters = (props) => {

  const [tickState, setTickState] = useState({
			  	lthpTick: false,
			  	htlpTick: false,
			  	lthrTick: false,
			  	htlrTick: false
  }	
  	);


	  const changeTickState = (e) => {

	  		const {id} = e.target;

	  		 const newObj = {};
	  		 // To reset all the filter buttons;
	  		 for(const nameObj in tickState) newObj[nameObj] = false;

	  		setTickState(prev => ({
	  		  		...newObj,
	  		  		[id]: !prev[id]
	  		  }));

	  }
  

  
  return (
    <BundleFiltersStyles>
    	<div className='filters'>
    		<div className='filter'>
    			<div className='input-checkbox'>
    				<input type='checkbox' id='reviewlth' />
    				<label id='htlrTick' className={tickState.htlrTick ? 'active' : ''} onClick={changeTickState}  htmlFor='reviewlth'></label>
    			</div>
    			<div className='filter-txt'>
    				<h4>Reviews - Low to High</h4>
    			</div>
    			<div className='filter-icon'>
    				<Image width={43} height={43} src={badReview} alt='Low to High Reviews Icon' />
    			</div>
    		</div>

    		<div className='filter'>
    			<div className='input-checkbox'>
    				<input type='checkbox' id='reviewhtl' />
    				<label id='lthrTick' className={tickState.lthrTick ? 'active' : ''} onClick={changeTickState}  htmlFor='reviewhtl'></label>
    			</div>
    			<div className='filter-txt'>
    				<h4>Reviews - High to Low</h4>
    			</div>
    			<div className='filter-icon'>
    				<Image  src={goodReview} alt='High to Low Reviews Icon' />
    			</div>
    		</div>

    		<div className='filter'>
    			<div className='input-checkbox'>
    				<input type='checkbox' id='pricehtl' />
    				<label id='htlpTick' className={tickState.htlpTick  ? 'active' : ''} onClick={changeTickState}  htmlFor='pricehtl'></label>
    			</div>
    			<div className='filter-txt'>
    				<h4>Price - High to Low</h4>
    			</div>
    			<div className='filter-icon'>
    				<Image width={40} height={40} src={highPrice} alt='High to Low Price Icon' />
    			</div>
    		</div>

    		<div className='filter'>
    			<div className='input-checkbox'>
    				<input type='checkbox' id='pricelth' />
    				<label id='lthpTick' className={tickState.lthpTick  ? 'active' : ''} onClick={changeTickState}  htmlFor='pricelth'></label>
    			</div>
    			<div className='filter-txt'>
    				<h4>Price - Low to High</h4>
    			</div>
    			<div className='filter-icon'>
    				<Image  src={lowPrice} alt='Low to High Price Icon' />
    			</div>
    		</div>
    	</div>
    </BundleFiltersStyles>

  )
}

export default BundleFilters;