import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

export const buttonStageInfo = [
  {
    name: 'new client',
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
        text: 'Schedule',
        color: 'info',
        icon: <ScheduleIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
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
    name: 'estimate in progress',
    actions: [
      {
        text: 'Update Estimation Info',
        color: 'success',
        icon: <EditIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
      },
      {
        text: 'Cancel The Job',
        color: 'error',
        icon: <DeleteIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />
      },

      {
        text: 'Estimate Job',
        color: 'info',
        icon: <ScheduleIcon sx={{ width: '15px', height: '15px', marginLeft: '13px' }} />,
        openForm: true
      }
    ]
  }
];
