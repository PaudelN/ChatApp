import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validator";

const Login = () => {
  const [isLogin, setIslogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIslogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation();
  // const password = useStrongPassword()

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing In...")
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={7}
          sx={{
            padding: 4,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography
                variant="h3"
                sx={{ fontFamily: "Inknut Antiqua,serif", fontSize: 24 }}
              >
                Login
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />{" "}
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography
                  sx={{
                    color: "#9FA21D",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                    fontFamily: "Inknut Antiqua,serif",
                    textAlign: "center",
                  }}
                >
                  Don't have an Account?
                </Typography>
                <Button
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h3"
                sx={{ fontFamily: "Inknut Antiqua,serif", fontSize: 24 }}
              >
                Sign Up
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignup}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "contain",
                      top: "1rem",
                      display: "flex",
                      margin: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "relative",
                      bottom: "1rem",
                      left: "6rem",
                      height: "2rem",
                      width: "2rem",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>{" "}
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    color="error"
                    variant="caption"
                    display={"block"}
                    width={"fit-content"}
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Name"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />{" "}
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Bio"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />{" "}
                <TextField
                  required
                  fullWidth
                  // size="small"
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />{" "}
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  // size="small"
                  margin="normal"
                  label="Password"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                  variant="outlined"
                />
                {/* {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )} */}
                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign In
                </Button>
                <Typography
                  sx={{
                    color: "#9FA21D",
                    fontSize: "12.5px",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                    fontFamily: "Inknut Antiqua,serif",
                    textAlign: "center",
                  }}
                >
                  Already have an Account?
                </Typography>
                <Button
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  disabled={isLoading}
                >
                  Log In
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
