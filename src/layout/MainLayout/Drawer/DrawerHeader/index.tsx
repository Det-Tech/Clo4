// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, CardMedia } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
// import Logo from 'components/logo';
import useConfig from 'hooks/useConfig';

// types
import { MenuOrientation } from 'types/config';

// ==============================|| DRAWER HEADER ||============================== //
const logo = 'assets/images/logo.png';

interface Props {
  open: boolean;
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme();

  const { menuOrientation } = useConfig();
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL;

  return (
    <DrawerHeaderStyled
      theme={theme}
      // @ts-ignore
      open={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : 'auto',
        width: isHorizontal ? { xs: '100%', lg: '424px' } : 'inherit',
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="h2">Clo4</Typography>
      <CardMedia component="img" image={logo} sx={{ width: '140px', aspectRatio: 1, my: 3, }} />
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
