import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import CustomButton from "../Button";
import { processColumn } from "../../Common/tableHead";
import { tableOptions } from "../../Common/tableOptions";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../features/snackbar/snackbarSlice";
import {
  deleteProcess,
  fetchProcess,
  reset,
} from "../../features/process/processSlice";
import DataTable from "../../Common/DataTable";
import FormDialog from "./ProcessReg";
import Edit from "./EditProcessForm";
import { useParams } from "react-router-dom";
const ProcessTable = ({ filterValue }) => {
  const dispatch = useDispatch();
  const { processList, isDeleting, isLoading, isDeleted } = useSelector(
    (state) => state.process
  );
  const userDetail = JSON.parse(localStorage.getItem("user"));
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [processId, setProcessId] = useState("");
  const [open, setOpen] = useState(false);
  // const {companyId} = useParams();

  useEffect(() => {
    console.log(isDeleted);
    if (isDeleted) {
      dispatch(
        showMessage({
          message: "Process Deleted successfully",
          variant: "success",
        })
      );
      setOpenDeleteModal(false);
      dispatch(reset());
    }
    dispatch(fetchProcess(userDetail.token));
  }, [isDeleted]);

  const onDeleteBtnClick = (e, getId) => {
    e.stopPropagation();
    setProcessId(getId);
  };
  const columns = processColumn({
    setEditFormData,
    setOpenEditForm,
    setOpenDeleteModal,
    onDeleteBtnClick,
    editFormData,
  });
  const options = tableOptions(processList, isLoading);

  //Delete popup menu
  function DeleteModal() {
    const handleClose = () => {
      setOpenDeleteModal(false);
    };
    const handleDelete = () => {
      dispatch(deleteProcess({ id: processId, token: userDetail.token }));
    };

    return (
      <Dialog open={openDeleteModal} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">Delete Process</Typography>
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
            Are you sure you want to delete this Process?
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
        >
          Create
        </CustomButton>
      </Box>
      <DataTable
        datalist={processList.map((process) => {
          return [process._id, process.name];
        })}
        columns={columns}
        options={options}
        title={filterValue + " Process"}
      />
      <FormDialog open={open} setOpen={setOpen} />
      <DeleteModal />
      <Edit
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        editFormData={editFormData}
      />
    </>
  );
};

export default ProcessTable;
