// material-ui
import { Box, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';

// project imports
import { useTheme } from '@mui/material/styles';

// types
import { ThemeMode } from 'types/config';

// ==============================|| Outstanding CARD ||============================== //

const OutStandingCard = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title={<Typography variant="h5">Outstanding positions</Typography>} />
      <CardContent sx={{ gap: '5px', display: 'flex', flexDirection: 'column', paddingTop: '0px', justifyContent: 'space-between' }}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            width: '100%',
            p: 0.25,
            border: '1px solid transparent',
            background:
              theme.palette.mode === ThemeMode.DARK
                ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
                : '#85E0A3',
            borderRadius: '8px',
            px: 1,
            py: 0.5,
            '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter' },
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.secondary.dark}`,
              outlineOffset: 2
            },
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              Total staked
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', fontSize: '11px' }} textAlign="left">
              {'$100, 000, 000'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              APY
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', fontSize: '11px' }} textAlign="left">
              {'3.23%'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white', fontSize: '11px' }} textAlign="left">
              Assets
            </Typography>
            <Stack direction={'row'} gap={'10px'}>
              <CardMedia
                component="img"
                image={'assets/images/crypto/uniswap.png'}
                sx={{ width: '24px', height: '24px', aspectRatio: 1 }}
              />
              <CardMedia component="img" image={'assets/images/crypto/1inch.png'} sx={{ width: '24px', height: '24px', aspectRatio: 1 }} />
            </Stack>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            width: '100%',
            p: 0.25,
            border: '1px solid transparent',
            background:
              theme.palette.mode === ThemeMode.DARK
                ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
                : 'red',
            borderRadius: '8px',
            px: 1,
            py: 0.5,
            '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter' },
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.secondary.dark}`,
              outlineOffset: 2
            },
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              Total Debt
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', fontSize: '11px' }} textAlign="left">
              {'$100, 000, 000'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              APY
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', fontSize: '11px' }} textAlign="left">
              {'3.23%'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white', fontSize: '11px' }} textAlign="left">
              Assets
            </Typography>
            <Stack direction={'row'} gap={'10px'}>
              <CardMedia
                component="img"
                image={'assets/images/crypto/uniswap.png'}
                sx={{ width: '24px', height: '24px', aspectRatio: 1 }}
              />
              <CardMedia component="img" image={'assets/images/crypto/1inch.png'} sx={{ width: '24px', height: '24px', aspectRatio: 1 }} />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OutStandingCard;
