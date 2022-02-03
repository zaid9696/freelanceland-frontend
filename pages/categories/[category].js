import {useState} from 'react';
import Head from 'next/head';


import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

import BundlesItems from '../../components/Bundles/BundleItems';
import BundleFilters from '../../components/BundleFilters';
import leftArrow from '../../assets/icons/leftArrow.svg';
import rightArrow from '../../assets/icons/rightArrow.svg';

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
    	grid-template-columns: repeat(3, 1fr);
    	@media (max-width:750px){
    	grid-template-columns: repeat(2, 1fr);
 		}
 		@media (max-width:600px){
    	grid-template-columns: repeat(1, 1fr);
 		}
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

	    .arrow-active {
	    	pointer-events: none;
	    	button {
	    		color: #919191;
	    		img {
	    			filter: grayscale(1);
	    		}
	    	}
	    }
	    .arrow-btn {
	    	background: transparent;
		    border: none;
		    display: flex;
		    align-items: center;
		    color: var(--main);
		    font-size: 1.3rem;
		 @media (max-width: 500px) {
		    	font-size: 1rem;
		    	img {width: 30px}
		    }
	    	cursor: pointer

	    }

	    .l-arrow {

	    	margin-left: 0.5rem;
	    }

	    .r-arrow{
	    	margin-right: 0.5rem;

	    }
	   
	}

	.paginate-data {

		a.btn-active {
			pointer-events: none;

	    	button {
	    	color: var(--main);
			font-weight: 600;
	    	}
		  }

		button {
	    	background: transparent;
		    border: none;
		    font-weight: 500;
		    font-size: 1.5rem;
		    @media (max-width: 500px) {

		    font-size: 1rem;

		    }
		    color: #919191;
		    margin-right: 1px;
		    cursor: pointer;
		  
	    }
	}

`

const CategoryPage = ({result, pageNum}) => {

	
	const {bundles, count, category, totalBundlesNum} = result;

	const router =  useRouter();
	let pageFilter;
	// console.log({router: router.query.price});
	router.query.price ? pageFilter = router.query.price : '';
	router.query.review ? pageFilter = router.query.review : ''

	console.log({bundles, pageNum, pageFilter});
	const categoryName = category.categorySlug;



  return (
  	<>
  	<Head>
        <title> Category {category.category}  | FreelanceLand</title>
    </Head>
    <BundleCategoryStyles>
    	<BundleFilters router={router} pageNum={pageNum} categoryName={categoryName} />
    	<div className='category-title'>
    		<h2>{category.category}</h2>
    		<span>{totalBundlesNum} Bundles Available</span>
    	</div>
    	<div className='bundle-items'>
    		{bundles.map(item => <BundlesItems key={item.id} item={item} />)}
    	</div>
  { count > 1 && <div className='paginate'>
      		<Link href={`/categories/${categoryName}?page=${pageNum !== 1 ? pageNum - 1 : 1}${pageFilter ? `&${router.query.review ? 'review' : 'price'}=${pageFilter}` : ''}`}>
      			<a className={pageNum == 1 ? 'arrow-active': 'arrow-inactive'}>
  	    		<button type='button' className='r-arrow arrow-btn'>
  	    			 <Image src={rightArrow} /> Prev
  	    		</button>
      				
      			</a>
      		</Link>
      		<div className='paginate-data'>
      			{
      				Array(count).fill().map((_, i) => {
  
      					const num = i + 1;
      					return (
      							<Link  href={`/categories/${categoryName}?page=${num}${pageFilter ? `&${router.query.review ? 'review' : 'price'}=${pageFilter}` : ''}`} key={i}>
      								<a className={num == pageNum ? 'btn-active' : 'not-active'}>
      								<button type='button'>{num}</button>
      								</a>
      							</Link>
      						)
      				})
      			}
      
      		</div>
      		<Link href={`/categories/${categoryName}?page=${pageNum !== count ? pageNum + 1 : pageNum}${pageFilter ? `&${router.query.review ? 'review' : 'price'}=${pageFilter}` : ''}`}>
      		    			<a className={pageNum == count ? 'arrow-active': 'arrow-inactive'}>
      			    		<button type='button' className='l-arrow arrow-btn'>
      			    			 Next <Image src={leftArrow} /> 
      			    		</button>
      		    				
      		    			</a>
      		    		</Link>
      	</div>}
    </BundleCategoryStyles>
    </>
  )
}


export async function getServerSideProps(context){

  const {category, page, price, review} = context.query;
  const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

  let pageNum = page * 1;
  	  pageNum = pageNum ? pageNum : 1;
    const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/categories/${category}?page=${pageNum}&price=${price}&review=${review}`,{
        method: 'GET',
        headers: myHeaders
      });


       const data = await res.json();
        
        let error = data.error ? data.error.statusCode : null;
    
        if(error || !data){

          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
       }

        return {
            props: {
                result: data,
                pageNum,
                nameCat: category
            }
        }

}

export default CategoryPage;