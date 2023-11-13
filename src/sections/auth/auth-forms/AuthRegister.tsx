import React, { useEffect } from 'react';

// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
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
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// import ReCAPTCHA from 'react-google-recaptcha-enterprise';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// thirdweb
import { Goerli } from "@thirdweb-dev/chains";
import {
  useAddress,
  useConnect,
} from "@thirdweb-dev/react";
import { LocalWallet } from "@thirdweb-dev/wallets";
import { smartWalletConfig } from "./../../../pages/_app";

const Google = '/assets/images/icons/google.svg';
const Twitter = '/assets/images/icons/twitter.svg';

// ============================|| SIGN UP ||============================ //

let wallet_address = "";

const AuthRegister = ({ providers, csrfToken }: any) => {
  const connect = useConnect();
  const router = useRouter();
  const address = useAddress();

  const loadLocalWalletAndConnect = async () => {
    try {
      const personalWallet = new LocalWallet({
        chain: Goerli,
      });

      await personalWallet.loadOrCreate({
        strategy: "encryptedJson",
        password: "password",
      });
      await connect(smartWalletConfig, {
        personalWallet: personalWallet,
      });
      
      console.log("smartWalletConfig");
      return {walletData: localStorage.getItem("__TW__/localWallet/localWalletData")}
    } catch (e) {
      console.log(e)
    }
  };

  // const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  // @ts-ignore
  const [captchaChecked, toggleCaptchaChecked] = React.useState<boolean>(true);

  const handleClickShowPassword = () => {
    setShowPassword((_v) => !_v);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((_v) => !_v);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const delay = (milliseconds: any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  useEffect(()=>{
    if(address){
      wallet_address = address;
    }
  }, [address])

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          referralCode: '',
          role: 'investor',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(255).required('First name is required'),
          lastName: Yup.string().max(255).required('Last name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          confirmPassword: Yup.string()
            .max(255)
            .required('Confirm password is required')
            .when(['password'], (password, schema) => schema.equals(password, 'The two passwords that you entered do not match!'))
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
            loadLocalWalletAndConnect().then(async(data: any) =>{
              await delay(1000);
              signIn('signup', {
                redirect: false,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                walletData: data?.walletData,
                wallet: wallet_address
              }).then((res: any) => {
                if (res?.error) {
                  try {
                    const mappedErrors: any[] = JSON.parse(res.error);
                    const errors: any = {};
                    mappedErrors.forEach((error) => (errors[error.path[0]] = error.message));
                    setErrors({ ...errors });
                    setSubmitting(false);
                  } catch (e) {
                    setErrors({ submit: res.error });
                    setSubmitting(false);
                  }
                } else {
                  setSubmitting(false);
                  router.push('/verify-email');
                }
              })
              
            }).catch(err=>{});
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="firstName-login">First Name</InputLabel>
                      <OutlinedInput
                        id="firstName-login"
                        type="text"
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        fullWidth
                        error={Boolean(touched.firstName && errors.firstName)}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormHelperText error id="standard-weight-helper-text-firstName-login">
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="lastName-login">Last Name</InputLabel>
                      <OutlinedInput
                        id="lastName-login"
                        type="text"
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        fullWidth
                        error={Boolean(touched.lastName && errors.lastName)}
                      />
                      {touched.lastName && errors.lastName && (
                        <FormHelperText error id="standard-weight-helper-text-name-login">
                          {errors.lastName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
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
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
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
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirmpassword-login">Confirm Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    id="-confirm-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Reenter password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="standard-weight-helper-text-confirmpassword-login">
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <NextLink href="/" passHref legacyBehavior>
                    <Link variant="subtitle2">Terms of Service</Link>
                  </NextLink>
                  &nbsp; and &nbsp;
                  <NextLink href="/" passHref legacyBehavior>
                    <Link variant="subtitle2">Privacy Policy</Link>
                  </NextLink>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Divider sx={{ my: 2 }}>
        <Typography variant="caption"> Sign up with</Typography>
      </Divider>
      <Box sx={{ width: '100%' }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth={true}
          sx={{ my: 2 }}
          startIcon={<NextImage src={Google} alt="Twitter" width={16} height={16} />}
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

export default AuthRegister;
