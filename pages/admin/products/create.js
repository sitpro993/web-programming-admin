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
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { HelpOutline } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { changeToSlug } from "../../../utils/changeToSlug";
import Image from "next/image";
import { getData, postData } from "../../../utils/fecthData";
import { validateProduct } from "../../../utils/validate";
import { toast } from "react-toastify";
import { imageUpload } from "../../../utils/imageUpload";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const data = await getData("collections");
  return {
    props: { categories: data.categories },
  };
}

export default function ProductCreate({ categories }) {
  const [values, setValues] = useState({
    title: "",
    shortDescription: "",
    price: "",
  });

  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState([]);

  const [tag, setTag] = useState([]);

  const [size, setSize] = useState([]);

  const [variant, setVariant] = useState([
    {
      title: "",
      img: "",
    },
  ]);

  const [description, setDescription] = useState("");

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

      const res = await postData("products/create", {
        product: {
          ...values,
          category,
          size,
          description,
          variant: tmp,
          slug: changeToSlug(values.title),
          checked,
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
                  title="Xo?? bi???n th???"
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
                        src={URL.createObjectURL(item.img)}
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
                          title="Thay ?????i ???nh"
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
                    label="T??n bi???n th???"
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
        <title>T???o s???n ph???m - BeeYou</title>
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
            T???o s???n ph???m
          </Typography>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item lg={8} md={6} xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="Th??ng tin chung"
                        style={{ padding: "16px" }}
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="T??n s???n ph???m"
                              name="title"
                              onChange={handleChange}
                              required
                              value={values.title}
                              variant="outlined"
                              placeholder="Nh???p t??n s???n ph???m"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="???????ng d???n"
                              name="slug"
                              required
                              disabled
                              value={changeToSlug(values.title)}
                              variant="outlined"
                              placeholder="Nh???p ???????ng d???n"
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
                              label="Tr??ch d???n"
                              name="shortDescription"
                              onChange={handleChange}
                              type="text"
                              value={values.shortDescription}
                              variant="outlined"
                              placeholder="Nh???p tr??ch d???n"
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
                        title="Bi???n th???"
                        style={{ padding: "5px 20px" }}
                        action={
                          <Tooltip title="Th??m bi???n th??? m???i">
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
                        title="Danh m???c s???n ph???m"
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
                                  label="Danh m???c s???n ph???m"
                                  placeholder="Nh???p danh m???c s???n ph???m"
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
                                  placeholder="Nh???p tag s???n ph???m"
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
                        title="Gi?? s???n ph???m"
                        style={{ padding: "16px" }}
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Gi?? s???n ph???m"
                              name="price"
                              onChange={handleChange}
                              required
                              type="number"
                              value={values.price}
                              variant="outlined"
                              placeholder="Nh???p gi?? s???n ph???m"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title="K??ch th?????c"
                        style={{ padding: "16px" }}
                        action={
                          <Tooltip
                            title="Nh???p size/ k??ch th?????c n???u c??"
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
                                  label="K??ch th?????c"
                                  placeholder="Nh???p k??ch th?????c s???n ph???m"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            {" "}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  check={checked}
                                  name="checked"
                                  onChange={() => setChecked(!checked)}
                                />
                              }
                              label="????ng b??n"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid> */}
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
                    T???o s???n ph???m
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

ProductCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
