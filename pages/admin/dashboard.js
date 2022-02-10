import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TotalProduct } from "../../components/dashboard/total-product";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { FeaturedProducts } from "../../components/dashboard/featured-products";
import { Sales } from "../../components/dashboard/sales";
import { TotalOrder } from "../../components/dashboard/total-order";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalIncome } from "../../components/dashboard/total-income";
import { StatisticsByCategory } from "../../components/dashboard/statistics-by-category";
import { DashboardLayout } from "../../components/dashboard-layout";
import { getData } from "../../utils/fecthData";

export async function getStaticProps() {
  const statisticalOrders = await getData("admin/statisticalOrders");
  const res = await getData(`admin/statistical`);
  const featuredProducts = await getData(`products/hot?limit=5`);
  const lastestOrder = await getData(`orders/createdAt`);

  return {
    props: {
      countOrder: res.countOrder,
      countProduct: res.countProduct,
      countUser: res.countUser,
      totalIncome: res.totalIncome,
      statisticalOrders,
      featuredProducts: featuredProducts,
      lastestOrder: lastestOrder.orders,
    },
  };
}

const Dashboard = (props) => {
  return (
    <>
      <Head>
        <title>Dashboard - Beeyou</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalProduct count={props.countProduct} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers count={props.countUser} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalOrder count={props.countOrder} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalIncome count={props.totalIncome} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <StatisticsByCategory
                statisticalorders={props.statisticalOrders}
              />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <FeaturedProducts
                product={props.featuredProducts}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders orders={props.lastestOrder} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
