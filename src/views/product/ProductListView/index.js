import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
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
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
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
  const [searchvalue, setSearch]= useState('');
  const [values, setLoading] = useState({
    loading: true,
  });
  
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

  return (
    <Page
      className={classes.root}
    >
       <Container maxWidth={false}>
       <Box
        display="flex"
        justifyContent="flex-end"
      >
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add product
        </Button> */}
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
        </Box> */}
      </Container>
    </Page>
  );
};

export default ProductList;
