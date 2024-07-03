import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthHeader from '../../components/common/AuthHeader';
import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import css from '../../themes/space';
import {colors} from '../../themes/colors';
import {useDispatch, useSelector} from 'react-redux';
import {icons} from '../../themes/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/constants';
import connectionrequest from '../../utils/NetInfo';
import {ResetPasswordRequest} from '../../redux/reducer/AuthReducer';
import CustomToast from '../../utils/Toast';
import {isValidPassword} from '../../utils/Validation';
import Loader from '../../utils/Loader';

const ResetPassword = props => {
  var emailField = props.route.params ? props.route.params : '';
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [isSecureConfrmPass, setIsSecureConfrmPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState({
    password: '',
    confirmPassword: '',
  });

  //   console.log(signUpInfo,"?????????>>>>")

  const handleInputChange = (key, value) => {
    setSignUpInfo({...signUpInfo, [key]: value});
  };

  const isValidPass = isValidPassword(signUpInfo.password);

  const handleResetPassword = async () => {
    if (signUpInfo.password == '') {
      CustomToast('Please enter password');
      return;
    }
    if (signUpInfo.confirmPassword == '') {
      CustomToast('Please enter confirm password');
      return;
    }
    if (signUpInfo.password != signUpInfo.confirmPassword) {
      CustomToast('Password and confirm password should be same');
      return;
    }
    if (!isValidPass) {
      CustomToast(
        'The passwords should contain at least one number, one capital letter, and one special character',
      );
    } else {
      try {
        const getToken = await AsyncStorage.getItem(constants.FORGOT_TOKEN);
        let obj = {
          email: emailField,
          password: signUpInfo.password,
          confirm_password: signUpInfo.confirmPassword,
          token: getToken ? getToken : '',
        };
        // console.log(obj, '????>>>');
        // return
        dispatch(ResetPasswordRequest(obj));
      } catch (error) {
        console.error('Error during OTP verification:', error);
      }
    }
  };

  useEffect(() => {
    let signupStatus = '';
    if (signupStatus === '' || AuthReducer.status !== signupStatus) {
      switch (AuthReducer.status) {
        case 'Auth/ResetPasswordRequest':
          signupStatus = AuthReducer.status;
          // console.log('initiated', AuthReducer.status);
          // setIsLoading(true);
          break;
        case 'Auth/ResetPasswordSuccess':
          signupStatus = AuthReducer.status;
          // console.log('initiated-success', AuthReducer.status);
          props?.navigation.navigate('Login');
          break;
        case 'Auth/ResetPasswordFailure':
          signupStatus = AuthReducer.status;
          // console.log('initiated-fail', AuthReducer.status);
          // setIsLoading(false);
          break;
      }
    }
  }, [AuthReducer.status]);

  return (
    <>
      <StatusBar hidden={isModalVisible} />
      <SafeAreaView style={[css.f1, {backgroundColor: colors.bgColor}]}>
        <Loader visible={AuthReducer.status === 'Auth/ResetPasswordRequest'} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{height: '100%'}}>
            <AuthHeader
              headerText="Reset Password"
              //   subHeaderText="Please fill up this form to create your account."
            />
            <View style={[css.f1, css.py5, css.px16]}>
              <Input
                title="Enter Password"
                placeholder="**************"
                rightIcon={isSecurePass ? icons.eyeClose : icons.eyeOpen}
                style={[css.mb3]}
                secureTextEntry={isSecurePass}
                onPressIcon={() => setIsSecurePass(!isSecurePass)}
                secure={true}
                value={signUpInfo.password}
                onChangeText={text => handleInputChange('password', text)}
              />
              <Input
                title="Confirm Password"
                placeholder="**************"
                rightIcon={isSecureConfrmPass ? icons.eyeClose : icons.eyeOpen}
                style={[css.mb3]}
                secureTextEntry={isSecureConfrmPass}
                onPressIcon={() => setIsSecureConfrmPass(!isSecureConfrmPass)}
                secure={true}
                onChangeText={text =>
                  handleInputChange('confirmPassword', text)
                }
                value={signUpInfo.confirmPassword}
              />

              <Button
                onPress={handleResetPassword}
                title={'Reset Password'}
                isLoading={isLoading}
                style={[css.mt3]}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
