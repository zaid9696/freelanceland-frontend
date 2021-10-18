import styled from 'styled-components';
import Image from 'next/image';

import BundlesItems from './Bundles/BundleItems';

import leftArrow from '../assets/icons/leftArrow.svg';
import rightArrow from '../assets/icons/rightArrow.svg';

const BundleCategoryStyles = styled.div` 

	grid-column: center-start / center-end;


	.category-title {

		h2 {
			font-size: 2rem;
		    color: var(--main);
		    border-bottom: 2px solid;
		    width: fit-content;
		    padding: 10px 0px;
		    margin-bottom: 10px;s
		}
		span {
			display: block;
		    margin-bottom: 2rem;
		    font-size: 1.2rem;
		    font-weight: 100;
		}
	}

	.bundle-items {
		display: grid;
    	grid-template-columns: repeat(4, 1fr);
    	gap: 1.5rem;
	}		

	.paginate {

		display: flex;
	    align-items: center;
	    justify-content: center;
	    margin-top: 2rem;
	    margin-block-start: 2rem;
	    border-bottom: 2px solid var(--main);
	    padding-bottom: 3px;
	    width: fit-content;
	    margin: auto;
	    margin-top: 2rem;

	    .arrow-btn {
	    	background: transparent;
		    border: none;
		    display: flex;
		    align-items: center;
		    color: var(--main);
		    font-size: 1.3rem;
	    }

	    .l-arrow {

	    	margin-left: 0.5rem;
	    }

	    .r-arrow{
	    	margin-right: 0.5rem;

	    }
	   
	}

	.paginate-data {

		button {
	    	background: transparent;
		    border: none;
		    font-weight: 500;
		    font-size: 1.5rem;
		    color: #919191;
		    margin-right: 1px;
		    &.btn-active {
		    	color: var(--main);
    			font-weight: 600;
		    }
	    }
	}

`

const BundleCategory = ({title, items}) => {
  return (
    <BundleCategoryStyles>
    	<div className='category-title'>
    		<h2>{title}</h2>
    		<span>40 Bundles Available</span>
    	</div>
    	<div className='bundle-items'>
    		{items.map(item => <BundlesItems key={item.id} item={item} />)}
    	</div>
    	<div className='paginate'>
    		<button  type='button' className='r-arrow arrow-btn'>
    			 <Image src={rightArrow} /> Prev
    		</button>
    		<div className='paginate-data'>
    			<button type='button'>1</button>
    			<button type='button' className='btn-active'>2</button>
    			<button type='button'>3</button>
    			<button type='button'>4</button>
    		</div>
    		<button type='button' className='l-arrow arrow-btn'>
    			 Next <Image src={leftArrow} /> 
    		</button>
    	</div>
    </BundleCategoryStyles>
  )
}

export default BundleCategory;