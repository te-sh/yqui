import React from 'react'
import { Box } from '@material-ui/core'
import classNames from 'classnames'

const TabPanel = ({ children, value, index, className }) => (
  <Box className={classNames('tab-panel', className)}
       role="tabpanel"
       hidden={value !== index}
       id={`nav-tabpanel-${index}`}
       aria-labelledby={`nav-tab-${index}`}>
    <Box>
      {children}
    </Box>
  </Box>
)

export default TabPanel
