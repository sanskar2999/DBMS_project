import React,{useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/';
import {
  Globe as GlobeIcon
} from 'react-feather';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    no_admins:0,
  });
  
    useEffect(() => {
      fetch('http://localhost:5000/admin')
        .then(resp => resp.json())
        .then(data => {
          setValues({
            no_admins: data.length,
          });
        })
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
              ORGANISATIONS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {values.no_admins}       
              </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <GlobeIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
