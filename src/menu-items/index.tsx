// third-party
import { FormattedMessage } from 'react-intl';

// types
import { NavItemType } from 'types/menu';

// assets
import Dashboard from './icons/Dashboard';
import Help from './icons/Help';
import Portfolio from './icons/Portfolio';
import Project from './icons/Project';
// import Reward from './icons/Reward';
import Transaction from './icons/Transaction';
import Wallet from './icons/Wallet';
import SettingOutlined from './icons/SettingOutlined';

// ==============================|| MENU ITEMS - COMPONENTS ||============================== //

const menuItems: NavItemType[] = [
  {
    id: 'dashboard',
    icon: Dashboard,
    search: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'item',
    url: '/dashboard',
  },
  {
    id: 'portfolio',
    icon: Portfolio,
    search: 'portfolio',
    title: <FormattedMessage id="portfolio" />,
    type: 'item',
    url: '/',
  },
  {
    id: 'account',
    icon: Wallet,
    search: 'account',
    title: <FormattedMessage id="account" />,
    type: 'item',
    url: '/',
  },

  {
    id: 'invest',
    icon: Transaction,
    search: 'invest',
    title: <FormattedMessage id="invest" />,
    type: 'item',
    url: '/',
  },
  {
    id: 'deposit',
    icon: Project,
    search: 'deposit',
    title: <FormattedMessage id="deposit" />,
    type: 'item',
    url: '/',
  },
  {
    id: 'help',
    icon: Help,
    search: 'help',
    title: <FormattedMessage id="help" />,
    type: 'item',
    url: '/help',
  },
  // {
  //   id: 'dashboard',
  //   icon: Dashboard,
  //   search: 'dashboard',
  //   title: <FormattedMessage id="dashboard" />,
  //   type: 'item',
  //   url: '/admin/dashboard',
  // },
  // {
  //   id: 'investors',
  //   icon: TeamOutlined,
  //   search: 'investors',
  //   title: <FormattedMessage id="investors" />,
  //   type: 'item',
  //   url: '/admin/investors',
  // },
  // {
  //   id: 'project-owners',
  //   icon: UsergroupAddOutlined,
  //   search: 'project-owners',
  //   title: <FormattedMessage id="project-owners" />,
  //   type: 'item',
  //   url: '/admin/project-owners',
  // },
  // {
  //   id: 'projects',
  //   icon: Project,
  //   search: 'projects',
  //   title: <FormattedMessage id="projects" />,
  //   type: 'item',
  //   url: '/admin/projects',
  // },
  // {
  //   id: 'kyc',
  //   icon: DashboardOutlined,
  //   search: 'kyc',
  //   title: <FormattedMessage id="kyc" />,
  //   type: 'item',
  //   url: '/admin/kyc',
  // },
  // {
  //   id: 'financial-transactions',
  //   icon: Transaction,
  //   search: 'financial-transactions',
  //   title: <FormattedMessage id="financial-transactions" />,
  //   type: 'item',
  //   url: '/admin/financial-transactions',
  // },
  // {
  //   id: 'wallet-transactions',
  //   icon: Wallet,
  //   search: 'wallet-transactions',
  //   title: <FormattedMessage id="wallet-transactions" />,
  //   type: 'item',
  //   url: '/admin/wallet-transactions',
  // },
  // {
  //   id: 'project-transactions',
  //   icon: FileProtectOutlined,
  //   search: 'project-transactions',
  //   title: <FormattedMessage id="project-transactions" />,
  //   type: 'item',
  //   url: '/admin/project-transactions',
  // },
  // {
  //   id: 'rewards',
  //   icon: Reward,
  //   search: 'rewards',
  //   title: <FormattedMessage id="rewards" />,
  //   type: 'item',
  //   url: '/admin/rewards',
  // },
  // {
  //   id: 'help',
  //   icon: Help,
  //   search: 'help',
  //   title: <FormattedMessage id="help" />,
  //   type: 'item',
  //   url: '/admin/help',
  // }
  // {
  //   id: 'referral',
  //   icon: DashboardOutlined,
  //   search: 'referral',
  //   title: <FormattedMessage id="referral" />,
  //   type: 'item',
  //   url: '/admin/referral',
  // },
  {
    id: 'settings',
    icon: SettingOutlined,
    search: 'settings',
    title: <FormattedMessage id="settings" />,
    type: 'item',
    url: '/',
  }
];

export default menuItems;
