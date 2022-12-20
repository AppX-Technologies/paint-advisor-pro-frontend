import { Download } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { authSelector } from '../../../auth/authSlice';
import { downloadFileFromBase64, humanFileSize, readFile } from '../../helpers/generalHepers';
import FileRenderer from '../FileRenderer';

const FilePopup = ({ file, onHide }) => {
  const { user } = useSelector(authSelector);
  const [fileHref, setFileHref] = useState();

  const getFileHREF = async () => {
    const { response, error } = await readFile({
      fileName: file.filename,
      mimeType: file.contentType,
      token: user.token
    });
    if (response) {
      setFileHref(response);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) getFileHREF();
  }, [file]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        zIndex: 2000,
        left: 0,
        top: 0,
        overflowX: 'hidden',
        backgroundColor: 'white'
      }}
      className='bg-primary p-3 p-md-5 d-flex justify-content-center'>
      {!fileHref ? (
        <div
          className='align-self-center text-center'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            height: '100vh',
            flexDirection: 'column'
          }}>
          <CircularProgress size={40} />
          <Typography sx={{ ml: 2, mt: 2 }}>
            <i>Loading file ({humanFileSize(file.length)})...</i>
          </Typography>
        </div>
      ) : (
        <FileRenderer fileType={file.contentType} src={fileHref} />
      )}
      <Tooltip title='Cancel'>
        <Box
          sx={{
            width: '30px',
            height: '30px',
            position: 'absolute',
            right: 25,
            top: 5,
            zIndex: 3000,
            borderRadius: '20px',
            backgroundColor: (theme) => theme.deleteicon.color.main
          }}>
          <CloseIcon
            sx={{
              cursor: 'pointer',
              width: '30px',
              height: '30px',
              color: 'white'
            }}
            className='m-2'
            onClick={() => {
              setFileHref();
              onHide();
            }}
          />
        </Box>
      </Tooltip>

      {fileHref && (
        <Button
          style={{
            position: 'absolute',
            right: 20,
            bottom: 20,
            zIndex: 3000
          }}
          size='sm'
          className='m-2'
          onClick={() => {
            downloadFileFromBase64({
              data: fileHref,
              fileName:
                file.metadata && file.metadata.originalName
                  ? file.metadata.originalName
                  : file.filename
            });
          }}>
          <Download size={18} />
          <span className='align-middle ml-2'>Download</span>
        </Button>
      )}
    </div>
  );
};

export default FilePopup;
