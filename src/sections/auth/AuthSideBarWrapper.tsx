// material-ui
import { Box, Button, CardMedia, Stack, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

// project import
import { useRouter } from 'next/navigation';

const logo = 'assets/images/logo.png';
const wipe = 'assets/images/landing/wipe.png';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthSideBarWrapper = ({}) => {
  const router = useRouter();

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
