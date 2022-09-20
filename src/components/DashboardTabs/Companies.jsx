import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import CustomButton from '../Button';
import FormDialog from './OrgRegisterForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditOrgForm from './EditOrgForm';
import { useNavigate } from 'react-router-dom'
import {deleteOrg,fetchOrgs,reset} from '../../features/org/orgSlice'
import {showMessage} from '../../features/snackbar/snackbarSlice'

const Companies = () => {
  const dispatch = useDispatch()
  const {orgList,isDeleting,isLoading,isDeleted} = useSelector(state => state.org)
  const [open, setOpen] = React.useState(false);
  const [openDeleteModal,setOpenDeleteModal] = React.useState(false);
  const navigate = useNavigate();
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData,  setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const [userId,setUserId] = React.useState('');
  React.useEffect(() => {
    if(isDeleted){
      dispatch(showMessage({message:"Organization deleted successfully",variant:"success"}))
      setOpenDeleteModal(false)
      dispatch(fetchOrgs(userDetail.token))
      dispatch(reset())
    }
  } 
  , [isDeleted])

  const columns = [
    {
      name:"",
      label:"",
      options:{
        display:false,
      }
    },
    {
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "email",
     label: "Email",
     options: {
      filter: true,
     }
    },
    {
     name: "address",
     label: "Address",
     options: {
      filter: true,
     }
    },
    {
     name: "phone",
     label: "Phone",
     options: {
      filter: true,
     }
    },
    {
      name: "active",
      label: "Status",
      options: {
       filter: true,
       customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            style={{
              fontSize: "12px",
              textTransform: "none",
              fontWeight: 700,
              background: "#1565c0",
              color: "#fafafa",
              padding: "4px 8px",
              textTransform: "capitalize"
            }}
          >
            {value ? "Active" : "Inactive"}
          </Button>
        );
      }
      }
     },
     {
      label: "Action",
      name: "",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const getId = tableMeta.rowData[0]
          return (
            <>
            <Stack direction="row" spacing={2}>
            <EditOutlinedIcon style={{cursor:"pointer"}}
            onClick={
              () => {
                setEditFormData(tableMeta.rowData)
                setOpenEditForm(true)
              }} 
            editFormData={editFormData}
            />
            <RemoveRedEyeOutlinedIcon style={{cursor:"pointer"}} />
            <DeleteOutlineOutlinedIcon style={{cursor:"pointer"}}
              onClick={
              (e)=> {
              setOpenDeleteModal(true)
              onDeleteBtnClick(e,getId)
              }}  
            />
            </Stack>
            </>
          );
        },
       
      }
    }
  ];
  const options = {
    filterType: 'textField',
    print:false,
    selectableRows: false,
    textLabels: {
     body: {
       noMatch: 
       <>
       {!isLoading && orgList.length === 0 && 
         <div
           className="flex flex-col justify-center items-center"
           style={{ padding: "26px 0", marginTop: "32px" }}
         >
           <Typography
             variant="h6"
             style={{ fontSize: "14px", fontWeight: 600, padding: "17px 0" }}
           >
             Sorry, no matching records found.
           </Typography>
         </div> }
         <CircularProgress color="primary" style={{display: isLoading ? "block" : "none"}} />
        </>
       ,
       toolTip: "Sort",
       columnHeaderTooltip: column => `Sort for ${column.label}`
     }
   },
  }

   // set email on click
   const onDeleteBtnClick = (e,getId) => {
    e.stopPropagation();
    setUserId(getId)
  }

  function DeleteModal(){
    const handleClose = () => {
      setOpenDeleteModal(false);
    };
    const handleDelete = () => {
      dispatch(deleteOrg({id:userId,token:userDetail.token}))
    }

    return (
      <Dialog open={openDeleteModal} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" spacing={2}>
          <Typography variant="h6">
          Delete Organization
          </Typography>
          {<CircularProgress color="primary" size={25} style={{display:isDeleting ? "block" : "none"}} />}
          </Stack>
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this organization?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} disabled={isDeleting}>Delete</Button>
        </DialogActions>
      </Dialog>
    )
    
  }
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent:"flex-end" }}>
      <CustomButton
      variant="contained"
      sx={{ mt: 3, mb: 2}}
      onClick={() => setOpen(true)}
      disabled={isLoading}
      >
        Create
      </CustomButton>
    </Box>
    <MUIDataTable
    title={
      "Organizations List"
    }
    data={orgList.map((item,index)=>{
      return [
        item._id,
        item.name,
        item.email,
        item.address,
        item.phone,
        item.active
      ]
    })}
    columns={columns}
    options={options}
  />
  <FormDialog open={open} setOpen={setOpen}/>
  <EditOrgForm openEditForm={openEditForm} setOpenEditForm={setOpenEditForm} editFormData={editFormData}/>
  <DeleteModal />
  </>
  )
}

export default Companies