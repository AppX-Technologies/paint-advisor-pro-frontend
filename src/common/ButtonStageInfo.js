import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import ScheduleIcon from '@mui/icons-material/Schedule';

export const buttonStageInfo = [
  {
    name: 'new client',
    actions: [
      {
        text: 'Update Client Info',
        color: 'success',
        icon: <EditIcon sx={{ width: '20px', height: '20px', marginLeft: '13px' }} />
      },
      {
        text: 'Cancel The Job',
        color: 'error',
        icon: <DeleteIcon sx={{ width: '20px', height: '20px', marginLeft: '13px' }} />
      },
      {
        text: 'Schedule',
        color: 'info',
        icon: <ScheduleIcon sx={{ width: '20px', height: '20px', marginLeft: '13px' }} />
      },
      {
        text: 'Begin Estimate',
        color: 'warning',
        icon: <ArticleIcon sx={{ width: '20px', height: '20px', marginLeft: '13px' }} />
      }
    ]
  }
];
