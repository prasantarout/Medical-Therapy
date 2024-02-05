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
import SafeView from '../../components/common/SafeView';
import NavBar from '../../components/common/NavBar';
import css from '../../themes/space';
import TitleTxt from '../../components/common/TitleTxt';
import {colors} from '../../themes/colors';
import normalize from '../../utils/normalize';
import Txt from '../../components/micro/Txt';
import {fonts} from '../../themes/fonts';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigationBuilder} from '@react-navigation/native';
import {icons} from '../../themes/icons';
import SmallBtn from '../../components/buttons/SmallBtn';

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

  const InputField = props => {
    return (
      <View style={[styles.InputField, props.style]}>
        <Txt style={styles.fieldTitle}>{props.title}</Txt>
        <TextInput
          placeholder={props.placeholder}
          value={props.Value}
          onChange={props.onChange}
          style={styles.input}
        />
      </View>
    );
  };

  return (
    <SafeView>
      <NavBar />
      <View style={[css.px5, css.f1, css.bgColor, css.py9]}>
        <ScrollView
          style={{paddingBottom: normalize(35)}}
          showsVerticalScrollIndicator={false}>
          <TitleTxt title={'Add New Patient'} />
          <View style={styles.container}>
            <View style={[css.row, css.jcsb]}>
              <InputField
                title={'First Name'}
                placeholder={'Jhon'}
                Value={firstName}
                onChange={val => setFirstName(val)}
              />
              <InputField
                title={'Last Name'}
                placeholder={'Doe'}
                Value={lastName}
                onChange={val => setLastName(val)}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <InputField
                title={'Email'}
                placeholder={'johndoe@gmail.com'}
                Value={email}
                onChange={val => setEmail(val)}
              />
              <InputField
                title={'Phone Number'}
                placeholder={'+1 123 321 4567'}
                Value={phone}
                onChange={val => setPhone(val)}
              />
            </View>

            <InputField
              title={'Address'}
              placeholder={'Type here'}
              Value={address}
              style={{width: '100%'}}
              onChange={val => setAddress(val)}
            />
            <View style={styles.dropdownCtn}>
              <View style={{width: '50%'}}>
                <Txt style={styles.fieldTitle}>City</Txt>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && {borderColor: colors.secondary},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={styles.dropdownListTxt}
                  iconStyle={styles.iconStyle}
                  data={cityData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select City'}
                  searchPlaceholder="Search..."
                  value={cityValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setCityValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={{width: '50%', marginLeft: normalize(11)}}>
                <Txt style={styles.fieldTitle}>Gender</Txt>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isCityFocus && {borderColor: colors.secondary},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={styles.dropdownListTxt}
                  iconStyle={styles.iconStyle}
                  data={genderData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select Gender'}
                  searchPlaceholder="Search..."
                  value={gender}
                  onFocus={() => setIsCityFocus(true)}
                  onBlur={() => setIsCityFocus(false)}
                  onChange={item => {
                    setGender(item.value);
                    setIsCityFocus(false);
                  }}
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
                  fontSize: normalize(8),
                  marginTop: normalize(8),
                }}>
                Upload Image
              </Txt>
              <Txt
                style={{
                  fontFamily: fonts.Regular,
                  color: '#9A9A9A',
                  fontWeight: '500',
                  fontSize: normalize(8),
                  marginTop: normalize(4),
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
    paddingTop: normalize(20),
    paddingBottom: normalize(15),
    width: '38%',
    borderWidth: normalize(1),
    borderStyle: 'dashed',
    borderRadius: normalize(5),
    alignItems: 'center',
    borderColor: '#C5C5C5',
    marginLeft: normalize(10),
    marginTop: normalize(25),
    backgroundColor: '#F9F9F9',
  },
  uploadSubContainer: {
    height: normalize(55),
    width: normalize(55),
    borderRadius: normalize(50),
    backgroundColor: '#EAEBEC',
    alignItems: 'center',
  },
  uploadCtnr: {
    height: normalize(85),
    width: normalize(85),
    resizeMode: 'contain',
    position: 'absolute',
    top: normalize(9),
  },
  uploadIcon: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    position: 'absolute',
    left: normalize(33),
    top: normalize(8),
  },
  btn: {
    width: '38%',
    marginLeft: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(7),
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    marginTop: normalize(17),
  },
  btnTxt: {
    fontFamily: fonts.Regular,
    color: colors.white,
    fontWeight: '600',
    fontSize: normalize(8),
  },
});
