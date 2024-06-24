import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import css from '../../themes/space';
import Txt from '../micro/Txt';
import {colors} from '../../themes/colors';
import {icons} from '../../themes/icons';
import {images} from '../../themes/images';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';

const CustomModal = ({
  isVisible = false,
  style = {},
  onCloseRequest = () => {},
  children = <></>,
  icon = '',
  title = '',
  subtitle = '',
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={[css.f1, css.center]}>
        <ImageBackground
          resizeMode="stretch"
          source={images.modalBg}
          style={[styles.modalStyle, css.p5, style]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.closeButtonStyle]}
            onPress={onCloseRequest}>
            <Image source={icons.closeIcon} style={[styles.closeButtonInner]} />
          </TouchableOpacity>
          {children}
          <View style={[styles.panel, css.px4]}>
            {icon && (
              <Image source={icon} style={[styles.emailLinkStyle, css.asc]} />
            )}
            <View style={[css.mt2]}>
              {title && <Txt style={[styles.headerText, css.tac]}>{title}</Txt>}
              {subtitle && (
                <Txt style={[styles.subHeaderText, css.tac]}>{subtitle}</Txt>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalStyle: {
    borderRadius: 10,
    minHeight: normalize(90),
    Width: normalize(300),
  },
  closeButtonStyle: {
    overflow: 'hidden',
    width: 80,
    height: 80,
    borderRadius: normalize(100),
    position: 'absolute',
    top: -20,
    right: -45,
  },
  closeButtonInner: {
    width: '100%',
    height: '100%',
  },
  closeButtonIcon: {
    color: colors.white,
    fontSize: normalize(5),
  },
  emailLinkStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  modalWrap: {
    minHeight: normalize(120),
    minWidth: normalize(120),
  },
  headerText: {
    fontFamily: fonts.Bold,
    fontSize: 25,
    color: colors.primaryTextColor,
    lineHeight: 30,
    marginTop: normalize(5),
  },
  subHeaderText: {
    fontFamily: fonts.Regular,
    fontSize: 22,
    color: colors.secondaryTextColor,
    lineHeight: 30,
    marginTop: 20,
  },
  panel: {
    width: normalize(140),
    alignSelf: 'center',
  },
});
