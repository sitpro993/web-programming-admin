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
import { useEffect, useState } from "react";
import { getData } from "../../utils/fecthData";

const Dashboard = () => {
  const [statistical, setStatistical] = useState({});

  useEffect(() => {
    const getStatistical = async () => {
      const res = await getData(`admin/statistical`);
      setStatistical(res);
    };
    getStatistical();
  }, []);
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
              {statistical.countProduct && (
                <TotalProduct count={statistical.countProduct} />
              )}
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              {statistical.countUser && (
                <TotalCustomers count={statistical.countUser} />
              )}
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              {statistical.countOrder && (
                <TotalOrder count={statistical.countOrder} />
              )}
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              {statistical.totalIncome && (
                <TotalIncome count={statistical.totalIncome} />
              )}
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <StatisticsByCategory />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <FeaturedProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
