import styled from 'styled-components';

import DashboardUser from '../Dashboard/DashboardUser';
import DashboardLinks from '../Dashboard/DashboardLinks';
import PanelRequest from './PanelRequest';
import PanelSelect from './PanelSelect';
import PanelTap from './PanelTap';


const PanelStyles = styled.div`
	

  grid-column: center-start / center-end;
  display: grid;
  grid-template-columns: 1fr 55% 1fr;
  gap: 1rem;
  margin-top: 2rem;

  

`;


const Panel = (props) => {
  return (
    <PanelStyles>
    	<DashboardLinks />
    	<div className='panel-filter'>
    		{/* <PanelSelect />*/}
        <PanelTap />
    		<PanelRequest />
    	</div>
    	<DashboardUser />
    </PanelStyles>
  )
}

export default Panel;