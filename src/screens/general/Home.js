import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import css from '../../themes/space';
import NavBar from '../../components/common/NavBar';
import SafeView from '../../components/common/SafeView';

const Home = (props) => {
  return (
    <SafeView>
      <NavBar />
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({});
