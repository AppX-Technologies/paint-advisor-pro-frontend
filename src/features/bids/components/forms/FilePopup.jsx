import { Download, TramSharp } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { authSelector } from '../../../auth/authSlice';
import { downloadFileFromBase64, humanFileSize, readFile } from '../../helpers/generalHepers';
import FileRenderer from '../FileRenderer';

const FilePopup = ({ file, onHide, currentClientInfo }) => {
  const { user } = useSelector(authSelector);
  const [fileHref, setFileHref] = useState();

  const getFileHREF = async () => {
    const { response, error } = await readFile({
      fileName: file.filename,
      mimeType: file.contentType,
      token: user.token,
      currentClientInfo
    });
    console.log(response, error, 'response');
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
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: 20000,
        left: 0,
        top: 0,
        overflowX: 'hidden'
      }}
      className='bg-light p-3 p-md-5 d-flex justify-content-center'>
      {!fileHref ? (
        <div className='align-self-center text-center'>
          <CircularProgress size={4} />
          <h6 className='text-muted midFont mt-3'>
            <i>Loading file ({humanFileSize(file.length)})...</i>
          </h6>
        </div>
      ) : (
        <FileRenderer fileType={file.contentType} src={fileHref} />
      )}

      <Button
        style={{
          position: 'absolute',
          right: 0,
          top: 0
        }}
        size='sm'
        className='m-2'
        onClick={() => {
          setFileHref();
          onHide();
        }}>
        <TramSharp size={18} />
      </Button>

      {fileHref && (
        <Button
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0
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
