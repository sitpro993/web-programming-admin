import Head from "next/head";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { deleteData, getData, patchData } from "../../../utils/fecthData";
import PerfectScrollbar from "react-perfect-scrollbar";
import { forwardRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export async function getStaticProps() {
  const data = await getData("products");
  return {
    props: { products: data.products },
  };
}

const Products = ({ products }) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [activeDialog, setActiveDialog] = useState(false);
  const [nonActiveDialog, setNonActiveDialog] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(0);

  const router = useRouter();

  const handleSelectAll = (event) => {
    let newSelectedProductIds;

    if (event.target.checked) {
      newSelectedProductIds = products.map((product) => product._id);
    } else {
      newSelectedProductIds = [];
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleSelectOne = (event, id) => {
    let newSelectedProductIds = [...selectedProductIds];
    let index = selectedProductIds.indexOf(id);
    if (index >= 0) newSelectedProductIds.splice(index, 1);
    else newSelectedProductIds.push(id);
    setSelectedProductIds(newSelectedProductIds);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const handleOpenActiveDialog = () => {
    setActiveDialog(true);
  };

  const handleCloseActiveDialog = () => {
    setActiveDialog(false);
  };

  const handleOpenNonActiveDialog = () => {
    setNonActiveDialog(true);
  };

  const handleCloseNonActiveDialog = () => {
    setNonActiveDialog(false);
  };

  const handleNonActiveProduct = async () => {
    const data = await patchData("products/nonActive", {
      productIds: selectedProductIds,
    });
    if (data.success) {
      toast.success(data.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseNonActiveDialog();
      setSelectedProductIds([]);
      return router.push("/admin/products/");
    }
  };

  const handleActiveProduct = async () => {
    const data = await patchData("products/active", {
      productIds: selectedProductIds,
    });
    if (data.success) {
      toast.success(data.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseActiveDialog();
      setSelectedProductIds([]);
      return router.push("/admin/products/");
    }
  };

  const handleDeleteProduct = async () => {
    const data = await deleteData("products/delete", {
      productIds: selectedProductIds,
    });
    if (data.success) {
      toast.success(data.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseDeleteDialog();
      setSelectedProductIds([]);
      return router.push("/admin/products/");
    }
  };

  // const handleLimitChange = (event) => {
  //   setLimit(event.target.value);
  // };

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage);
  // };

  return (
    <>
      <Head>
        <title>S???n Ph???m - Beeyou</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                Danh s??ch s???n ph???m
              </Typography>
              <Box sx={{ m: 1 }}>
                <NextLink href="/admin/products/create" passHref>
                  <Button color="primary" variant="contained" sx={{ mr: 1 }}>
                    T???o s???n ph???m
                  </Button>
                </NextLink>
                <NextLink href="/admin/products/trash" passHref>
                  <Button color="error" variant="contained">
                    Th??ng r??c
                  </Button>
                </NextLink>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      m: -1,
                    }}
                  >
                    <Box sx={{ maxWidth: 500 }}>
                      <TextField
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon fontSize="small" color="action">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Search product"
                        variant="outlined"
                      />
                    </Box>
                    {selectedProductIds.length > 0 && (
                      <Box sx={{ m: 1 }}>
                        <Button
                          color="primary"
                          variant="contained"
                          sx={{ mr: 1 }}
                          onClick={handleOpenNonActiveDialog}
                        >
                          ???n s???n ph???m
                        </Button>
                        <Dialog
                          open={nonActiveDialog}
                          TransitionComponent={Transition}
                          keepMounted
                          onClose={handleCloseNonActiveDialog}
                          aria-describedby="active-dialog"
                        >
                          <DialogTitle>???n s???n ph???m</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="active-dialog">
                              B???n c?? ?????ng ?? ???n {selectedProductIds.length} s???n
                              ph???m.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={handleCloseNonActiveDialog}
                            >
                              H???y
                            </Button>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={handleNonActiveProduct}
                            >
                              ?????ng ??
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <Button
                          color="primary"
                          variant="contained"
                          sx={{ mr: 1 }}
                          onClick={handleOpenActiveDialog}
                        >
                          ????ng b??n
                        </Button>
                        <Dialog
                          open={activeDialog}
                          TransitionComponent={Transition}
                          keepMounted
                          onClose={handleCloseActiveDialog}
                          aria-describedby="active-dialog"
                        >
                          <DialogTitle>K??ch ho???t s???n ph???m</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="active-dialog">
                              B???n c?? ?????ng ?? k??ch ho???t{" "}
                              {selectedProductIds.length} s???n ph???m.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={handleCloseActiveDialog}
                            >
                              H???y
                            </Button>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={handleActiveProduct}
                            >
                              ?????ng ??
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <Button
                          color="error"
                          variant="contained"
                          onClick={handleOpenDeleteDialog}
                        >
                          X??a s???n ph???m
                        </Button>

                        <Dialog
                          open={deleteDialog}
                          TransitionComponent={Transition}
                          keepMounted
                          onClose={handleCloseDeleteDialog}
                          aria-describedby="delete-dialog"
                        >
                          <DialogTitle>X??a s???n ph???m</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="delete-dialog">
                              B???n c?? ?????ng ?? x??a {selectedProductIds.length} s???n
                              ph???m.<br></br> S???n ph???m sau khi x??a s??? v??o th??ng
                              r??c
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={handleCloseDeleteDialog}
                            >
                              H???y
                            </Button>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={handleDeleteProduct}
                            >
                              ?????ng ??
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={
                              selectedProductIds.length === products.length
                            }
                            color="primary"
                            // indeterminate={
                            //   selectedProductIds.length > 0 &&
                            //   selectedProductIds.length < products.length
                            // }
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>T??n s???n ph???m</TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          S??? l?????ng bi???n th???
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          Gi??
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          ???? b??n
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          Tr???ng th??i
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow
                          hover
                          key={product._id}
                          selected={
                            selectedProductIds.indexOf(product._id) !== -1
                          }
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={
                                selectedProductIds.indexOf(product._id) !== -1
                              }
                              onChange={(event) =>
                                handleSelectOne(event, product._id)
                              }
                              value="true"
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Avatar
                                src={product.variant[0].img}
                                sx={{ mr: 2 }}
                                variant="square"
                              ></Avatar>
                              <NextLink
                                href={`/admin/products/${product.slug}/edit`}
                              >
                                <Typography
                                  color="textPrimary"
                                  variant="body1"
                                  style={{ cursor: "pointer" }}
                                >
                                  {product.title}
                                </Typography>
                              </NextLink>
                            </Box>
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {product.variant.length}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {product.price} ???
                          </TableCell>

                          <TableCell style={{ textAlign: "center" }}>
                            {product.sold}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {product.checked ? "????ng b??n" : "???n"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              {/* <TablePagination
        component="div"
        count={products.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Products;
