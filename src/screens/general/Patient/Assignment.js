import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NavBar from '../../../components/common/NavBar';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import SearchInput from '../../../components/inputs/SearchInput';
import normalize from '../../../utils/normalize';
import Txt from '../../../components/micro/Txt';
import { fonts } from '../../../themes/fonts';
import { colors } from '../../../themes/colors';
import { icons } from '../../../themes/icons';
import AssignmentCard from '../../../components/common/AssignmentCard';
import SafeView from '../../../components/common/SafeView';
import useScreenDimension from '../../../utils/useScreenDimension';
import CalendarStrip from 'react-native-calendar-strip';

const Assignment = () => {
  const assignmentData = [
    {
      id: 1,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 2,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 3,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 4,
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 5,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 6,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 7,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 8,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 9,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
    {
      id: 10,
      desc: 'Lorem Ipsum is simply dummy text of the printing and and and typesetting industry.',
      date: '01 Sep 2023',
      time: '10:00 am',
    },
  ];

  const screenWidth = useScreenDimension()

  const assignmentRenderItem = ({ item, index }) => {
    return (
      <AssignmentCard detail={item.desc} time={item.time} date={item.date} />
    );
  };

  const customDatesStylesFunc = date => {
    if (date.isoWeekday() === 5) {
      return {
        // dateNameStyle: { color: '#fff' },
        // dateNumberStyle: { color: '#fff' },
        // dateContainerStyle: { backgroundColor: '#3abef0' },
      }
    }
  }


  return (
    <SafeView>
      <View style={[css.px5, css.f1, css.py4]}>
        <TitleTxt title={'All Assignments'} />
        <View style={[css.row, css.aic, css.mt4, css.jcsb]}>
          <View style={[css.row, css.aic]}>
            <View style={[styles.calenderArea]}>
              <CalendarStrip
                customDatesStyles={customDatesStylesFunc}
                scrollable={false}
                calendarHeaderFormat='DD MMM, YYYY'
                numDaysInWeek={1}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                style={[styles.calenderStrip]}
                calendarColor='transparent'
                calendarHeaderStyle={[styles.dateStyle]}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                calendarHeaderContainerStyle={[styles.calendarHeaderStyle]}
                dayContainerStyle={[styles.dayContainerStyle]}
                iconLeft={icons.leftArrow}
                iconRight={icons.leftArrow}
                iconStyle={[styles.iconStyle]}
                iconLeftStyle={[styles.iconLeftStyle]}
              />
            </View>
          </View>
          <View style={[{ width: screenWidth / 2.2 }]}>
            <SearchInput
              style={[]}
              placeholder={'Search here...'}
            />
          </View>
        </View>
        <View style={[css.f1]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={assignmentData}
            keyExtractor={item => item.id}
            renderItem={assignmentRenderItem}
            style={{ flex: 1, marginTop: normalize(10) }}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default Assignment;

const styles = StyleSheet.create({
  dayTxt: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: colors.primaryTextColor,
  },
  arrow: {
    height: normalize(8),
    width: normalize(8),
    resizeMode: 'contain',
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: normalize(26),
    paddingHorizontal: normalize(3),
    backgroundColor: colors.white,
    borderRadius: normalize(3),
    borderColor: '#EFEFEF',
    borderWidth: normalize(1),
    marginLeft: normalize(7),
  },
  dateTxt: {
    fontFamily: fonts.Regular,
    color: '#444444',
    fontSize: normalize(7),
    fontWeight: '400',
    paddingHorizontal: normalize(4),
  },
  calenderArea: {
    width: 200,
  },
  calendarHeaderStyle: {
    position: 'absolute',
    top: 38,
    left: 40,
    zIndex: 99
  },
  dayContainerStyle: {
    backgroundColor: 'transparent',
    width: 100,
    zIndex: -1,
    opacity: 0
  },
  dateStyle: {
    fontFamily: fonts.Regular,
    fontSize: 20,
    color: '#444444'
  },
  iconStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  cardRightIcon: {
    resizeMode: 'contain',
    height: 25,
    width: 100
  },
  iconLeftStyle: {
    transform: [{ rotate: '180deg' }]
},
});
