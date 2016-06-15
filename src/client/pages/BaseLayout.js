import React, { Component } from 'react';

const footerStyle = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '60px',
  backgroundColor: 'f5f5f5',
  textAlign: 'center'
};

const footerTextStyle = {
  marginTop: '20px',
  marginBottom: '20px'
};

const containerStyle = {
  marginBottom: '60px'
};

export default (props) => {
  return (
    <div>
      <div className='container' style={containerStyle}>
        {props.children}
      </div>
      <footer style={footerStyle}>
        <div className='container'>
          <p style={footerTextStyle}>Made with <span style={{color: "red"}}>&hearts;</span> by <a href="https://github.com/hkal">hkal</a></p>
        </div>
      </footer>
    </div>
  );
};
