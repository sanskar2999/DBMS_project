import React, { useState , useEffect} from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  makeStyles,
  Button,
  IconButton
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  productCard: {
    height: '100% '
  },
  input: {
    display: 'none',
  }
}));

var templates=[];

const ProductList = () => {
  const classes = useStyles();
  useEffect(() => {
    templates=[];
  fetch('http://localhost:5000/templates/')
  .then(resp => resp.json())
  .then(data => data.map((images)=>{
     console.log(images.url);
      templates.push({
        id: '12',
        media: 'http://localhost:5000/'+images.url,
        title: images.name,
      })
  }))
},[])
  const [products] = useState(templates);

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }

  return (
    <Page
      className={classes.root}
    >
      <Container maxWidth={false}>
        
        <Box mt={3}>
           
        <TextField
          label="Signature"
          id="outlined-margin-normal"
        
          className={classes.textField}
          helperText="Signature : Your Name "
          margin="normal"
          variant="outlined"
        />
        </Box>

        
        <Box mt={3}>
           

        <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload CSV 
        </Button>
      </label>
  
    </div>
        </Box>

        <Box
          display="left"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
        
      </Container>
    </Page>
  );
};

export default ProductList;
