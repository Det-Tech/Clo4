import { useRef, useState } from 'react';

// next
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ButtonBase,
  capitalize,
  CardHeader,
  CardMedia,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';
import useUser from 'hooks/useUser';

// types
import { ThemeMode } from 'types/config';

// assets
import { LogoutOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //
const nofitication = 'assets/images/component/notification.png';

const Profile = () => {
  const theme = useTheme();
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });

    router.push({
      pathname: '/signin',
      query: {}
    });
  };

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <ButtonBase
        sx={{
          width: '100%',
          border: '1px solid transparent',
          background:
            theme.palette.mode === ThemeMode.DARK
              ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
              : '#2A68DF',
          borderRadius: '8px',
          my: 2,
          ml: 0.5,
          px: 1,
          py: 0.5,
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
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ p: 0.25, px: 0.75, width: '100%', justifyContent: 'space-between' }}
          >
            <Box>
              <CardHeader
                sx={{ marginLeft: '-10px' }}
                titleTypographyProps={{ variant: 'subtitle1' }}
                title={<Typography variant="h5">Hi, {user.name && capitalize(user.name)}</Typography>}
              />
              <CardMedia component="img" image={nofitication} sx={{ width: 30 }} />
            </Box>
            <Avatar alt={user.name} src={user.avatar} sx={{ width: 50, height: 50 }} />
          </Stack>
        )}
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 99999 }}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 'auto',
                background:
                  theme.palette.mode === ThemeMode.DARK
                    ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
                    : '#2A68DF',
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <div style={{ paddingLeft: '20px' }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        {user && (
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Stack>
                              <Typography variant="h6" sx={{ color: 'white' }}>
                                Sign Out
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" sx={{ color: 'white' }} onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </div>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{
          width: '100%',
          border: '1px solid transparent',
          background:
            theme.palette.mode === ThemeMode.DARK
              ? 'radial-gradient(117.73% 99.50% at 8.37% 0.00%, rgba(70, 70, 70) 0%, #141718 100%) padding-box, linear-gradient(160deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.11) 50%, rgba(255, 255, 255, 0.11) 60%, #8470FF80) border-box'
              : '#85E0A3',
          borderRadius: '8px',
          mx: 2,
          ml: 0.5,
          px: 1.5,
          py: 2,
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
    </Box>
  );
};

export default Profile;
