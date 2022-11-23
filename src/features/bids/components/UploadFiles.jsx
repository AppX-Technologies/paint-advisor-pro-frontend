import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFileUpload from 'react-use-file-upload';
import { authSelector } from '../../auth/authSlice';
import Button from '../../../components/Button';
import { uploadAFile } from '../bidsSlice';
import { showMessage } from '../../snackbar/snackbarSlice';

const UploadFiles = ({ uploadedFiles, onUploadedFilesChange, currentClientInfo }) => {
  const { files, handleDragDropEvent, setFiles } = useFileUpload();
  const { user } = useSelector(authSelector);
  const { isFileUploadLoading } = useSelector((state) => state.bids);

  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const newFiles = [];
    files.forEach((f) => {
      const fileToBeUploaded = { file: f, status: 'WAITING_FOR_UPLOAD', id: Date.now().toString() };
      newFiles.push(fileToBeUploaded);
    });
    if (onUploadedFilesChange) {
      onUploadedFilesChange([...uploadedFiles, ...newFiles]);
    }
  }, [files]);

  const updateUploadedFiles = (fileObject, status, response = {}) => {
    uploadedFiles = uploadedFiles.map((f) =>
      f.id === fileObject.id ? { ...f, ...response, status } : f
    );
    if (onUploadedFilesChange) {
      onUploadedFilesChange(uploadedFiles);
    }
  };

  const uploadFile = async (fileToBeUploaded) => {
    updateUploadedFiles(fileToBeUploaded, 'UPLOADING');
    const formData = new FormData();
    formData.append('file', fileToBeUploaded.file);
    const { error, data } = await axios({
      method: 'post',
      url: 'https://painting-app-backend.herokuapp.com/api/files',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`
      }
    });
    if (error) {
      updateUploadedFiles(fileToBeUploaded, 'ERROR');
    } else {
      updateUploadedFiles(fileToBeUploaded, 'UPLOADED', data);
    }
  };
  useEffect(() => {
    uploadedFiles.filter((f) => f.status === 'WAITING_FOR_UPLOAD').forEach(uploadFile);
  }, [uploadedFiles]);

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const FileButton = ({ fileObject, onRemoveFile }) => (
    <Chip
      sx={{ mx: 0.5 }}
      label={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px' }}>{fileObject.file.name}</Typography>
          {fileObject.status === 'UPLOADING' && <CircularProgress size={10} sx={{ ml: 1 }} />}
          {fileObject.status === 'UPLOADED' && <CheckCircleIcon sx={{ fontSize: '15px', ml: 1 }} />}
          {fileObject.status === 'ERROR' && <ErrorIcon sx={{ fontSize: '15px', ml: 1 }} />}
        </Box>
      }
      size='small'
      variant='outlined'
      onClick={handleClick}
      color='success'
    />
  );

  const handleFilesSave = () => {
    if (uploadedFiles.some((f) => f.status === 'ERROR')) {
      return dispatch(
        showMessage({
          message: `One or more files have failed uploading, please discard these files and try again!`,
          severity: 'success'
        })
      );
    }

    if (uploadedFiles.some((f) => f.status !== 'UPLOADED')) {
      return dispatch(
        showMessage({
          message: `Some of the files are still uploading to the server, please try again in a moment!`,
          severity: 'error'
        })
      );
    }
    dispatch(uploadAFile({ files: uploadedFiles, token: user.token, currentClientInfo }));
  };

  return (
    <>
      <Typography ml={3}>Upload Files</Typography>
      <Box sx={{ my: 2, ml: 2 }}>
        {uploadedFiles &&
          uploadedFiles.map((file) => {
            return <FileButton fileObject={file} />;
          })}
      </Box>
      <input
        type='file'
        name=''
        id='file-upload'
        hidden
        onChange={(e) => {
          setFiles(e);
          inputRef.current.value = null;
        }}
      />
      <label htmlFor='file-upload'>
        <Box
          bgcolor='white'
          sx={{
            border: '1px solid lightgray',
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          ml={1}
          mt={1}>
          <Box
            onDragEnter={handleDragDropEvent}
            onDragOver={handleDragDropEvent}
            onDrop={(e) => {
              handleDragDropEvent(e);
              setFiles(e);
            }}
            onClick={() => inputRef.current.click()}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <CloudUploadOutlinedIcon sx={{ width: '50px', height: '50px' }} />
            <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>
              Click Or Drag And Drop Files Here
            </Typography>
          </Box>
        </Box>
      </label>
      {uploadedFiles.length > 0 && (
        <Box mb={2} sx={{ mr: 'auto', float: 'right' }}>
          <Button
            variant='contained'
            color='error'
            sx={{ p: 0, my: 1 }}
            onClick={handleFilesSave}
            disaabled={uploadedFiles[uploadedFiles.length - 1].status === 'UPLOADING'}>
            Save {isFileUploadLoading && <CircularProgress size={10} />}
          </Button>
        </Box>
      )}
    </>
  );
};

export default UploadFiles;
