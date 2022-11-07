import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { NavigationDrawer } from '../components/navigation-drawer';
import { authSelector } from '../features/auth/authSlice';
import { fetchSingleOrg, orgSelector } from '../features/org/orgSlice';
import { companyRoutes } from '../routing/routes';

const CompanyRouteLayout = ({ isSystemAdmin }) => {
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const { org } = useSelector(orgSelector);
  const { user } = useSelector(authSelector);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (!isSystemAdmin) {
      setCompany(user.organization);
      return;
    }

    if (!org || org._id !== companyId) {
      dispatch(
        fetchSingleOrg({
          filter: {
            _id: companyId
          },
          token: user.token
        })
      );
    }
  }, []);

  useEffect(() => {
    if (isSystemAdmin) {
      setCompany(org);
    }
  }, [org]);

  if (!company) {
    return <CircularProgress />;
  }

  return (
    <NavigationDrawer
      title={company.name}
      menuItems={[...companyRoutes(isSystemAdmin ? companyId : '')]}>
      <Outlet />
    </NavigationDrawer>
  );
};

export default CompanyRouteLayout;
