import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import css from '../../themes/space';
import { colors } from '../../themes/colors';
import AuthTemplate from '../../components/common/AuthTemplate';
import Button from '../../components/buttons/Button';
import AuthHeader from '../../components/common/AuthHeader';
import Txt from '../../components/micro/Txt';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtpRequest } from '../../redux/reducer/AuthReducer';

const OTPScreen = (props) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isFocused, setIsFocused] = useState()

  // console.log("prooops: ", props?.route?.params)
  const inputRefs = useRef(otp.map(() => React.createRef()));
  const AuthReducer = useSelector(state => state?.AuthReducer)
  const dispatch = useDispatch()

  const handleChangeText = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  const handleFocus = (index) => {
    setIsFocused(index)
    console.log("index:", index);
  };

  // verifyOtpRequest,
  // verifyOtpSuccess,
  // verifyOtpFailure,
  console.log("asasas", otp.join(''))

  const handleOTPVerification = () => {
    dispatch(verifyOtpRequest({
      email: props?.route?.params,
      otp: otp.join('')
    }))
  }

  // Alert.alert('Verified')
  return (
    <View style={[css.f1, css.py11, css.px16]}>
      <AuthHeader
        headerText="Enter Verification Code"
        subHeaderText="Check Your Message: We've sent a verification code to your registered Email ID. Please enter the code below to verify your account. Thank you."
      />
      <View style={[css.row, css.jcc]}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            ref={(input) => (inputRefs.current[index] = input)}
            onChangeText={(text) => handleChangeText(text, index)}
            keyboardType="numeric"
            maxLength={1}
            onFocus={() => handleFocus(index)}
            style={[styles.otpInput, css.mr5,
            {
              marginLeft: index == 0 ? 0 : 40,
              borderColor: isFocused === index ? colors.secondary : "#d1d1d1",
            },
            isFocused === index && styles.focusedStyle,
            ]}
          />
        ))}
      </View>
      <Button style={[css.mt3]} title="Verify" onPress={handleOTPVerification} />
      <View style={[css.row, css.aic, css.jcc, css.my6]}>
        <Txt style={[css.fs20, { color: colors.ternaryTextColor }]}>Didn't Receive OTP?</Txt>
        <TouchableOpacity activeOpacity={0.7}>
          <Txt style={[css.regular, css.fs20, css.ml2, { color: colors.secondary, textDecorationLine: 'underline' }]}>RESEND</Txt>
        </TouchableOpacity>
      </View>
    </View>

    // </AuthTemplate>

  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  otpInput: {
    height: 70,
    width: 70,
    fontSize: normalize(9),
    color: colors.primaryTextColor,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    marginVertical: 40
  },

  focusedStyle: {
    // borderColor: colors.secondary,
    backgroundColor: colors.white,
    shadowColor: 'rgb(20, 189, 240)',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.00,
    elevation: 34
  },

});
