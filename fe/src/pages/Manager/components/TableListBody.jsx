import React, { useState } from "react";

// material
import {
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Box,
  Chip,
} from "@mui/material";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import TableListMoreMenu from "./TableListMoreMenu";

import { Label } from "@components";

import moment from "moment";

import { COMMON, CONSTANT } from "@utils";

import _find from "lodash/find";

function TableListBody(props) {
  const {
    filteredCustomers,
    emptyRowCustomers,
    filteredProducts,
    emptyRowProducts,
    filteredTransactions,
    emptyRowTransactions,
    page,
    rowsPerPage,
    selectedCustomers,
    selectedProducts,
    selectedTransactions,
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
                .map((row, index) => {
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
                .map((row, index) => {
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
                          {
                            _find(CONSTANT.CATEGORIES, function (o) {
                              return o.code === category;
                            })?.displayName
                          }
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
            {filteredTransactions &&
              filteredTransactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, amount, quantity, status, productId } = row;
                  const isItemSelected =
                    selectedTransactions.indexOf(id) !== -1;

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
                            handleSelect(event, id, selectedTransactions, 2)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        #{row.id + COMMON.randomInRange(100000000, 999999999)}
                      </TableCell>
                      <TableCell>
                        {moment(row.date).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell>
                        {COMMON.formatterPrice(row.totalAmount) + "đ"}
                      </TableCell>
                      <TableCell>{row.shippingAddress}</TableCell>
                      <TableCell>
                        <Chip
                          label={
                            row.paymentMethod === "cash"
                              ? "Tiền mặt"
                              : "Thẻ tín dụng"
                          }
                          icon={
                            row.paymentMethod === "cash" ? (
                              <AttachMoneyIcon />
                            ) : (
                              <CreditCardIcon />
                            )
                          }
                          variant="outlined"
                          size="small"
                          color="secondary"
                        />
                      </TableCell>

                      <TableCell align="left">
                        <TableListMoreMenu
                          setActionInDialog={setActionInDialog}
                          setOpenEditDialogByRow={setOpenEditDialogByRow}
                          openEditDialogByRow={openEditDialogByRow}
                          setOpenDeleteDialogByRow={setOpenDeleteDialogByRow}
                          openDeleteDialogByRow={openDeleteDialogByRow}
                          type="transaction"
                          action={actionInDialog}
                          row={row}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            {emptyRowTransactions > 0 && (
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
