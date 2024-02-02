import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/common/SafeView';
import NavBar from '../../components/common/NavBar';
import css from '../../themes/space';
import TitleTxt from '../../components/common/TitleTxt';
import SearchInput from '../../components/inputs/SearchInput';
import normalize from '../../utils/normalize';
import Txt from '../../components/micro/Txt';
import {fonts} from '../../themes/fonts';
import {colors} from '../../themes/colors';
import {icons} from '../../themes/icons';
import AssignmentCard from '../../components/common/AssignmentCard';

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

  const assignmentRenderItem = ({item, index}) => {
    return (
      <AssignmentCard detail={item.desc} time={item.time} date={item.date} />
    );
  };
  return (
    <SafeView>
      <NavBar />
      <View style={[css.px5, css.f1, css.bgColor, css.py8]}>
        <TitleTxt title={'All Assignments'} />
        <View style={[css.row, css.aic, css.mt4, css.jcsb]}>
          <View style={[css.row, css.aic]}>
            <Txt style={[styles.dayTxt]}>Today</Txt>
            <View style={[styles.dateContainer]}>
              <Image source={icons.backArrow} style={[styles.arrow]} />
              <Txt style={[styles.dateTxt]}>(15th sep, 2023)</Txt>
              <Image source={icons.nextArrow} style={[styles.arrow]} />
            </View>
          </View>
          <SearchInput
            style={{width: normalize(120)}}
            placeholder={'Search here...'}
          />
        </View>
        <View style={[css.f1]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={assignmentData}
            keyExtractor={item => item.id}
            renderItem={assignmentRenderItem}
            style={{flex: 1, marginTop: normalize(10)}}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default Assignment;

const styles = StyleSheet.create({
  dayTxt: {
    fontFamily: fonts.Regular,
    fontSize: normalize(10),
    color: colors.primaryTextColor,
    fontWeight: '600',
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
});
