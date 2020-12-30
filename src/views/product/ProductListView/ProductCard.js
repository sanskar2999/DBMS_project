import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
  makeStyles,
  Modal,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    objectFit: "contain",
    width: "350px",
    height: "250px",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    fontsize: "1.25rem",
    alignitems: "center",
    flexshrink: "0",
    lineheight: "1",
    userselect: "none",
    borderradius: "50%",
    justifycontent: "center",
  },

  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const [del_icon, setDeleteIcon] = useState(false);
  const navigate = useNavigate();
  const [open_value, setOpen] = useState({
    open: false,
  });

  function deleteTask(name) {
    console.log(name);
    var axios = require("axios");
    var data = JSON.stringify({ name: name });
    var config = {
      method: "post",
      url: "http://localhost:5000/templates/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        navigate("/app/dashboard", { replace: true });
        console.log(JSON.stringify(response.data.message));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  

  function handlecheck() {
    setOpen({
      open: true,
    });
  }

  function handleclose() {
    setOpen({
      open: false,
    });
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <div
          onMouseEnter={() => {
            setDeleteIcon(true);
          }}
          onMouseLeave={() => {
            setDeleteIcon(false);
          }}
        >
          <a href={product.media} target="_blank">
            <Box display="flex" justifyContent="center" mb={6}>
              <Avatar
                className={classes.avatar}
                alt="Product"
                src={product.media}
                variant="square"
                height="400"
                width="400"
              />
            </Box>
          </a>
          {del_icon ? (
            <IconButton
              color="inherit"
              onClick={() => {
                handlecheck();
              }}
              align="center"
              gutterBottom
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {product.title}
            </Typography>
          )}
        </div>
        <Modal
          open={open_value.open}
          onClose={handleclose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ borderRadius: 8, marginBottom: 100 + "px" }}
        >
          <div
            style={{
              position: "absolute",
              width: 700,
              backgroundColor: "white",
              left: "40%",
              top: "60%",
              marginLeft: "-150px",
              marginTop: "-150px",
              padding: "20px",
            }}
          >
            <Typography
              varient="h3"
              component="h3"
              style={{
                paddingTop: "20px",
                paddingBottom: "15px",
                fontSize: "20px",
                justifyContent:"center" ,
                display:"flex"
              }}
            >
              Do you really want to delete this Template ?
            </Typography>
            <div style={{display:"flex", justifyContent:"center" }} >
            <Button color="primary" variant="contained"  onClick={()=>deleteTask(product.title)} style={{margin:"auto"}}
            >
              YES
            </Button>
            <Button color="primary" variant="contained" onClick={()=>handleclose()} style={{margin:"auto"}}
            >
              NO
            </Button>
            </div>
          </div>           
        </Modal>
      </CardContent>
      <Box flexGrow={1} />
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
