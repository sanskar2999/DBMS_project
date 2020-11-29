import React, { useState , useEffect} from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100% '
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

  return (
    <Page
      className={classes.root}
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (  
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
          </Grid>
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
