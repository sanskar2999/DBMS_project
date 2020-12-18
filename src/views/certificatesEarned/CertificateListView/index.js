import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import CertificateCard from './CertificateCard';
import jwt_decode from "jwt-decode";
var decoded;

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

var certificates = [];



const CertificateList = () => {
  const [items, setItems] = useState([]);
  const [values, setLoading] = useState({
    loading: true,
  });
  
  const classes = useStyles();
  useEffect(() => {
    if(localStorage.getItem('token')!=null)
    {
    decoded = jwt_decode(localStorage.getItem('token'));
    }
    certificates=[];
    fetch('http://localhost:5000/'+decoded.role+"/"+decoded.email)
      .then(resp => resp.json())
      .then(data => { if(data[0].certificates.length==0)
                        {
                          setLoading({
                            loading:false,
                          })
                        }
                        else
                        {
                          data[0].certificates.map(async(images) => {
                            console.log(images);
                            await certificates.push({
                              id: '12',
                              media: 'http://localhost:5000/' +images,
                              title: " ",
                            })
                            setItems(certificates)
                            setLoading({
                              loading:false,
                            })
                          })
                        }
         }
        )
      },[])
  // const [products] = useState(templates);

  return (
    <Page
      className={classes.root}
    >
       <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {values.loading ? <center><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} style={{marginTop:100+"px"}} /></center> :
            items.length==0 ? <center> <Typography color="textPrimary" gutterBottom variant="h3" > No Certificates Earned </Typography> <img src="https://images.all-free-download.com/images/graphiclarge/error_404_page_not_found_6845510.jpg"/></center>:
            <Grid
              container 
              spacing={3}
            >
              {items.map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                
                  <CertificateCard
                    className={classes.productCard}
                    product={product} />
                
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

export default CertificateList;
