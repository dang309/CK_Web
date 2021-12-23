import React, { useState } from "react";

// material
import {
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from "@mui/material";

import TableListMoreMenu from "./TableListMoreMenu";

import { Label } from "@components";

import moment from "moment";

import { COMMON } from "@utils";

function TableListBody(props) {
  const {
    filteredCustomers,
    emptyRowCustomers,
    filteredProducts,
    emptyRowProducts,
    page,
    rowsPerPage,
    selectedCustomers,
    selectedProducts,
    tab,
    handleSelect,
  } = props;

  const [openEditDialogByRow, setOpenEditDialogByRow] = useState(false);
  const [openDeleteDialogByRow, setOpenDeleteDialogByRow] = useState(false);
  const [actionInDialog, setActionInDialog] = useState("");

  const getBody = (tab) => {
    switch (tab) {
      case 0:
        return (
          <TableBody>
            {filteredCustomers &&
              filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    avatar,
                    name,
                    email,
                    bio,
                    gender,
                    birthday,
                    isAdmin,
                  } = row;
                  const isItemSelected = selectedCustomers.indexOf(id) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) =>
                            handleSelect(event, id, selectedCustomers, 0)
                          }
                        />
                      </TableCell>
                      <TableCell>{id}</TableCell>
                      <TableCell>
                        <Avatar alt={name} src={avatar} />
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{bio}</TableCell>
                      <TableCell align="left">
                        {gender ? "Nữ" : "Nam"}
                      </TableCell>
                      <TableCell align="left">
                        {moment(birthday).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        <Label color="info" variant="outlined">
                          {isAdmin ? "Quản trị viên" : "Khách hàng"}
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        <TableListMoreMenu
                          setActionInDialog={setActionInDialog}
                          setOpenEditDialogByRow={setOpenEditDialogByRow}
                          openEditDialogByRow={openEditDialogByRow}
                          setOpenDeleteDialogByRow={setOpenDeleteDialogByRow}
                          openDeleteDialogByRow={openDeleteDialogByRow}
                          type="customer"
                          action={actionInDialog}
                          row={row}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            {emptyRowCustomers > 0 && (
              <TableRow>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        );

      case 1:
        return (
          <TableBody>
            {filteredProducts &&
              filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    name,
                    thumbUrl,
                    unitPrice,
                    quantity,
                    discount,
                    category,
                  } = row;
                  const isItemSelected = selectedProducts.indexOf(id) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) =>
                            handleSelect(event, id, selectedProducts, 1)
                          }
                        />
                      </TableCell>
                      <TableCell>{id}</TableCell>
                      <TableCell>
                        <Box
                          component="img"
                          src={thumbUrl}
                          alt=""
                          sx={{
                            width: "56px",
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px ",
                            borderRadius: "16px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">
                        {COMMON.formatterPrice(unitPrice) + "đ"}
                      </TableCell>
                      <TableCell align="left">{quantity}</TableCell>
                      <TableCell align="left">
                        {(discount * 100).toFixed(2)}
                      </TableCell>
                      <TableCell align="left">
                        <Label color="info" variant="outlined">
                          {category}
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        <TableListMoreMenu
                          setActionInDialog={setActionInDialog}
                          setOpenEditDialogByRow={setOpenEditDialogByRow}
                          openEditDialogByRow={openEditDialogByRow}
                          setOpenDeleteDialogByRow={setOpenDeleteDialogByRow}
                          openDeleteDialogByRow={openDeleteDialogByRow}
                          type="product"
                          action={actionInDialog}
                          row={row}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            {emptyRowProducts > 0 && (
              <TableRow>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        );
      case 2:
        return (
          <TableBody>
            {filteredCustomers &&
              filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    avatar,
                    name,
                    email,
                    bio,
                    gender,
                    birthday,
                    isAdmin,
                  } = row;
                  const isItemSelected = selectedCustomers.indexOf(id) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleSelect(event, id)}
                        />
                      </TableCell>
                      <TableCell>{id}</TableCell>
                      <TableCell>
                        <Avatar alt={name} src={avatar} />
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{bio}</TableCell>
                      <TableCell align="left">
                        {gender ? "Nữ" : "Nam"}
                      </TableCell>
                      <TableCell align="left">
                        {moment(birthday).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        <Label color="info" variant="outlined">
                          {isAdmin ? "Quản trị viên" : "Khách hàng"}
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        <TableListMoreMenu
                          setActionInDialog={setActionInDialog}
                          setOpenEditDialogByRow={setOpenEditDialogByRow}
                          openEditDialogByRow={openEditDialogByRow}
                          setOpenDeleteDialogByRow={setOpenDeleteDialogByRow}
                          openDeleteDialogByRow={openDeleteDialogByRow}
                          type="order"
                          action={actionInDialog}
                          row={row}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            {emptyRowCustomers > 0 && (
              <TableRow>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        );
      default:
        break;
    }
  };
  return <>{getBody(tab)}</>;
}

TableListBody.propTypes = {};

export default TableListBody;
