import React from 'react'
import { Box, Link, Typography } from '@material-ui/core'

const Copyright = () => {
  return (
    <Box>
      <Typography className="copyright">
        Yqui では効果音の一部に
        <Link href="https://pocket-se.info/">ポケットサウンド</Link>
        を使用しています
      </Typography>
    </Box>
  )
}

export default Copyright
