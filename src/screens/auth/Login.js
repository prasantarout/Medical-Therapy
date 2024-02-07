import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import css from '../../themes/space';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/buttons/Button';
import { colors } from '../../themes/colors';
import { images } from '../../themes/images';
import Logo from '../../components/common/Logo';
import { fonts } from '../../themes/fonts';
import normalize from '../../utils/normalize';
import CommonInput from '../../components/inputs/CommonInput';
import { icons } from '../../themes/icons';
import AuthHeader from '../../components/common/AuthHeader';
import Input from '../../components/inputs/Input';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cfmPassword: '',
  });

  const handleLogin = () => {
    props.navigation.navigate('Home')
  };

  console.log("props-Login", props);
  return (
    <SafeAreaView style={[css.f1, css.f1, { backgroundColor: colors.bgColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            headerText="Login"
            subHeaderText="Please fill up this form to login your account."
          />
          <View style={[css.f1, css.py11, css.px16]}>

            <Input
              title="Email"
              placeholder="abc@gmail.com"
              rightIcon={icons.email}
              style={[css.mb3]}
            />

            <Input
              title="Enter Password"
              placeholder="**************"
              rightIcon={isSecurePass ? icons.eyeClose : icons.eyeOpen}
              style={[css.mb3]}
              secureTextEntry={isSecurePass}
              onPressIcon={() => setIsSecurePass(!isSecurePass)}
              secure={true}
            />

            <Button
              onPress={() => {
                handleLogin();
              }}
              title="Login"
              isLoading={loading}
            />
            <View style={[css.row, css.aic, css.mt3, css.jcc]}>
              <Text style={[styles.subTxt]}>Don't Have An Account?</Text>
              <TouchableOpacity activeOpacity={0.6} style={[styles.SignInTxt]} onPress={() => props.navigation.navigate("Signup")} >
                <Text style={[styles.SignInTxt]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.Medium,
    fontSize: normalize(18),
    color: colors.primaryTextColor,
  },
  subHeaderText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(9),
    color: colors.secondaryTextColor,
  },
  ClosedEye: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  subTxt: {
    fontFamily: fonts.Regular,
    fontSize: normalize(8),
    color: colors.placeholder,
  },
  SignInTxt: {
    fontSize: normalize(8),
    fontFamily: fonts.Medium,
    color: colors.secondary,
    textDecorationLine: 'underline',
    marginLeft: normalize(1),
  },
});
