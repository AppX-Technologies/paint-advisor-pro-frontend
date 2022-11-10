import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { InteriorManByManFormFields } from '../../../../../common/FormTextField';
import AddRoomForm from './AddRoomForm';

const InteriorManByMan = () => {
  const [addRoom, setAddRoom] = useState(false);
  return (
    <Box>
     
      {/* Main Form Body  */}
      
      <Box>
        <Tooltip title='Add Room' placement='top'>
          <Button
            sx={{ marginTop: '20px', height: '30px', p: 0 }}
            variant='contained'
            startIcon={<AddIcon sx={{ ml: 1 }} />}
            color='info'
            onClick={() => setAddRoom(true)}
          />
        </Tooltip>
      </Box>
      <AddRoomForm open={addRoom} setOpen={setAddRoom} />
    </Box>
  );
};

export default InteriorManByMan;
