import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { isSystemUser } from '../helpers/roles';

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  if (user) {
    return (
      <Navigate to={isSystemUser(user) ? '/dashboard' : `/company/${user?.organization?._id}`} />
    );
  }

  // returns child route elements
  return <Outlet />;
};

export default PublicRoute;
