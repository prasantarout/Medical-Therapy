import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import css from '../../themes/space';
import AuthTemplate from '../../components/common/AuthTemplate';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import { icons } from '../../themes/icons';
import CustomModal from '../../components/common/CustomModal';
import AuthHeader from '../../components/common/AuthHeader';
import { colors } from '../../themes/colors';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordRequest } from '../../redux/reducer/AuthReducer';

let forgotPasswordStatus = ""
const ForgotPassword = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch()
  const AuthReducer = useSelector(state => state?.AuthReducer)

  const handleForgotPass = () => {
    dispatch(forgotPasswordRequest({ email: email }))
    // 
  }
  // forgotPasswordRequest
  if (forgotPasswordStatus === "" || AuthReducer.status !== forgotPasswordStatus) {
    switch (AuthReducer.status) {
      case "Auth/forgotPasswordRequest":
        forgotPasswordStatus = AuthReducer.status;
        // console.log("initiated", AuthReducer.status)
        setIsLoading(true)
        break;
      case "Auth/forgotPasswordSuccess":
        forgotPasswordStatus = AuthReducer.status;
        // console.log("initiated-success", AuthReducer.status)
        setIsModalVisible(true)
        setIsLoading(false)
        break;
      case "Auth/forgotPasswordFailure":
        forgotPasswordStatus = AuthReducer.status;
        // console.log("initiated-fail", AuthReducer.status)
        setIsLoading(false)
        break;
    }
  }

  const closeModalRequest = () => {
    setIsModalVisible(false)
    setTimeout(() => {
      props.navigation.navigate('OTPScreen', email)
    }, 400)
  }

  return (
    <>
      <SafeAreaView style={[css.f1, { backgroundColor: colors.bgColor }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AuthHeader
              headerText="Forgot password"
              subHeaderText="Please enter your email to reset your password."
            />
            <View style={[css.f1, css.py11, css.px16]}>
              <Input
                title="Email"
                placeholder="abc@gmail.com"
                rightIcon={icons.email}
                style={[css.mb3]}
                value={email}
                autoCapitalize='none'
                onChangeText={(val) => setEmail(val)}
              />
              <Button
                isLoading={isLoading}
                style={[css.mt3]}
                title="Submit"
                onPress={handleForgotPass}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {/* </AuthTemplate> */}
      <CustomModal
        isVisible={isModalVisible}
        style={[styles.modalWrap]}
        onCloseRequest={closeModalRequest}
        icon={icons.emailLink}
        title="We Have Sent A Link To Your Email"
        subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
      </CustomModal>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({

});
