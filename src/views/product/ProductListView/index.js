import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import {useNavigate } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import {
  Box,
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  Modal,
  Typography,
} from '@material-ui/core';
import logo from 'src/images/cartoon.jpg';


import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: '100% '
  }
}));

var templates = [];



const ProductList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [searchvalue, setSearch]= useState('');
  const [values, setLoading] = useState({
    loading: true,
  });
  const [open_value, setOpen]=useState({
    open:false,
  });
  const [alert, setAlert]=React.useState(false);
  
  const classes = useStyles();
  useEffect(() => {
    templates=[];
    fetch('http://localhost:5000/templates/')
      .then(resp => resp.json())
      .then(data => data.map(async(images) => {

        console.log(images.url);
        await templates.push({
          id: '12',
          media: 'http://localhost:5000/' + images.url,
          title: images.name,
        })
        setItems(templates)
        setLoading({
          loading:false,
        })
      }))
},[])
  // const [products] = useState(templates);

  function editSearchTerm(e){
    setSearch(e.target.value);
  }
  
  function dynamicSearch(){
    return items.filter(items=>items.title.toLowerCase().includes(searchvalue.toLowerCase()))
  }

  function handlecheck(){
    setOpen({
      open:true,
    })
  }

  function handleclose(){
    setOpen({
      open:false,
    })
  }
  var file;

 function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      file = image;
    };

    reader.readAsDataURL(image);
  }

  function addtodatabase(){
    if(file!=null){
      console.log(file);
      var axios = require('axios');
      var FormData = require('form-data');
      var data = new FormData();
      data.append('file', file);
      data.append('name', 'Template ' + (items.length+1));
      
      var config = {
        method: 'post',
        url: 'http://localhost:5000/templates/add',
        data : data
      };
      
      axios(config)
      .then(function (response) {
        navigate('/app/dashboard', { replace: true });
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }else{
    handleclose();
    setAlert(true);
  }
}

  return (
    <Page
      className={classes.root}
    >
       <Container maxWidth={false}>
       <Box
        display="flex"
        justifyContent="flex-end"
      >
        
        <Button
          color="primary"
          variant="contained"
          onClick={handlecheck}
        >
                  Add Template
        </Button>
        
      </Box>
     
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="SEARCH TEMPLATE"
                variant="outlined"
                type='text'
                value={searchvalue}
                onChange={editSearchTerm}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Collapse in={alert}>
        <Alert severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
             Error 000!!! No file Selected !
        </Alert>
        </Collapse>
        <Box mt={3}>
          {values.loading ? <center><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} style={{marginTop:100+"px"}} /></center> :
            <Grid
              container
              spacing={3}
            >
              {dynamicSearch().map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12} 
                >
                  <ProductCard
                    className={classes.productCard}
                    product={product}
                    />
                </Grid>
              ))}
            </Grid>}
        </Box>
        {/* <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
         */}
        <Modal
                    open={open_value.open}
                    onClose={handleclose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"                   
                    style={{borderRadius:8, marginBottom:100+"px"}}
                  >
                    <div style={{  position: 'absolute', width: 700,  backgroundColor: "white", left: "40%", top: "40%", marginLeft: "-150px",marginTop: "-150px"}}>  

                   <center><img src={logo} alt='template placeholder' style={{borderRadius: "8px" ,width: "40%",height: "40%"}}/></center> 
                        <p id="simple-modal-description">
                        <div
                        style={{
                          
                          marginBottom: 10 + 'px',
                          marginLeft: 20 + 'px',
                        }}
                      >
                     
                          <Typography varient="h3" component="h3" style={{paddingTop:"20px",paddingBottom:"15px",fontSize:"20px"}}>Upload Template file :</Typography>
                       
                        <input
                          accept="image/*"
                          type="file"
                          style={{ marginLeft: 10 + 'px' }}
                          onChange={_handleImageChange}
                          name="templatefile"
                        />
                        <br></br>
                        <center>
                        <Button
          color="primary"
          variant="contained"
          onClick={addtodatabase}
        
        >
                  Submit your Template
        </Button></center>
                      </div>
                      
                              <br></br>
                             
                        </p>
                        
                      </div>
                      
                      
                  </Modal>  

                  
      </Container>
      
    </Page>
    
  );
                      };

export default ProductList;
