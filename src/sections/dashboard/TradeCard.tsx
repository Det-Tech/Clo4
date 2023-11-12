// material-ui
import { Box, Button, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from '@mui/material';

// project imports
import { useTheme } from '@mui/material/styles';

// types
import { ThemeMode } from 'types/config';

const TradeCard = () => {
  const theme = useTheme();
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title={<Typography variant="h5">Trade</Typography>} />
      <CardContent sx={{ height: '70%', paddingTop: '0px' }}>
        <Stack
          direction="column"
          spacing={1.5}
          alignItems="flex-start"
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
          <Stack direction={'row'} gap={'10px'} sx={{ width: '100%' }} justifyContent={'space-between'}>
            <Box sx={{ flexDirection: 'row', display: 'flex', gap: '10px', textAlign: 'center', alignItems: 'center' }}>
              <CardMedia
                component="img"
                image={'assets/images/crypto/uniswap.png'}
                sx={{ width: '24px', height: '24px', aspectRatio: 1 }}
              />
              <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
                BTC
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              0.99
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              $9000
            </Typography>
          </Stack>
          <Stack direction={'row'} gap={'10px'} sx={{ width: '100%' }} justifyContent={'space-between'}>
            <Box sx={{ flexDirection: 'row', display: 'flex', gap: '10px', textAlign: 'center', alignItems: 'center' }}>
              <CardMedia
                component="img"
                image={'assets/images/crypto/uniswap.png'}
                sx={{ width: '24px', height: '24px', aspectRatio: 1 }}
              />
              <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
                BTC
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              0.99
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              $9000
            </Typography>
          </Stack>
          <Stack direction={'row'} alignSelf={'center'}>
            <Button disableElevation size="large" type="submit" variant="contained" color="primary">
              Convert
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TradeCard;
