// material-ui
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import { DRAWER_WIDTH } from 'config';

// types
import { ThemeMode } from 'types/config';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  borderRight: `none`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  boxShadow: theme.palette.mode === ThemeMode.DARK ? theme.customShadows.z1 : 'none',
  borderRadius: "20px",
  background: "#00A47875",
});

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   overflowX: 'hidden',
//   width: theme.spacing(7.5),
//   borderRight: 'none',
//   boxShadow: theme.customShadows.z1
// });

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...{
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }
}));

export default MiniDrawerStyled;
