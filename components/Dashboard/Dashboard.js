import styled from 'styled-components';

import DashboardLinks from './DashboardLinks';
import DashboardUser from './DashboardUser';
import DashboardSettings from './DashboardSettings/DashboardSettings';


const DashboardStyles = styled.div`


  grid-column: center-start / center-end;
  display: grid;
  grid-template-columns: 1fr 55% 1fr;
  @media (max-width: 1200px){
  grid-template-columns: 1fr;
  margin-top: 7rem;
  }
  gap: 1rem;
  margin-top: 2rem;

`


const Dashboard = ({user,cancelNum, completedNum, activeNum}) => {
  return (
    <DashboardStyles>
        <DashboardLinks />
        <DashboardSettings cancelNum={cancelNum} completedNum={completedNum} activeNum={activeNum} />
        <DashboardUser  user={user}/>
    </DashboardStyles>
  )
}

export default Dashboard;