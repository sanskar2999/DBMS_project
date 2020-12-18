import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

var users = [];

const CustomerListView = () => {
  const [users_list, setUsers] = useState([]);
  const [values, setLoading] = useState({
    loading: true,
  });

  const classes = useStyles();
  useEffect(() => {
    users=[];
  fetch('http://localhost:5000/customer/')
  .then(resp => resp.json())
  .then(data => data.map( async (list)=>{
      await users.push({
          id: '12',
          avatarUrl: 'http://localhost:5000/'+list.image,
          createdAt: 1555016400000,
          email: list.email,
          name: list.name,
      })
    setUsers(users);
    setLoading({
      laoding:false,
    })
  }))
},[])
  

  return (
    <Page
      className={classes.root}
      // title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          { values.loading ? <center><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} style={{marginTop:100+"px"}} /></center> : <Results customers={users_list} />}
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
