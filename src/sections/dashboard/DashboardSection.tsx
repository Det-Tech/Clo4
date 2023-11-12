// material-ui
import { Grid } from '@mui/material';

// project imports
import TopMovers from './TopMovers';
import Profile from 'layout/MainLayout/Header/HeaderContent/Profile';
import StatisticsCard from './StatisticsCard';
import AssetsCard from './AssetsCard';
import OutStandingCard from './OutStandingCard';
import SummaryCard from './SummaryCard';
import TradeCard from './TradeCard';
// ==============================|| INVESTOR - DASHBOARD ||============================== //

const DashboardSection = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems={'stretch'}>
            <Grid item xs={12} md={8} xl={8}>
              <TopMovers />
            </Grid>
            <Grid item xs={12} md={4} xl={4}>
              <Profile />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems={'stretch'}>
            <Grid item xs={12} md={8}>
              <StatisticsCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <AssetsCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems={'stretch'}>
            <Grid item xs={12} md={4}>
              <OutStandingCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <SummaryCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <TradeCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardSection;
