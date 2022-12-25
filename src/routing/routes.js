import { Dashboard, FormatListBulleted, Logout, People } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ConstructionIcon from '@mui/icons-material/Construction';
import UsersFromCompany from '../pages/CompanyDashboard/UsersFromCompany';
import { Processes } from '../pages/Processes';
import { Pipeline as Bids } from '../features/bids';
import Materials from '../pages/Paint';
import ProductionRate from '../pages/ProductionRate';
import { Equipments } from '../pages/Equipments';

export const commonRoutes = [
  { relLink: '/profile', link: '/profile', icon: AccountCircleIcon, text: 'Profile' },
  { icon: Logout, text: 'Logout' }
];

export const systemAdminRoutes = [
  { relLink: 'dashboard', icon: Dashboard, text: 'Dashboard' },
  { relLink: 'processes', icon: FormatListBulleted, text: 'Processes' },

  {
    relLink: 'production-rates',
    icon: BarChartIcon,
    text: 'Production Rates'
  },
  { relLink: 'paint', icon: FormatColorFillIcon, text: 'Paint' },
  { relLink: 'equipments', icon: ConstructionIcon, text: 'Equipments' },
  { relLink: 'materials', icon: HomeRepairServiceIcon, text: 'Materials' }
].map((l) => ({ ...l, link: `/${l.relLink}` }));

// to-do materials

export const companyRoutes = (id) =>
  [
    { relLink: 'bids', icon: Dashboard, text: 'Bids', element: Bids },
    { relLink: 'processes', icon: FormatListBulleted, text: 'Processes', element: Processes },
    { relLink: 'users', icon: People, text: 'Users', element: UsersFromCompany },

    {
      relLink: 'production-rates',
      icon: BarChartIcon,
      text: 'Production Rates',
      element: ProductionRate
    },
    { relLink: 'paint', icon: FormatColorFillIcon, text: 'Paint', element: Materials },
    { relLink: 'equipments', icon: ConstructionIcon, text: 'Equipments', element: Equipments },
    { relLink: 'materials', icon: HomeRepairServiceIcon, text: 'Materials' }
  ].map((l) => ({ ...l, link: id ? `/${id}/${l.relLink}` : `/${l.relLink}` }));
