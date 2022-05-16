import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';
import { Backdrop, Typography } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Filter from 'components/filter';
import { globalApp } from 'redux/reducers/global-app';
import { selectIsLoading } from 'redux/selectors/global-app';
import List from 'components/list';
import Drawer from 'components/drawer';
import { ToastContainer } from 'react-toastify';
import { MOVIES_APP } from 'utils/constants';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading, shallowEqual);

  useEffect(() => {
    dispatch(globalApp.init());
  }, []);

  return (
    <div className="App">
      <Backdrop open={isLoading} />
      <Typography variant="h2" gutterBottom component="div">
        {MOVIES_APP}
      </Typography>
      <Drawer />
      <Filter />
      <ToastContainer />
      <List />
    </div>
  );
};

export default App;
