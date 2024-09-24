import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import css, {width} from '../../themes/space';
import TitleTxt from './TitleTxt';
import {assignmentList} from '../../utils/dumpAPI';
import Txt from '../micro/Txt';
import {icons} from '../../themes/icons';
import useOrientation from '../../utils/useOrientation';
import {colors} from '../../themes/colors';
import moment from 'moment';
import BounceText from '../micro/BounceText';
import CustomAnimatedInfo from '../../utils/CustomAnimatedInfo';
import normalize from '../../utils/normalize';
import {fonts} from '../../themes/fonts';

const CalenderView = props => {
  const customDatesStylesFunc = date => {
    let weekday = moment(date).format('YYYY-MM-DD');
    let apidate = moment(props?.date).format('YYYY-MM-DD');

    if (weekday == apidate) {
      return {
        dateNameStyle: {color: '#fff'},
        dateNumberStyle: {color: '#fff'},
        dateContainerStyle: {
          backgroundColor: '#3abef0',
          height: 88,
          width: 60,
          paddingTop: 5,
        },
      };
    }
  };

  let orientation = useOrientation();
  let cardWidth = orientation == 'LANDSCAPE' ? '33.3%' : '50%';

  return (
    <View style={[styles.patientEnrollment, css.mt4]}>
      <View style={[css.card]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TitleTxt title="Sessions" />
          <TouchableOpacity
            onPress={() => {
              props?.navigation.navigate('Patients Session');
            }}>
            <TitleTxt
              title="See All"
              style={{fontSize: normalize(8), color: colors.black}}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.calenderArea]}>
          <CalendarStrip
            customDatesStyles={customDatesStylesFunc}
            startingDate={moment()}
            onDateSelected={date => props.onDateSelected(date)}
            numDaysInWeek={7}
            calendarAnimation={{type: 'sequence', duration: 0}}
            style={{height: 200, paddingTop: 20, paddingBottom: 10}}
            calendarColor="transparent"
            calendarHeaderStyle={{color: 'black'}}
            dateNumberStyle={{
              color: 'black',
              fontSize: 24,
              fontFamily: fonts.Regular,
              fontWeight: '600',
            }}
            dateNameStyle={{color: 'black'}}
            iconContainer={{flex: 0.1}}
          />
        </View>
        {/* {console.log(props.data, '???????data')} */}
        <View style={[css.f1, css.row, css.fw]}>
          {props?.data?.length > 0 ? (
            props?.data?.map((item, index) => {
              let borderLeftColor =
                orientation == 'LANDSCAPE'
                  ? index % 3 === 0
                    ? colors.primary
                    : index % 3 === 1
                    ? colors.secondary
                    : colors.primary
                  : index % 2 === 0
                  ? colors.primary
                  : colors.secondary;
              return (
                <View
                  key={index}
                  style={[
                    styles.cardStyle,
                    {width: cardWidth, borderLeftColor: borderLeftColor},
                  ]}>
                  <Txt style={[css.bold, css.fs18]}>{item?.patient_name}</Txt>
                  <View style={[css.row, css.aic, {marginTop: 10}]}>
                    <View style={[css.row, css.aic]}>
                      <Image
                        source={icons.calender}
                        style={[styles.iconStyle]}
                      />
                      <Txt style={[css.fs12, css.medium]}>
                        {item?.session_date}
                      </Txt>
                    </View>
                    <View style={[css.row, css.aic, css.ml3]}>
                      <Image source={icons.clock2} style={[styles.iconStyle]} />
                      <Txt style={[css.fs12, css.medium]}>
                        {item?.receipt_at}
                      </Txt>
                    </View>
                  </View>
                  <View style={[css.row, css.aic, {marginTop: 10}]}>
                    <Image
                      source={icons.location2}
                      style={[styles.iconStyle]}
                    />
                    <Txt style={[css.fs12, css.medium]}>{item?.location}</Txt>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={[styles.noDataWrap]}>
              <CustomAnimatedInfo
                style={[css.mr20]}
                isVisible={true}
                icon={icons.waves}
                title="No Session Found"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CalenderView;

const styles = StyleSheet.create({
  cardStyle: {
    padding: 16,
    borderLeftWidth: 2,
    marginBottom: 16,
  },
  iconStyle: {
    width: 17,
    height: 17,
    marginRight: 10,
  },
  noDataWrap: {
    height: 300,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
});
