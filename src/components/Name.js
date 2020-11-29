import React from 'react';
import {
  makeStyles
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
  name: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    },
}));

const Name = (props) => {
  const classes = useStyles();
  return (
    <h3 className={classes.name}>
        Certify Us
    </h3>
  );
};

export default Name;
