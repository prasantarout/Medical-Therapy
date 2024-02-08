import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import {colors} from '../../../themes/colors';
import normalize from '../../../utils/normalize';
import Txt from '../../../components/micro/Txt';
import {fonts} from '../../../themes/fonts';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigationBuilder} from '@react-navigation/native';
import {icons} from '../../../themes/icons';
import SmallBtn from '../../../components/buttons/SmallBtn';
import SimpleInput from '../../../components/inputs/SimpleInput';
import SimpleDropDown from '../../../components/common/SimpleDropDown';

const AddPatient = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [cityValue, setCityValue] = useState(null);
  const [gender, setGender] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isCityFocus, setIsCityFocus] = useState(false);

  const cityData = [
    {label: 'Kolkata', value: 'Kolkata'},
    {label: 'Ranchi', value: 'Ranchi'},
    {label: 'Gwalior', value: 'Gwalior'},
    {label: 'Bangalore', value: 'Bangalore'},
    {label: 'Indore', value: 'Indore'},
    {label: 'Guwahati', value: 'Guwahati'},
    {label: 'Haridwar', value: 'Haridwar'},
    {label: 'Chennai', value: 'Chennai'},
  ];

  const genderData = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Rather Not To Say',
      value: 'Rather Not To Say',
    },
  ];

  return (
    <SafeView>
      <NavBar />
      <View style={[css.px5, css.f1, css.py4]}>
        <ScrollView
          style={[{paddingBottom: normalize(35)}]}
          showsVerticalScrollIndicator={false}>
          <TitleTxt title={'Add New Patient'} />
          <View style={styles.container}>
            <View style={[css.row, css.fw, css.aic]}>
              <View style={[css.w50]}>
                <SimpleInput
                  title="First Name"
                  style={[css.mr2]}
                  value={[]}
                  placeholder="Enter First Name"
                  onChange={val => setFirstName(val)}
                />
              </View>
              <View style={[css.w50]}>
                <SimpleInput
                  title="Last Name"
                  style={[css.ml2]}
                  value={[]}
                  placeholder="Enter Last Name"
                  onChange={val => setLastName(val)}
                />
              </View>
              <View style={[css.w50, css.mt10]}>
                <SimpleInput
                  title="Email"
                  style={[css.mr2]}
                  value={[]}
                  placeholder="Enter Email"
                  onChange={val => setEmail(val)}
                />
              </View>
              <View style={[css.w50, css.mt10]}>
                <SimpleInput
                  title="Phone Number"
                  style={[css.ml2]}
                  value={[]}
                  placeholder="Enter Phone Number"
                  onChange={val => setPhone(val)}
                />
              </View>
              <View style={[css.w100]}>
                <SimpleInput
                  title="Address"
                  style={[css.mr2]}
                  value={[]}
                  placeholder="Type here..."
                  onChange={val => setAddress(val)}
                />
              </View>

              <View style={[css.w50, css.mt10]}>
                <SimpleDropDown
                  data={cityData}
                  title="City"
                  style={[css.mr2]}
                  value={cityValue}
                  placeholder="Select City"
                  onChange={item => setCityValue(item.value)}
                />
              </View>
              <View style={[css.w50]}>
                <SimpleDropDown
                  data={genderData}
                  title="Gender"
                  style={[css.ml2]}
                  value={gender}
                  placeholder="Select Gender"
                  onChange={item => setGender(item.value)}
                />
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.6} style={styles.uploadImageCtn}>
              <View style={styles.uploadSubContainer}>
                <ImageBackground
                  source={icons.uploadBg}
                  style={styles.uploadCtnr}>
                  <Image source={icons.upload} style={styles.uploadIcon} />
                </ImageBackground>
              </View>
              <Txt
                style={{
                  fontFamily: fonts.Regular,
                  color: '#444444',
                  fontWeight: '500',
                  fontSize: 18,
                  marginTop: 14,
                }}>
                Upload Image
              </Txt>
              <Txt
                style={{
                  fontFamily: fonts.Regular,
                  color: '#9A9A9A',
                  fontWeight: '500',
                  fontSize: 18,
                  marginTop: 8,
                }}>
                Maximum Size 5MB
              </Txt>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
              <Text style={styles.btnTxt}>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeView>
  );
};

export default AddPatient;

const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(12),
    paddingHorizontal: normalize(8),
    backgroundColor: colors.white,
    marginTop: normalize(12),
    borderRadius: normalize(5),
    paddingBottom: normalize(20),
  },
  InputField: {
    width: '50%',
    padding: normalize(10),
  },
  fieldTitle: {
    fontFamily: fonts.Regular,
    fontSize: normalize(9),
    color: colors.primary,
  },
  input: {
    height: normalize(30),
    width: '100%',
    fontFamily: fonts.Regular,
    fontSize: normalize(10),
    color: colors.secondaryTextColor,
    borderBottomWidth: normalize(1),
    borderColor: '#E5E5E5',
    fontWeight: '500',
    paddingBottom: normalize(3),
  },

  dropdownCtn: {
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
    marginTop: normalize(8),
  },

  dropdown: {
    height: normalize(30),
    borderBottomWidth: normalize(1),
    borderColor: '#E5E5E5',
    paddingBottom: normalize(6),
    width: '92%',
  },

  placeholderStyle: {
    fontSize: normalize(9),
    color: '#B3B3B3',
    fontFamily: fonts.Regular,
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: normalize(10),
    color: colors.secondaryTextColor,
    fontFamily: fonts.Regular,
    fontWeight: '500',
  },
  iconStyle: {
    width: normalize(13),
    height: normalize(13),
    resizeMode: 'contain',
    tintColor: '#B3B3B3',
  },
  inputSearchStyle: {
    color: colors.secondaryTextColor,
    fontSize: normalize(8),
  },
  dropdownListTxt: {
    color: '#B3B3B3',
    fontSize: normalize(8),
    fontFamily: fonts.Regular,
    fontWeight: '400',
  },
  uploadImageCtn: {
    paddingTop: 22,
    paddingBottom: 16,
    width: '30%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#C5C5C5',
    marginTop: 25,
    backgroundColor: '#F9F9F9',
  },
  uploadSubContainer: {
    height: normalize(45),
    width: normalize(45),
    borderRadius: normalize(50),
    backgroundColor: '#EAEBEC',
    alignItems: 'center',
  },
  uploadCtnr: {
    height: normalize(70),
    width: normalize(70),
    resizeMode: 'contain',
    position: 'absolute',
    top: normalize(8),
  },
  uploadIcon: {
    height: normalize(16),
    width: normalize(16),
    resizeMode: 'contain',
    position: 'absolute',
    left: normalize(27),
    top: normalize(6),
  },
  btn: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(6),
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    marginTop: normalize(14),
  },
  btnTxt: {
    fontFamily: fonts.Regular,
    color: colors.white,
    fontWeight: '600',
    fontSize: 20,
  },
});
