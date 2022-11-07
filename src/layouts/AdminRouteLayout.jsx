import { Outlet } from 'react-router-dom';
import { NavigationDrawer } from '../components/navigation-drawer';
import { systemAdminRoutes } from '../routing/routes';

const AdminRouteLayout = () => {
  return (
    <NavigationDrawer title='Admin Panel' menuItems={systemAdminRoutes}>
      <Outlet />
    </NavigationDrawer>
  );
};

export default AdminRouteLayout;
