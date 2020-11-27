import React from 'react';
import './return2Dashbord.css';

const Return2Dashbord = () => {
    let nowURL = new URL(window.location.href);
    return (
        <a href={nowURL.origin} className="return2Dashbord defaultLink" >{"<- все стримеры"}</a>
    )
};

export default Return2Dashbord;