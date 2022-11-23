import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/Delete';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import {
  AppBar,
  Backdrop,
  Box,
  Dialog,
  Divider,
  IconButton,
  LinearProgress,
  Slide,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../auth/authSlice';
import { showMessage } from '../../snackbar/snackbarSlice';
import { deleteAFIle, reset } from '../bidsSlice';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='left' ref={ref} {...props} />;
});

const ViewFiles = ({
  showFilesToView,
  setShowFilesToView,
  currentClientInfo,
  setCurrentClientInfo,
  fileToDelete,
  setFileToDelete
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { isFileUploadLoading, fileDeletedSuccessfully } = useSelector((state) => state.bids);

  const deleteFile = (filename) => {
    setFileToDelete(filename);
    dispatch(deleteAFIle({ token: user.token, id: filename }));
  };

  useEffect(() => {
    if (fileDeletedSuccessfully) {
      setCurrentClientInfo({
        ...currentClientInfo,
        files: [...currentClientInfo.files.filter((file) => file.filename !== fileToDelete)]
      });
      dispatch(
        showMessage({
          message: `File Successfully Deleted`,
          severity: 'success'
        })
      );
      dispatch(reset());
      setFileToDelete(null);
    }
  }, [fileDeletedSuccessfully, fileToDelete]);

  return (
    <>
      {showFilesToView && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showFilesToView}>
          <Dialog
            fullScreen
            open={showFilesToView}
            TransitionComponent={Transition}
            style={{ width: '50%', marginLeft: 'auto' }}>
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                  Files
                </Typography>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={() => setShowFilesToView(false)}
                  aria-label='close'>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
              {isFileUploadLoading && <LinearProgress color='success' />}
            </AppBar>
            {currentClientInfo.files.length === 0 && (
              <Typography sx={{ textAlign: 'center', mt: 1, fontSize: '20px' }}>
                No Files To Show
              </Typography>
            )}
            <Box sx={{ p: 2 }}>
              {currentClientInfo.files.map((item) => {
                return (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <Box sx={{ width: '100%', display: 'flex', py: 2, cursor: 'pointer' }}>
                        <Tooltip title='View This File' placement='top'>
                          <InsertDriveFileOutlinedIcon />
                        </Tooltip>
                        <Typography sx={{ fontSize: '15px', ml: 2 }}>
                          {item.metadata.originalName}
                        </Typography>
                      </Box>
                      <Tooltip title='Delete' placement='top'>
                        <DeleteOutlinedIcon
                          sx={{
                            cursor: !isFileUploadLoading ? 'pointer' : 'default',
                            color: (theme) =>
                              !isFileUploadLoading ? theme.deleteicon.color.main : 'lightgray'
                          }}
                          onClick={() => (!isFileUploadLoading ? deleteFile(item.filename) : null)}
                        />
                      </Tooltip>
                    </Box>
                    <Divider />
                  </>
                );
              })}
            </Box>
          </Dialog>
        </Backdrop>
      )}
    </>
  );
};

export default ViewFiles;
