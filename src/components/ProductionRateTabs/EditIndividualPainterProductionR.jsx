import { CircularProgress, Grid, Slider, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductionRate } from '../../features/productionRate/productionRateSlice';
import { proffiencyTableTableFields } from '../../helpers/productionRateHelper';

export default function EditIndividualPainterProductionR({
  editState,
  setEditState,
  onEditClose,
  bidType
}) {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { productionRateList } = useSelector((state) => state.productionRate);
  const [updatedProductionRateList, setUpdatedProductionRateList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editState) {
      const ids = Object.keys(editState.id);
      const result = [
        ...productionRateList[0].productionRates.filter(
          (x) => !ids.map((i) => editState.id[i]).includes(x._id)
        )
      ];
      ids.forEach((i) => {
        result.push({
          bidType,
          appliesTo: editState.appliesTo,
          appliesToType: editState.appliesToType,
          proficiency: i,
          productionRate: editState[i.toLowerCase()]
        });
      });
      setUpdatedProductionRateList([...result]);
    }
  }, [editState]);

  const handleEdit = () => {
    const stateWithToken = {
      updatedProductionRateList,
      productionRateId: productionRateList[0]._id,
      token: userDetail.token
    };
    dispatch(createProductionRate(stateWithToken));
    setEditState(null);
  };

  const marks = [
    {
      value: 5,
      label: (
        <Typography sx={{ fontSize: '10px', ml: 4, marginTop: '-5px' }}>
          5{' '}
          <span style={{ fontSize: '8px' }}>
            ft<sup>2</sup>/hr
          </span>
        </Typography>
      )
    },

    {
      value: 250,
      label: (
        <Typography sx={{ fontSize: '10px', ml: 4, marginTop: '-5px' }}>
          250{' '}
          <span style={{ fontSize: '8px' }}>
            ft<sup>2</sup>/hr
          </span>
        </Typography>
      )
    },

    {
      value: 500,
      label: (
        <Typography sx={{ fontSize: '10px', marginLeft: '-10px', marginTop: '-5px' }}>
          500
          <span style={{ fontSize: '8px' }}>
            ft<sup>2</sup>/hr
          </span>
        </Typography>
      )
    }
  ];
  return (
    <Dialog open={editState !== null} onClose={onEditClose}>
      <DialogTitle>
        <Typography sx={{ fontSize: '14px', width: '200px' }}>
          {startCase(editState?.appliesTo)} ({editState?.appliesToType})
        </Typography>{' '}
        <CircularProgress style={{ display: 'none' }} size={25} />
      </DialogTitle>
      <DialogContent sx={{ marginTop: '-15px' }}>
        <Grid container spacing={3} sx={{ marginTop: '-15px' }}>
          {proffiencyTableTableFields.map((proff) => {
            return (
              <Grid item xs={12}>
                <Typography sx={{ fontSize: '12px', width: '140px' }}>
                  {proff.label}: {editState?.[proff.name]}
                  {editState?.[proff.name] !== 'N/A' && (
                    <span style={{ fontSize: '10px' }}>
                      {' '}
                      ft<sup>2</sup>/hr
                    </span>
                  )}
                </Typography>
                <Slider
                  value={editState?.[proff.name]}
                  min={5}
                  step={5}
                  max={500}
                  marks={marks}
                  valueLabelDisplay='auto'
                  onChange={(e) => setEditState({ ...editState, [proff.name]: e.target.value })}
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onEditClose}>Cancel</Button>
        <Button type='submit' variant='contained' onClick={() => handleEdit()}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
