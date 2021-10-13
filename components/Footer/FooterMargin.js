import styled from 'styled-components';
import Link from 'next/link';

const FooterMarginStyles = styled.div`

	grid-column: full-start / full-end;
	background: #090b2c;
	padding: 0.4rem 2rem;
	color: #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 100;
    font-size: 0.7rem;
    letter-spacing: 1px;
    a {
    	font-size: 1rem;
	    color: #fff;
	    margin-left: 4px;
	    position: relative;
	    top: 1.9px;
	    font-weight: 500;
    }

`;

const FooterMargin = (props) => {
  return (
    <FooterMarginStyles>
    	
    	<p>Designed & Developed By<a href='https://zaid-dev.com' rel='noopener noreferrer' target='_blank'>Zaid</a></p>
    	<span>All &copy; {new Date().getFullYear()} Right Reserved To FreelanceLand</span>
    </FooterMarginStyles>
  )
}

export default FooterMargin;