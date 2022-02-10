import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { HelpOutline } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { changeToSlug } from "../../../../utils/changeToSlug";
import Image from "next/image";
import { getData, patchData } from "../../../../utils/fecthData";
import { validateProduct } from "../../../../utils/validate";
import { toast } from "react-toastify";
import { imageUpload } from "../../../../utils/imageUpload";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const res = await getData("products");

  const paths = res.products.map((product) => {
    return { params: { slug: product.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await getData("collections");
  const res = await getData(`products/admin/${context.params.slug}`);
  return {
    props: { categories: data.categories, product: res.product },
  };
}

export default function ProductEdit({ categories, product }) {
  const [values, setValues] = useState({
    title: product.title,
    shortDescription: product.shortDescription,
    price: product.price,
  });

  const [checked, setChecked] = useState(product.checked);
  const [category, setCategory] = useState(product.category);

  const [tag, setTag] = useState(product.tag);

  const [size, setSize] = useState(product.size);

  const [variant, setVariant] = useState(product.variant);

  const [description, setDescription] = useState(product.description);

  const router = useRouter();

  //Ckeditor
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const handleChange = (event) => {
    if (event.target.name === "checked") {
      setValues({ ...values, checked: values.checked });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleAddNewVariant = () => {
    const newListVariant = [
      ...variant,
      {
        title: "",
        img: "",
      },
    ];
    setVariant(newListVariant);
  };

  const handleDeleteVariant = (index) => {
    const newListVariant = [...variant];
    newListVariant.splice(index, 1);
    setVariant(newListVariant);
  };

  const handleChangeFieldOfVariantItem = (index, nameField) => (e) => {
    let newListVariant = variant.map((item, i) => {
      if (index === i) {
        return { ...item, [nameField]: e.target.value };
      } else {
        return item;
      }
    });
    setVariant(newListVariant);
  };

  const handleChangeFileImage = (index, fileImage) => (e) => {
    let newListVariant = variant.map((item, i) => {
      if (index === i) {
        return { ...item, [fileImage]: e.target.files[0] };
      } else {
        return item;
      }
    });
    setVariant(newListVariant);
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const status = validateProduct({
      ...values,
      category,
      size,
      description,
      variant,
      slug: changeToSlug(values.title),
    });

    if (status === 1) {
      const tmp = await imageUpload(variant, category);

      const res = await patchData("products/edit", {
        product: {
          ...values,
          category,
          size,
          description,
          variant: tmp,
          slug: changeToSlug(values.title),
          checked,
          _id: product._id,
          tag,
        },
      });

      if (res.success) {
        toast.success(res.success, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/admin/products");
      } else {
        toast.error(res.err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error(status, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const showVariant = (variant) => {
    return (
      <Grid container>
        {variant.map((item, index) => (
          <Grid item xs={6} key={item.img + index}>
            <CardContent className="add-variant-info">
              <Grid container spacing={3}>
                <Tooltip
                  title="Xoá biến thể"
                  className="delete-variant-photo-btn"
                >
                  <IconButton
                    color="secondary"
                    component="span"
                    onClick={() => handleDeleteVariant(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                {item.img != "" ? (
                  <Grid item xs={12}>
                    <div className="upload-photo-variant-wrapper">
                      <Image
                        src={
                          item.public_id
                            ? item.img
                            : URL.createObjectURL(item.img)
                        }
                        width={300}
                        height={300}
                        alt=""
                      />
                      <label htmlFor="upload-photo-edit">
                        <input
                          style={{ display: "none" }}
                          id="upload-photo-edit"
                          name="upload-photo-edit"
                          type="file"
                          onChange={handleChangeFileImage(index, "img")}
                        />
                        <Tooltip
                          title="Thay đổi ảnh"
                          className="edit-variant-photo-btn"
                        >
                          <IconButton color="secondary" component="span">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </label>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <label
                      htmlFor="upload-photo"
                      className="upload-photo-variant-wrapper"
                    >
                      <AddPhotoAlternateIcon className="upload-variant-photo-svg" />

                      <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={handleChangeFileImage(index, "img")}
                      />
                      <Button
                        color="secondary"
                        component="span"
                        className="css-center-choose-image"
                      >
                        <AddIcon /> Choose Photo Product
                      </Button>
                    </label>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên biến thể"
                    onChange={handleChangeFieldOfVariantItem(index, "title")}
                    required
                    value={item.title}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Head>
        <title>Chỉnh sửa sản phẩm - BeeYou</title>
        <meta name="keywords" content="BeeYou"></meta>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Chỉnh sửa sản phẩm
          </Typography>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item lg={8} md={6} xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="Thông tin chung"
                        style={{ padding: "16px" }}
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Tên sản phẩm"
                              name="title"
                              onChange={handleChange}
                              required
                              value={values.title}
                              variant="outlined"
                              placeholder="Nhập tên sản phẩm"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Đường dẫn"
                              name="slug"
                              required
                              disabled
                              value={changeToSlug(values.title)}
                              variant="outlined"
                              placeholder="Nhập đường dẫn"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            {editorLoaded ? (
                              <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onReady={(editor) => {
                                  // You can store the "editor" and use when it is needed.
                                  //console.log("Editor is ready to use!", editor);
                                  editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                      "height",
                                      "300px",
                                      editor.editing.view.document.getRoot()
                                    );
                                  });
                                }}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setDescription(data);
                                }}
                              />
                            ) : (
                              <p>Loading...</p>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Trích dẫn"
                              name="shortDescription"
                              onChange={handleChange}
                              type="text"
                              value={values.shortDescription}
                              variant="outlined"
                              placeholder="Nhập trích dẫn"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="Biến thể"
                        style={{ padding: "5px 20px" }}
                        action={
                          <Tooltip title="Thêm biến thể mới">
                            <IconButton
                              color="secondary"
                              variant="contained"
                              onClick={handleAddNewVariant}
                            >
                              <AddBoxIcon
                                style={{ width: "30px", height: "30px" }}
                              />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                      <Divider />
                      {showVariant(variant)}
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="Danh mục sản phẩm"
                        style={{ padding: "16px" }}
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Autocomplete
                              name="a"
                              id="tags-filled"
                              onChange={(event, value) => setCategory(value)}
                              options={categories}
                              getOptionLabel={(option) => option.title || ""}
                              isOptionEqualToValue={(option, value) =>
                                option.title === value.title
                              }
                              value={category}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Danh mục sản phẩm"
                                  placeholder="Nhập danh mục sản phẩm"
                                  required
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title="Tag" style={{ padding: "16px" }} />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Autocomplete
                              multiple
                              name="a"
                              id="tags-filled"
                              onChange={(event, value) => setTag(value)}
                              options={[]}
                              value={tag}
                              freeSolo
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    key={index}
                                    label={option}
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Tag"
                                  placeholder="Nhập tag sản phẩm"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="Giá sản phẩm"
                        style={{ padding: "16px" }}
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Giá sản phẩm"
                              name="price"
                              onChange={handleChange}
                              required
                              type="number"
                              value={values.price}
                              variant="outlined"
                              placeholder="Nhập giá sản phẩm"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="Kích thước"
                        style={{ padding: "16px" }}
                        action={
                          <Tooltip
                            title="Nhập size/ kích thước nếu có"
                            placement="top"
                            arrow
                          >
                            <HelpOutline style={{ fontSize: "14px" }} />
                          </Tooltip>
                        }
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Autocomplete
                              multiple
                              id="tags-filled"
                              onChange={(event, value) => setSize(value)}
                              options={[]}
                              value={size}
                              freeSolo
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    key={index}
                                    label={option}
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Kích thước"
                                  placeholder="Nhập kích thước sản phẩm"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            {" "}
                            {/* <FormControlLabel
                              control={
                                <Checkbox
                                  check={checked}
                                  name="checked"
                                  onChange={() => setChecked(!checked)}
                                />
                              }
                              label="Đăng bán"
                            /> */}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                >
                  <Button color="primary" variant="contained" type="submit">
                    Chính sửa sản phẩm
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
}

ProductEdit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
