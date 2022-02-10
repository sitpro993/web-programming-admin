import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { postData } from "../utils/fecthData";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ err: "", errCode: 0 });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Sai định dạng email")
        .max(30, "Email phải ít hơn 30 kí tự")
        .required("Email còn thiếu"),
      password: Yup.string()
        .min(6, "Mật khẩu nhiều hơn 6 kí tự")
        .max(30, "Mật khẩu ít hơn 30 kí tự")
        .required("Chưa nhập mật khẩu"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const userData = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      const res = await postData("admin/signin", userData);

      if (res.errCode === 1) {
        resetForm({ email: {}, password: {} });
        return setError(res);
      }
      if (res.errCode === 2) {
        resetForm({ ...values, password: {} });
        return setError(res);
      }

      toast.success(res.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch({
        type: "AUTH",
        payload: {
          token: res.access_token,
          user: res.user,
        },
      });

      Cookie.set("refreshtoken", res.refresh_token, {
        path: process.env.BASE_URL,
        expires: 7,
      });

      localStorage.setItem("firstLogin", true);
    },
  });

  useEffect(() => {
    if (formik.touched.email || formik.touched.password) {
      setError({ err: "", errCode: 0 });
    }
  }, [formik.touched]);

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push("/admin/dashboard");
    }
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>Đăng Nhập - Beeyou</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            {error.errCode !== 0 && (
              <Typography color="error" variant="p">
                {error.err}
              </Typography>
            )}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
