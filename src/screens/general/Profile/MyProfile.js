import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from '../../../components/common/SafeView';
import css, { } from '../../../themes/space';
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
import { useDispatch, useSelector } from 'react-redux';
import { ProfileRequest, editProfileRequest } from '../../../redux/reducer/AuthReducer';
import GeneralInfoCard from '../../../components/inputs/GeneralInfoCard';
import ImagePicker from "react-native-image-crop-picker";


let profileStatus = ""

const MyProfile = (props) => {

  const [notification, setNotification] = useState(false)
  const [changePassModal, setChangePassModal] = useState(false)
  const [isSecureNewPass, setIsSecureNewPass] = useState(true);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecureConfirmPass, setIsSecureConfirmPass] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [changeImageModal, setChangeImageModal] = useState(true);
  const [assignedSupervisor, setAssignedSupervisor] = useState("");
  const [passwords, setPasswords] = useState({
    old_pass: '',
    new_pass: '',
  });

  const AuthReducer = useSelector(state => state?.AuthReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProfileRequest())
  }, [])

  const handleInputChange = (key, value) => {
    setPasswords({ ...passwords, [key]: value });
  };


  const handleChangePassword = () => {
    setChangePassModal(true);
  }

  if (profileStatus === "" || AuthReducer.status !== profileStatus) {
    switch (AuthReducer.status) {
      case "Auth/ProfileRequest":
        profileStatus = AuthReducer.status;
        break;
      case "Auth/ProfileSuccess":
        profileStatus = AuthReducer.status;
        console.log("initiated-success", AuthReducer.ProfileResponse?.data)
        setName(AuthReducer.ProfileResponse?.data?.full_name)
        setEmail(AuthReducer.ProfileResponse?.data?.email)
        break;
      case "Auth/ProfileFailure":
        profileStatus = AuthReducer.status;
        break;
    }
  }

  const handleEditMenu = () => {
    setIsEditable(!isEditable)
    if (isEditable) {
      // dispatch(editProfileRequest())
    }
  };


  const fromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: "photo",
    })
      .then((response) => {
        let imageObj = {};
        imageObj.name = response.filename
          ? response.filename
          : response.path.replace(/^.*[\\\/]/, "");
        imageObj.type = response.mime;
        imageObj.uri = response.path;
        console.log(imageObj.uri);

      })
      .catch((err) => console.log(err));
  };

  function fromGalary(type) {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: "photo",
    })
      .then((response) => {
        let imageObj = {};
        imageObj.name = response.filename
          ? response.filename
          : response.path.replace(/^.*[\\\/]/, "");
        imageObj.type = response.mime;
        imageObj.uri = response.path;
        console.log(imageObj);

      })
      .catch((err) => console.log(err));
  }



  return (
    <>
      <SafeView>
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
              {isEditable ? <TouchableOpacity style={[styles.editIconWrap]} >
                <Image style={[styles.editIcon]} source={icons.editSquare} />
              </TouchableOpacity> : null}
              <Image style={[styles.profileImage]} source={{ uri: images.sampleUser }} />
            </View>
            <View style={[css.center, css.px7]}>
              <View style={[]}>
                <Txt style={[css.fs25, css.bold, css.cPrimary, css.capitalization]} >{AuthReducer.ProfileResponse?.data?.full_name}</Txt>
                <View style={[css.row, css.aic]} >
                  <Image source={icons.cardMail} style={[styles.iconStyle]} />
                  <Txt style={[styles.textLighte, css.ml1, css.medium]} >{AuthReducer.ProfileResponse?.data?.email}</Txt>
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
              <TouchableOpacity onPress={handleEditMenu} activeOpacity={0.7} style={[css.row, css.aic]}>
                <Image source={isEditable ? icons.done : icons.edit} style={[styles.iconStyleEdit]} />
                <Txt style={[css.cPrimary, css.fs18, css.ml1, css.semiBold]} >{isEditable ? "Done" : "Edit"}</Txt>
              </TouchableOpacity>
            </View>
            <Divider style={[css.my3]} />
            <View style={[css.rowBetween, css.fw]}>
              <GeneralInfoCard
                title="Name:"
                value={name}
                editable={isEditable}
                onChangeText={text => setName('name', text)}
                containerStyle={[styles.generalInfoCard, css.w30]}
              />
              <GeneralInfoCard
                title="Email ID:"
                value={email}
                editable={isEditable}
                onChangeText={text => setEmail('email', text)}
                containerStyle={[styles.generalInfoCard, css.w30]}
              />
              <GeneralInfoCard
                title="Phone Number:"
                value={phone}
                editable={isEditable}
                onChangeText={text => setPhone('phone', text)}
                containerStyle={[styles.generalInfoCard, css.w30]}
              />
              <GeneralInfoCard
                title="Assigned Supervisor:"
                value={assignedSupervisor}
                editable={isEditable}
                onChangeText={text => setAssignedSupervisor('assignedSupervisor', text)}
                containerStyle={[styles.generalInfoCard, css.w30]}
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
      <Modal style={[css.m0]} isVisible={changeImageModal}>
        <View style={[css.bottomSheet]} >
          <TouchableOpacity style={[css.row, css.aic]} >
            <Image source={icons.camera} style={[styles.bottomSheetIcon]} />
            <Txt style={[styles.bottomSheetText]} >Camera</Txt>
          </TouchableOpacity>
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
  },
  bottomSheetIcon:{
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100
  },
  editIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    position: "absolute",
    bottom: 7,
    right: 0,
    zIndex: 100,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },
  editIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
  },
  generalInfoCard: {
    marginBottom: 50
  }

});
