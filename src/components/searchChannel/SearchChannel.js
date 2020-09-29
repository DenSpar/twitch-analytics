import React, { Fragment, useState } from 'react';
import Table from 'components/table/Table';
import './searchChannel.css';
import Preloader from 'components/preloader/Preloader';

var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';

let searchChannelByName = (name) => {
  return new Promise((resolve, reject) => {
    api.search.channels({ query: name }, (err, res) => {
      //поиск канала по имени
      if(err) {
          console.log(err);
      } else {
          console.log('search', res);
          resolve(res);
      };
    });
  });
};

const SearchChannel = () => {
    const [searchState, setSearchState] = useState([]);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = (event) => {
      event.preventDefault();

      if (value.trim()) {
        setLoading(true);
        searchChannelByName(value)
        .then(searchRes => {
          console.log("find", searchRes);
          setSearchState(searchRes.channels);
        })
        .then(data => {
          console.log("after setState", data);
          setLoading(false);
          setValue('');
        })
      };
    };

    return (
      <Fragment>
        <div className="search_container">
          <p className="search_head">Искать канал по названию</p>
          <form onSubmit={submitHandler}>
            <input className="search_input" placeholder="Введите название" value={value} 
            onChange={event => (setValue(event.target.value))} />
            <button className="greenBtn">Искать</button>
          </form>
        </div>
        <Table streamers={searchState} />
        {loading && <Preloader />}
      </Fragment>
    )
};

export default SearchChannel;