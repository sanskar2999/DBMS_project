import React, { useState , useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Modal,
  makeStyles
} from '@material-ui/core';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { functions } from 'lodash';

var decoded;

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: "white",
    left: "50%",
    top: "50%", 
    marginLeft: "-150px",
    marginTop: "-150px",
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    firstName: '',
    email: '',
  });

  useEffect(()=>{
    if(localStorage.getItem('token')!=null)
    {
    decoded = jwt_decode(localStorage.getItem('token'));
    }
    fetch('http://localhost:5000/'+decoded.role+"/"+decoded.email)
    .then(resp => resp.json())
    .then(data => data.map((info)=>{
        setValues( {
          firstName: info.name,
          email: info.email,
      });
    }))
  },[])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  function logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function updateProfile(){
    console.log(values.email);
    var data = JSON.stringify({"email": values.email,"name": values.firstName});
    var config;
      
    if(decoded.role=="admin")
    {
      config = {
        method: 'post',
        url: 'http://localhost:5000/admin/update_profile',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    }
    else 
    {  
      config = {
        method: 'post',
        url: 'http://localhost:5000/customer/update_profile',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

    }
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      handleOpen();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function updatePassword() {
    if(values.password==values.confirm)
    { 
      var data = JSON.stringify({"email": values.email,"password": values.password});

      var config = {
        method: 'post',
        url: 'http://localhost:5000/user/updatePassword',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        handleOpen();
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid> */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                disabled
                value={values.email}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid> */}
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        
        <Box
          display="flex"
          justifyContent="left"
          p={2}
          flex="1"
        >
          <Button
            color="primary"
            variant="contained"
            style={{marginRight:560+"px"}}
            onClick={updateProfile}
          >
            Save details
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={logout}
          >
            Logout
          </Button> 
        </Box>
      </Card>
      <br></br>
      <Card >
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={updatePassword}
          >
            Update
          </Button>
        </Box>
      </Card>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
           <div className={classes.paper}>
              <h2 id="simple-modal-title">Update successful</h2>
              <p id="simple-modal-description">
              <div style={{ display:"flex", padding:"10px" }}>
                </div>
                    <br></br>
                    <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      onClick={handleClose}
                    >
                      close 
                    </Button>
              </p>
            </div>
        </Modal>
    </form>
        
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
