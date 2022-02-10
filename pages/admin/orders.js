import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { customers } from "../../__mocks__/customers";
import { OrderListToolbar } from "../../components/order/order-list-toolbar";
import { OrderListResults } from "../../components/order/order-list-result";

const Orders = () => {
  return (
    <>
      <Head>
        <title>Đơn Hàng - Beeyou</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <OrderListToolbar />
          <Box sx={{ mt: 3 }}>
            <OrderListResults orders={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Orders;
