import styled from 'styled-components';

import DashboardSettingsInfo from './DashboardSettingsInfo';
import DashboardSettingsInbox from './DashboardSettingsInbox';





const DashboardSettingsStyles = styled.div`
    
        margin-top: 8px;

`

const DashboardSettings = (props) => {
  return (
    <DashboardSettingsStyles>

      <DashboardSettingsInfo />
      <DashboardSettingsInbox />

    </DashboardSettingsStyles>
  )
}

export default DashboardSettings;