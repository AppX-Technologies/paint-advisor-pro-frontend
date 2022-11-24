import React from 'react';

const FileRenderer = ({ src, fileType = '' }) => {
  return fileType.includes('image') ? (
    <img
      className='p-3 p-md-4 m-auto'
      alt='jkenk'
      style={{
        position: 'absolute',
        border: 'none',
        maxWidth: '100%',
        maxHeight: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }}
      src={src}
    />
  ) : (
    <iframe
      allowFullScreen
      className='p-3 p-md-4'
      title='File__Renderer'
      style={{
        position: 'absolute',
        border: 'none',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        colorScheme: 'normal'
      }}
      src={src}
    />
  );
};

export default FileRenderer;
