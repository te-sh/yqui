import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Tab, Tabs, Typography
} from '@material-ui/core'
import { setOpenHelp } from '../../redux/actions'
import TabPanel from '../../lib/TabPanel'
import './Help.scss'

const Help = ({ open, setOpen }) => {
  const [tab, setTab] = React.useState(0)

  const close = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">ヘルプ</DialogTitle>
      <DialogContent className="help">
        <Tabs value={tab} onChange={(evt, newTab) => setTab(newTab)}>
          <Tab label="プレイヤー" />
          <Tab label="司会" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <Typography variant="h6">
            早押しの方法
          </Typography>
          <Typography>
            以下の方法のうち, お好みの方法を選んでください.
          </Typography>
          <ul>
            <li>
              <Typography>
                画面下部の
                <Button variant="outlined" color="primary">
                  早押し
                </Button>
                をクリックする
              </Typography>
            </li>
            <li>
              <Typography>
                画面下部の
                <Button variant="outlined" color="primary">
                  早押し
                </Button>
                の周りのエリアをクリックした後, Enter キーを押す
              </Typography>
            </li>
            <li>
              <Typography>
                画面左下部のチャット入力欄に '!' (半角/全角どちらも可) を入力して, Enter キーを押す
              </Typography>
            </li>
          </ul>
          <Typography variant="h6">
            チャット回答マーク
          </Typography>
          <Typography>
            設定でチャット回答マークをオンにすると名前欄にチャット回答マークが付きます.
            こうすると回答時にカウントを長めにしてもらえるかもしれません.
          </Typography>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Typography variant="h6">
            "次の問題" と "リセット"
          </Typography>
          <Typography>
            "次の問題" は休み中のプレイヤーの休みを減らします. "リセット" は減らしません.
            休みルールがない場合は違いはありません.
          </Typography>
          <Typography variant="h6">
            "最上位勝ち抜け" と "最下位失格"
          </Typography>
          <Typography>
            "最上位勝ち抜け" はクリック時のポイントが最も大きいプレイヤーを勝ち抜けにします.
            そのようなプレイヤーが複数いる場合はそのプレイヤー全員を勝ち抜けにします.
          </Typography>
          <Typography>
            "最下位失格" はクリック時のポイントが最も小さいプレイヤーを失格にします.
            そのようなプレイヤーが複数いる場合はそのプレイヤー全員を失格にします.
          </Typography>
          <Typography>
            いずれの場合もボタンなどはリセットされます.
          </Typography>
          <Typography variant="h6">
            勝ち抜け人数
          </Typography>
          <Typography>
            ルールで勝ち抜けの人数を設定できます.
          </Typography>
          <Typography>
            これはルール表示にだけ使われます. その他の処理 (セット終了など) は行いません.
          </Typography>
          <Typography>
            勝ち抜け人数を 0 以下に設定するとルール表示に勝ち抜け人数を表示しません.
          </Typography>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={close}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  state => ({
    open: state.open.help
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenHelp(open))
  })
)(Help)
