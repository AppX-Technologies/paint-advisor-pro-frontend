import { CircularProgress, Grid, Slider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { startCase } from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductionRate } from '../../features/productionRate/productionRateSlice';

export default function EditIndividualPainterProductionR({ editState, setEditState, onEditClose }) {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [updatedProductionRateList, setUpdatedProductionRateList] = React.useState([]);
  const { productionRateList } = useSelector((state) => state.productionRate);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (editState) {
      const ids = Object.keys(editState.id);
      const result = [
        ...productionRateList[0].productionRates.filter(
          (x) => !ids.map((i) => editState.id[i]).includes(x._id)
        )
      ];
      ids.forEach((i) => {
        result.push({
          bidType: editState.bidType,
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
          500{' '}
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
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '12px', width: '140px' }}>
              Beginner: {editState?.beginner}{' '}
              <span style={{ fontSize: '10px' }}>
                ft<sup>2</sup>/hr
              </span>
            </Typography>
            <Slider
              value={editState?.beginner}
              min={5}
              step={5}
              max={500}
              marks={marks}
              valueLabelDisplay='auto'
              onChange={(e) => setEditState({ ...editState, beginner: e.target.value })}
            />
          </Grid>{' '}
          <Grid item xs={12} sx={{ marginTop: '-30px' }}>
            <Typography sx={{ fontSize: '12px', width: '140px' }}>
              Intermediate: {editState?.intermediate}{' '}
              <span style={{ fontSize: '10px' }}>
                ft<sup>2</sup>/hr
              </span>
            </Typography>
            <Slider
              value={editState?.intermediate}
              min={5}
              step={5}
              max={500}
              marks={marks}
              valueLabelDisplay='auto'
              onChange={(e) => setEditState({ ...editState, intermediate: e.target.value })}
            />
          </Grid>{' '}
          <Grid item xs={12} sx={{ marginTop: '-30px' }}>
            <Typography sx={{ fontSize: '12px', width: '140px' }}>
              Proficient: {editState?.proficient}{' '}
              <span style={{ fontSize: '10px' }}>
                ft<sup>2</sup>/hr
              </span>
            </Typography>
            <Slider
              value={editState?.proficient}
              min={5}
              step={5}
              max={500}
              marks={marks}
              valueLabelDisplay='auto'
              onChange={(e) => setEditState({ ...editState, proficient: e.target.value })}
            />
          </Grid>
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
