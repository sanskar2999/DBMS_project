import React, { useState , useEffect } from 'react';
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

var users=[];

const CustomerListView = () => {
  const classes = useStyles();
  useEffect(() => {
    users=[];
  fetch('http://localhost:5000/customer/')
  .then(resp => resp.json())
  .then(data => data.map((list)=>{
      users.push({
          id: '12',
          address: {
            country: 'India',
            state: 'Madhya Pradesh',
            city: 'Indore',
            street: 'Gumasta Nagar'
          },
          avatarUrl: 'http://localhost:5000/'+list.image,
          createdAt: 1555016400000,
          email: list.email,
          name: list.name,
          phone: '9898989899'
      })
  }))
},[])
  const [customers] = useState(users);

  return (
    <Page
      className={classes.root}
      // title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
