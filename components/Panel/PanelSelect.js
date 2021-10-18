import styled from 'styled-components';

import selectArrow from '../../assets/selectArrow.svg';


const PanelSelectStyles = styled.div`


	
  	.select {
  		margin-bottom: 2rem;
      width: 100%;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        width: 30px;
        height: 100%;
        top: 1px;
        right: 19px;
        background: url(${selectArrow.src}) no-repeat right ;
        pointer-events: none;
      }
      select {
        width: 100%;
        height: 46px;
        padding-left: 15px;
        background: whitesmoke;
        border: 1px solid #634cc26b;
        border-radius: 3px;
        outline: transparent;
        transition: var(--tranhover);
        box-shadow: var(--shadow);
        border: none;
        color: var(--black);
        appearance: none;
        &:focus {
            box-shadow: 0px 0px 5px 1px #634cc270;
        }
      }
  	}

`

const PanelSelect = (props) => {
  return (
    <PanelSelectStyles>
    	<div className='select'>
    		<select name='categories' id='categories'>

              <option value='all' default>All Categories</option>
              <option value='programming and IT' >Programming & IT</option>
              <option value='graphics and Design' >Graphics & Design</option>
              <option value='digital and marketing' >Digital Marketing</option>
    		  <option value='writing and translation' >Writing and Translation</option>
              <option value='video and animation' >Video & Animation</option>
              <option value='music and audio' >Music & Audio</option>
              <option value='business' >business</option>

    		</select>
    	</div>
    </PanelSelectStyles>
  )
}

export default PanelSelect;