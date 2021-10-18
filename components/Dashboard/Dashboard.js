import styled from 'styled-components';

import DashboardLinks from './DashboardLinks';
import DashboardSettings from './DashboardSettings/DashboardSettings';
import DashboardUser from './DashboardUser';


const DashboardStyles = styled.div`


  grid-column: center-start / center-end;
  display: grid;
  grid-template-columns: 1fr 55% 1fr;
  gap: 1rem;
  margin-top: 2rem;

`

const Dashboard = (props) => {
  return (
    <DashboardStyles>
        <DashboardLinks />
        <DashboardSettings />
        <DashboardUser />
    </DashboardStyles>
  )
}

export default Dashboard;