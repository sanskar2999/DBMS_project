import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    objectFit: 'contain',
    width: '350px',
    height: '250px',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    fontsize: '1.25rem',
    alignitems: 'center',
    flexshrink: '0',
    lineheight: '1',
    userselect: 'none',
    borderradius: '50%',
    justifycontent: 'center'
  },

  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CertificateCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={6}
        >
          <Avatar className={classes.avatar}
            alt="Product"
            src={product.media}
            variant="square"
            height= '400'
            width='400'
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
    </Card>
  );
};

CertificateCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default CertificateCard;
