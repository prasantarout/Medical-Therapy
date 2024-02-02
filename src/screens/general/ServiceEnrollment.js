import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/common/SafeView';
import NavBar from '../../components/common/NavBar';
import TitleTxt from '../../components/common/TitleTxt';
import css from '../../themes/space';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import Txt from '../../components/micro/Txt';
import moment from 'moment';
import {fonts} from '../../themes/fonts';
import {icons} from '../../themes/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ServiceEnrollment = () => {
  const [date, setDate] = useState('10/11/23');
  const [time, setTime] = useState('10:30 am');
  const [service, setService] = useState('Select');
  const [remark, setRemark] = useState('Input');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

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
        <Txt style={styles.fieldTitle}>{props.title}</Txt>
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
      <View style={[css.px5, css.f1, css.bgColor, css.py9]}>
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
          <View style={[css.row, css.jcsb]}>
            <ValueField title={'Service'} icon={icons.down} value={service} />
            <ValueField title={'Remark'} value={remark} />
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
    fontSize: normalize(9),
    color: colors.primary,
    paddingBottom: normalize(6),
  },
  buttonCtnr: {
    // width: '45%',
    borderBottomWidth: normalize(1),
    borderColor: '#E5E5E5',
    paddingBottom: normalize(8),
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
    fontSize: normalize(9),
    fontWeight: '500',
  },
  btn: {
    width: '25%',
    marginLeft: normalize(9),
    height: normalize(23),
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    marginTop: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: colors.white,
    fontSize: normalize(9),
    fontWeight: '500',
  },
});
