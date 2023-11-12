// material-ui
import { Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

// project imports
import { useTheme } from '@mui/material/styles';

// types
import { ThemeMode } from 'types/config';

const SummaryCard = () => {
  const theme = useTheme();

  return (
    <Card sx={{height:"100%"}}>
      <CardHeader title={<Typography variant="h5">Summary</Typography>} />
      <CardContent sx={{height:"70%", paddingTop:"0px",}}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="flex-start"
          sx={{
            width: '100%',
            height: '100%',
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
              Debt to asset ratio
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', fontSize: '11px' }} textAlign="left">
              {''}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white', fontSize: '11px' }} textAlign="left">
              Risk indicator
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
