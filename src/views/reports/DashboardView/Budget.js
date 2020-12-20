import React, {useEffect,useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));



const Budget = ({ className, ...rest }) => {
  const classes = useStyles();
  var role = "";
  var email_id = "";
  var decoded;
const [values, setValues] = useState({
  no_users:0,
});


  useEffect(() => {
    role = localStorage.getItem('role');
    console.log(role);
    decoded = jwt_decode(localStorage.getItem('token'));
    email_id = decoded.email;
    console.log(email_id);
    
    fetch(`http://localhost:5000/${role}/${email_id}`)
      .then(resp => resp.json())
      .then(data => data.map((info) => {
        setValues({
          no_users: info.certificates.length,
          loading:false
        });
      }))
  },[])
  

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              CERTIFICATES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {values.no_users}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
          {/* <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
