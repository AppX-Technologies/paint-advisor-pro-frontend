import { Dashboard, FormatListBulleted, People, Logout } from '@mui/icons-material';
import UsersFromCompany from '../pages/CompanyDashboard/UsersFromCompany';
import { Processes } from '../pages/Processes';
import Bids from '../features/bids/Index';

export const commonRoutes = [
  { relLink: '/profile', link: '/profile', icon: People, text: 'Profile' },
  { icon: Logout, text: 'Logout' }
];

export const systemAdminRoutes = [
  { relLink: 'dashboard', icon: Dashboard, text: 'Dashboard' },
  { relLink: 'processes', icon: FormatListBulleted, text: 'Default Processes' }
].map((l) => ({ ...l, link: `/${l.relLink}` }));

export const companyRoutes = (id) =>
  [
    { relLink: 'bids', icon: Dashboard, text: 'Bids', element: Bids },
    { relLink: 'processes', icon: FormatListBulleted, text: 'Processes', element: Processes },
    { relLink: 'users', icon: People, text: 'Users', element: UsersFromCompany }
  ].map((l) => ({ ...l, link: id ? `/${id}/${l.relLink}` : `/${l.relLink}` }));
