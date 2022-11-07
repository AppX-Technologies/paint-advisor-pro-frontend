import { Outlet } from 'react-router-dom';
import { NavigationDrawer } from '../components/navigation-drawer';
import { commonRoutes, systemAdminRoutes } from '../routing/routes';

const AdminRouteLayout = () => {
  return (
    <NavigationDrawer title='Admin Panel' menuItems={[...systemAdminRoutes, ...commonRoutes]}>
      <Outlet />
    </NavigationDrawer>
  );
};

export default AdminRouteLayout;
