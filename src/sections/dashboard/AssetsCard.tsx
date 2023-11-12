// material-ui
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

// project imports
import Assets from 'components/@extended/Assets';

// ==============================|| RECENT ACTIVITIES CARD ||============================== //
const data = [
  {
    id: 0,
    name: 'wBitcoin',
    image: '',
    amount: 23,
    price: 20000
  },
  {
    id: 1,
    name: 'Ethereum',
    image: '',
    amount: 23,
    price: 20000
  },
  {
    id: 2,
    name: 'Polygon',
    image: '',
    amount: 23,
    price: 20000
  },
  {
    id: 3,
    name: 'Avalanche',
    image: '',
    amount: 23,
    price: 20000
  },
  {
    id: 4,
    name: '1inch',
    image: '',
    amount: 23,
    price: 20000
  },
  {
    id: 5,
    name: 'Aave',
    image: '',
    amount: 23,
    price: 20000
  },
  {
    id: 6,
    name: 'Chainlink',
    image: '',
    amount: 23,
    price: 20000
  },
  {
    id: 7,
    name: 'Usdc',
    image: '',
    amount: 23,
    price: 20000
  }
];
const AssetsCard = () => {
  return (
    <Card>
      <CardHeader title={<Typography variant="h5">Available Assets</Typography>} />
      <CardContent>
        <Stack height={250} overflow="auto" spacing={0.5} pr={0.5}>
          {data.map((item, index) => (
            <Assets key={index}/>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AssetsCard;
