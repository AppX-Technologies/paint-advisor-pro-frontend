import ArticleIcon from '@mui/icons-material/Article';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {
  STATUS_ESTIMATE_IN_PROGRESS,
  STATUS_IN_REVIEW,
  STATUS_NEW_CLIENT
} from '../helpers/contants';

export const buttonStageInfo = [
  {
    name: STATUS_NEW_CLIENT,
    actions: [
      {
        text: 'View Files',
        color: 'warning',
        icon: <FolderOutlinedIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      },
      {
        text: 'Cancel The Job',
        color: 'error',
        icon: <DeleteIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
      },
      {
        text: 'Schedule',
        color: 'info',
        icon: <ScheduleIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      },
      {
        text: 'Update Scheduled Job',
        color: 'info',
        icon: <EditIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      },
      {
        text: 'Begin Estimate',
        color: 'warning',
        icon: <ArticleIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />,
        nextState: true
      }
    ]
  },
  {
    name: STATUS_ESTIMATE_IN_PROGRESS,
    actions: [
      {
        text: 'View Files',
        color: 'warning',
        icon: <FolderOutlinedIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      },
      {
        text: 'Cancel The Job',
        color: 'error',
        icon: <DeleteIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
      },

      {
        text: 'Update Estimation Info',
        color: 'success',
        icon: <EditIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
      },
      {
        text: 'Send For Review',
        color: 'info',
        icon: <PreviewIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      }
    ]
  },
  {
    name: STATUS_IN_REVIEW,
    actions: [
      {
        text: 'View Files',
        color: 'warning',
        icon: <FolderOutlinedIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      },
      {
        text: 'Cancel The Job',
        color: 'error',
        icon: <DeleteIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
      },

      {
        text: 'Update Estimation Info',
        color: 'success',
        icon: <EditIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
      },
      {
        text: 'Accept Contract',
        color: 'success',
        icon: <CheckIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      },
      {
        text: 'Reject Contract',
        color: 'error',
        icon: <ClearIcon sx={{ width: '15px', height: '15px', marginRight: '7px' }} />
      }
    ]
  }
];
