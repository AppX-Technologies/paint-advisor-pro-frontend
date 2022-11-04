import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const PublicRouteLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PublicRouteLayout;
