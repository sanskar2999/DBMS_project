import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(({
  root: {
    height: '100%',
  },
  image: {
    height: 48,
    width: 52,
  }
}));

var templates = [];

const LatestProducts = ({ className, ...rest }) => {
  const [items, setTemplates] = useState([]);
  const [values, setLoading] = useState({
    loading: true,
  });
  const navigate = useNavigate();

  

  const classes = useStyles();
  useEffect(() => {
    templates=[];
  fetch('http://localhost:5000/templates/')
  .then(resp => resp.json())
  .then(data => data.map(async(images)=>{
    console.log(images.url);
      await templates.push({
        id: '12',
        media: 'http://localhost:5000/'+images.url,
        title: images.name,
      })
    
    setTemplates(templates)
    setLoading({
      loading:false,
    })
    
  }))
},[])
  if(items.length>5){
    items.length=5;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${items.length} in total`}
        title={`LATEST ${items.length} TEMPLATE`}
      />
      <Divider />
      {values.loading? <center><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} style={{margin:100+"px"}} /></center> : 
      <List>
        {items.map((product, i) => (
          <ListItem
            divider={i < items.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.media}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.title}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
}
      <Divider />
      {localStorage.getItem('role')=='admin'?
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={(()=>{
            navigate('/app/templates', { replace: true })
          })}
        >
          View all
        </Button>
      </Box>
      :
      <container></container>}
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
