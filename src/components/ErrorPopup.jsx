import React from 'react';

const ErrorPopUp = ({errorMessage, handleClosePopup}) => (
  <div className = 'popup'>
   <h3 className = 'messageContainer'>{errorMessage}</h3>
   <button className="btn btn-primary" onClick= {handleClosePopup}>Close</button>
  </div>
);
export default ErrorPopUp;
