import { ReactElement } from 'react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import DashboardSection from 'sections/dashboard/DashboardSection';
import useUser from 'hooks/useUser';

// types

// assets

// ==============================|| DASHBOARD ||============================== //

const Dashboard = () => {
  const user = useUser();

  return (
    <Page title="Dashboard">
      {user && (
        <>
          <DashboardSection />
          {/* <DashboardProjectOwnerSection /> */}
        </>
      )}
    </Page>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
