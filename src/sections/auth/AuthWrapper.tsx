import { ReactNode, useState } from 'react';

// material-ui
import { Box, Grid, Hidden, useTheme } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import AuthSideBarWrapper from './AuthSideBarWrapper';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from 'components/@extended/IconButton';
import Drawer from '@mui/material/Drawer';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleSide = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: '100vh',
          maxWidth: '1260px',
          width: '100%',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Grid item xs={12}>
          <Grid item xs={12} container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Hidden smDown>
                <AuthSideBarWrapper />
              </Hidden>
              <Hidden smUp>
                <Drawer anchor={'left'} open={openDrawer} onClose={() => toggleSide()}>
                  <AuthSideBarWrapper />
                </Drawer>
              </Hidden>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              sx={{
                background: 'radial-gradient(ellipse farthest-side at center center, #285d53 0%, #334334 80%)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                padding: '2vh',
                justifyContent: 'center'
              }}
            >
              <Hidden smUp>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => toggleSide()}
                  edge="end"
                  color="secondary"
                  sx={{ color: 'text.primary', bgcolor: theme.palette.secondary[600] }}
                >
                  <MenuIcon style={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Hidden>
              <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', alignItems: 'center' }}>
                <AuthCard>{children}</AuthCard>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthWrapper;
