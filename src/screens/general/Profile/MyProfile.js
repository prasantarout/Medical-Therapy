import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import css, { height, width } from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import Txt from '../../../components/micro/Txt';
import { Switch } from 'react-native-switch';
import { colors } from '../../../themes/colors';
import { images } from '../../../themes/images';
import { icons } from '../../../themes/icons';
import Button from '../../../components/buttons/Button';
import Divider from '../../../components/micro/Divider';
import Modal from 'react-native-modal';
import Input from '../../../components/inputs/Input';

const MyProfile = (props) => {

  const [notification, setNotification] = useState(false)
  const [changePassModal, setChangePassModal] = useState(false)
  const [isSecureNewPass, setIsSecureNewPass] = useState(true);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecureConfirmPass, setIsSecureConfirmPass] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwords, setPasswords] = useState({
    old_pass: '',
    new_pass: '',
  });

  const handleInputChange = (key, value) => {
    setPasswords({ ...passwords, [key]: value });
  };

  const handleChangePassword = () => {
    setChangePassModal(true);
  }

  const GeneralInfoCard = ({ title, value }) => {
    return (
      <View style={[css.w33, css.mb3]}>
        <Txt style={[css.textLighte, css.semiBold, css.fs17]} >{title}</Txt>
        <Txt style={[css.textLighte]} >{value}</Txt>
      </View>
    )
  }

  return (
    <>
      <SafeView>
        <NavBar />
        <View style={[css.px4]}>
          <View style={[css.rowBetween]}>
            <TitleTxt title="My Profile" />
            <View style={[css.row, css.aic]}>
              <Txt style={[css.bold, css.cPrimary, css.mr1, css.fs19]}>Notification</Txt>
              <Switch
                value={notification}
                onValueChange={(val) => setNotification(!notification)}
                circleSize={25}
                barHeight={35}
                backgroundActive={colors.primary}
                backgroundInactive="#e2e5ff"
                circleActiveColor={'#fff'}
                circleInActiveColor={colors.primary}
                changeValueImmediately={true}
                innerCircleStyle={styles.innerCircleStyle}
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2}
                switchRightPx={2}
                switchWidthMultiplier={2.4}
                switchBorderRadius={30}
              />
            </View>
          </View>
          <View style={[css.card, css.mt3, css.row]}>
            <View style={[styles.imageArea]}>
              <Image style={[styles.profileImage]} source={{ uri: images.sampleUser }} />
            </View>
            <View style={[css.center, css.px7]}>
              <View style={[]}>
                <Txt style={[css.fs25, css.bold, css.cPrimary]} >Loise Lane</Txt>
                <View style={[css.row, css.aic]} >
                  <Image source={icons.cardMail} style={[styles.iconStyle]} />
                  <Txt style={[styles.textLighte, css.ml1, css.medium]} >loiselane@gmail.com</Txt>
                </View>
                <Button
                  title="Change Password"
                  style={[css.mt2]}
                  onPress={handleChangePassword}
                />
              </View>
            </View>
          </View>
          <View style={[css.card, css.my3]} >
            <View style={[css.rowBetween]} >
              <Txt style={[css.fs18, css.semiBold, css.textPrimary]} >General Information</Txt>
              <View style={[css.row, css.aic]}>
                <Image source={icons.edit} style={[styles.iconStyleEdit]} />
                <Txt style={[styles.cPrimary, css.fs18, css.ml1, css.semiBold]} >Edit</Txt>
              </View>
            </View>
            <Divider style={[css.my3]} />
            <View style={[css.row, css.fw]}>
              <GeneralInfoCard
                title="Name:"
                value="Loise Lane"
              />
              <GeneralInfoCard
                title="Email ID:"
                value="loiselane@gmail.com"
              />
              <GeneralInfoCard
                title="Phone Number:"
                value="7838830189"
              />
              <GeneralInfoCard
                title="Assigned Supervisor:"
                value="Clark Kent"
              />
            </View>
          </View>
        </View>
      </SafeView>
      <Modal isVisible={changePassModal}>
        <View style={[css.f1, css.center]}>
          <View style={[css.bgWhite, css.p3, styles.modalPanel]} >
            <TouchableOpacity onPress={() => setChangePassModal(false)} style={[css.closeIconWrapStyle]} >
              <Image source={icons.closeIcon} style={[css.closeIconStyle]} />
            </TouchableOpacity>
            <View style={[css.center]} >
              <TitleTxt title="Change Password" />
            </View>
            <View>
            <Input
                title="Enter Password"
                placeholder="**************"
                rightIcon={isSecureNewPass ? icons.eyeClose : icons.eyeOpen}
                style={[css.mb3, css.mw50]}
                secureTextEntry={isSecureNewPass}
                onPressIcon={() => setIsSecureNewPass(!isSecureNewPass)}
                secure={true}
                value={passwords.password}
                onChangeText={text =>
                  handleInputChange('password', text)
                }
              />

              <Input
                title="Enter Password"
                placeholder="**************"
                rightIcon={isSecurePass ? icons.eyeClose : icons.eyeOpen}
                style={[css.mb3]}
                secureTextEntry={isSecurePass}
                onPressIcon={() => setIsSecurePass(!isSecurePass)}
                secure={true}
                value={passwords.password}
                onChangeText={text =>
                  handleInputChange('password', text)
                }
              />

              <Input
                title="Confirm Password"
                placeholder="**************"
                rightIcon={isSecureConfirmPass ? icons.eyeClose : icons.eyeOpen}
                style={[css.mb3]}
                secureTextEntry={isSecureConfirmPass}
                onPressIcon={() => setIsSecureConfirmPass(!isSecureConfirmPass)}
                secure={true}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
              />
            </View>
            <Button style={[styles.btn]} title="Submit" />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  innerCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0
  },
  imageArea: {
    borderWidth: 5,
    borderColor: "#dfe0ee",
    alignSelf: 'flex-start',
    borderRadius: 100,
    width: 200,
    height: 200,
    overflow: 'hidden',
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  iconStyleEdit: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  textLighte: {
    color: "#8a8a8a",
  },
  modalPanel: {
    borderRadius: 5,

    // minWidth: width / 2,
    // height: height / 2
  }
});
