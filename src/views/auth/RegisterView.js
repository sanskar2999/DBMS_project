import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Link,
  TextField,
  Typography,
  makeStyles,
  withWidth
} from '@material-ui/core';
import Page from 'src/components/Page';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // marginTop: 50+"px",
    height: '100%',
    marginBottom: 0+"px",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  var FormData = require('form-data');
  var file;

  const [member, setMember] = React.useState('');

  const handlechange = (event) => {
    setMember(event.target.value);
  };


  const [option, setOption] = useState()

  function handlerChange(event) {
    setOption(event.target.value)
  }
  function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      file = image;
    }

    reader.readAsDataURL(image)
  }

  return (
    <Page
      className={classes.root}
      title="Register"
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
              firstName: '',
              password: '',
              member: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                password: Yup.string().max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(value) => {
              console.log(member);
              var data = JSON.stringify({ "email": value.email, "password": value.password, "role": member });
              var axios = require('axios');
              
              var config = {
                method: 'post',
                url: 'http://localhost:5000/user/signup',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: data
              };
              axios(config)
                .then(function (response) {
                  var data_customer = new FormData();
                  console.log(file);
                  localStorage.clear();
                        data_customer.append('image', file);
                        data_customer.append('name', value.firstName);
                        data_customer.append('email', value.email);
                  console.log('Sign Up successful');
                  console.log(JSON.stringify(response.data));
                  if (member == 'customer') {
                    var config = {
                      method: 'post',
                      url: 'http://localhost:5000/customer/add',
                      
                      data: data_customer
                    };
                    
                    axios(config)
                      .then(function (res) {
                        navigate('/customer/dashboard', { replace: true });
                        console.log(JSON.stringify(res.data));
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                  } else {
                    var config = {
                      method: 'post',
                      url: 'http://localhost:5000/admin/add',
                      
                      data : data_customer
                    };
                    
                    axios(config)
                      .then(function (response) {
                        navigate('/app/dashboard', { replace: true });
                      console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                    
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
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                    <div  >
                    <img src="static/images/logo.png" style={{ justifyItems:"center", justifyContent:"center", width:"30%", display: "block",margin:"auto", marginTop:20+"px"}}></img>
                    {/* <h3 style={{fontSize:60+"px", textAlign:"center",marginTop: -100+"px",marginLeft: 50+"px",textShadow:" 0 8.36px 5.896px #4287f5,0 -2px 1px #010a17"}}>CERTIFY US</h3> */}
                  </div>
                  <br></br>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                  </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="Full Name"
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
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
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Member</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={member}
                      onChange={handlechange}
                      label="Member"
                      name="member"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='customer'>Customer</MenuItem>
                    </Select>
                  </FormControl>
                  <div style={{ marginTop: 10 + "px", marginBottom: 10 + "px", marginLeft: 20 + "px" }}>
                    <span style={{ fontSize: 15 + "px", fontFamily: "monospace" }}><b>Upload Your Profile Picture:-</b></span>
                    <input
                      accept="image/*"
                      type="file"
                      style={{ marginLeft: 10 + "px" }}
                      onChange={_handleImageChange}
                      name="avatar"
                    />
                  </div>
                  <Box
                    alignItems="center"
                    display="flex"
                    ml={-1}
                  >
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      I have read the
                    {' '}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                    </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>
                      {errors.policy}
                    </FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={isSubmitting}
                    >
                      Sign up now
                  </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Have an account?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="h6"
                    >
                      Sign in
                  </Link>
                </Typography>
                <br>
                </br>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
