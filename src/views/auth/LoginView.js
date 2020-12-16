import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  CardContent,
  Typography,
  makeStyles,
  Card
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { values, valuesIn } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card:{
    justifyItems:"center",
    textAlign: "center", 
    display: "block",
    margin:"auto",
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  var axios = require('axios');
  

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(value) => {
              console.log('hey');
              console.log(value.email);
              console.log(value.password);
              var data = JSON.stringify({ "email": value.email, "password": value.password });
              
              var config = {
                method: 'post',
                url: 'http://localhost:5000/user/login',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: data
              };
              
              axios(config)
                .then(function (response) {
                  if (response.data.message == "Auth successful") {
                    localStorage.clear();
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", response.data.role);
                    if (response.data.role == "admin") {
                      navigate('/app/dashboard', { replace: true });
                    } else if (response.data.role == "customer") {
                      navigate('/customer/dashboard', { replace: true });
                    }
                  } else {
                  
                  }
                })
                .catch(function (error) {
                  
                  console.log(error);
                });
              
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Card className={classes.card}>
                <br></br>
                <Typography variant="h2" component="h2">
                    Login
                          </Typography>
                <CardContent>
                  
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <div  >
                        <img src="static/images/logo.png" style={{ justifyItems: "center", textAlign: "center", width: "30%", display: "block", margin: "auto" }}></img>
                        {/* <h3 style={{fontSize:60+"px", textAlign:"center",marginTop: -100+"px",marginLeft: 50+"px",textShadow:" 0 8.36px 5.896px #4287f5,0 -2px 1px #010a17"}}>CERTIFY US</h3> */}
                      </div>
                      {/* <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography> */}
                    </Box>
                
                
                    <Box
                      mt={3}
                      mb={1}
                    >
                  
                    </Box>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      id="myInput"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <input type="checkbox" onclick="myFunction()" style={{ marginRight: 5 + 'px'}} />
                    <span>Show Password</span>
                    <Box my={2}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={isSubmitting}
                      >
                        Sign in now
                  </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Don&apos;t have an account?
                  {' '}
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="h6"
                      >
                        Sign up
                  </Link>
                    </Typography>
                  </form>
                </CardContent>
              </Card>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
