import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../../components/customer/customer-list-results";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { getData } from "../../utils/fecthData";

export async function getStaticProps() {
  const data = await getData("users");

  return { props: data };
}

const Customers = ({ data }) => {
  return (
    <>
      <Head>
        <title>Customers - Beeyou</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={data} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
