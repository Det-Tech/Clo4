import { ReactElement } from 'react';

// next

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

const SignIn = () => (
  <Page title="SignIn">
    <AuthWrapper>
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Log in</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AuthLogin />
          </Grid>
      </Grid>
    </AuthWrapper>
  </Page>
);

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="auth">
    {page}</Layout>;
};

export default SignIn;
