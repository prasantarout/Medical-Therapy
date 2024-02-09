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


const ForgotPassword = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleForgotPass = () => {
    setIsModalVisible(true)
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
              />
              <Button style={[css.mt3]} title="Submit" onPress={handleForgotPass} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {/* </AuthTemplate> */}
      <CustomModal isVisible={isModalVisible} style={[styles.modalWrap]}
        onCloseRequest={() => setIsModalVisible(false)}
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
