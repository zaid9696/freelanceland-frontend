import {useState} from 'react';

import styled from 'styled-components';

const PanelTapStyles = styled.ul`

	
	margin-bottom: 2rem;
    background: whitesmoke;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    justify-items: center;
    align-items:center;
    gap: 1.3rem;
    padding: 1rem 0rem;
    border-radius: 32px;
    box-shadow: 0px 1px 5px 1px #02020226;

    li {
    	cursor: pointer;
    	transition: all 0.4s cubic-bezier(0.42,0,0,0.63)
    }

    .active {
    	padding: 12px 30px;
	    background: var(--main);
	    color: #fff;
	    border-radius: 40px;
	    letter-spacing: 1px;
    }

`;

const PanelTap = (props) => {

	const [listActive, setListActive] = useState({
		activeElm: false,
		completeElm: false,
		cancelElm: false
	});

	const listClick = (e) => {

		const {id} = e.target;

		const newObj = {};
		for(const listObj in listActive) newObj[listObj] = false; 

		setListActive(prev => ({
					...newObj,
					[id]: !prev[id]
				}));

		console.log(listActive);

	}


  return (
    <PanelTapStyles>
    	<li id='activeElm' onClick={listClick} className={listActive.activeElm ? 'active' : ''}>Active</li>
    	<li id='completeElm' onClick={listClick} className={listActive.completeElm ? 'active' : ''}>Compeletd</li>
    	<li id='cancelElm' onClick={listClick} className={listActive.cancelElm ? 'active' : ''}>Cancelled</li>
    </PanelTapStyles>
  )
}

export default PanelTap;