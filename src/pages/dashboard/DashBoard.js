import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Table from 'components/table/Table';
import getList from 'js/getList';
import Preloader from 'components/preloader/Preloader';
import SearchChannel from 'components/searchChannel/SearchChannel';
import StreamersContext from 'context/streamersContext';
import splitInto2 from 'js/splitInto2';

//delete after
// import splitInto3 from 'js/splitInto3';
// import getStat from 'js/getStat';
// getStat();

const Dashboard = () => {
    const [streamers, setStreamers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getList()
        .then(dataArr => {
        setStreamers(dataArr);
        setLoading(false);
        });
    }, [])

    return (
        <StreamersContext.Provider value={{ setStreamers }}>
            <SearchChannel />
            {loading && <Preloader />}
            {streamers.length !== 0 && (
                <div className="mainTable">
                    <Table streamers={splitInto2.getFirstPart(streamers)} border={"border-right"} />
                    <Table streamers={splitInto2.getSecondPart(streamers)} border={"border-left"} />
                </div>
            )}
        </StreamersContext.Provider>
    );
};

export default Dashboard;