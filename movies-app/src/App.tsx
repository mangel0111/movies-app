import { Fragment, useState } from 'react';
import tw from 'twin.macro';

import Alert from './components/Alert';
import MovieFilter from './components/MovieFilter';
import MovieList from './components/MovieList';

const DivApp = tw.div`h-full min-h-[400px] text-center flex flex-col`;
const DivSections = tw.div`flex flex-1 flex-col items-center`;

const App = () => {
  const [filter, setFilter] = useState({});

  return (
    <Fragment>
      <Alert />
      <DivApp>
        <DivSections>
          <MovieFilter filter={filter} setFilter={setFilter} />
          <MovieList filter={filter} />
        </DivSections>
      </DivApp>
    </Fragment>
  );
};

export default App;
