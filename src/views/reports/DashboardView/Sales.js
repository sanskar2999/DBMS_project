import React, {useEffect,useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowRight';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import jwt_decode from "jwt-decode";
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Sales = ({ className, ...rest }) => {
  var role = "";
  var email_id = "";
  var decoded;
  const classes = useStyles();
  const [certificates_list, setCertificates] = useState([]);
  const [values, setLoading] = useState({
    loading: true,
  });
  const theme = useTheme();
  var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var d = new Date();
  var s=d.getMonth();
  var i;
  var monthnames=[];
  for(i=0;i<6;i++){
    if(s-i<0){
      s=11;
    }
    monthnames.push(months[s]);
    s--;
  }

  useEffect(() => {
    role = localStorage.getItem('role');
    console.log(role);
    decoded = jwt_decode(localStorage.getItem('token'));
    email_id = decoded.email;
    console.log(email_id);
    
    fetch(`http://localhost:5000/${role}/${email_id}`)
      .then(resp => resp.json())
      .then(data => data.map(async(info) => {
        await setCertificates(info.certificates);
        setLoading({
          loading:false
        });
      }))
  },[])

  var month_no;
  var no_of_certificates=[0,0,0,0,0,0];

    certificates_list.map((certificate)=>{
      console.log(certificate)
      s=d.getMonth()+1;
     month_no = parseInt(certificate.substring(5,7));
     console.log(month_no);
  
     if(month_no==s){
       no_of_certificates[0]++;
     }else if(s-1==0){
       s=12;
       if(month_no==s-1)
       no_of_certificates[1]++;
     }else if(s-2==0){
       s=12;
       if(month_no==s-2)
      no_of_certificates[2]++;
    }else if(s-3==0){
      s=12;
      if(month_no==s-3)
      no_of_certificates[3]++;
    }
    else if(s-4==0){
      s=12;
      if(month_no==s-4)
      no_of_certificates[4]++;
    }
    else if(s-5==0){
      s=12;
      if(month_no==s-5)
      no_of_certificates[5]++;
    }
    })
  

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [no_of_certificates[0],no_of_certificates[1], no_of_certificates[2], no_of_certificates[3], no_of_certificates[4], no_of_certificates[5]],
        label: 'This month'
      },
    ],
    labels: monthnames
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
            Last 6 months
          </Button>
        )}
        title={role=='admin'? "CERTIFICATES GENERATED": "CERTIFICATED EARNED"}
      />
      <Divider />
      {values.loading? <center><Loader type="Audio" color="#00BFFF" height={80} width={80} style={{margin:100+"px"}} /></center> :

      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
}
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
          Overview
        </Button>
      </Box>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
