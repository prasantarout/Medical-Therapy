import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <StackNav />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
