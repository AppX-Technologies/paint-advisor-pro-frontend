/* eslint-disable */

import React from 'react';

const FileRenderer = ({ src, fileType = '' }) => {
  console.log(fileType);
  return (
    <>
      {fileType.includes('image') ? (
        <img
          alt=''
          className='p-3 p-md-4 m-auto'
          style={{
            position: 'absolute',
            border: 'none',
            maxWidth: '100%',
            maxHeight: '100%',
            left: 0,
            zIndex: 999900,
            right: 0,
            top: 0,
            bottom: 0
          }}
          src={src}
        />
      ) : (
        <iframe
          allowFullScreen={true}
          className='p-3 p-md-4'
          style={{
            position: 'absolute',
            border: 'none',
            width: '100%',
            height: '100%',
            left: 0,
            zIndex: 999900,
            right: 0,
            top: 0,
            bottom: 0,
            colorScheme: 'normal'
          }}
          src={src}></iframe>
      )}
    </>
  );
};

export default FileRenderer;
