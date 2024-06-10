import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {colors} from '../../themes/colors';
import normalize from '../../utils/normalize';

const CustomCalender = ({
  type,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [markedDate, setMarkedDate] = useState([]);

  useEffect(() => {
    if (startDate && endDate) {
      getMarkedList(startDate, endDate);
    } else if (startDate && endDate === '') {
      getMarkedList(startDate, new Date(startDate + 1));
    } else {
      setMarkedDate([]);
    }
  }, [type, startDate, endDate]);

  const getMarkedList = (start, end) => {
    console.log('end', end);
    let marked = {};
    let presentDate = new Date(start);
    console.log('present', presentDate);
    while (presentDate <= end) {
      let year = presentDate?.getFullYear().toString();
      let month = (presentDate?.getMonth() + 1).toString().padStart(2, '0');
      let day = presentDate?.getDate().toString().padStart(2, '0');
      console.log('`${year}-${month}-${day}`', `${year}-${month}-${day}`);
      marked[`${year}-${month}-${day}`] = {
        startingDay: presentDate?.getTime() === start?.getTime(),
        endingDay: presentDate?.getTime() === end?.getTime(),
        color: colors.primary,
        textColor: colors.secondary,
        disabled: false,
      };
      presentDate?.setDate(presentDate?.getDate() + 1);
    }
    setMarkedDate(marked);
  };

  return (
    <Calendar
      markingType={'period'}
      markedDates={markedDate}
      style={styles.mainContainer}
      maxDate={new Date() - 1}
      onDayPress={val => {
        if (type === 'Custom Date') {
          if (startDate === '') {
            setStartDate(new Date(val?.dateString));
            setEndDate('');
          } else if (startDate && new Date(val?.dateString) > startDate) {
            setEndDate(new Date(val?.dateString));
          } else if (
            startDate &&
            endDate &&
            new Date(val?.dateString) < startDate
          ) {
            setStartDate(new Date(val?.dateString));
            setEndDate('');
          } else if (
            startDate &&
            endDate &&
            new Date(val?.dateString) > endDate
          ) {
            setEndDate(new Date(val?.dateString));
          } else {
            setStartDate('');
            setEndDate('');
          }
        }
      }}
    />
  );
};

export default CustomCalender;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: normalize(2),
    elevation: 3,
    shadowColor: '#9E4DB6',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    height: normalize(150),
    width: normalize(150),
  },
});
