import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import css from '../../themes/space';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '../../components/buttons/CommonButton';
import {colors} from '../../themes/colors';
import {images} from '../../themes/images';
import Logo from '../../components/common/Logo';
import {fonts} from '../../themes/fonts';
import normalize from '../../utils/normalize';
import CommonInput from '../../components/inputs/CommonInput';
import {icons} from '../../themes/icons';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <SafeAreaView style={[css.f1, css.f1, {backgroundColor: colors.bgColor}]}>
      <ScrollView>
        <Logo />
        <View style={[css.mt1, css.aic]}>
          <Text style={styles.headerText}>Sign Up</Text>
          <Text style={[styles.subHeaderText, css.mt5]}>
            Please fill up this form to login your account.
          </Text>
        </View>
        <View style={[css.px16, css.mt10]}>
          <CommonInput title={'First Name'} placeholder={'abc@gmail.com'}>
            <TouchableOpacity>
              <Image source={icons.email} style={[styles.ClosedEye]} />
            </TouchableOpacity>
          </CommonInput>
        </View>
        <View style={[css.px16, css.mt10]}>
          <CommonInput title={'Last Name'} placeholder={'abc@gmail.com'}>
            <TouchableOpacity>
              <Image source={icons.email} style={[styles.ClosedEye]} />
            </TouchableOpacity>
          </CommonInput>
        </View>
        <View style={[css.px16, css.mt10]}>
          <CommonInput title={'Email'} placeholder={'abc@gmail.com'}>
            <TouchableOpacity>
              <Image source={icons.email} style={[styles.ClosedEye]} />
            </TouchableOpacity>
          </CommonInput>
        </View>
        <View style={[css.px16, css.mt5]}>
          <CommonInput title={'Password'} placeholder={'Enter Password'}>
            <TouchableOpacity>
              <Image source={icons.eyeClose} style={[styles.ClosedEye]} />
            </TouchableOpacity>
          </CommonInput>
        </View>
        <View style={[css.p19]}>
          <CommonButton
            onClick={() => {
              handleSignup();
            }}
            title={'Sign Up'}
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(20),
    color: colors.primaryTextColor,
    fontWeight: '600',
  },
  subHeaderText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(12),

    color: colors.secondaryTextColor,
  },
  ClosedEye: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
});
