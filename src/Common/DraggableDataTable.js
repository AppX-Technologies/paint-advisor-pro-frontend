/* eslint-disable */
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from "@mui/material/Table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { extractElement } from "../Helpers/extractElementsFromObj";

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
	background: isDragging ? "#757ce8" : "white",
	...draggableStyle
});

export const DraggableDataTable = ({
	isLoading,
	initialDataList,
	columns,
	title,
	setOpenEditForm,
	setOpenDeleteModal,
	onDeleteBtnClick,
	setEditFormData
}) => {
	const [dataList, setDataList] = useState(initialDataList);

	useEffect(() => {
		console.log("first");
		setDataList(initialDataList);
	}, [initialDataList]);
	const onDragEnd = (result) => {
		console.log(result);
		if (!result.destination) {
			return;
		}
		let movedItems = reorder(dataList, result.source.index, result.destination.index);

		setDataList(movedItems);
	};
	console.log(dataList);
	return (
		<TableContainer component={Paper}>
			<Typography
				sx={{
					flex: "1 1 100%",
					margin: "5px 0px 5px 15px",
					fontSize: "18px",
					fontWeight: "700"
				}}
				color="inherit"
				variant="subtitle1"
				component="div"
			>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "center"
					}}
				>
					<Typography
						sx={{
							flex: "1 1 100%",
							margin: "5px 0px -10px 10px",
							fontSize: "18px",
							fontWeight: "700"
						}}
						color="inherit"
						variant="subtitle1"
						component="div"
					>
						{title}
					</Typography>
					<div style={{ marginLeft: "10px" }}>
						{isLoading && (
							<CircularProgress
								color="primary"
								style={{
									display: isLoading ? "flex" : "none",
									margin: "0 auto",
									width: "30px",
									height: "30px"
								}}
							/>
						)}
					</div>
				</div>
			</Typography>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontSize: "16px", fontWeight: "550" }}>
							<SwapVerticalCircleIcon />
						</TableCell>
						{columns.map((column) => {
							return (
								<TableCell
									sx={{ fontSize: "16px", fontWeight: "550", color: "#4d5057" }}
								>
									{column.label}
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				{/* <TableBody> */}
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<TableBody {...provided.droppableProps} ref={provided.innerRef}>
								{dataList &&
									dataList.map((rowItem, index) => (
										<Draggable
											key={rowItem.id}
											draggableId={"q-" + rowItem.id}
											index={index}
										>
											{(provided, snapshot) => (
												<TableRow
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps.style
													)}
												>
													<TableCell
														component="th"
														scope="row"
														style={{ width: "5%" }}
													>
														<MoreVertIcon />
													</TableCell>
													<TableCell
														component="th"
														scope="row"
														style={{ width: "15%" }}
													>
														{rowItem.stage}
													</TableCell>
													<TableCell style={{ width: "50%" }}>
														{rowItem.description}
													</TableCell>
													<TableCell style={{ width: "50%" }}>
														<Stack direction="row" spacing={2}>
															<EditOutlinedIcon
																style={{ cursor: "pointer" }}
																onClick={() => {
																	setEditFormData(() =>
																		extractElement(rowItem)
																	);
																	setOpenEditForm(true);
																}}
															/>
															<DeleteOutlineOutlinedIcon
																style={{ cursor: "pointer" }}
																onClick={(e) => {
																	setOpenDeleteModal(true);
																	onDeleteBtnClick(e, rowItem.id);
																}}
															/>
														</Stack>
													</TableCell>
												</TableRow>
											)}
										</Draggable>
									))}
								{provided.placeholder}
							</TableBody>
						)}
					</Droppable>
				</DragDropContext>
				{/* </TableBody> */}
			</Table>
		</TableContainer>
	);
};
