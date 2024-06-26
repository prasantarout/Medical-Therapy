import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SafeView from '../../../components/common/SafeView';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import {useNavigation} from '@react-navigation/native';
import Txt from '../../../components/micro/Txt';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import {icons} from '../../../themes/icons';
import CustomTable from '../../../components/common/CustomTable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {fonts} from '../../../themes/fonts';
import moment from 'moment';

const headerDataArr = [
  {
    label: 'Patient Name',
    enableSort: true,
    width: 4,
  },
  {
    label: 'Setup Date',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.Calendar,
  },
  {
    label: 'Device',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.device,
  },
  {
    label: 'Total Usage',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.hourglass,
  },
  {
    label: 'Session Date',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.Calendar,
  },
  {
    label: 'Session Time',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.Clock,
  },
];

const bodyDataArr = [['Test Tester', '2', '3', '4', '5', '6']];

const CurrentMonthSessionData = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  return (
    <SafeView sticky={[1]}>
      <View style={styles.headerContainer}>
        <TitleTxt title="Current Month Session Data" />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Txt style={styles.btnTxt}>Back</Txt>
        </TouchableOpacity>
      </View>
      <View style={[css.f1, css.p4, css.pt0]}>
        <View style={styles.calenderContainer}>
          <TouchableOpacity
            style={styles.calenderTextContainer}
            onPress={() => setIsStartDateVisible(true)}>
            <Image style={[styles.calenderIcon]} source={icons.calender} />
            <Text style={styles.calenderText}>
              {startDate
                ? moment(startDate).format('DD-MM-YYYY')
                : 'Start Date'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.calenderTextContainer]}
            onPress={() => setIsEndDateVisible(true)}>
            <Image style={[styles.calenderIcon]} source={icons.calender} />
            <Text style={styles.calenderText}>
              {endDate ? moment(endDate).format('DD-MM-YYYY') : 'End Date'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDateVisible}
            mode="date"
            date={startDate || new Date()}
            minimumDate={new Date('01-01-1990')}
            maximumDate={endDate || new Date()}
            onConfirm={date => {
              setStartDate(date);
              setIsStartDateVisible(false);
            }}
            onCancel={() => setIsStartDateVisible(false)}
          />
          <DateTimePickerModal
            isVisible={isEndDateVisible}
            mode="date"
            date={endDate || new Date()}
            minimumDate={startDate || new Date('02-01-1990')}
            maximumDate={new Date()}
            onConfirm={date => {
              setEndDate(date);
              setIsEndDateVisible(false);
            }}
            onCancel={() => setIsEndDateVisible(false)}
          />
        </View>
        <CustomTable
          actionButtonText={'View'}
          onPressActionButton={(value, index) => {
            // console.log('came', value, index);
          }}
          tableHeaderDataArr={headerDataArr}
          tableBodyDataArr={bodyDataArr}
          paddingBottom={100}
          // tableBodyContainerStyle={{backgroundColor: 'red'}}
        />
      </View>
    </SafeView>
  );
};

export default CurrentMonthSessionData;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(8),
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(16),
    paddingHorizontal: normalize(10),
  },
  btnTxt: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  calenderContainer: {
    flexDirection: 'row',
  },
  calenderTextContainer: {
    flexDirection: 'row',
    width: normalize(75),
    height: normalize(20),
    alignItems: 'center',
  },
  calenderText: {
    marginLeft: 10,
    color: colors.primaryTextColor,
    fontSize: 22,
    fontFamily: fonts.Medium,
  },
  calenderIcon: {
    height: normalize(8),
    width: normalize(8),
    resizeMode: 'contain',
    tintColor: colors.primaryTextColor,
  },
});
