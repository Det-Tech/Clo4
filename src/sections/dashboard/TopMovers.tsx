// material-ui
import { Box, CardHeader, Typography } from '@mui/material';

// project imports
// import numberFormat from 'utils/numberFormat';
// ==============================|| TopMovers CARD ||============================== //
import MoverCard from './MoverCard';

const TopMovers = () => {
  const topMovers = [
    {
      id: 1,
      title: 'Bitcoin',
      percent: '3.7%',
      balance: '100',
      image: 'assets/images/crypto/bitcoin.png'
    },
    {
      id: 2,
      title: 'Ethereum',
      percent: '5.7%',
      balance: '4000',
      image: 'assets/images/crypto/ethereum.png'
    },
    {
      id: 3,
      title: 'Avalanche',
      percent: '3.7%',
      balance: '2000',
      image: 'assets/images/crypto/avalanche.png'
    },
    {
      id: 4,
      title: 'Uniswap',
      percent: '2.7%',
      balance: '10700',
      image: 'assets/images/crypto/uniswap.png'
    },
    {
      id: 5,
      title: '1inch',
      percent: '10.7%',
      balance: '1000',
      image: 'assets/images/crypto/1inch.png'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        sx={{ marginLeft: '-10px' }}
        titleTypographyProps={{ variant: 'subtitle1' }}
        title={<Typography variant="h5">{'Market Top Movers'}</Typography>}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', overflow: 'scroll' }}>
        {topMovers.map((item, index) => (
          <MoverCard item={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default TopMovers;
