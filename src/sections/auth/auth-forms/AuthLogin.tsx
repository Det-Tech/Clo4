import React from 'react';

// next
import NextLink from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// import ReCAPTCHA from 'react-google-recaptcha-enterprise';

// project import
// import { APP_DEFAULT_PATH } from 'config';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Google = '/assets/images/icons/google.svg';
const Twitter = '/assets/images/icons/twitter.svg';


// ============================|| SIGNIN ||============================ //

const AuthLogin = ({ providers, csrfToken }: any) => {
  // const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [capsWarning, setCapsWarning] = React.useState(false);
  // @ts-ignore
  const [captchaChecked, toggleCaptchaChecked] = React.useState<boolean>(true);
  const router = useRouter();

  // const onCaptchaChange = (token: string | null) => {
  //   toggleCaptchaChecked(token !== null);
  // };

  const { data: session } = useSession();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          if (captchaChecked) {
            signIn('signin', {
              redirect: false,
              email: values.email,
              password: values.password
            }).then((res: any) => {
              if (res?.error) {
                if (res.error === 'email not verified') {
                  router.push('/verify-email');
                } else {
                  setErrors({ submit: res.error });
                  setSubmitting(false);
                }
              } else {
                // router.push('/verify-otp');
                router.push('/');
              }
            });
          } else {
            setErrors({ submit: 'ReCAPTCHA not passed' });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  {/* <InputLabel htmlFor="email-login">Email Address</InputLabel> */}
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="User name"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  {/* <InputLabel htmlFor="password-login">Password</InputLabel> */}
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={(event: React.FocusEvent<any, Element>) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Password"
                  />
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                      Caps lock on!
                    </Typography>
                  )}
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* <Grid item xs={12} sx={{ mt: -1 }}>
                <ReCAPTCHA size="normal" sitekey="6LfVVqknAAAAADD-a4pkt9ZwBybJRddi0liTtyzJ" onChange={onCaptchaChange} />
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <NextLink href={session ? '/auth/forgot-password' : '/forgot-password'} passHref legacyBehavior>
                  <Link variant="h6" color="text.primary">
                    Forgot Password?
                  </Link>
                </NextLink>
              </Grid>
              <Grid item xs={12} md={6}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Log In
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <AnimateButton>
                  <Button disableElevation fullWidth size="large" onClick={()=>router.push("/signup")} variant="contained" color="success">
                    Sign up
                  </Button>
                </AnimateButton>
              </Grid>              
            </Grid>
          </form>
        )}
      </Formik>
      <Divider sx={{ my: 2 }}>
        <Typography variant="caption"> Log in with</Typography>
      </Divider>
      <Box sx={{ width: '100%' }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth={true}
          sx={{ my: 2 }}
          startIcon={<NextImage src={Google} alt="Google" width={16} height={16} />}
          onClick={() => signIn('google', { redirect: false })}
        >
          {'Google'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth={true}
          startIcon={<NextImage src={Twitter} alt="Twitter" width={16} height={16} />}
          onClick={() => signIn('twitter', { redirect: false })}
        >
          {'Twitter'}
        </Button>
      </Box>
    </>
  );
};

export default AuthLogin;
