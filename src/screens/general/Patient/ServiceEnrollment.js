import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import TitleTxt from '../../../components/common/TitleTxt';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import Txt from '../../../components/micro/Txt';
import moment from 'moment';
import {fonts} from '../../../themes/fonts';
import {icons} from '../../../themes/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SimpleDropDown from '../../../components/common/SimpleDropDown';
import SimpleInput from '../../../components/inputs/SimpleInput';

const ServiceEnrollment = () => {
  const [date, setDate] = useState('10/11/23');
  const [time, setTime] = useState('10:30 am');
  const [service, setService] = useState('');
  const [remark, setRemark] = useState('Input');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const ServiceData = [
    {
      id: 0,
      label: 'Service 1',
      value: 'Service 1',
    },
    {
      id: 1,
      label: 'Service 2',
      value: 'Service 2',
    },
    {
      id: 2,
      label: 'Service 3',
      value: 'Service 3',
    },
    {
      id: 3,
      label: 'Service 4',
      value: 'Service 4',
    },
    {
      id: 4,
      label: 'Service 5',
      value: 'Service 5',
    },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    console.warn('A date has been picked: ', time);
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
  return (
    <SafeView>
      <NavBar />
      <View style={[css.px5, css.f1, css.py4]}>
        <TitleTxt title={'Service Enrolment'} />
        <View style={styles.container}>
          <View style={[css.row, css.jcsb]}>
            <ValueField
              title={'Date'}
              icon={icons.Calendar}
              value={date}
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
              <SimpleDropDown
                data={ServiceData}
                title="Service"
                style={[css.mr2]}
                value={service}
                placeholder="Select"
                onChange={item => setService(item.value)}
              />
            </View>
            <View style={[css.w50, css.mt10, css.ml2]}>
              <SimpleInput
                title="Remark"
                style={[css.ml2]}
                value={[]}
                placeholder="Input"
                onChange={val => setRemark(val)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btn}>
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
});
