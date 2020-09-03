import React from 'react'
import TeamButton from './TeamButton'
import RuleButton from './RuleButton'
import MasterButton from './MasterButton'
import ObserverButton from './ObserverButton'
import SettingButton from './SettingButton'
import HelpButton from './HelpButton'
import LeaveButton from './LeaveButton'

const TopMenu = () => {
  return (
    <>
      <TeamButton />
      <RuleButton />
      <MasterButton />
      <ObserverButton />
      <SettingButton />
      <HelpButton />
      <LeaveButton />
    </>
  )
}

export default TopMenu
