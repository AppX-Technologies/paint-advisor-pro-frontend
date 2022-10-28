import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CustomButton from '../../components/Button';
import EditUserForm from './EditUserForm';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {fetchUserMadeByCompany,reset,deleteUserByCompany} from '../../features/usersFromCompany/usersFromCompanySlice'
import {showMessage} from '../../features/snackbar/snackbarSlice'
import CreateUserForm from './CreateUserForm';

const UsersFromCompany = (props) => {
  const {getId} = props;
  const dispatch = useDispatch();
  const {companyMadeByUsers,isDeleting,isLoading,isDeleted} = useSelector(state => state.usersFromCompany)
  const [open, setOpen] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData,  setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const [openDeleteModal,setOpenDeleteModal] = React.useState(false);
  const [emailId,setEmailId] = React.useState('');

  React.useEffect(() => {
    if(isDeleted){
      dispatch(showMessage({message:"User deleted successfully",variant:"success"}))
      setOpenDeleteModal(false)
      if(userDetail.role === "Org Admin" || userDetail.role === "Admin"){
        dispatch(fetchUserMadeByCompany({
          filter: {
            role: ["Painter","Estimator","Org Admin"],
          },
          organization:getId,
          token: userDetail.token
        }))
      }
      dispatch(reset())
    }
  } 
  , [isDeleted]);

  const columns = [
    {
      name: "",
      label: "",
      options: {
       display: false,
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
     name: "phone",
     label: "Phone",
     options: {
      filter: true,
     }
    },
    {
      name: "role",
      label: "Role",
      options: {
       filter: true,
      }
     },
     {
      name: "company",
      label: "Company",
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
          const getEmail = tableMeta.rowData[2]
          return (
            <>
            <Stack direction="row" spacing={2}>
            <EditOutlinedIcon style={{cursor:"pointer"}} 
            onClick={
              () => {
                setEditFormData(tableMeta.rowData)
                setOpenEditForm(true)
              }} 
            editFormData={editFormData}/>
            <DeleteOutlineOutlinedIcon style={{cursor:"pointer"}}
              onClick={
              (e)=> {
              setOpenDeleteModal(true)
              onDeleteBtnClick(e,getEmail)
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
        {isLoading &&
          <CircularProgress color="primary" style={{display: isLoading ? "flex" : "none", margin:"0 auto"}} />
          }
        {!isLoading && 
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
          </div> 
          }
         </>
        ,
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      }
   },
   
  };

  // set email on click
  const onDeleteBtnClick = (e,email) => {
    e.stopPropagation();
    setEmailId(email)
  }

  function DeleteModal(){
    const handleClose = () => {
      setOpenDeleteModal(false);
    };
    const handleDelete = () => {
      dispatch(deleteUserByCompany({email:emailId,
      token:JSON.parse(localStorage.getItem("user")).token
    }))
    }

    return (
      <Dialog open={openDeleteModal} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" spacing={2}>
          <Typography variant="h6">
          Delete user
          </Typography>
          {<CircularProgress color="primary" size={25} style={{display:isDeleting ? "block" : "none"}} />}
          </Stack>
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
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
      "Users List"
    }
    data={companyMadeByUsers.map((item,index)=>{
      return [
        item._id,
        item.name,
        item.email,
        item.phone,
        item.role,
        item.organization ? item.organization.name : "",
        item.active
      ]
    })}
    columns={columns}
    options={options}
  />
  <CreateUserForm open={open} setOpen={setOpen} />
  <EditUserForm editFormData={editFormData} openEditForm={openEditForm}  setOpenEditForm={setOpenEditForm} getId={getId}/>
  <DeleteModal />
  </>
  )
}

export default UsersFromCompany