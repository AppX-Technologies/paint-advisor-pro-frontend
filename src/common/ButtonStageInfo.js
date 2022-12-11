import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { STATUS_ESTIMATE_IN_PROGRESS, STATUS_NEW_CLIENT } from '../helpers/contants';

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
        icon: <FolderOutlinedIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
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
      }
    ]
  }
];
