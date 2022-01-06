import {useState, useEffect} from 'react';
import styled from 'styled-components';

import useHttpAxios from '../../hooks/http-hook';
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

  const [categories, setCategories] = useState([]);
  const {sendRequest} = useHttpAxios()

  useEffect(() => {

    const fetchCategories = async () => {

          try {

              const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/categories`);
              setCategories(res.data.allCategories);
          }catch(err) {console.log(err);}

    }

    fetchCategories();

  }, []);

  console.log({categories});

  return (
    <HeaderStyles className='sub_container'>
      {<HeaderLinks categories={categories} />}
    </HeaderStyles>
  )
}

export default Header;