import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <TopBar /> */}
      {/* <div className={classes.wrapper}> */}

        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div  >
              <img src="static/images/logo.png" style={{ justifyItems:"center",marginLeft: 350+"px",width:"15%",marginTop: 20+"px", display: "flex"}}></img>
              {/* <h3 style={{fontSize:60+"px", textAlign:"center",marginTop: -100+"px",marginLeft: 50+"px",textShadow:" 0 8.36px 5.896px #4287f5,0 -2px 1px #010a17"}}>CERTIFY US</h3> */}
            </div>
            <Outlet />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default MainLayout;
