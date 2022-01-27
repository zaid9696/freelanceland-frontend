import styled from 'styled-components';
import Link from 'next/link';

const HeaderLinksStyles = styled.ul`

	grid-column: center-start / center-end;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 1.4rem;
  align-items: center;
  


	li {
		background: #fff;
	    padding: 1.1rem;
	    border-radius: 30px;
	    font-weight: 600;
	    font-size: 0.7rem;
        cursor: pointer;
	     @media (max-width: 1115px) {

	    		font-size: 0.5rem;
        
    		}
    	transition: var(--tranhover);
        a{
            color: var(--main);
        }
	    &:hover{
	    	box-shadow: 0px 0px 8px 3px #d7d7d74f;
	    	background: transparent;
	    	a{
    			transition: var(--tranhover);
	    		color: #fff;
	    	}
	    }
	}

`


const HeaderLinks = ({className, categories}) => {
  return (
    <HeaderLinksStyles className={`${className} right`}>
    	{
           categories && categories.map((item) => (
                    <li key={item._id} >
                         <Link  href={`/categories/${item.categorySlug}`}>
                         <a>
                            {item.category}
                        </a>
                        </Link>
                    </li>
                ))
        }

    </HeaderLinksStyles>
  )
}

export default HeaderLinks;