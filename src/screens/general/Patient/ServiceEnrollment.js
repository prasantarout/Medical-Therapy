/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import TitleTxt from '../../../components/common/TitleTxt';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import Txt from '../../../components/micro/Txt';
import moment from 'moment';
import {fonts} from '../../../themes/fonts';
import {icons} from '../../../themes/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SimpleInput from '../../../components/inputs/SimpleInput';
import connectionrequest from '../../../utils/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListOfTherapiesReq,
  storeServiceEnrolmentReq,
} from '../../../redux/reducer/PatientReducer';
import CustomToast from '../../../utils/Toast';
import {useIsFocused} from '@react-navigation/native';
import {MultiSelect} from 'react-native-element-dropdown';
import Loader from '../../../utils/Loader';

const ServiceEnrollment = props => {
  let status = '';
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:30 am');
  const [remark, setRemark] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isFocus, setIsFocus] = useState(false);
  const [categoryItem, setCategoryItem] = useState([]);
  const PatientReducer = useSelector(state => state.PatientReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    setDate(moment(time).format('L'));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleTimeConfirm = time => {
    setTime(moment(time).format('LT'));
    hideTimePicker();
  };

  const handleEnroll = () => {
    const requiredFields = [
      {field: date, message: 'Date is required'},
      {field: time, message: 'Time is required'},
      {field: categoryItem, message: 'Services is required'},
      {
        field: remark,
        message: 'Remark is required',
      },
    ];
    for (let item of requiredFields) {
      if (item.field === '') {
        CustomToast(item.message);
        return;
      }
    }
    let obj = {
      patient_id: AuthReducer?.ProfileResponse?.data?.id,
      date: date,
      time: time,
      service: categoryItem,
      remark: remark,
      short_description: null,
      long_description: null,
    };
    connectionrequest()
      .then(res => {
        dispatch(storeServiceEnrolmentReq(obj));
      })
      .catch(err => {
        console.log(err, 'err');
        CustomToast('Please connect To Internet');
      });
  };

  useEffect(() => {
    connectionrequest()
      .then(res => {
        dispatch(getListOfTherapiesReq());
      })
      .catch(err => {
        console.log(err, 'err');
        CustomToast('Please connect To Internet');
      });
  }, [isFocused]);

  useEffect(() => {
    if (status == '' || PatientReducer.status != status) {
      switch (PatientReducer.status) {
        case 'PATIENT/storeServiceEnrolmentReq':
          status = PatientReducer.status;
          break;
        case 'PATIENT/storeServiceEnrolmentSuccess':
          status = PatientReducer.status;
          props?.navigation?.navigate('MyPatient');
          break;
        case 'PATIENT/storeServiceEnrolmentFailure':
          status = PatientReducer.status;
          break;
      }
    }
  }, [PatientReducer?.status]);

  const ValueField = props => {
    return (
      <View style={styles.ValueField}>
        <Txt style={[styles.fieldTitle, css.fs20]}>{props.title}</Txt>
        <TouchableOpacity
          onPress={props.onPress}
          style={styles.buttonCtnr}
          activeOpacity={0.7}>
          <View style={[css.row, css.jcsb, css.aic]}>
            <Txt style={styles.subtxt}>{props.value}</Txt>
            <Image source={props.icon} style={[styles.icon, props.style]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = item => {
    const isSelected = categoryItem?.includes(item?._id);
    return (
      <View style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.selectedTextStyle}>{item?.name}</Text>
        </View>
        {isSelected && (
          <Image source={icons?.CircleCheck} style={{height: 20, width: 20}} />
        )}
      </View>
    );
  };

  return (
    <SafeView {...props}>
      <View style={[css.px5, css.f1, css.py4]}>
        <Loader
          visible={PatientReducer?.status == 'PATIENT/storeServiceEnrolmentReq'}
        />
        <TitleTxt title={'Service Enrolment'} />
        <View style={styles.container}>
          <View style={[css.row, css.jcsb]}>
            <ValueField
              title={'Date'}
              icon={icons.Calendar}
              value={date === '' ? 'select date' : date}
              onPress={() => showDatePicker()}
              style={{
                height: normalize(11),
                width: normalize(11),
                resizeMode: 'contain',
                marginRight: normalize(5),
                tintColor: colors.primary,
              }}
            />
            <ValueField
              title={'Time'}
              onPress={() => showTimePicker()}
              icon={icons.down}
              value={time}
            />
          </View>
          <View style={[css.row, css.px5]}>
            <View style={[css.w50, css.mt10]}>
              <Txt style={[css.fs20]}>{'services'}</Txt>
              <MultiSelect
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={
                  PatientReducer?.getListOfTherapiesRes?.data?.length > 0
                    ? PatientReducer?.getListOfTherapiesRes?.data
                    : []
                }
                labelField="name"
                valueField="id"
                placeholder="Services"
                value={categoryItem}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setCategoryItem(item);
                  setIsFocus(false);
                }}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                      <Text style={styles.textSelectedStyle}>{item?.name}</Text>
                      <Image
                        source={icons?.delete}
                        style={{height: normalize(15), width: normalize(15)}}
                        tintColor="black"
                        resizeMode="contain"
                        aspectRatio={16 / 9}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={[css.w50, css.mt10, css.ml2]}>
              <SimpleInput
                title="Remark"
                style={[css.ml2]}
                value={remark}
                placeholder="Input"
                onChangeText={val => setRemark(val)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleEnroll}>
            <Txt style={styles.btnTxt}>Enroll</Txt>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default ServiceEnrollment;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    backgroundColor: colors.white,
    marginTop: normalize(12),
    borderRadius: normalize(5),
  },
  ValueField: {padding: normalize(10), width: '50%'},
  fieldTitle: {
    fontFamily: fonts.Regular,
    color: colors.primary,
    paddingBottom: normalize(4),
  },
  buttonCtnr: {
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    paddingBottom: normalize(6),
  },
  icon: {
    height: normalize(8),
    width: normalize(8),
    resizeMode: 'contain',
    marginRight: normalize(5),
    tintColor: '#B3B3B3',
  },
  subtxt: {
    fontFamily: fonts.Regular,
    color: colors.secondaryTextColor,
    fontSize: 18,
    fontWeight: '500',
  },
  btn: {
    width: '24%',
    marginLeft: normalize(9),
    height: normalize(23),
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    marginTop: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors?.placeholder,
    marginTop: 8,
    marginRight: 12,
    color: '#808080',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    color: 'black',
  },
  dropdown: {
    borderColor: colors?.lightGrey,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.borderColor,
    paddingHorizontal: 8,
    height: normalize(16),
  },
  placeholderStyle: {
    fontSize: normalize(14),
    color: colors?.searchPlaceholder,
  },
  selectedTextStyle: {
    fontSize: normalize(14),
    color: '#808080',
  },
  iconStyle: {
    width: normalize(20),
    height: normalize(20),
  },
  inputSearchStyle: {
    height: normalize(40),
    fontSize: normalize(14),
  },
});
