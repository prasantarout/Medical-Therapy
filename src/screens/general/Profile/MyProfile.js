import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import css, {height, width} from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import Txt from '../../../components/micro/Txt';
import {Switch} from 'react-native-switch';
import {colors} from '../../../themes/colors';
import {images} from '../../../themes/images';
import {icons} from '../../../themes/icons';
import Button from '../../../components/buttons/Button';
import Divider from '../../../components/micro/Divider';
import Modal from 'react-native-modal';
import Input from '../../../components/inputs/Input';
import {useDispatch, useSelector} from 'react-redux';
import {
  ProfileRequest,
  editProfileRequest,
} from '../../../redux/reducer/AuthReducer';
import GeneralInfoCard from '../../../components/inputs/GeneralInfoCard';
import ImagePicker from 'react-native-image-crop-picker';
import {fonts} from '../../../themes/fonts';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useIsFocused} from '@react-navigation/native';
import CustomToast from '../../../utils/Toast';
import {isValidPassword} from '../../../utils/Validation';
import {updatePasswordReq} from '../../../redux/reducer/CmsReducer';

let profileStatus = '';
let updatePasswordStatus = '';

const MyProfile = props => {
  const [notification, setNotification] = useState(false);
  const [changePassModal, setChangePassModal] = useState(false);
  const [isSecureNewPass, setIsSecureNewPass] = useState(true);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const [isSecureConfirmPass, setIsSecureConfirmPass] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageToSend, setProfileImageToSend] = useState();
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [changeImageModal, setChangeImageModal] = useState(false);
  const [assignedSupervisor, setAssignedSupervisor] = useState('');
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const AuthReducer = useSelector(state => state?.AuthReducer);
  const CmsReducer = useSelector(state => state?.CmsReducer);
  const dispatch = useDispatch();
  const focused = useIsFocused();
  useEffect(() => {
    setIsEditable(false);
    dispatch(ProfileRequest());
    const checkPermission = async () => {
      try {
        const permission =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA;
        const permissionStorage =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

        const status = await request(permission);
        request(status).then(result => {
          console.log('result', result);
        });
        if (status === 'granted') {
          console.log('Permission granted');
        } else {
          console.log('Permission denied');
        }
      } catch (error) {
        console.error('Error checking permission:', error);
      }
    };

    checkPermission();
  }, [focused]);

  const handleInputChange = (key, value) => {
    setPasswords({...passwords, [key]: value});
  };

  const handleChangePassword = () => {
    setChangePassModal(true);
  };

  if (profileStatus === '' || AuthReducer.status !== profileStatus) {
    switch (AuthReducer.status) {
      case 'Auth/ProfileRequest':
        profileStatus = AuthReducer.status;
        break;
      case 'Auth/ProfileSuccess':
        profileStatus = AuthReducer.status;
        console.log('ProfileInfo', AuthReducer.ProfileResponse?.data);
        setName(AuthReducer.ProfileResponse?.data?.full_name);
        setFirstName(AuthReducer.ProfileResponse?.data?.first_name);
        setLastName(AuthReducer.ProfileResponse?.data?.last_name);
        setEmail(AuthReducer.ProfileResponse?.data?.email);
        setPhone(AuthReducer.ProfileResponse?.data?.phone);
        setProfileImage(AuthReducer.ProfileResponse?.data?.profile_photo_url);
        break;
      case 'Auth/ProfileFailure':
        profileStatus = AuthReducer.status;
        break;
      // Edit Profile
      case 'Auth/editProfileRequest':
        profileStatus = AuthReducer.status;
        console.log('editProfileRequest');
        break;
      case 'Auth/editProfileSuccess':
        profileStatus = AuthReducer.status;
        console.log('editProfileSuccess', AuthReducer.editProfileResponse);
        dispatch(ProfileRequest());
        CustomToast('Profile Updated Successfully');
        break;
      case 'Auth/editProfileFailure':
        profileStatus = AuthReducer.status;
        console.log('editProfileFailure');
        break;
    }
  }

  const handleEditMenu = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      let obj = new FormData();
      obj.append('first_name', firstName);
      obj.append('last_name', lastName);
      obj.append('email', email);
      obj.append('phone', phone);
      {
        profileImageToSend
          ? obj.append('profile_image', profileImageToSend)
          : null;
      }
      console.log('djgfdasgf', obj, profileImageToSend);
      dispatch(editProfileRequest(obj));
    }
  };

  const fromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'photo',
    })
      .then(response => {
        setChangeImageModal(false);
        let imageObj = {};
        imageObj.name = response.filename
          ? response.filename
          : response.path.replace(/^.*[\\\/]/, '');
        imageObj.type = response.mime;
        imageObj.uri = response.path;
        setProfileImage(imageObj.uri);
        setProfileImageToSend(imageObj);
      })
      .catch(err => console.log(err));
  };

  const fromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
    })
      .then(response => {
        setChangeImageModal(false);
        let imageObj = {};
        imageObj.name = response.filename
          ? response.filename
          : response.path.replace(/^.*[\\\/]/, '');
        imageObj.type = response.mime;
        imageObj.uri = response.path;
        setProfileImage(imageObj.uri);
        setProfileImageToSend(imageObj);
        console.log('imageObj', imageObj);
      })
      .catch(err => console.log(err));
  };

  const validNewPassword = isValidPassword(passwords?.new_password);

  const handleUpdatePassword = () => {
    if (passwords?.old_password == '') {
      CustomToast('Please enter old password');
    } else if (passwords?.new_password == '') {
      CustomToast('Please enter old password');
    } else if (!validNewPassword) {
      CustomToast(
        'The new password should contain at least one number, one capital letter, and one special character.',
      );
    } else if (passwords?.confirm_password != passwords?.new_password) {
      CustomToast('Password does not match');
    } else {
      let obj = {
        old_password: passwords?.old_password,
        new_password: passwords?.new_password,
        confirm_password: passwords?.confirm_password,
      };
      dispatch(updatePasswordReq(obj));
    }
  };

  if (
    updatePasswordStatus === '' ||
    CmsReducer.status !== updatePasswordStatus
  ) {
    switch (CmsReducer.status) {
      case 'CMS/updatePasswordReq':
        updatePasswordStatus = CmsReducer.status;
        setChangePassModal(false);
        break;
      case 'CMS/updatePasswordSuccess':
        updatePasswordStatus = CmsReducer.status;
        break;
      case 'CMS/updatePasswordFailure':
        updatePasswordStatus = CmsReducer.status;
        break;
    }
  }

  return (
    <>
      <SafeView {...props}>
        <KeyboardAvoidingView
          style={[{flex: 1}, css.px4]}
          behavior={Platform.OS === 'android' ? null : 'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <View style={[css.rowBetween]}>
            <TitleTxt title="My Profile" />
            <View style={[css.row, css.aic]}>
              <Txt style={[css.bold, css.cPrimary, css.mr1, css.fs19]}>
                Notification
              </Txt>
              <Switch
                value={notification}
                onValueChange={val => setNotification(!notification)}
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
              {isEditable ? (
                <TouchableOpacity
                  style={[styles.editIconWrap]}
                  onPress={() => setChangeImageModal(true)}>
                  <Image style={[styles.editIcon]} source={icons.editSquare} />
                </TouchableOpacity>
              ) : null}
              <Image
                style={[styles.profileImage]}
                source={
                  AuthReducer.ProfileResponse?.data?.profile_photo_path
                    ? {uri: profileImage}
                    : {
                        uri: `https://ui-avatars.com/api/?name=${AuthReducer.ProfileResponse?.data?.full_name}&bold=true&color=28328C&background=ffffff&size=240`,
                      }
                }
              />
            </View>
            <View style={[css.center, css.px7]}>
              <View style={[]}>
                <Txt
                  style={[
                    css.fs25,
                    css.bold,
                    css.cPrimary,
                    css.capitalization,
                  ]}>
                  {AuthReducer.ProfileResponse?.data?.full_name}
                </Txt>
                <View style={[css.row, css.aic]}>
                  <Image source={icons.cardMail} style={[styles.iconStyle]} />
                  <Txt style={[styles.textLighte, css.ml1, css.medium]}>
                    {AuthReducer.ProfileResponse?.data?.email}
                  </Txt>
                </View>
                <Button
                  title="Change Password"
                  style={[css.mt2]}
                  onPress={handleChangePassword}
                />
              </View>
            </View>
          </View>
          <View style={[css.card, css.my3]}>
            <View style={[css.rowBetween]}>
              <Txt style={[css.fs18, css.semiBold, css.textPrimary]}>
                General Information
              </Txt>
              <TouchableOpacity
                onPress={handleEditMenu}
                activeOpacity={0.7}
                style={[css.row, css.aic]}>
                <Image
                  source={isEditable ? icons.done : icons.edit}
                  style={[styles.iconStyleEdit]}
                />
                <Txt style={[css.cPrimary, css.fs18, css.ml1, css.semiBold]}>
                  {isEditable ? 'Done' : 'Edit'}
                </Txt>
              </TouchableOpacity>
            </View>
            <Divider style={[css.my3]} />
            <View style={[css.rowBetween, css.fw]}>
              {isEditable ? (
                <GeneralInfoCard
                  title="First Name:"
                  value={firstName}
                  autoCapitalize="words"
                  editable={isEditable}
                  onChangeText={text => setFirstName(text)}
                  containerStyle={[styles.generalInfoCard, css.w30]}
                />
              ) : (
                <GeneralInfoCard
                  title="Name:"
                  value={name}
                  editable={isEditable}
                  autoCapitalize="words"
                  onChangeText={text => setName(text)}
                  containerStyle={[styles.generalInfoCard, css.w30]}
                />
              )}
              {isEditable ? (
                <GeneralInfoCard
                  title="Last Name:"
                  value={lastName}
                  editable={isEditable}
                  autoCapitalize="words"
                  onChangeText={text => setLastName(text)}
                  containerStyle={[styles.generalInfoCard, css.w30]}
                />
              ) : null}
              <GeneralInfoCard
                title="Email ID:"
                value={email}
                editable={isEditable}
                onChangeText={text => setEmail(text)}
                containerStyle={[styles.generalInfoCard, css.w30]}
              />
              <GeneralInfoCard
                title="Phone Number:"
                value={phone}
                editable={isEditable}
                onChangeText={text => setPhone(text)}
                containerStyle={[styles.generalInfoCard, css.w30]}
              />
              <GeneralInfoCard
                title="Assigned Supervisor:"
                value={assignedSupervisor}
                editable={isEditable}
                onChangeText={text => setAssignedSupervisor(text)}
                containerStyle={[styles.generalInfoCard, css.w30]}
              />
              {isEditable ? (
                <GeneralInfoCard
                  title="Assigned Supervisor:"
                  value={assignedSupervisor}
                  editable={isEditable}
                  onChangeText={text =>
                    setAssignedSupervisor('assignedSupervisor', text)
                  }
                  containerStyle={[styles.generalInfoCard, css.w30, css.op0]}
                />
              ) : null}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeView>
      <Modal style={[css.f1, css.center]} isVisible={changePassModal}>
        <View style={[css.bgWhite, css.p8, styles.modalPanel]}>
          <TouchableOpacity
            onPress={() => setChangePassModal(false)}
            style={[css.closeIconWrapStyle]}>
            <Image source={icons.closeIcon} style={[css.closeIconStyle]} />
          </TouchableOpacity>
          <View style={[css.center]}>
            <TitleTxt title="Change Password" />
          </View>
          <View style={[css.mt5]}>
            <Input
              title="Enter Old Password"
              placeholder="**************"
              rightIcon={isSecureNewPass ? icons.eyeClose : icons.eyeOpen}
              style={[css.mb3, css.mw50]}
              secureTextEntry={isSecureNewPass}
              onPressIcon={() => setIsSecureNewPass(!isSecureNewPass)}
              secure={true}
              value={passwords?.old_password}
              onChangeText={text => handleInputChange('old_password', text)}
            />

            <Input
              title="Enter New Password"
              placeholder="**************"
              rightIcon={isSecurePass ? icons.eyeClose : icons.eyeOpen}
              style={[css.mb3]}
              secureTextEntry={isSecurePass}
              onPressIcon={() => setIsSecurePass(!isSecurePass)}
              secure={true}
              value={passwords?.new_password}
              onChangeText={text => handleInputChange('new_password', text)}
            />
            <Input
              title="Confirm New Password"
              placeholder="**************"
              rightIcon={isSecureConfirmPass ? icons.eyeClose : icons.eyeOpen}
              style={[css.mb3]}
              secureTextEntry={isSecureConfirmPass}
              onPressIcon={() => setIsSecureConfirmPass(!isSecureConfirmPass)}
              secure={true}
              value={passwords?.confirm_password}
              onChangeText={text => handleInputChange('confirm_password', text)}
            />
          </View>
          <Button
            style={[styles.btn, css.mt5]}
            title="Submit"
            onPress={handleUpdatePassword}
          />
        </View>
      </Modal>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationOutTiming={600}
        backdropOpacity={0.1}
        style={[css.m0]}
        isVisible={changeImageModal}>
        <View style={[css.bottomSheet]}>
          <TouchableOpacity
            style={[styles.closeBtn]}
            activeOpacity={0.7}
            onPress={() => setChangeImageModal(false)}>
            <Image source={icons.cross} style={[styles.closeBtnIconStyle]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fromCamera}
            activeOpacity={0.8}
            style={[css.row, css.aic, styles.bottomSheetBtn]}>
            <Image source={icons.camera} style={[styles.bottomSheetIcon]} />
            <Txt style={[styles.bottomSheetText]}>Camera</Txt>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fromGallery}
            activeOpacity={0.8}
            style={[css.row, css.aic, styles.bottomSheetBtn, css.mt5]}>
            <Image source={icons.gallery} style={[styles.bottomSheetIcon]} />
            <Txt style={[styles.bottomSheetText]}>Gallery</Txt>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  innerCircleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  imageArea: {
    borderWidth: 5,
    borderColor: '#dfe0ee',
    alignSelf: 'flex-start',
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  bottomSheetBtn: {
    backgroundColor: colors.primary,
    minWidth: 200,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
  bottomSheetIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginRight: 16,
  },
  bottomSheetText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  editIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 7,
    right: 0,
    zIndex: 100,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

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
    resizeMode: 'contain',
  },
  iconStyleEdit: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textLighte: {
    color: '#8a8a8a',
  },
  modalPanel: {
    borderRadius: 5,
    minWidth: width > 1000 ? width / 2 : width / 1.2,
  },
  generalInfoCard: {
    marginBottom: 50,
  },
  closeBtn: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 100,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  closeBtnIconStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
