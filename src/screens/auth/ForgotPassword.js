import { Alert, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import css from '../../themes/space';
import AuthTemplate from '../../components/common/AuthTemplate';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import { icons } from '../../themes/icons';
import CustomModal from '../../components/common/CustomModal';


const ForgotPassword = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleForgotPass = () => {
    setIsModalVisible(true)
  }

  return (
    <>
      <AuthTemplate
        title="Forgot password"
        subtitle="Please enter your email to reset your password."
      >
        <View style={[css.f1]}>
          <Input
            title="Email"
            placeholder="abc@gmail.com"
            rightIcon={icons.email}
            style={[css.mb3]}
          />
          <Button title="Submit" onClick={handleForgotPass} />
        </View>

      </AuthTemplate>
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
