// material-ui
import { Box, CardMedia, Stack, Typography } from '@mui/material';

// project import

const logo = 'assets/images/logo.png';
// 
// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthSideBarWrapper = ({}) => {

  return (
    <Stack direction="column" justifyContent="space-around" 
      sx={{ display:"flex", minHeight: '100vh', padding: '2vh', background: 'lightgreen', maxWidth:"420px"}}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" px={2}>
        <Box>
          <Typography variant="h2">{'Clo4'}</Typography>
        </Box>
      </Stack>

      <CardMedia component="img" image={logo} sx={{ width: 'auto' }} />
      <Box sx={{ gap: "20px", mx:"50px", justifyContent: 'center', textAlign:"center", alignItems: 'center', alignSelf: 'center', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3">{'Secured & Easy'}</Typography>
        <Typography>{'Grow your investments with trading tools built for you.'}</Typography>
        {/* <CardMedia component="img" image={wipe} sx={{ width: 'auto' }} /> */}
      </Box>

      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap: "20px"}}>
      </Box>
    </Stack>
  );
};

export default AuthSideBarWrapper;
