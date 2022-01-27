import styled from 'styled-components';

import DashboardSettingsInfo from './DashboardSettingsInfo';
import DashboardSettingsInbox from './DashboardSettingsInbox';





const DashboardSettingsStyles = styled.div`
    
        margin-top: 8px;

`

const DashboardSettings = ({cancelNum, completedNum, activeNum}) => {
  return (
    <DashboardSettingsStyles>

      <DashboardSettingsInfo cancelNum={cancelNum} completedNum={completedNum} activeNum={activeNum} />
      
    </DashboardSettingsStyles>
  )
}

export default DashboardSettings;