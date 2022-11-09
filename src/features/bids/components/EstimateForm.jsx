import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
// import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import { useEffect } from 'react';
import { estimateFields } from '../../../common/FormTextField';

export default function EstimateForm(props) {
  const { open,setOpen,estimateValue,setEstimateValue } = props;
  const [edit, setEdit] = React.useState(estimateValue && estimateValue.length !== 0);

  useEffect(()=>{
setEdit(estimateValue.length !== 0);
  },[open]);
  const handleEdit =()=>{
                    setEdit((prev) => !prev);

};
const handleClose = () => {
  setOpen(false);
};
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Estimate
          </Typography>
          <Button
            variant='outlined'
            color='success'
            style={{
              height: '30px',
              padding: '3px',
              marginRight: '10px'
            }}
            onClick={handleEdit}>
            Edit <EditIcon sx={{ height: '15px' }} />
          </Button>
          <Button
            variant='outlined'
            color='primary'
            style={{
              height: '30px',
              padding: '3px'
            }}
            onClick={handleClose}>
            Close <CloseIcon sx={{ height: '15px' }} />
          </Button>
        </Toolbar>

        <DialogContent dividers sx={{ m: 1 }}>
          <Grid container spacing={2}>
            {estimateFields.map((item) => {
              return (
                (item.dataType === 'text' && (
                  <Grid item xs={3} md={3} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>

                    <TextField
                      InputProps={{
                        style: { height: '30px' }
                      }}
                      name={item.name}
                      fullWidth
                      disabled={edit}
                      variant='outlined'
                      id='outlined-basic'
                      autoFocus
                      value={
                       estimateValue && estimateValue.find((obj) => obj.name === item.name)
                          ? estimateValue.find((obj) => obj.name === item.name).value
                          : ''
                      }
                      onChange={(event) =>
                        setEstimateValue([
                          ...estimateValue.filter((item1) => item1.name !== item.name),
                          { name: item.name, value: event.target.value }
                        ])
                      }
                    />
                  </Grid>
                )) ||
                (item.dataType === 'dropDown' && (
                  <Grid item xs={3} md={3} sx={{ marginTop: '-10px' }}>
                    <InputLabel id='demo-select-small' sx={{ fontSize: '14px' }}>
                      {item.label}
                    </InputLabel>
                    <FormControl sx={{ m: 0, minWidth: '100%' }} size='small'>
                      <Select
                        displayEmpty
                        sx={{ height: '30px' }}
                        labelId='demo-select-small'
                        id='demo-select-small'
                        name={item.name}
                        disabled={edit}
                        value={
                         estimateValue && estimateValue.find((obj) => obj.name === item.name)
                            ? estimateValue.find((obj) => obj.name === item.name).optionChoosed
                            : ''
                        }
                        onChange={(event) =>
                          setEstimateValue([
                            ...estimateValue.filter((item1) => item1.name !== item.name),
                            { name: item.name, optionChoosed: event.target.value }
                          ])
                        }
                        renderValue={
                          estimateValue.find((obj) => obj.name === item.name)
                            ? undefined
                            : () => (
                                <Typography sx={{ marginTop: '1px', fontSize: '13px' }}>
                                  Select One...
                                </Typography>
                              )
                        }>
                        {item.option.map((o) => {
                          return <MenuItem value={o}>{o}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                ))
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
