import styled from 'styled-components';

import HeaderLinks from './HeaderLinks';

const HeaderStyles = styled.header`

  
    grid-column: full-start / full-end;
    background: var(--main);
    padding: 1.8rem 0px;

    @media (max-width: 1000px) {

       display: none !important;

        
    }

`;

const Header = (props) => {
  return (
    <HeaderStyles className='sub_container'>
      <HeaderLinks />
    </HeaderStyles>
  )
}

export default Header;