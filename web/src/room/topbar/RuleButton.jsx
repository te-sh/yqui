import React from 'react'
import { connect } from 'react-redux'
import { Box, IconButton, Tooltip } from '@material-ui/core'
import { PlaylistAddCheck } from '@material-ui/icons'
import Rule from '../rule/Rule'

const RuleButton = ({ user, editTeams }) => {
  const [ruleOpen, setRuleOpen] = React.useState(false)

  return (
    <Box>
      <Tooltip title="ルール">
        <span>
          <IconButton color="inherit"
                      disabled={!user.isMaster || !!editTeams}
                      onClick={() => setRuleOpen(true)}>
            <PlaylistAddCheck />
          </IconButton>
        </span>
      </Tooltip>
      <Rule open={ruleOpen} close={() => setRuleOpen(false)} />
    </Box>
  )
}

export default connect(
  state => ({
    user: state.user,
    editTeams: state.editTeams
  })
)(RuleButton)
