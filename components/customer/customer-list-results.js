import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const CustomerListResults = ({ customers, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Khách hàng</TableCell>

                <TableCell style={{ textAlign: "center" }}>
                  Tổng đơn hàng
                </TableCell>
                <TableCell style={{ float: "right" }}>Tổng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {` ${customer.lastName} ${customer.firstName}`}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    {customer.totalOrders}
                  </TableCell>
                  <TableCell style={{ float: "right" }}>
                    {customer.totalIncome
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

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
