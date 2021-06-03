import React from 'react'
import { connect } from 'react-redux'
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Tab, Tabs, Typography
} from '@material-ui/core'
import classNames from 'classnames'
import { setOpenHelp } from '../../redux/open_actions'
import TabPanel from '../../tab/TabPanel'
import './Help.scss'

const Help = ({ browser: { mobile }, open, setOpen }) => {
  const [tab, setTab] = React.useState(0)

  const close = () => {
    setOpen(false)
  }

  return (
    <Dialog className="help-dialog" open={open}
            aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">ヘルプ</DialogTitle>
      <DialogContent className={classNames('help', { mobile })}>
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
                <Button variant="outlined" color="primary" size="small">
                  早押し
                </Button>
                をクリックする
              </Typography>
            </li>
            <li>
              <Typography>
                画面下部の
                <Button variant="outlined" color="primary" size="small">
                  早押し
                </Button>
                の周りのエリアをクリックした後, Enter キーを押す
              </Typography>
            </li>
            <li>
              <Typography>
                画面左下部のチャット入力欄に &quot;!&quot; (半角/全角どちらも可) を入力して, Enter キーを押す
              </Typography>
            </li>
          </ul>
          <Typography variant="h6">
            チャット回答マーク
          </Typography>
          <Typography>
            設定でチャット回答マークをオンにすると名前欄にチャット回答マーク (<span className="chat-mark">©</span>) が付きます.
          </Typography>
          <Typography>
            こうすると司会者があなたがチャット回答かどうかを容易に判断できるようになり, 円滑な進行の助けになるでしょう.
          </Typography>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Typography variant="h6">
            <Button variant="outlined">次の問題</Button>と<Button variant="outlined">リセット</Button>
          </Typography>
          <Typography>
            <Button variant="outlined" size="small">次の問題</Button>は休み中のプレイヤーの休みを減らします.
            <Button variant="outlined" size="small">リセット</Button>は減らしません.
            休みルールがない場合は違いはありません.
          </Typography>
          <Typography variant="h6">
            <Button variant="outlined">最上位勝抜</Button>と<Button variant="outlined">最下位失格</Button>
          </Typography>
          <Typography>
            <Button variant="outlined" size="small">最上位勝抜</Button>はクリック時のポイントが最も大きいプレイヤーを勝抜にします.
            そのようなプレイヤーが複数いる場合はそのプレイヤー全員を勝抜にします.
          </Typography>
          <Typography>
            <Button variant="outlined" size="small">最下位失格</Button>はクリック時のポイントが最も小さいプレイヤーを失格にします.
            そのようなプレイヤーが複数いる場合はそのプレイヤー全員を失格にします.
          </Typography>
          <Typography>
            いずれの場合もボタンなどはリセットされます.
          </Typography>
          <Typography variant="h6">
            勝抜人数
          </Typography>
          <Typography>
            ルールで勝抜の人数を設定できます.
          </Typography>
          <Typography>
            これはルール表示にだけ使われます. その他の処理 (セット終了など) は行いません.
          </Typography>
          <Typography>
            勝抜人数を 0 以下に設定するとルール表示に勝抜人数を表示しません.
          </Typography>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button className="close" color="secondary" onClick={close}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  state => ({
    browser: state.browser,
    open: state.open.help
  }),
  dispatch => ({
    setOpen: open => dispatch(setOpenHelp(open))
  })
)(Help)
