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
<<<<<<< HEAD
   
    <span style={{fontSize:1.3+'em', fontFamily: 'cursive' , marginLeft:10+'px'}} >
        CERTIFY US
    </span>
=======
    <h3 className={classes.name}>
        Certify Us
    </h3>
>>>>>>> 120c57bba2b7b16347d63aa0a0643abdb5dcf8c8
  );
};

export default Name;
