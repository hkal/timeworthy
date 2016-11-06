import React from 'react';
import './index.scss';

export default (props) => {
  return (
    <div>
      <div className='container'>
        {props.children}
      </div>
      <footer>
        <p>Made with <span className='heart'>&hearts;</span> by <a href="https://github.com/hkal">hkal</a></p>
      </footer>
    </div>
  );
};
