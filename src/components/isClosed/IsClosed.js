import React from 'react';
import './isClosed.css';

const IsClosed = ({isClosed}) => {
    if (isClosed) {
      return(
        <span className="closedChannel">ЗАКРЫТ</span>
      )
    } else {return null}
};

export default IsClosed;