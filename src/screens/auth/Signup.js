import {
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
import Button from '../../components/buttons/Button';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';
import {icons} from '../../themes/icons';
import AuthHeader from '../../components/common/AuthHeader';
import Input from '../../components/inputs/Input';
import { isValidEmail, isValidPassword, isValidPhoneNumber } from '../../utils/Validation';
import CustomToast from '../../utils/Toast';
import { useDispatch } from 'react-redux';
import { signUpReq } from '../../redux/reducer/AuthReducer';

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecureConfrmPass, setIsSecureConfrmPass] = useState(true);
  const [signUpInfo, setSignUpInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch()
  // 
  const validEmail = isValidEmail(signUpInfo.email);
  const validPhoneNumber = isValidPhoneNumber(signUpInfo.phone);
  const isValidPass = isValidPassword(signUpInfo.password);
  
  const handleSignup = () => {
    props.navigation.navigate("OTPScreen")
    // if (signUpInfo?.first_name == '') {
    //   CustomToast('Please enter your first name');
    // } else if (signUpInfo?.last_name == '') {
    //   CustomToast('Please enter your last name');
    // } else if (signUpInfo?.email == '') {
    //   CustomToast('Please enter email');
    // }else if (signUpInfo?.password == '') {
    //   CustomToast('Please enter password');
    // }else if (signUpInfo?.password != confirmPassword){
    //   CustomToast("Password dosen't match");
    // }else if (!validEmail) {
    //   CustomToast('Please enter valid email');
    // }else if (!isValidPass) {
    //   CustomToast('The password should contain at least one number, one capital letter, and one special character');
    // }else{
    //   dispatch(signUpReq(signUpInfo))
    // }
  };

  const handleInputChange = (key, value) => {
    setSignUpInfo({...signUpInfo, [key]: value});
  }

  return (
    <SafeAreaView style={[css.f1, css.f1, {backgroundColor: colors.bgColor}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader 
            headerText="Sign Up"
            subHeaderText="Please fill up this form to login your account."
          />
          <View style={[css.f1, css.py5, css.px16,]}>          
            <Input
              title="First Name"
              placeholder="First Name"
              style={[css.mb3]}
              value={signUpInfo.first_name}
              onChangeText={text =>
                handleInputChange('first_name', text)
              }
            />
            <Input
              title="Last"
              placeholder="Last Name"
              style={[css.mb3]}              
              value={signUpInfo.last_name}
              onChangeText={text =>
                handleInputChange('last_name', text)
              }
            />
            <Input
              title="Email"
              placeholder="abc@gmail.com"
              rightIcon={icons.email}
              style={[css.mb3]}
              value={signUpInfo.email}
              autoCapitalize='none'
              onChangeText={text =>
                handleInputChange('email', text)
              }
            />

         
            <Input
              title="Enter Password"
              placeholder="**************"
              rightIcon={isSecurePass ? icons.eyeClose: icons.eyeOpen}
              style={[css.mb3]}
              secureTextEntry={isSecurePass}
              onPressIcon={() => setIsSecurePass(!isSecurePass)}
              secure={true}
              value={signUpInfo.password}
              onChangeText={text =>
                handleInputChange('password', text)
              }
            />          
         
            <Input
              title="Confirm Password"
              placeholder="**************"
              rightIcon={isSecureConfrmPass ? icons.eyeClose: icons.eyeOpen}
              style={[css.mb3]}
              secureTextEntry={isSecureConfrmPass}
              onPressIcon={() => setIsSecureConfrmPass(!isSecureConfrmPass)}
              secure={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />          

            <Button
              onPress={() => {
                handleSignup();
              }}
              title={'Sign Up'}
              isLoading={loading}
              style={[css.mt3]}
            />
            <View style={[css.row, css.aic, css.mt2, css.jcc]}>
              <Text style={[css.subTxt]}>Already Have An Account?</Text>
              <TouchableOpacity activeOpacity={0.6} style={[css.signInTxt]} onPress={()=> props.navigation.navigate("Login")} >
                <Text style={[css.signInTxt]}>Login</Text>
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

});
