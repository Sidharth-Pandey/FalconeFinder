import React from 'react';

const ErrorPopUp = ({errorMessage, handleClosePopup}) => (
  <div className = 'popup'>
   <h3 className = 'messageContainer'>{errorMessage}</h3>
   <button onClick= {handleClosePopup}>Close</button>
  </div>
);
export default ErrorPopUp;
