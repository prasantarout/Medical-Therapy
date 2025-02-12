import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import css from '../../themes/space';
import NavBar from './NavBar';

const SafeView = props => {
  return (
    <>
      <NavBar {...props} />
      <SafeAreaView style={[css.f1, props.style, {zIndex: -1}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[css.fg1]}
          stickyHeaderIndices={props.sticky}
          keyboardShouldPersistTaps="always"
          bounces={false}
          >
          <View style={[styles.avoidStatusBar]}>{props.children}</View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  avoidStatusBar: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : null,
    flex: 1,
    backgroundColor: '#f8fafd',
  },
});
