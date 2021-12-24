import React from "react";

import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// ----------------------------------------------------------------------

import { red } from "@mui/material/colors";

import TableDialog from "./TableDialog";

export default function TableListMoreMenu(props) {
  const {
    setOpenEditDialogByRow,
    openEditDialogByRow,
    setOpenDeleteDialogByRow,
    openDeleteDialogByRow,
    setActionInDialog,
    type,
    action,
    row,
  } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            setActionInDialog("edit");
            setOpenEditDialogByRow(true);
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sửa"
            primaryTypographyProps={{ variant: "subtitle2" }}
          />
        </MenuItem>
        <TableDialog
          openDialog={openEditDialogByRow}
          setOpenDialog={setOpenEditDialogByRow}
          type={type}
          action={action}
          row={row}
        />
        {type !== "transaction" && (
          <MenuItem
            onClick={() => {
              setActionInDialog("delete");
              setOpenDeleteDialogByRow(true);
            }}
          >
            <ListItemIcon>
              <DeleteForeverIcon sx={{ color: red[500] }} />
            </ListItemIcon>
            <ListItemText
              primary="Xóa"
              primaryTypographyProps={{ variant: "subtitle2", color: red[500] }}
            />
          </MenuItem>
        )}

        <TableDialog
          openDialog={openDeleteDialogByRow}
          setOpenDialog={setOpenDeleteDialogByRow}
          type={type}
          action={action}
          row={row}
        />
      </Menu>
    </>
  );
}
