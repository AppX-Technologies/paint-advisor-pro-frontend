// import React, { useEffect, useState } from 'react';
// import { Button, Card, Col, Container, Row } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import FormGenerator from '../../form-generator/FormGenerator';
// import { normalizeId } from '../../form-generator/helpers/utility';
// import { makeApiRequests } from '../../helpers/api';
// import { ENDPOINTS } from '../../helpers/constants';
// import { getAllDefaultCommissionOptionPreFill } from '../../helpers/formHelpers';
// import { openLinkInNewTab } from '../../helpers/global';
// import File from '../common/file';
// import InventoryPicker from '../inventory/InventoryPicker';
// import PotentialUnitsOverview from '../inventory/PotentialUnitsOverview';
// import Loader from '../Loader';
// import { addChoicesToCRMForm, formJson, validateAndCleanupCRMForm } from './form';

// const CreateCrm = ({ appChoices = {}, onContactAdd }) => {
//   const [form, setForm] = useState(null);
//   const [isFormLoading, setFormLoading] = useState(true);
//   const [zipCodes, setZipCodes] = useState([]);
//   const [buttonsDisabled, setButtonsDisabled] = useState(false);
//   const [goToDochub, setGoToDocHub] = useState(false);
//   const [selectedInventory, setSelectedInventory] = useState([]);
//   const [inventoryPopupMeta, setInventoryPopupMeta] = useState(null);
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const setUpForm = () => {
//     addChoicesToCRMForm({ appChoices, form: formJson });
//     setZipCodes(appChoices.find((a) => a.key === 'zipCodes')['values']);
//     setForm(formJson);
//     setFormLoading(false);
//   };

//   useEffect(() => {
//     setUpForm();
//   }, []);

//   const onCrmFormSubmit = async (form) => {
//     if (uploadedFiles.some((f) => f.status === 'ERROR')) {
//       return toast.error(
//         'One or more files have failed uploading, please discard these files and try again!'
//       );
//     }

//     if (uploadedFiles.some((f) => f.status !== 'UPLOADED')) {
//       return toast.error(
//         'Some of the files are still uploading to the server, please try again in a moment!'
//       );
//     }

//     //checks
//     const valid = validateAndCleanupCRMForm(form);
//     if (!valid) return;

//     form['files'] = uploadedFiles.map((f) => f.id);
//     form['inventoryUnit'] = selectedInventory ? selectedInventory.map((i) => i['_id']) : [];

//     setButtonsDisabled(true);
//     toast.info('Please wait, creating contact...');

//     const { response, error } = await makeApiRequests({
//       requestBody: form,
//       endpoint: ENDPOINTS.CONTACTS_BASE
//     });

//     setButtonsDisabled(false);

//     if (error) {
//       return toast.error(error);
//     }

//     toast.success(`Contact created successfully!`);

//     if (onContactAdd) {
//       onContactAdd(response);
//     }

//     setTimeout(() => {
//       if (goToDochub) {
//         openLinkInNewTab(`/dochub/print-groups?contactId=${response._id}&source=Contact`);
//       }
//       //this means it is not from a popup or sidebar
//       if (!onContactAdd) document.location.reload();
//     }, 1000);
//   };

//   const autoFillAddress = (e) => {
//     try {
//       const zipCode = e ? e.target.value : document.getElementById('zipCode').value;
//       const zipCodeFiltered = zipCodes.filter((zip) => zipCode == zip['Zip Code']);

//       if (zipCodeFiltered.length > 0) {
//         document.getElementById('propertyState').value = zipCodeFiltered[0]['Property State'];
//         document.getElementById('propertyCity').value = zipCodeFiltered[0]['Property City'];
//         document.getElementById('propertyCounty').value = zipCodeFiltered[0]['Property County'];
//       }
//     } catch (e) {}
//   };

//   const autoFillMailingAddress = (e) => {
//     try {
//       const zipCode = e ? e.target.value : document.getElementById('mailingZipCode').value;
//       const zipCodeFiltered = zipCodes.filter((zip) => zipCode == zip['Zip Code']);

//       if (zipCodeFiltered.length > 0) {
//         document.getElementById('mailingState').value = zipCodeFiltered[0]['Property State'];
//         document.getElementById('mailingCity').value = zipCodeFiltered[0]['Property City'];
//         document.getElementById('mailingCounty').value = zipCodeFiltered[0]['Property County'];
//       }
//     } catch (e) {}
//   };

//   window['autoFillMailingAddress'] = autoFillMailingAddress;
//   window['autoFillAddress'] = autoFillAddress;
//   window['onCrmFormSubmit'] = onCrmFormSubmit;

//   const onButtonClick = (goToDochub) => {
//     setGoToDocHub(goToDochub);
//     setTimeout(() => {
//       document.getElementById('addnewcrmrecord').click();
//     }, 100);
//   };

//   const ButtonsRow = ({ bottom }) => (
//     <Row>
//       <Col xs={12} className={`text-right ${bottom ? 'my-4' : ' mb-3 mt-2'}`}>
//         <Button
//           disabled={buttonsDisabled}
//           onClick={() => onButtonClick(true)}
//           size='sm'
//           variant='dark'>
//           Save and Go to Doc Hub
//         </Button>
//         <Button
//           disabled={buttonsDisabled}
//           onClick={() => onButtonClick(false)}
//           size='sm'
//           className='ml-2'>
//           Save Record
//         </Button>
//       </Col>
//     </Row>
//   );

//   const onLinkUnitClick = (replacingUnit) => {
//     setInventoryPopupMeta({ replacingUnit });
//   };

//   const onRemoveUnitClick = (removingUnit) => {
//     const existingIndex = selectedInventory.findIndex((i) => i['_id'] === removingUnit['_id']);
//     if (existingIndex !== -1) {
//       selectedInventory.splice(existingIndex, 1);
//     }
//     setSelectedInventory([...selectedInventory]);
//   };

//   const onInventorySubmit = (inventoryList) => {
//     const inventory = inventoryList[0];
//     const { replacingUnit } = inventoryPopupMeta;

//     if (replacingUnit) {
//       const existingIndex = selectedInventory.findIndex((i) => i['_id'] === replacingUnit['_id']);
//       if (existingIndex !== -1) {
//         selectedInventory[existingIndex] = inventory;
//       }
//       setSelectedInventory([...selectedInventory]);
//     } else {
//       setSelectedInventory([...selectedInventory, inventory]);
//     }
//     setInventoryPopupMeta(null);
//   };

//   const onUnitSelect = (unit) => {
//     setInventoryPopupMeta({ ...inventoryPopupMeta, selectedUnit: unit });
//   };

//   const setDefaultValueToCheckedKeys = (inputId, appChoiceKey) => {
//     try {
//       const keyValueContainer = document.getElementById(inputId);

//       const checkedKeys = [...keyValueContainer.getElementsByTagName('input')].filter(
//         (input) => input.type === 'checkbox' && input.checked
//       );

//       checkedKeys.forEach((checkedKey) => {
//         const relatedTextBox = document.getElementById(
//           `${inputId}-${normalizeId(checkedKey.value)}-key-value`
//         );
//         if (!relatedTextBox.value) {
//           relatedTextBox.value =
//             appChoices
//               .find((c) => c.key === appChoiceKey)
//               ?.values.find((c) => c.name === checkedKey.value)?.defaultValue || 0;
//         }
//       });
//     } catch (e) {}
//   };

//   const onCommissionSheetOptionsChange = (e) => {
//     if (!e) return;

//     setDefaultValueToCheckedKeys('commissionSheetOptions', 'Commission Options');
//   };

//   window['onCommissionSheetOptionsChange'] = onCommissionSheetOptionsChange;

//   const onCommissionSheetLessOptionsChange = (e) => {
//     if (!e) return;

//     setDefaultValueToCheckedKeys('commissionSheetLessOptions', 'Commission Less Options');
//   };
//   window['onCommissionSheetLessOptionsChange'] = onCommissionSheetLessOptionsChange;

//   return (
//     <Container fluid className='py-4 px-md-3'>
//       <Card>
//         <Card.Body>
//           {isFormLoading && <Loader />}
//           {!isFormLoading && form && (
//             <>
//               <ButtonsRow />
//               <FormGenerator
//                 formJson={form}
//                 formValues={{
//                   'Add New CRM Record': getAllDefaultCommissionOptionPreFill(appChoices)
//                 }}
//               />
//               <File
//                 uploadedFiles={uploadedFiles}
//                 onUploadedFilesChange={setUploadedFiles}
//                 containerClassName='mx-3'
//               />

//               <div className='m-3'>
//                 <PotentialUnitsOverview
//                   onLinkNewUnitClick={onLinkUnitClick}
//                   onRemoveUnitClick={onRemoveUnitClick}
//                   onChangeUnitClick={onLinkUnitClick}
//                   inventoryUnits={selectedInventory}
//                 />
//                 <InventoryPicker
//                   excludedUnitIds={selectedInventory ? selectedInventory.map((u) => u['_id']) : []}
//                   show={inventoryPopupMeta !== null}
//                   onSubmit={onInventorySubmit}
//                   selectedUnits={
//                     inventoryPopupMeta && inventoryPopupMeta.selectedUnit
//                       ? [inventoryPopupMeta.selectedUnit]
//                       : []
//                   }
//                   onUnitSelect={onUnitSelect}
//                   onInventoryPickerClose={() => setInventoryPopupMeta(null)}
//                 />
//               </div>

//               <ButtonsRow bottom />
//             </>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default CreateCrm;









// import { uniqueId } from 'lodash';
// import React, { useEffect, useRef } from 'react';
// import { Badge, Card } from 'react-bootstrap';
// import { CheckCircleFill, ExclamationCircleFill, Upload, X } from 'react-bootstrap-icons';
// import useFileUpload from 'react-use-file-upload';
// import { makeApiRequests } from '../../../helpers/api';
// import { ENDPOINTS } from '../../../helpers/constants';
// import CircularProgressBar from '../circular-progress';

// const getMetadataParams = (metadata = {}) => {
//   const params = Object.keys(metadata)
//     .map(k => encodeURI(`${k}=${metadata[k]}`))
//     .join('&');
//   return `?${params}`;
// };

// const FileButton = ({ fileObject, onRemoveFile }) => (
//   <Badge className="mx-1 p-2 text-dark" variant="primary-light">
//     {fileObject.status !== 'UPLOADING' && <X className="hover-light mr-1" size={14} onClick={onRemoveFile} />}
//     <span className="mr-2">{fileObject.file.name}</span>
//     {fileObject.status === 'UPLOADING' && <CircularProgressBar size={1} />}
//     {fileObject.status === 'UPLOADED' && <CheckCircleFill className="text-success" />}
//     {fileObject.status === 'ERROR' && <ExclamationCircleFill className="text-danger" />}
//   </Badge>
// );

// // uploadedFile = {status: ['WAITING_FOR_UPLOAD','UPLOADING', 'UPLOADED', 'ERROR']}

// const File = ({ containerClassName = '', uploadedFiles = [], onUploadedFilesChange, metaData = {} }) => {
//   const { files, handleDragDropEvent, setFiles } = useFileUpload();
//   const inputRef = useRef();

//   useEffect(() => {
//     //when new file is uploaded, set status to upload the file to server and push to uploaded files
//     const newFiles = [];
//     for (const f of files) {
//       const fileToBeUploaded = { file: f, status: 'WAITING_FOR_UPLOAD', id: uniqueId() };
//       newFiles.push(fileToBeUploaded);
//     }

//     onUploadedFilesChange && onUploadedFilesChange([...uploadedFiles, ...newFiles]);
//   }, [files]);

//   useEffect(() => {
//     uploadedFiles.filter(f => f.status === 'WAITING_FOR_UPLOAD').forEach(uploadFile);
//   }, [uploadedFiles]);

//   const uploadFile = async fileToBeUploaded => {
//     updateUploadedFiles(fileToBeUploaded, 'UPLOADING');

//     const formData = new FormData();
//     formData.append('file', fileToBeUploaded.file);

//     const { error, response } = await makeApiRequests({
//       requestBody: formData,
//       endpoint: ENDPOINTS.FILE, // `${ENDPOINTS.FILE}${getMetadataParams(metaData)}`,
//       stringify: false
//     });

//     if (error) {
//       updateUploadedFiles(fileToBeUploaded, 'ERROR');
//     } else {
//       updateUploadedFiles(fileToBeUploaded, 'UPLOADED', response);
//     }
//   };

//   const updateUploadedFiles = (fileObject, status, response = {}) => {
//     uploadedFiles = uploadedFiles.map(f => (f.id === fileObject.id ? { ...f, ...response, status } : f));
//     onUploadedFilesChange && onUploadedFilesChange(uploadedFiles);
//   };

//   const onRemoveFile = fileObject => {
//     if (fileObject.status === 'UPLOADED') {
//       //we do not care for response
//       makeApiRequests({
//         endpoint: ENDPOINTS.FILE_WITH_ID(fileObject.filename),
//         method: 'DELETE'
//       });
//     }

//     uploadedFiles.splice(uploadedFiles.findIndex(f => f.id === fileObject.id), 1);
//     onUploadedFilesChange([...uploadedFiles]);
//   };

//   return (
//     <div className={`mb-2 ${containerClassName}`}>
//       <h6 className="midFont">Upload Files</h6>

//       <Card>
//         <Card.Body className="p-0">
//           <div className="p-1 px-2  border-bottom">
//             {uploadedFiles.length > 0 ? (
//               uploadedFiles.map(fileObject => (
//                 <FileButton key={fileObject.id} fileObject={fileObject} onRemoveFile={() => onRemoveFile(fileObject)} />
//               ))
//             ) : (
//               <p className="mb-0 smallFont">No files uploaded.</p>
//             )}
//           </div>
//           <div
//             className="py-3 text-center hover-light rounded-bottom"
//             onDragEnter={handleDragDropEvent}
//             onDragOver={handleDragDropEvent}
//             onDrop={e => {
//               handleDragDropEvent(e);
//               setFiles(e);
//             }}
//             onClick={() => inputRef.current.click()}
//           >
//             <Upload className="text-muted" size={22} />
//             <p className="mb-0 mt-2 midFont">Click Or Drag and drop files here</p>
//             <input
//               ref={inputRef}
//               type="file"
//               multiple
//               style={{ display: 'none' }}
//               onChange={e => {
//                 setFiles(e);
//                 inputRef.current.value = null;
//               }}
//             />
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default File;