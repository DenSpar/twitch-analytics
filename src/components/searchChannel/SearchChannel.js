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
          // console.log('search', res);
          resolve(res);
      };
    });
  });
};

const SearchChannel = () => {
    const [searchState, setSearchState] = useState({channels:[]});
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const submitHandler = (event) => {
      event.preventDefault();

      if (value.trim()) {
        setLoading(true);
        searchChannelByName(value)
        .then(searchRes => {
          console.log('searchRes', searchRes);
          setSearchState(searchRes);
        })
        .then(() => {
          setLoading(false);
          setTitle(value);
          setValue('');
        })
      };
    };

    const clearSearchState = () => {
      setSearchState({channels:[]});
      setTitle('');
    };

    const SearchTableControlButtons = () => (
      <div className="flex сontrolButtonsContainer">
        <button className="сontrolButton">показать еще</button>
        <button className="сontrolButton" onClick={() => clearSearchState()}>скрыть результат поиска</button>
      </div>
    );

    return (
      <Fragment>
        <div className="search_container">
          <p className="search_head">Искать канал по названию</p>
          <form onSubmit={submitHandler}>
            <input className="search_input" placeholder="Введите название" value={value} 
            onChange={event => (setValue(event.target.value))} />
            <button className="greenBtn searchBtn">Искать</button>
          </form>
        </div>
        {title.trim() && <p className="search_head">по запросу <strong>"{title}"</strong> найденно {searchState._total} результатов</p>}
        <Table streamers={searchState.channels} target={'search'}/>
        {loading && <Preloader />}
        {title.trim() && <SearchTableControlButtons />}
      </Fragment>
    )
};

export default SearchChannel;