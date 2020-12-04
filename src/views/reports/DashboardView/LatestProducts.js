import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
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

const data = [
  {
    id: uuid(),
    name: 'Template 1',
    imageUrl: '/static/images/products/Certificate1.jpeg',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Template 2',
    imageUrl: '/static/images/products/Certificate2.jpeg',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Template 3',
    imageUrl: '/static/images/products/Certificate3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Template 4',
    imageUrl: '/static/images/products/Certificate4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'Template 5',
    imageUrl: '/static/images/products/Certificate5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];

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
  products.length = 5;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="LATEST 5 TEMPLATES "
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
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
      <Divider />
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
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
