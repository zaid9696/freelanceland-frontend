import styled from 'styled-components';
import BundlesItems from './BundleItems';

const BundlesStyles = styled.div`

	grid-column: center-start / center-end;	
	position: relative;
	.bundles-title {

		display: flex;
		align-items: baseline;
		margin-bottom: 1.3rem;

		h2 {

			font-size: 2.2rem;
		  color: var(--main);
		  letter-spacing: 1px;
		  margin-top: 5rem;
		}
		span {
			font-size: 1.5rem;
		    margin-left: 5px;
		    font-weight: 300;
    		color: #706f6f;
		    position: relative;
		    top: -2px;
		}
	}

	.bundle-items {
		display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
	}

	.title-line {
		background: var(--main);
    width: 26%;
    height: 2px;
    display: block;
    position: absolute;
    top: 19.8%;
    left: 6%;
	}

	.bundle-btn {

		text-align: center;
		margin-top: 2.7rem;
		 button {
		 		    
		 		background: var(--main);
    		border: 1px solid var(--main);
		    color: #fff;
		    letter-spacing: 1px;
		    font-size: 1.19rem;
		    padding: 12px 25px;
		    border-radius: 35px;
		    font-weight: 500;
		    transition: var(--tranhover);
		    &:hover {
		    		border: 1px solid;
		    		background: transparent;
		    		color: var(--main);
		    }
		 }
	}
	
`;



const Bundles = ({title, desc, bundleItems}) => {
  return (
    <BundlesStyles>
    	<div className='bundles-title'>
    		<h2>{title}</h2>
    		<span>{desc}</span>
    	</div>
    	<span className='title-line'></span>
    	<div className='bundle-items'>
    		{bundleItems.map(item => <BundlesItems key={item.id} item={item} />)}
    	</div>
    	<div className='bundle-btn'>
    	<button type='button'>View More</button>
    	</div>
    </BundlesStyles>
  )
}

export default Bundles;