import React from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import './Note.scss'

const Note = () => {
  return (
    <Box className="note">
      <Typography variant="h5">Yqui とは</Typography>
      <Box>
        <Typography className="item">
          早押しボタンや点数管理を行うツールです.
        </Typography>
        <Typography className="item">
          各種ルールを設定でき, またボードクイズやチーム戦なども楽しめます. 通話機能はありませんので Discord など他の通話アプリを併用してください.
        </Typography>
        <Typography className="item">
          皆様の充実したオンラインクイズライフの一助となれれば幸甚の至りです.
        </Typography>
      </Box>

      <hr />

      <Typography variant="h5">推奨環境</Typography>
      <Box>
        <Typography className="item">
          1280x800 (WXGA) 以上の画面を持つ PC および Google Chrome ブラウザです.
        </Typography>
        <Typography className="item">
          その他のブラウザやモバイル端末も可能な限り対応しておりますが, バグ修正などの優先度は低くなっております.
        </Typography>
      </Box>

      <hr />

      <Box>
        <Typography variant="h5">要望, バグ報告</Typography>
        <Typography className="item">
          要望, バグ報告やその他ご相談については <Link href="mailto:yqui.dev@gmail.com">開発者メール (yqui.dev@gmail.com)</Link> にて
          受け付けております.
        </Typography>
        <Typography className="item">
          バグ報告についてはバグが発生した時刻および部屋, 具体的な再現手順を可能な限り詳細に記載していただけると, 調査の際に大きな助けとなります.
        </Typography>
        <Typography className="item">
          要望, バグはすべてについて対応することをお約束はできませんので, ご了承ください.
        </Typography>
      </Box>

      <hr />

      <Box>
        <Typography variant="h5">注意事項</Typography>
        <Typography className="item">
          システムアップデートやメンテナンスなどのため, 予告なく再起動または停止することがあります.
        </Typography>
        <Typography className="item">
          Yqui を利用した際に生じる不利益や損害については Yqui 開発者は一切の責任を負いません.
        </Typography>
        <Typography className="item">
          Yqui の運用方針は予告なく変更されることがあります.
        </Typography>
      </Box>

      <hr />

      <Box>
        <Typography variant="h5">著作権など</Typography>
        <Typography className="item">
          本サイトは商用, 非商用を問わず自由に利用していただいて結構です.
        </Typography>
        <Typography className="item">
          Yqui では効果音の一部に <Link href="https://pocket-se.info/">ポケットサウンド</Link> を使用しています.
        </Typography>
      </Box>
    </Box>
  )
}

export default Note
