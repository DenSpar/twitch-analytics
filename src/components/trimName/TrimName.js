import React from 'react';
import './trimName.css';

const TrimName = (name) => {
    let fullName = "" + name.name;
    if (fullName.length > 13) {
        let shortName = fullName.substr(0, 11) + "...";
        return (
            <p className="table_name tooltip" data-tooltip={fullName}>{shortName}</p>
        )
    } else {
        return (
            <p className="table_name">{fullName}</p>
        )
    }
};

export default TrimName;