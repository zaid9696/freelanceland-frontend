import GlobalStyles from '../styles/GlobalStyles';
import styled from 'styled-components';
import Nav from './Nav/Nav';
import NavMobile from './NavMobile';
import Header from './Header/Header';
import Footer from './Footer/Footer'
import 'normalize.css';

const Wrapper = styled.div`
  
  display: grid;
  grid-template-columns: [full-start] minmax(2rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 15rem) [col-start]) [center-end]  minmax(2rem, 1fr) [full-end];

`;

const Layout = ({children}) => {
  return (

    <>
    	<GlobalStyles />
      <Wrapper>
        
      	<Nav />
        <NavMobile />
        <Header />
      	{children}
      	<Footer />

      </Wrapper >
    </>
  )
}

export default Layout;



