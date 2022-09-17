import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import CustomButton from '../Button';
import FormDialog from './OrgRegisterForm';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import EditOrgForm from './EditOrgForm';

 
const Companies = () => {
  const {orgList} = useSelector(state => state.org)
  const [open, setOpen] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData,  setEditFormData] = React.useState([]);

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
          return (
            <ModeEditOutlineOutlinedIcon style={{cursor:"pointer"}} onClick={() => setOpenEditForm(true)}/>
          );
        },
       
      }
    }
  ];

  const options = {
    filterType: 'textField',
    print:false,
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
    const filteredRowData = rowData.slice(0,6)
       setEditFormData(filteredRowData)
    } 
  }
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
    title={"Companies List"}
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
  </>
  )
}

export default Companies