import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import css from '../../themes/space';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/buttons/Button';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import {icons} from '../../themes/icons';
import AuthHeader from '../../components/common/AuthHeader';
import Input from '../../components/inputs/Input';
import Txt from '../../components/micro/Txt';
// import {isValidEmail, isValidPhoneNumber} from '../../utils/Validation';
import {useDispatch, useSelector} from 'react-redux';
import {signInRequest} from '../../redux/reducer/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomToast from '../../utils/Toast';
import normalize from '../../utils/normalize';

let loginStatus = '';

const Login = props => {
  const [loading, setLoading] = useState(false);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [signInInfo, setsignInInfo] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  // const validEmail = isValidEmail(signInInfo.email);
  // const validPhoneNumber = isValidPhoneNumber(signInInfo.phone);
  const AuthReducer = useSelector(state => state.AuthReducer);

  useEffect(() => {
    getRememberMeStatus();
  }, []);

  const getRememberMeStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('rememberMe');
      const email_value = await AsyncStorage.getItem('email');
      const password_value = await AsyncStorage.getItem('password');
      // console.log('AsyncStorage', email_value, password_value, value);

      if (value === 'true') {
        setIsRememberMe(value === 'true' ? true : false);
        setsignInInfo({
          email: email_value,
          password: password_value,
        });
      } else {
        // console.log('rememberMe not found');
      }
    } catch (e) {
      console.error('error', e);
    }
  };

  const handleLogin = () => {
    if (signInInfo?.email === '') {
      CustomToast('Please enter email');
    } else if (signInInfo?.password === '') {
      CustomToast('Please enter password');
    } else {
      rememberMeState();
      // setLoading(true);
      dispatch(signInRequest(signInInfo));
    }
  };

  const rememberMeState = async () => {
    try {
      await AsyncStorage.setItem('rememberMe', isRememberMe.toString());

      if (isRememberMe) {
        await AsyncStorage.setItem('email', signInInfo.email);
        await AsyncStorage.setItem('password', signInInfo.password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
    } catch (e) {
      console.error('setRememberMeStatus-error', e);
    }
  };

  if (loginStatus === '' || AuthReducer.status !== loginStatus) {
    switch (AuthReducer.status) {
      case 'Auth/signInRequest':
        loginStatus = AuthReducer.status;
        setLoading(true);
        //  Code...
        break;
      case 'Auth/signInSuccess':
        loginStatus = AuthReducer.status;
        setTimeout(() => {
          setLoading(false);
        }, 200);
        break;
      case 'Auth/signInFailure':
        loginStatus = AuthReducer.status;
        setLoading(false);
        break;
    }
  }

  const handleInputChange = (key, value) => {
    setsignInInfo({...signInInfo, [key]: value});
  };
 
 
  return (
    <>
      {/* <LoaderAnimated isVisible={loading} /> */}
      <SafeAreaView style={[css.f1, {backgroundColor: colors.bgColor}]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false} 
          contentContainerStyle={{height:'100%'}}
          >
            <AuthHeader
              headerText="Therapist Login"
              subHeaderText="Please fill up this form to login your account."
            />
            <View style={[css.f1, css.py11, css.px16]}>
              <Input
                title="Email"
                placeholder="abc@gmail.com"
                rightIcon={icons.email}
                style={[css.mb3]}
                value={signInInfo?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={text => handleInputChange('email', text)}
              />
              <Input
                title="Enter Password"
                placeholder="**************"
                rightIcon={isSecurePass ? icons.eyeClose : icons.eyeOpen}
                style={[css.mb3]}
                secureTextEntry={isSecurePass}
                onPressIcon={() => setIsSecurePass(!isSecurePass)}
                secure={true}
                value={signInInfo?.password}
                onChangeText={text => handleInputChange('password', text)}
              />
              <View style={[css.mb3, css.rowBetween]}>
                <View style={[css.row, css.aic]}>
                  <Checkbox
                    isRememberMe={isRememberMe}
                    setIsRememberMe={setIsRememberMe}
                  />
                  <Txt style={[css.ml1, css.fs18]}>Remember Me</Txt>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props.navigation.navigate('ForgotPassword')}>
                  <Txt style={[css.fs18]}>Forgot Password?</Txt>
                </TouchableOpacity>
              </View>

              <Button
                onPress={() => {
                  handleLogin();
                }}
                title="Login"
                isLoading={loading}
                style={[css.mt3]}
              />
              <View style={[css.row, css.aic, css.mt3, css.jcc]}>
                <Text style={[css.subTxt]}>Don't Have An Account?</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => props.navigation.navigate('Signup')}
                  style={[styles.SignInTxt]}>
                  <Text style={[css.signInTxt]}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const Checkbox = ({isRememberMe, setIsRememberMe}) => {
  return (
    <TouchableOpacity
      onPress={() => setIsRememberMe(!isRememberMe)}
      style={[
        styles.checkboxStyle,
        {
          backgroundColor: isRememberMe ? colors.secondary : 'transparent',
        },
      ]}>
      {isRememberMe ? (
        <Image style={[styles.checkIconStyle]} source={icons.check} />
      ) : null}
    </TouchableOpacity>
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
  checkboxStyle: {
    width: 35,
    height: 35,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 6,
    // backgroundColor: colors.secondary,
  },
  checkIconStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
