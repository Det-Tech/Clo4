import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, CardMedia, Dialog, DialogContent, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// next
import Image from 'next/image';

// third party

// import { enqueueSnackbar } from 'notistack';

type DepositDialogProps = {
  open: boolean;
  handleClose: () => void;
};

export default function DepositDialog({ open, handleClose: onClose }: DepositDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (open) {
      setStep(0);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      sx={{
        justifyContent: 'center',
        '& .MuiPaper-root': {
          borderRadius: '10px',
          width: 'max-content',
          height: 'max-content'
        }
      }}
      aria-labelledby="deposit-dialog-title"
      title="Deposit"
    >
      <Box sx={{ px: 2, py: 1.5, minWidth: '400px' }}>
        <Typography variant="h2" my={1} align="center">
          {step === 0 && 'Please choose:'}
          {step === 2 && 'Select Assets:'}
          {step === 3 && 'Deposit:'}
        </Typography>
        {step === 0 && (
          <>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  onClick={() => setStep(1)}
                  style={{ width: 150, height: 110 }}
                  sx={{
                    background: '#182B1E',
                    borderRadius: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Stack direction="column" justifyContent={'center'} alignItems={'center'} alignSelf={'center'}>
                    <Typography fontWeight="bold">Deposit Fiat</Typography>
                    <Image src="/images/visa_icon.png" alt="visa" width={43} height={44} />
                  </Stack>
                </Button>

                <Button
                  onClick={() => setStep(2)}
                  style={{ width: 150, height: 110 }}
                  sx={{
                    background: '#182B1E',
                    borderRadius: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Stack direction="column" justifyContent={'center'} alignItems={'center'} alignSelf={'center'}>
                    <Typography fontWeight="bold">Deposit Crypto</Typography>
                    <Image src="/images/usdt_icon.png" alt="visa" width={132} height={41} />
                  </Stack>
                </Button>
              </Stack>
            </DialogContent>
          </>
        )}

        {step === 1 && <>
          <iframe
            style={{borderRadius: "4px", border: "1px solid #58585f", margin: "auto",maxWidth: "420px"}}
            src="https://buy.onramper.com"
            height="330px"
            width="420px"
            title="Clo4"
            allow="accelerometer; autoplay; camera; gyroscope; payment">
          </iframe>
        </>}

        {step === 2 && (
          <>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center', maxHeight: 300 }}>
              <List
                sx={{ width: '100%', maxWidth: 260, height: '100%', bgcolor: 'background.paper', borderRadius: '10px' }}
                aria-label="contacts"
              >
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <ListItem disablePadding key={index}>
                    <ListItemButton sx={{ gap: '10px' }} onClick={() => setStep(3)}>
                      <ListItemIcon>
                        <CardMedia
                          component="img"
                          image={'assets/images/crypto/bitcoin.png'}
                          sx={{ width: '24px', height: '24px', aspectRatio: 1 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="wBitCoin" />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </>
        )}

        {step === 3 && (
          <>
            <DialogContent
              sx={{
                border: '1px solid #000',
                borderRadius: '10px'
              }}
            >
              <Stack direction="column" spacing={2} mt={1}>
                <Stack direction="row" justifyContent={'center'} textAlign={'center'}>
                  <Image src="/assets/images/icons/polygon.png" width={30} height={30} alt="polygon" />
                  <Typography fontWeight="bold" sx={{ alignItems: 'center', display: 'flex' }}>
                    Polygon
                  </Typography>
                </Stack>
                <Stack direction="row" gap={2} sx={{ width: '100%', justifyContent: 'space-between' }}>
                  <Button
                    onClick={() => setStep(0)}
                    style={{ height: 70 }}
                    sx={{
                      border: '1px solid #000',
                      background: 'white',
                      borderRadius: '10px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      textAlign: 'center'
                    }}
                    title="Deposit address"
                  >
                    <Stack direction="column" justifyContent={'center'} alignItems={'center'} alignSelf={'center'}>
                      <Typography fontWeight="bold">Deposit address</Typography>
                      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{'0x645hksgn8j949345jhrl8'}</Typography>
                    </Stack>
                  </Button>
                  <Button
                    onClick={() => setStep(0)}
                    style={{ height: 70 }}
                    sx={{
                      border: '1px solid #000',
                      background: 'white',
                      borderRadius: '10px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      textAlign: 'center'
                    }}
                    title="Copy"
                  >
                    <Image src="/assets/images/icons/copy.png" alt="copy" width={43} height={44} />
                  </Button>
                  <Button
                    onClick={() => setStep(0)}
                    style={{ height: 70 }}
                    sx={{
                      border: '1px solid #000',
                      background: 'white',
                      borderRadius: '10px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      textAlign: 'center'
                    }}
                    title="Qrcode"
                  >
                    <Image src="/assets/images/icons/copy.png" alt="visa" width={43} height={44} />
                  </Button>
                </Stack>
                <Button
                  fullWidth
                  onClick={() => setStep(0)}
                  sx={{
                    border: '1px solid #000',
                    background: '#04F280',
                    borderRadius: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    textAlign: 'center'
                  }}
                  title="Share"
                >
                  <Typography fontWeight="bold" color={'black'}>
                    Share details
                  </Typography>
                </Button>
              </Stack>
            </DialogContent>
          </>
        )}
      </Box>
    </Dialog>
  );
}
