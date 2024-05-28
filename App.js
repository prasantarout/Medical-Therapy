/* eslint-disable react-hooks/exhaustive-deps */
import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import StackNav from './src/navigators/StackNav';
import {useDispatch} from 'react-redux';
import {getTokenRequest} from './src/redux/reducer/AuthReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTokenRequest());
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <StackNav />
    </>
  );
};

export default App;
