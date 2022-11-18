import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDrawerOpen } from "../model/globalStateSlice";
import { loginUser } from "../model/UserSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../API/user/Login";
import ErrorLabel ,{errorCodesLabels} from "../generalComponents/ErrorLabel";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalState.value);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(0); // 0 means no error
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(
    () => setError(0),
    [username, password, globalState.loginDrawerOpen]
  );

  useEffect(() =>{
    if (error!== 0){
      setSnackBarOpen(true);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await login({ username, password });
    console.log(res);
    if (res?.success) {
      dispatch(setLoginDrawerOpen(false));
      dispatch(loginUser(res?.data));
      navigate(routes.home);
    } else {
      setError(res?.data?.response?.status ?? res?.data?.code);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 10 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username / Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {!!error && <ErrorLabel errCode={error}></ErrorLabel>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* <MuiLink variant="body2"> */}
                <Link
                  style={{ color: "black" }}
                  onClick={() => dispatch(setLoginDrawerOpen(false))}
                  to="sign_up"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
                {/* </MuiLink> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        // message={<ErrorLabel errCode={error}></ErrorLabel>}
        // key={}
      >
              <Alert severity="error">{errorCodesLabels[error]}</Alert>

      </Snackbar>
    </ThemeProvider>
  );
};
export default SignIn;
