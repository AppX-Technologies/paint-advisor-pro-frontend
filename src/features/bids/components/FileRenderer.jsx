/* eslint-disable */

import React from 'react';

const FileRenderer = ({ src, fileType = '' }) => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      {fileType.includes('image') ? (
        <img
          alt=''
          className='p-3 p-md-4 m-auto'
          style={{
            position: 'absolute',
            border: 'none',
            maxWidth: '100%',
            maxHeight: '100%',
            left: '25%',
            zIndex: 9,
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
            width: '93%',
            height: '93%',
            left: '50px',
            zIndex: 10,
            right: 0,
            top: '20px',
            bottom: 0,
            colorScheme: 'normal'
          }}
          src={src}></iframe>
      )}
    </div>
  );
};

export default FileRenderer;
