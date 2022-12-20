// import { Button, CircularProgress } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { humanFileSize } from '../helpers/utlis';
// import FileRenderer from './FileRenderer';

// const FileViewer = ({ file, onHide }) => {
//   const [fileHref, setFileHref] = useState();
//   const dispatch = useDispatch();

//   const getFileHREF = async () => {
//     const { response, error } = await readFile({
//       fileName: file.filename,
//       mimeType: file.contentType
//     });
//     if (response) {
//       setFileHref(response);
//     } else {
//     }
//   };

//   useEffect(() => {
//     if (file) getFileHREF();
//   }, [file]);
//   return (
//     <>
//       <div
//         style={{
//           height: '100%',
//           width: '100%',
//           position: 'fixed',
//           zIndex: 20000,
//           left: 0,
//           top: 0,
//           overflowX: 'hidden'
//         }}
//         className='bg-light p-3 p-md-5 d-flex justify-content-center'>
//         {!fileHref ? (
//           <div className='align-self-center text-center'>
//             <CircularProgress size={4} />
//             <h6 className='text-muted midFont mt-3'>
//               <i>Loading file ({humanFileSize(file.length)})...</i>
//             </h6>
//           </div>
//         ) : (
//           <FileRenderer fileType={file.contentType} src={fileHref} />
//         )}

//         <Button
//           style={{
//             position: 'absolute',
//             right: 0,
//             top: 0
//           }}
//           size='sm'
//           className='m-2'
//           onClick={() => {
//             setFileHref();
//             onHide();
//           }}>
//           {/* <X size={18} /> */}
//         </Button>
//       </div>
//     </>
//   );
// };

// export default FileViewer;
