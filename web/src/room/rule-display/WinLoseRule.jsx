import React from 'react'
import PassQuizHelpButton from '../rule-help/PassQuizHelpButton'

const WinLoseRule = ({ rule }) => {
  const win = () => {
    if (rule.winPoint.active) {
      return (
        <>
          {rule.passQuiz && <>通過クイズ<PassQuizHelpButton /> </>}
          {<>勝ち抜け {rule.winPoint.value}ポイント</>}
          {rule.winPlayers > 0 && <> {rule.winPlayers}人</>}
        </>
      )
    } else {
      return <>勝ち抜けなし</>
    }
  }

  const lose = () => {
    if (rule.losePoint.active || rule.loseBatsu.active) {
      return (
        <>
          失格
          {rule.losePoint.active && <> {rule.losePoint.value}ポイント</>}
          {rule.loseBatsu.active && <> {rule.loseBatsu.value}バツ</>}
        </>
      )
    } else {
      return <>失格なし</>
    }
  }

  return (
    <>
      {win()} {lose()}
    </>
  )
}

export default WinLoseRule
