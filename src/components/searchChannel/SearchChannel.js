import React, { Fragment, useState, useContext } from 'react';
import Table from 'components/table/Table';
import './searchChannel.css';
import Preloader from 'components/preloader/Preloader';
import {AlertContext} from 'context/alert/alertContext';

var api = require('twitch-api-v5');
api.clientID = '08i240lntql615wx8iozx8rq23krxr';

let searchChannelByName = (name, limit=10) => {
  return new Promise((resolve, reject) => {
    api.search.channels({ query: name, limit: limit }, (err, res) => {
      //поиск канала по имени
      if(err) {
          console.log(err);
      } else {
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
  const [actualLimit, setActialLimit] = useState(10);
  const alert = useContext(AlertContext);

  let searchChannel = (query, limit) => {
    setLoading(true);
    searchChannelByName(query, limit)
    .then(searchRes => {
      setSearchState(searchRes);
    })
    .then(() => {
      setLoading(false);
      setTitle(query);
      setValue('');
      setActialLimit(prev => prev+10);
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      setActialLimit(10);
      searchChannel(value);
    } else {
      setValue('');
      alert.show('Введите название канала');
    }
  };  

  const SearchTableControlButtons = ({howManyResults}) => {
    const showMoreChannels = () => {
      //т.к. в модуле для запросов нет пагинации, то новые результаты поиска буду получать увеличивая лимит
      searchChannel(title, actualLimit);
    };
  
    const clearSearchState = () => {
      setSearchState({channels:[]});
      setTitle('');
      setActialLimit(10);
    };

    return (
    <div className="flex сontrolButtonsContainer">
      {howManyResults!==0 && 
        <button className="defaultBtn сontrolButton" onClick={() => showMoreChannels()}>показать еще</button>
      }
      <button className="defaultBtn сontrolButton" onClick={() => clearSearchState()}>скрыть результат поиска</button>
    </div>
  )};

  return (
    <Fragment>
      <form className="search_container" onSubmit={submitHandler}>
        <input className="search_input" placeholder="Искать канал по названию" value={value} 
        onChange={event => (setValue(event.target.value))} />
        <button className="defaultBtn searchBtn">Искать</button>
      </form>
      {title.trim() && <p className="search_head">по запросу <strong>"{title}"</strong> найденно {searchState._total} результатов</p>}
      {searchState.channels.length !==0 &&
        <Table streamers={searchState.channels} target={'search'} border={"searchTable"}/>
      }
      {loading && <Preloader />}
      {title.trim() && <SearchTableControlButtons howManyResults={searchState._total}/>}
    </Fragment>
  )
};

export default SearchChannel;