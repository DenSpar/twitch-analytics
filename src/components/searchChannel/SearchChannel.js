import React, { Fragment, useState, useContext } from 'react';
import SearchTable from 'components/table/SearchTable';
import './searchChannel.css';
import Preloader from 'components/preloader/Preloader';
import {AlertContext} from 'context/alert/alertContext';
import searchChannelByName from 'js/twitchApiRequsts/searchChannelByName';
import sendRequest from 'js/sendRequest';

const SearchChannel = () => {
  const [searchState, setSearchState] = useState({channels:[]});
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  // может вынести просто в переменную?
  const [actualLimit, setActialLimit] = useState(10);
  //
  const alert = useContext(AlertContext);

  let searchChannel = (query, limit=10) => {
    setLoading(true);
    //delete
    let nowURL = new URL(window.location.href);
    if (nowURL.hostname === 'localhost') {
      console.log ('на localhost');
      searchChannelByName(query, limit)
      .then(searchRes => {
        console.log(searchRes);
        let newObj = {
          total: searchRes._total,
          channels: searchRes.channels
        };
        setSearchState(newObj);
      })
      .then(() => {
        setLoading(false);
        setTitle(query);
        setValue('');
        setActialLimit(prev => prev+10);
      })
      //delete

    } else {
      sendRequest('GET', 'https://stat.metacorp.gg/api/search?name=' + query + '&limit=' + limit)
      .then(searchRes => {
        console.log(searchRes);
        setSearchState(searchRes);
      })
      .then(() => {
        setLoading(false);
        setTitle(query);
        setValue('');
        setActialLimit(prev => prev+10);
      })
    }
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
      //т.к. для запросов нет пагинации, то новые результаты поиска буду получать увеличивая лимит
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
      {title.trim() && <p className="search_head">по запросу <strong>"{title}"</strong> найденно {searchState.total} результатов</p>}
      {searchState.channels.length !==0 &&
        <SearchTable streamers={searchState.channels} />
      }
      {loading && <Preloader />}
      {title.trim() && <SearchTableControlButtons howManyResults={searchState.total}/>}
    </Fragment>
  )
};

export default SearchChannel;