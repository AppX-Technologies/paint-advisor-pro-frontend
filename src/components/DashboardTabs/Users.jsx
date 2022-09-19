import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CustomButton from '../Button';
import CreateUserForm from './UserRegisterForm';
import EditUserForm from './EditUserForm';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
 import {deleteUser,fetchUsers} from '../../features/users/userSlice'
 import {showMessage} from '../../features/snackbar/snackbarSlice'

const Users = () => {
  const dispatch = useDispatch();
  const {userList,isDeleted,isLoading} = useSelector(state => state.user)
  const [open, setOpen] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData,  setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if(isDeleted){
      dispatch(showMessage({message:"User deleted successfully",variant:"success"}))
      dispatch(fetchUsers(userDetail.token))
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
      name:"organization",
      label:"Organization",
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
          return (
            <>
            <Stack direction="row" spacing={2}>
            <EditOutlinedIcon style={{cursor:"pointer"}} onClick={() => setOpenEditForm(true)}/>
            <DeleteOutlineOutlinedIcon style={{cursor:"pointer"}}
            onClick={
              () => {
                dispatch(deleteUser({email:editFormData[2],token:userDetail.token}))
              }
            }
            />
            </Stack>
            </>
          );
        },
       
      }
    }
  ];
console.log(editFormData,"users")
  const options = {
    filterType: 'textField',
    print:false,
    selectableRows: false,
    textLabels: {
     body: {
       noMatch: 
        <CircularProgress color="primary" />
        //  <div
        //    className="flex flex-col justify-center items-center"
        //    style={{ padding: "26px 0", marginTop: "32px" }}
        //  >
        //    <Typography
        //      variant="h6"
        //      style={{ fontSize: "14px", fontWeight: 600, padding: "17px 0" }}
        //    >
        //      You currently have no orgs for this event to view.
        //    </Typography>
        //  </div>
       ,
       toolTip: "Sort",
       columnHeaderTooltip: column => `Sort for ${column.label}`
     }
   },
    onRowClick: (rowData, rowMeta) => {
        const filteredRowData = rowData.slice(0,5)
        setEditFormData(filteredRowData)
    }
  };
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent:"flex-end" }}>
      <CustomButton
      variant="contained"
      sx={{ mt: 3, mb: 2}}
      onClick={() => setOpen(true)}
      >
        Create
      </CustomButton>
    </Box>
    <MUIDataTable
    title={
      <>
    Users List
    {<CircularProgress color="primary" size={25} style={{display:isLoading ? "block" : "none"}} />}
    </>
    }
    data={userList.map((item,index)=>{
      return [
        item._id,
        item.name,
        item.email,
        item.phone,
        item.role,
        item.organization ? item.organization : "N/A",
        item.active
      ]
    })}
    columns={columns}
    options={options}
  />
  <CreateUserForm open={open} setOpen={setOpen}/>
  <EditUserForm editFormData={editFormData} openEditForm={openEditForm}  setOpenEditForm={setOpenEditForm}/>
  </>
  )
}

export default Users