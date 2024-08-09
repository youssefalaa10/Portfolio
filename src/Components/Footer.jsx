import { Box, Typography } from "@mui/material"

function Footer() {
  return (
    <Box>
      <Typography py={1} sx={{backgroundColor:"#545454", width:"100%", textAlign:"center ", color:"white"}}>
        ©️ 2024 <Typography component="span" color="orange">Youssef Alaa</Typography >. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
