import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "../Button";
import FormDialog from "./OrgRegisterForm";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditOrgForm from "./EditOrgForm";
import { Link, useNavigate } from "react-router-dom";
import { deleteOrg, fetchOrgs, reset } from "../../features/org/orgSlice";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import DataTable from "../../Common/DataTable";
import { companyColumns } from "../../Common/tableHead";
import { tableOptions } from "../../Common/tableOptions";
const Companies = () => {
  console.log("ggfff");
  const dispatch = useDispatch();
  const { orgList, isDeleting, isLoading, isDeleted } = useSelector(
    (state) => state.org
  );
  const [open, setOpen] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const navigate = useNavigate();
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState([]);
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = React.useState("");
  const [options, setOptions] = React.useState({});
  React.useEffect(() => {
    if (isDeleted) {
      dispatch(
        showMessage({
          message: "Company deleted successfully",
          variant: "success",
        })
      );
      setOpenDeleteModal(false);
      dispatch(fetchOrgs(userDetail.token));
      dispatch(reset());
    }
  }, [isDeleted]);

  const columns = [
    ...companyColumns,
    {
      label: "Action",
      name: "",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const getId = tableMeta.rowData[0];
          return (
            <>
              <Stack direction="row" spacing={2}>
                <EditOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditFormData(tableMeta.rowData);
                    setOpenEditForm(true);
                  }}
                  editFormData={editFormData}
                />
                <Link to={`/company/${getId}`} target="_blank">
                  <RemoveRedEyeOutlinedIcon
                    style={{ cursor: "pointer", color: "black" }}
                  />
                </Link>
                <DeleteOutlineOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    setOpenDeleteModal(true);
                    onDeleteBtnClick(e, getId);
                  }}
                />
              </Stack>
            </>
          );
        },
      },
    },
  ];

  // set email on click
  const onDeleteBtnClick = (e, getId) => {
    e.stopPropagation();
    setUserId(getId);
  };

  // const onViewBtnClick = (e, getId) => {
  //   e.stopPropagation();
  //   navigate(`);
  // };
  useEffect(() => {
    setOptions(tableOptions(isLoading, orgList));
  }, []);
  function DeleteModal() {
    const handleClose = () => {
      setOpenDeleteModal(false);
    };
    const handleDelete = () => {
      dispatch(deleteOrg({ id: userId, token: userDetail.token }));
    };

    return (
      <Dialog open={openDeleteModal} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">Delete Company</Typography>
            {
              <CircularProgress
                color="primary"
                size={25}
                style={{ display: isDeleting ? "block" : "none" }}
              />
            }
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} disabled={isDeleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setOpen(true)}
          disabled={isLoading}
        >
          Create
        </CustomButton>
      </Box>

      <DataTable
        datalist={orgList}
        columns={columns}
        options={options}
        title={"Companies List"}
      />
      <FormDialog open={open} setOpen={setOpen} />
      <EditOrgForm
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        editFormData={editFormData}
      />
      <DeleteModal />
    </>
  );
};

export default Companies;
