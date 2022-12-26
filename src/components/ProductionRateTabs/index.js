import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { materialTabLists } from '../../common/Constants';
import TabsNavigation from '../../common/TabsNavigation';
import { fetchSingleOrg } from '../../features/org/orgSlice';
import { fetchProductionRate } from '../../features/productionRate/productionRateSlice';
import ProdutionRateTable from './ProductionRateTable';

// TODO include base rate row
const ProductionRateTabs = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const { org } = useSelector((state) => state.org);
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { companyId } = useParams();
  useEffect(() => {
    dispatch(
      fetchProductionRate({
        token: userDetail.token,
        id: companyId ? org.productionRates : undefined
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchSingleOrg({
        filter: {
          _id: companyId
        },
        token: userDetail.token
      })
    );
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabsNavigation value={value} handleTabChange={handleChange} tabList={materialTabLists} />
      </Box>
      <div role='tabpanel' id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`}>
        <Box sx={{ p: 3 }}>
          <Typography>
            {value === 0 ? (
              <ProdutionRateTable filterValue='Interior' />
            ) : (
              <ProdutionRateTable filterValue='Exterior' />
            )}
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default ProductionRateTabs;
