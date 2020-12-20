import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';


import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Sambhav K Bhandari'
    },
    createdAt: 1555016400000,
    status: 'PENDING'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 7.5,
    customer: {
      name: 'Sanskar Agrawal'
    },
    createdAt: 1554801640000,
    status: 'DELIEVERED'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Shivam'
    },
    createdAt: 1554670800000,
    status: 'DELIEVERED'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);
  
return (
  <container></container>
);
 
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
