import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import css from '../../themes/space';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '../../components/buttons/CommonButton';
import {colors} from '../../themes/colors';
import {images} from '../../themes/images';
import Logo from '../../components/common/Logo';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <SafeAreaView style={[css.f1, css.f1, {backgroundColor: colors.bgColor}]}>
      <Logo />
      <View style={[css.p19]}>
        <CommonButton
          onClick={() => {
            handleSignup();
          }}
          title={'Signup'}
          isLoading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  logoContainer: {},
});
