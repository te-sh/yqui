import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { PlaylistAddCheck } from '@material-ui/icons'
import Rule from '../rule/Rule'

const RuleButton = ({ isMaster, editTeams }) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)

  return (
    <Box>
      <Tooltip title="ルール">
        <IconButton color="inherit"
                    disabled={!isMaster || !!editTeams}
                    onClick={() => setRuleOpen(true)}>
          <PlaylistAddCheck />
        </IconButton>
      </Tooltip>
      <Rule open={ruleOpen} close={() => setRuleOpen(false)} />
    </Box>
  )
}

export default connect(
  state => ({
    isMaster: state.isMaster,
    editTeams: state.editTeams
  })
)(RuleButton)
