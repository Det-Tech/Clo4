import { useEffect, ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Container, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import navigation from 'menu-items';
import useConfig from 'hooks/useConfig';
import { dispatch, useSelector } from 'store';
import { activeDeposit, openDrawer } from 'store/reducers/menu';

// types
import { ThemeMode } from 'types/config';
import DepositDialog from 'components/dialogs/DepositDialog';

// ==============================|| MAIN LAYOUT ||============================== //

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { container, miniDrawer } = useConfig();

  const menuState = useSelector((state) => state.menu);

  const isHorizontal = downLG;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      dispatch(openDrawer(!matchDownXL));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownXL]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Header />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Container
          maxWidth={false}
          sx={{
            ...(container && { p: { xs: 2, sm: 4 } }),
            position: 'relative',
            minHeight: !downLG ? 'calc(100vh - 50px)' : 'calc(100vh - 110px)',
            mt: !downLG ? 'auto' : '60px',
            display: 'flex',
            flexDirection: 'column',
            border: theme.palette.mode === ThemeMode.DARK ? '1px solid transparent' : '1px solid #e0e0e0',
            borderRadius: '16px',
            backdropFilter: 'blur(2.5px)',
            maxWidth: '1300px',
            width: '100%',
            background:
              theme.palette.mode === ThemeMode.DARK
                ? 'radial-gradient(117.73% 149.50% at 8.37% 0.00%, rgba(35, 35, 35) 0%, #141718 100%) padding-box, linear-gradient(120deg, #8470FF60, rgb(100, 100, 100) 50%, rgb(100, 100, 100) 60%, rgb(150, 150, 150)) border-box'
                : '#FDFDFF'
          }}
        >
          <Drawer/>
          <Box sx={{ paddingLeft: isHorizontal ? '0px' : '260px' }}>
            <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
            {children}
          </Box>
        </Container>
        <DepositDialog open={menuState.activeDeposit} handleClose={()=>{dispatch(activeDeposit(false))}}/>
      </Box>
    </Box>
  );
};

export default MainLayout;
