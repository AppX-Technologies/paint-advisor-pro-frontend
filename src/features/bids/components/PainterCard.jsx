import ClearIcon from '@mui/icons-material/Clear';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import PaidIcon from '@mui/icons-material/Paid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Grid, Tooltip } from '@mui/material';

const iconStyle = { marginBottom: '-3px', mr: 1, fontSize: '16px' };

const painterDetailFields = [
  {
    name: 'name',
    label: 'Name',
    icon: <DriveFileRenameOutlineIcon sx={iconStyle} />
  },

  {
    name: 'baseRate',
    label: 'Base Rate',
    icon: <PaidIcon sx={iconStyle} />
  },
  {
    name: 'email',
    label: 'Email',
    icon: <EmailIcon sx={iconStyle} />
  },
  {
    name: 'proficiency',
    label: 'Proficiency',
    icon: <StarBorderIcon sx={iconStyle} />
  }
];

export const PainterDetail = ({
  painter,
  addOrRemovePainter,
  selected,
  selectable = false,
  deletable = false
}) => {
  return (
    <Box sx={{ padding: '7px' }} onClick={() => selectable && addOrRemovePainter(painter)}>
      {deletable && (
        <Tooltip title='Remove' placement='top'>
          <ClearIcon
            sx={{
              float: 'right',
              marginRight: '5px',
              marginBottom: '-22px',
              color: 'red',
              fontSize: '20px',
              cursor: 'pointer'
            }}
            onClick={() => addOrRemovePainter(painter)}
          />
        </Tooltip>
      )}
      <Grid
        container
        spacing={2}
        sx={{
          padding: '5px',
          border: '1px solid lightgray',
          borderRadius: '10px',
          cursor: selectable && 'pointer',
          backgroundColor: selected ? '#e6e6e6' : ''
        }}>
        {painterDetailFields.map((field) => {
          return (
            <Grid xs={12} md={12} lg={5.8}>
              {field.icon}
              <span style={{ fontSize: '14px' }}>
                {field.label}:{' '}
                <span style={{ fontWeight: '300' }}>
                  {painter?.[field.name]} {field.name === 'baseRate' && '$ 5691'}
                </span>
              </span>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
