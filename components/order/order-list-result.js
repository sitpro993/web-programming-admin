import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";

export const OrderListResults = ({ orders, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Thanh toán</TableCell>
                <TableCell>Giao hàng</TableCell>

                <TableCell style={{ float: "right" }}>Tổng tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order._id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell> {order.name}</TableCell>
                  <TableCell>
                    <SeverityPill color={order.isPaid ? "success" : "warning"}>
                      {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <SeverityPill color={order.isPaid ? "success" : "warning"}>
                      {order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
                    </SeverityPill>
                  </TableCell>

                  <TableCell style={{ float: "right" }}>
                    {order.totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    ₫
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array.isRequired,
};
