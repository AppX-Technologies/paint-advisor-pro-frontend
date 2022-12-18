import { Dashboard, FormatListBulleted, Logout, People } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import UsersFromCompany from '../pages/CompanyDashboard/UsersFromCompany';
import { Processes } from '../pages/Processes';
import { Pipeline as Bids } from '../features/bids';
import Materials from '../pages/Materials';
import ProductionRate from '../pages/ProductionRate';

export const commonRoutes = [
  { relLink: '/profile', link: '/profile', icon: AccountCircleIcon, text: 'Profile' },
  { icon: Logout, text: 'Logout' }
];

export const systemAdminRoutes = [
  { relLink: 'dashboard', icon: Dashboard, text: 'Dashboard' },
  { relLink: 'processes', icon: FormatListBulleted, text: 'Processes' },
  { relLink: 'materials', icon: FormatColorFillIcon, text: 'Materials' },
  {
    relLink: 'production-rates',
    icon: BarChartIcon,
    text: 'Production Rates'
  }
].map((l) => ({ ...l, link: `/${l.relLink}` }));

// to-do materials

export const companyRoutes = (id) =>
  [
    { relLink: 'bids', icon: Dashboard, text: 'Bids', element: Bids },
    { relLink: 'processes', icon: FormatListBulleted, text: 'Processes', element: Processes },
    { relLink: 'users', icon: People, text: 'Users', element: UsersFromCompany },
    { relLink: 'materials', icon: FormatColorFillIcon, text: 'Materials', element: Materials },
    {
      relLink: 'production-rates',
      icon: BarChartIcon,
      text: 'Production Rates',
      element: ProductionRate
    }
  ].map((l) => ({ ...l, link: id ? `/${id}/${l.relLink}` : `/${l.relLink}` }));
