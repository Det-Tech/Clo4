import { useState } from 'react';

// material-ui
import { Box, Card, CardMedia, CircularProgress, IconButton, Stack, Tooltip, Typography } from '@mui/material';

// assets
import { SyncOutlined } from '@ant-design/icons';

// project imports
import { useCurrentBalance } from 'hooks/useCurrentBalance';
// import numberFormat from 'utils/numberFormat';
// ==============================|| FINANCIAL CARD ||============================== //

const crypt_graph = 'assets/images/crypto/graph.png';

const MoverCard = ({ item }: any) => {
  // @ts-ignore
  const [open, setOpen] = useState<boolean>(false);
  // @ts-ignore
  const { balance, isLoading, refresh } = useCurrentBalance();

  const handleRefresh = () => {
    refresh();
  };

  return (
    <Card
      style={{
        background: 'linear-gradient(128deg, #3E2C9CE0 0%, #77CFE0B0 100%)',
        backgroundSize: '150%, 150%',
        backgroundPosition: '50%',
        height: '120px',
        minWidth: '150px'
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          height: '100%'
        }}
        sx={{ padding: { md: '12px', xs: '12px 6px' } }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <CardMedia component="img" image={item.image} sx={{ width: '24px', height: '24px', aspectRatio: 1 }} />
            <Typography variant="h5" color="whitesmoke">
              {item.title}
              <br />$ {item?.balance}
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Refresh">
              {!isLoading ? (
                <IconButton style={{ borderRadius: '100px', color: 'white' }} onClick={handleRefresh}>
                  <SyncOutlined />
                </IconButton>
              ) : (
                <IconButton style={{ borderRadius: '100px', color: 'white' }}>
                  <CircularProgress size={18} color="inherit" />
                </IconButton>
              )}
            </Tooltip>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <CardMedia component="img" image={crypt_graph} sx={{ width: '90%' }} />
          <Typography variant="h5" color="red" sx={{ position: 'absolute', bottom: 30, right: 10 }}>
            {item.percent}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
};

export default MoverCard;
