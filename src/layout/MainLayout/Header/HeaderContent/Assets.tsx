import { useRef, useState } from 'react';

// next
import { useRouter } from 'next/router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Typography } from '@mui/material';

// project import
import useUser from 'hooks/useUser';

// types
import { ThemeMode } from 'types/config';

// ==============================|| HEADER CONTENT - ASSETS ||============================== //

const Assets = () => {
  const theme = useTheme();
  const user = useUser();
  // @ts-ignore
  const router = useRouter();

  
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box
      sx={{
        width: '90%',
        p: 0.25,
        border: '1px solid transparent',
        background:
          theme.palette.mode === ThemeMode.DARK
            ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
            : '#2A68DF',
        borderRadius: '8px',
        mx: 2,
        // width: '228px',
        px: 1.5,
        py: 2,
        justifyContent: 'start',
        '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter' },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.secondary.dark}`,
          outlineOffset: 2
        }
      }}
      aria-label="open profile"
      ref={anchorRef}
      aria-controls={open ? 'profile-grow' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      {user && (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 0.25, px: 0.75, width: '100%', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              Net workth:
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              {'$100, 000, 000'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              Available:
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              {'$100, 000, 000'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              Staked:
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '11px' }} textAlign="left">
              {'$100, 000, 000'}
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Assets;
