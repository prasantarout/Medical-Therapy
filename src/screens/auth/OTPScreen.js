import { StyleSheet, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import css from '../../themes/space';
import { colors } from '../../themes/colors';
import AuthTemplate from '../../components/common/AuthTemplate';
import Button from '../../components/buttons/Button';

const OTPScreen = (props) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isFocused, setIsFocused] = useState()

  const inputRefs = useRef(otp.map(() => React.createRef()));

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

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP);
  };
const handleFocus = (index) => {
  setIsFocused(index)
  console.log("index:", index);
};

  // Alert.alert('Verified')
  return (
    <AuthTemplate
      title="Enter Varification Code"
      subtitle="Check Your Message: We've sent a verification code to your registered Email ID. Please enter the code below to verify your account. Thank you."
    >
      <View style={[css.f1]}>
        <View style={[css.row, css.jcc]}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              ref={(input) => (inputRefs.current[index] = input)}
              onChangeText={(text) => handleChangeText(text, index)}
              keyboardType="numeric"
              maxLength={1}
              onFocus={() =>handleFocus(index)}
              // onBlur={() => handleFocus(false)}
              style={[
                styles.otpInput,
                css.mr5,
                {
                  // borderColor: isFocused ? colors.secondary : "#d1d1d1",
                  borderColor: isFocused === index ? colors.secondary : "#d1d1d1",
                },
                isFocused === index  && styles.focusedStyle,
              ]}
            />
          ))}
        </View>
        <Button title="Verify" onPress={handleVerifyOTP} />
      </View>

    </AuthTemplate>

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
    height: normalize(30),
    width: normalize(30),
    fontSize: normalize(9),
    color: colors.primaryTextColor,
    borderWidth: 1,
    borderRadius:normalize(6),
    paddingLeft: normalize(13)
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
