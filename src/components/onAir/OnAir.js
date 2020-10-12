import React from 'react';
import './onAir.css';

const OnAir = ({stream}) => {
    if (stream) {
      return(
        <span className="onAir" >В ЭФИРЕ</span>
      )
    } else {return null}
};

export default OnAir;