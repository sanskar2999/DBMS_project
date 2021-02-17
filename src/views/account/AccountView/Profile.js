import React ,{ useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Modal
} from '@material-ui/core';
import jwt_decode from "jwt-decode";
import { functions } from 'lodash';
import axios from 'axios';
import { render } from '@testing-library/react';
var decoded;

const user = {
  avatar: '/static/images/animatedimage.jpg',
  city: 'Indore',
  country: 'India',
  jobTitle: 'Developer',
  name: 'Sambhav K Bhandari',
  timezone: 'GMT 5.30'
};

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
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

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const [ user, setuser] = useState(0);
  const [open, setOpen] = React.useState(false);
  var file;

  useEffect(()=>{
    if(localStorage.getItem('token')!=null)
    {
    decoded = jwt_decode(localStorage.getItem('token'));
    }
    fetch('http://localhost:5000/'+decoded.role+"/"+decoded.email)
    .then(resp => resp.json())
    .then(data => data.map((info)=>{
        setuser( {
          avatar: 'http://localhost:5000/'+info.image,
          jobTitle: decoded.role,
          name: info.name,
          email: info.email,
      });
    }))
  },[])
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      file = image;
    }

    reader.readAsDataURL(image)
  }
  function uploadImages(){
    var data = new FormData();
    data.append('image', file);
    data.append('email', user.email );
    var config;

    if(user.jobTitle=="customer")
    {
      config= {
        method: 'post',
        url: 'http://localhost:5000/customer/updateProfilePicture',
        data : data
      };
    }
    else 
    {
      config= {
        method: 'post',
        url: 'http://localhost:5000/admin/updateProfilePicture',
        data : data
      }; 
    }
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setOpen(false);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography> */}
          {/* <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={handleOpen}
        >
          Upload picture
        </Button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
           <div className={classes.paper}>
              <h2 id="simple-modal-title">Change your picture :</h2>
              <p id="simple-modal-description">
              <div style={{ display:"flex", padding:"10px" }}>
                <span> <Typography varient="h5" component="h5" style={{fontSize:"18px"}}>
                       Upload your picture 
                      </Typography> </span> 
                    <input
                      accept="image/*"
                      type="file"
                      style={{marginTop:"3px",marginLeft:"3px"}}
                      onChange={_handleImageChange}
                      name="avatar"
                    />
                </div>
                    <br></br>
                    <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      onClick={uploadImages}
                    >
                      Upload picture  
                    </Button>
              </p>
            </div>
        </Modal>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
