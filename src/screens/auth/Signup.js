import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import css from '../../themes/space';
import {SafeAreaView} from 'react-native-safe-area-context';

const Signup = () => {
  return (
    <View style={[css.marginStatusBar, css.f1]}>
      <SafeAreaView style={[css.f1, css.f1]}>
        <Text style={{color: 'red'}}>Signup</Text>
      </SafeAreaView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
