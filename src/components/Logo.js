import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/images/logo1.jpeg"
      height="50"
      width="50"
      {...props}
    />
  );
};

export default Logo;
