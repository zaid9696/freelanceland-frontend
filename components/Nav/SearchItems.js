import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import truncateLetters from '../../utils/truncateLetters';
import bundleImage from '../../assets/bundleImage.png';

const SearchItemsStyles = styled.ul`

	position: absolute;
    background: white;
    width: 38%;
    border-radius: 3px;
    top: 92px;
    z-index: 0;
    padding: 1rem;
    box-shadow: var(--shadow);
    height: 50%;
    overflow-y: auto;
    &::-webkit-scrollbar{
    	width: 7px;
		  background-color: #c5c5c5;
    }

    &::-webkit-scrollbar-thumb {

    	background: #3c4858;
    	border-radius: 6px;
    }

    li {
    	margin-bottom: 1.5rem;
	    border-bottom: 1px solid #ccc;
	    padding-bottom: 8px;
	    &:hover {

	    	h3,p {
	    		color: var(--main);
	    	}
	    }
    }

    .search-wrap {

    	display: flex;
	    justify-content: center;
	    align-items: center;
    }

    .search-image {
    	width: 110px;
    	img {
    		border-radius: 3px;
    		width: 110px !important;
    	}
    }

    a {
    	color: var(--black);
    	text-align: left;
    }

    h3 {
    	margin-top: 0px;
	    margin-bottom: 8px;
	    font-size: 1rem;
	    border-bottom: 1px solid #634cc287;
	    padding-bottom: 4px;
	    transition: var(--tranhover);

    }

    p {
    	margin-top: 6px;
	    margin-bottom: -3px;
	    font-size: 0.8rem;
	    transition: var(--tranhover);

    }

    .search-content {
    	width: 100%;
    	margin-left: 15px;
    }
}



 `;

 const Item =  ({item, hideBar}) => {

 		return (

 				<li onClick={hideBar}>

 					<Link  href={`/bundle/${item.id}/${item.title}`}>
 						<a>
 							<div className='search-wrap'> 
 								<div className='search-image'>
 									<Image alt='bundle image' src={bundleImage} width={500} height={500} />
 								</div>
 								<div className='search-content'>
 									<h3>{item.title}</h3>
 									<p>{truncateLetters(item.description, 80)}</p>
 								</div>
 							</div>
 						</a>
 					</Link>

 				</li>

 			)

 }

const SearchItems = ({items, hideBar, clsName}) => {
  return (
    <SearchItemsStyles className={clsName}>
    	{
    		items.map(item => <Item hideBar={hideBar}  key={item.id} item={item} />)
    	}
    </SearchItemsStyles>
  )
}

export default SearchItems;