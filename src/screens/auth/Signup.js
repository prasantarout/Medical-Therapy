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
import React, {useState} from 'react';
import css from '../../themes/space';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '../../components/buttons/CommonButton';
import {colors} from '../../themes/colors';
import {images} from '../../themes/images';
import Logo from '../../components/common/Logo';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';
import CommonInput from '../../components/inputs/CommonInput';
import {icons} from '../../themes/icons';
import AuthHeader from '../../components/common/AuthHeader';
import Input from '../../components/inputs/Input';

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideCfrmPassword, setHideCfrmPassword] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cfmPassword: '',
  });

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={[css.f1, css.f1, {backgroundColor: colors.bgColor}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader 
            headerText="Sign Up"
            subHeaderText="Please fill up this form to login your account."
          />
          <View style={[css.f1, css.py11, css.px16]}>
            <CommonInput
              title={'First Name'}
              placeholder={'First name'}
            />

            <CommonInput
              title={'Last Name'}
              placeholder={'Last name'}
            />
            <Input
            
            />

            <CommonInput title={'Email'} placeholder={'abc@gmail.com'}>
              <Image source={icons.email} style={[styles.ClosedEye]} />
            </CommonInput>

            <CommonInput
              title={'Enter Password'}
              placeholder={'**************'}>
              <TouchableOpacity onPress={() => setHidePassword(false)}>
                <Image source={icons.eyeClose} style={[styles.ClosedEye]} />
              </TouchableOpacity>
            </CommonInput>

            <CommonInput
              title={'Confirm Password'}
              placeholder={'**************'}>
              <TouchableOpacity onPress={() => setHideCfrmPassword(false)}>
                <Image source={icons.eyeClose} style={[styles.ClosedEye]} />
              </TouchableOpacity>
            </CommonInput>

            <CommonButton
              onClick={() => {
                handleSignup();
              }}
              title={'Sign Up'}
              isLoading={loading}
            />
            <View style={[css.row, css.aic, css.mt2, css.jcc]}>
              <Text style={[styles.subTxt]}>Already Have An Account?</Text>
              <TouchableOpacity activeOpacity={0.6} style={[styles.SignInTxt]} onPress={()=> props.navigation.navigate("Login")} >
                <Text style={[styles.SignInTxt]}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

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
