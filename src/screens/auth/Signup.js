import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import css, {height, width} from '../../themes/space';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/buttons/Button';
import {colors} from '../../themes/colors';
import {icons} from '../../themes/icons';
import AuthHeader from '../../components/common/AuthHeader';
import Input from '../../components/inputs/Input';
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from '../../utils/Validation';
import CustomToast from '../../utils/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {signUpReq} from '../../redux/reducer/AuthReducer';
import Modal from 'react-native-modal';
import useScreenDimension from '../../utils/useScreenDimension';
import Txt from '../../components/micro/Txt';
import EvaluationForm from '../general/Assignments/EvaluationForm';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';
import LottieView from 'lottie-react-native';

let signupStatus = '';

const Signup = props => {
  const dispatch = useDispatch();
  const {screenWidth, screenHeight} = useScreenDimension();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [loading, setLoading] = useState(false);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecureConfrmPass, setIsSecureConfrmPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validEmail = isValidEmail(signUpInfo.email);
  const validPhoneNumber = isValidPhoneNumber(signUpInfo.phone);
  const isValidPass = isValidPassword(signUpInfo.password);

  const handleSignup = () => {
    if (signUpInfo?.first_name == '') {
      CustomToast('Please enter your first name');
    } else if (signUpInfo?.last_name == '') {
      CustomToast('Please enter your last name');
    } else if (signUpInfo?.email == '') {
      CustomToast('Please enter email');
    } else if (signUpInfo?.password == '') {
      CustomToast('Please enter password');
    } else if (signUpInfo?.confirmPassword == '') {
      CustomToast('Please enter confirm password');
    } else if (signUpInfo?.password != signUpInfo?.confirmPassword) {
      CustomToast("Password dosen't match");
    } else if (!validEmail) {
      CustomToast('Please enter valid email');
    } else if (!isValidPass) {
      CustomToast(
        'The passwords should contain at least one number, one capital letter, and one special character',
      );
    } else {
      // setIsModalVisible(true)
      dispatch(signUpReq(signUpInfo));
    }
  };

  const handleInputChange = (key, value) => {
    setSignUpInfo({...signUpInfo, [key]: value});
  };

  if (signupStatus === '' || AuthReducer.status !== signupStatus) {
    switch (AuthReducer.status) {
      case 'Auth/signUpReq':
        signupStatus = AuthReducer.status;
        console.log('initiated', AuthReducer.status);
        setIsLoading(true);
        break;
      case 'Auth/signUpSucces':
        signupStatus = AuthReducer.status;
        console.log('initiated-success', AuthReducer.status);
        setTimeout(() => {
          props?.navigation.navigate('Login');
        }, 2600);

        setIsModalVisible(true);
        setIsLoading(false);
        break;
      case 'Auth/signUpFailure':
        signupStatus = AuthReducer.status;
        console.log('initiated-fail', AuthReducer.status);
        setIsLoading(false);
        break;
    }
  }
  const onModalHide = () => {
    // setTimeout(() => {
    //   props?.navigation.navigate("Login")
    // }, 900)
  };

  return (
    <>
      <StatusBar hidden={isModalVisible} />
      <SafeAreaView style={[css.f1, {backgroundColor: colors.bgColor}]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              headerText="Sign Up"
              subHeaderText="Please fill up this form to create your account."
            />
            <View style={[css.f1, css.py5, css.px16]}>
              <Input
                title="First Name"
                placeholder="First Name"
                style={[css.mb3]}
                value={signUpInfo.first_name}
                onChangeText={text => handleInputChange('first_name', text)}
              />
              <Input
                title="Last Name"
                placeholder="Last Name"
                style={[css.mb3]}
                value={signUpInfo.last_name}
                onChangeText={text => handleInputChange('last_name', text)}
              />
              <Input
                title="Email"
                placeholder="abc@gmail.com"
                rightIcon={icons.email}
                style={[css.mb3]}
                value={signUpInfo.email}
                autoCapitalize="none"
                onChangeText={text => handleInputChange('email', text.trim())}
              />
              <Input
                title="Phone"
                placeholder="Enter Phone Number"
                rightIcon={icons.mobile}
                style={[css.mb3]}
                autoCapitalize="none"
                keyboardType="phone-pad"
                // value={signUpInfo.email}
                // onChangeText={text =>
                //   handleInputChange('email', text.trim())
                // }
              />
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
                onPress={() => {
                  handleSignup();
                }}
                title={'Sign Up'}
                isLoading={isLoading}
                style={[css.mt3]}
              />
              <View style={[css.row, css.aic, css.mt2, css.jcc]}>
                <Text style={[css.subTxt]}>Already Have An Account?</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[css.signInTxt]}
                  onPress={() => props.navigation.navigate('Login')}>
                  <Text style={[css.signInTxt]}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Modal
        isVisible={isModalVisible}
        style={[css.f1, css.center]}
        deviceHeight={screenHeight}
        deviceWidth={screenWidth}
        onModalHide={() => onModalHide}
        onModalShow={() =>
          setTimeout(() => {
            setIsModalVisible(false);
          }, 2000)
        }
        onBackdropPress={() => setIsModalVisible(false)}>
        <>
          <View style={[styles.lottieViewWrap]}>
            <LottieView
              source={icons.celebrate}
              style={[styles.lottieView]}
              autoPlay
              loop={false}
            />
          </View>
          <View style={[css.p4, css.br10, css.center, styles.modalPanel]}>
            <Txt style={[styles.welcomeTextStyle]}>Welcome</Txt>
            <Txt style={[styles.welcomeTextStyle]}>To</Txt>
            <Txt style={[styles.welcomeTextStyle]}>Therapy Evaluator</Txt>
          </View>
        </>
      </Modal>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  modalPanel: {
    width: normalize(150),
    height: normalize(100),
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  welcomeTextStyle: {
    fontFamily: fonts.SemiBold,
    fontSize: 30,
    textAlign: 'center',
    color: colors.black,
  },
  lottieView: {
    width: '100%',
    height: '100%',
  },
  lottieViewWrap: {
    position: 'absolute',
    width: width,
    height: height,
  },
});
