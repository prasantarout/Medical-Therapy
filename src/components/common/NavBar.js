import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import css, {width} from '../../themes/space';
import Txt from '../micro/Txt';
import {images} from '../../themes/images';
import normalize from '../../utils/normalize';
import {icons} from '../../themes/icons';
import Divider from '../micro/Divider';
import Modal from 'react-native-modal';
import TitleTxt from './TitleTxt';
import Button from '../buttons/Button';
import useScreenDimension from '../../utils/useScreenDimension';
import {widthToDp} from '../../utils/responsive';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  LogoutRequest,
  ProfileRequest,
  getTokenSuccess,
} from '../../redux/reducer/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/constants';

let halfWidth = width / 2;
let profileStatus = '';

const NavBar = props => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const {screenWidth, screenHeight} = useScreenDimension();
  const navigation = useNavigation();
  const AuthReducer = useSelector(state => state?.AuthReducer);
  const dispatch = useDispatch();
  const focused = useIsFocused();

  // console.log("NavProps", props)

  useEffect(() => {
    dispatch(ProfileRequest());
  }, []);

  const handleLogoutModal = () => {
    setIsShowMenu(false);
    setTimeout(() => {
      setLogoutModal(true);
    }, 100);
  };

  const iconRoundStyle = {
    width: screenWidth / 20,
    height: screenWidth / 20,
    borderRadius: screenWidth,
  };
  const cloudRefreshStyle = {
    width: screenWidth / 23,
    height: screenWidth / 23,
  };

  let modalSize = screenWidth < 1000 ? screenWidth / 1.5 : screenWidth / 2.4;

  const handleLogout = () => {
    setLogoutModal(false);
    setTimeout(() => {
      dispatch(LogoutRequest());
    }, 500);
  };

  return (
    <>
      <View style={[css.bgWhite, {zIndex: 4}]}>
        <SafeAreaView />
        <View style={[css.rowBetween, styles.navWrap, css.aic]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              navigation.navigate('BottomTab', {
                screen: 'Dashboard',
                params: {
                  data: 'Dashboard',
                },
              })
            }
            style={[
              styles.logoArea,
              {
                width: screenWidth / 4,
                height: screenWidth / 18,
              },
            ]}>
            <Image source={icons.vyb} style={[styles.imgResponsive]} />
          </TouchableOpacity>
          <View
            style={[
              styles.rightSection,
              css.row,
              css.aic,
              {width: screenWidth / 2.2, height: 50},
            ]}>
            {/* <TouchableOpacity
                            activeOpacity={0.8}
                            style={[css.row, css.aic]}
                        >
                            <Image
                                style={[styles.cloudRefreshStyle, cloudRefreshStyle]}
                                source={icons.cloudRefresh}
                                resizeMode='contain'
                            />
                            <Txt style={[css.ml1, css.mt0, css.semiBold, css.fs17]} >Sync</Txt>
                        </TouchableOpacity> */}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation?.navigate('Notification')}>
              <Image
                style={[styles.iconRoundStyle, iconRoundStyle]}
                source={icons.bell}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[css.row, css.aic]}
              onPress={() => setIsShowMenu(!isShowMenu)}>
              <Image
                style={[styles.iconRoundStyle, iconRoundStyle]}
                source={{
                  uri: AuthReducer.ProfileResponse?.data?.user_photo,
                }}
              />
              <Txt
                style={[css.fs18, css.ml1, css.semiBold, css.capitalization]}>
                {' '}
                {`Welcome, ${AuthReducer.ProfileResponse?.data?.first_name}`}
              </Txt>
              <Image source={icons.down} style={[styles.arrowStyle]} />
            </TouchableOpacity>
          </View>
          {isShowMenu ? (
            <View style={[styles.menuStyle]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[css.row, css.center, css.f1]}
                // onPress={()=>navigation.navigate('MyProfile')}
                onPress={() =>
                  navigation?.navigate('My Profile', {
                    screen: 'MyProfile',
                    params: {
                      data: 'From NavBar',
                    },
                  })
                }>
                <Image source={icons.user} style={[styles.menuIcon]} />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                activeOpacity={0.8}
                style={[css.row, css.center, css.f1]}
                onPress={handleLogoutModal}>
                <Image source={icons.logout} style={[styles.menuIcon]} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      {isShowMenu ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsShowMenu(false)}
          style={[StyleSheet.absoluteFill, styles.backdrop]}
        />
      ) : null}

      <Modal isVisible={logoutModal}>
        <View style={[css.f1, css.center]}>
          <ImageBackground
            resizeMode="stretch"
            source={images.modalBg}
            style={[
              css.p3,
              styles.modalPanel,
              {
                width: modalSize,
              },
            ]}>
            <TouchableOpacity
              onPress={() => setLogoutModal(false)}
              style={[css.closeIconWrapStyle]}>
              <Image source={icons.closeIcon} style={[css.closeIconStyle]} />
            </TouchableOpacity>
            <View style={[css.center, css.py4]}>
              <Image source={icons.off} style={[styles.logoStyle]} />
              <TitleTxt style={[css.mt3]} title="Do You Want To Logout?" />
              <Txt style={[styles.textLighte]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                sagittis.
              </Txt>
            </View>
            <View style={[css.row, css.jcc]}>
              <Button onPress={handleLogout} style={[styles.btn]} title="Yes" />
              <Button
                onPress={() => setLogoutModal(false)}
                style={[styles.btn, styles.btnlight, css.ml2]}
                title="Cancel"
              />
            </View>
          </ImageBackground>
        </View>
      </Modal>
    </>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navWrap: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    zIndex: 99,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 16,
  },
  logoArea: {
    alignItems: 'flex-start',
  },
  imgResponsive: {
    width: '100%',
    height: '100%',
    minWidth: 100,
    resizeMode: 'contain',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cloudRefreshStyle: {
    resizeMode: 'contain',
    marginLeft: 16,
  },
  iconRoundStyle: {
    // width: widthToDp(5),
    // height: widthToDp(5),
    marginLeft: 16,
    borderRadius: 100,
  },
  backdrop: {
    backgroundColor: 'rgb(0, 0, 0,0.8)',
    // backgroundColor:'red',
    zIndex: 1,
  },
  menuStyle: {
    zIndex: 99,
    backgroundColor: '#fff',
    position: 'absolute',
    width: 200,
    height: 150,
    right: normalize(8),
    top: normalize(26),
    borderRadius: 10,
    shadowColor: 'rgb(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.58,
    shadowRadius: 30.0,
    elevation: 24,
  },
  menuIcon: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  arrowStyle: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  modalPanel: {},
  logoStyle: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  textLighte: {
    color: '#747A86',
  },
  btn: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnlight: {
    backgroundColor: '#b1b2bf',
  },
});
