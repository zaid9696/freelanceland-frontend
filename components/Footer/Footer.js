import styled from 'styled-components';

import FooterContent from './FooterContent';
import FooterMargin from './FooterMargin';

const FooterStyles = styled.footer`

  display: grid;
  grid-column: full-start / full-end;
  margin-top: 3rem;

`;

const Footer = (props) => {
  return (
  	
    <FooterStyles className='sub_container'>
    	<FooterContent />
      <FooterMargin />
    </FooterStyles>
  )
}

export default Footer;