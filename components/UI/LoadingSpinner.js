import styled from 'styled-components';

import loadingIcon from '../../assets/icons/loading.svg';

const LoadingSpinnerStyles = styled.div`
		

	position: fixed;
    width: 100%;
    height: 100%;
    background: #ffffff9e;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;


`

const LoadingSpinner = (props) => {
  return (
    <LoadingSpinnerStyles>
    	<img src={loadingIcon.src} alt='loading icon' />
    </LoadingSpinnerStyles>
  )
}

export default LoadingSpinner;