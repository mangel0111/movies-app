import './App.css';

import { Fragment, useState } from 'react';

import Alert from './components/Alert';
import MovieFilter from './components/MovieFilter';
import MovieList from './components/MovieList';

const App = () => {
  const [filter, setFilter] = useState({});

  return (
    <Fragment>
      <Alert />
      <div className="App">
        <div className="App-studios App-flex">
          <MovieFilter filter={filter} setFilter={setFilter} />
          <MovieList filter={filter} />
        </div>
      </div>
    </Fragment>
  );
};

export default App;
