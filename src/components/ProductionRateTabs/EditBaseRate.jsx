import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBaseRate } from '../../features/productionRate/productionRateSlice';
import { proffiencyTableTableFields } from '../../helpers/productionRateHelper';

export default function EditBaseRate({
  editBaseRate,
  setEditBaseRate,
  onBaseRateEditClose,
  bidType
}) {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const { baseRate } = useSelector((state) => state.productionRate);
  const [updatedBaseRate, setUpdatedBaseRate] = useState([]);
  const dispatch = useDispatch();

  const handleEdit = () => {
    const stateWithToken = {
      updatedBaseRate,
      baseRateId: baseRate[0]?._id,
      token: userDetail.token
    };
    dispatch(createBaseRate(stateWithToken));
  };
  useEffect(() => {
    if (editBaseRate) {
      const result = [];
      Object.keys(editBaseRate).forEach((x) => {
        result.push({
          bidType,
          proficiency: x,
          baseRate: editBaseRate[x]
        });
      });
      setUpdatedBaseRate([...result]);
    }
  }, [editBaseRate]);

  return (
    <Dialog open={editBaseRate !== null} onClose={onBaseRateEditClose}>
      <DialogTitle>
        <Typography sx={{ fontSize: '16px', width: '200px' }}>Edit base rate</Typography>{' '}
        <CircularProgress style={{ display: 'none' }} size={25} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ marginTop: '-15px' }}>
          {proffiencyTableTableFields.map((proff) => {
            return (
              <Grid item xs={12}>
                <TextField
                  required
                  type='number'
                  fullWidth
                  label={proff.label}
                  value={editBaseRate?.[proff.name]}
                  onChange={(e) =>
                    setEditBaseRate({ ...editBaseRate, [proff.name]: Number(e.target.value) })
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onBaseRateEditClose}>Cancel</Button>
        <Button type='submit' variant='contained' onClick={handleEdit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
