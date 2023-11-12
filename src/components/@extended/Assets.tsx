// material-ui
import { CardMedia, Stack, Typography, useTheme } from '@mui/material';

// assets
import * as antColors from '@ant-design/colors';
import { ThemeMode } from 'types/config';

// ==============================|| ACTIVITY NOTIFICATION ||============================== //

const Assets = () => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor={theme.palette.mode === ThemeMode.DARK ? antColors.grey[5] : antColors.blue[5]}
      px={2}
      py={1}
      borderRadius={1}
    >
      <CardMedia component="img" image={'assets/images/crypto/bitcoin.png'} sx={{ width: '24px', height: '24px', aspectRatio: 1 }} />

      <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
        <Typography fontWeight={800} color={theme.palette.mode === ThemeMode.DARK ? antColors.blue[3] : 'white'}>
          &nbsp; { 'wBitcoin'}
        </Typography>
        <Typography fontStyle="italic" fontWeight={800} color={theme.palette.mode === ThemeMode.DARK ? antColors.blue[3] : 'white'}>
          {'5.02'}
        </Typography>
        <Typography variant="body2" color={theme.palette.mode === ThemeMode.DARK ? 'textSecondary' : 'white'}>
          {'$ 3,602'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Assets;
