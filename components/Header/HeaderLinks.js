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
    	transition: var(--tranhover);
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


const HeaderLinks = (props) => {
  return (
    <HeaderLinksStyles>
    	<li>
    		<Link href='/'>
    			<a>
    				Programming & IT
    			</a>
    		</Link>
    	</li>
    	<li>
    		<Link href='/'>
    			<a>
    				Graphics & Design
    			</a>
    		</Link>
    	</li>
    	<li>
    		<Link href='/'>
    			<a>
    				Digital Marketing
    			</a>
    		</Link>
    	</li>
    	<li>
    		<Link href='/'>
    			<a>
    				Writing & Translation
    			</a>
    		</Link>
    	</li>
    	<li>
    		<Link href='/'>
    			<a>
    				Video & Animation
    			</a>
    		</Link>
    	</li>
    	<li>
    		<Link href='/'>
    			<a>
    				Music & Audio
    			</a>
    		</Link>
    	</li>
    	<li>
    		<Link href='/'>
    			<a>
    				Business
    			</a>
    		</Link>
    	</li>

    </HeaderLinksStyles>
  )
}

export default HeaderLinks;