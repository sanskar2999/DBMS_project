import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import {
  Box,
  Container,
  makeStyles,
  Card,
  InputAdornment,
  SvgIcon,
  CardContent,
  TextField,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { Search as SearchIcon } from 'react-feather';

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
  // const [name_list, setNames] = useState([]);
  const [searchvalue, setSearch]= useState('');
  const [values, setLoading] = useState({
    loading: true,
  });

  const classes = useStyles();
  useEffect(() => {
    users=[];
  fetch('http://localhost:5000/customer/')
  .then(resp => resp.json())
  .then(data => data.map(async (list)=>{
      await users.push({
          id: '12',
          avatarUrl: 'http://localhost:5000/'+list.image,
          createdAt: 1555016400000,
          email: list.email,
          name: list.name,
      })
    setUsers(users);
    setLoading({
      loading:false,
    });
  }))
},[])

function editSearchTerm(e){
  setSearch(e.target.value);
}

function dynamicSearch(){
  return users_list.filter(users=>users.name.toLowerCase().includes(searchvalue.toLowerCase()))
}
  

  return (
    <Page
      className={classes.root}
      // title="Customers"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
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
                placeholder="Search for the Name!"
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
          { values.loading ? <center><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} style={{marginTop:100+"px"}} /></center> : <Results customers={dynamicSearch()} />}
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
