import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from '../../utils/normalize';
import {colors} from '../../themes/colors';
import Txt from '../micro/Txt';
import css from '../../themes/space';
import {icons} from '../../themes/icons';
import {fonts} from '../../themes/fonts';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

// Utility function for date details
const getDateDetails = date => {
  const today = moment();
  const dateMoment = moment(date);

  return {
    isPast: dateMoment.isBefore(today, 'day'),
    isFuture: dateMoment.isAfter(today, 'day'),
    daysRemaining: dateMoment.diff(today, 'days') + 1,
    dateMoment,
  };
};

// Skeleton component for loading state
const Skeleton = ({style}) => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#f4f4f4', '#e8e8e8', '#dddddd']}
    style={style}
  />
);

const DateInfo = ({date, label, isPMDue}) => {
  const {isPast, isFuture, daysRemaining, dateMoment} = getDateDetails(date);
  let backgroundColor = 'transparent';
  let displayText = 'N/A';
  let textColor = colors.black;
  if (isPMDue) {
    if (isPast) {
      backgroundColor = 'red';
      displayText = 'Past Due';
      textColor = 'white';
    } else if (daysRemaining <= 7) {
      backgroundColor = 'red';
      displayText = `${daysRemaining} days`;
      textColor = 'white';
    } else if (daysRemaining > 7 && daysRemaining <= 30) {
      backgroundColor = 'yellow';
      displayText = `${daysRemaining} days `;
      textColor = colors.black;
    } else if (daysRemaining > 30) {
      backgroundColor = 'green';
      displayText = `${daysRemaining} days`;
      textColor = 'white';
    }
  } else if (isPast) {
    backgroundColor = 'red';
    displayText = 'Past Due';
    textColor = 'white';
  } else if (daysRemaining <= 7) {
    backgroundColor = 'red';
    displayText = `${daysRemaining} days`;
    textColor = 'white';
  } else if (daysRemaining > 7 && daysRemaining <= 30) {
    backgroundColor = 'yellow';
    displayText = `${daysRemaining} days`;
    textColor = colors.black;
  } else if (daysRemaining > 30) {
    backgroundColor = 'green';
    displayText = `${daysRemaining} days`;
    textColor = 'white';
  }

  return (
    <View style={[css.row, css.aic, css.mb1]}>
      <Text style={styles.subTxt}>{label}</Text>
      <View style={[styles.dateContainer, {backgroundColor}]}>
        <Text style={[styles.dateText, {color: textColor}]}>
          {date ? dateMoment.format('DD/MM/YYYY') : 'N/A'}
        </Text>
      </View>
      {date && (
        <View style={[styles.statusContainer]}>
          <Text style={[styles.statusText, {color: 'black'}]}>
            ({displayText})
          </Text>
        </View>
      )}
    </View>
  );
};

const PatientCard = props => {
  const {
    name,
    location,
    time,
    image,
    Button,
    navigateTo,
    navigateTo1,
    style,
    nextVisit,
    PMDue,
    complaints,
    medicalDevices,
    patientId,
    status,
  } = props;
  const determineBackgroundColor = () => {
    if (status === true) {
      return '#cbd1d3';
    } else {
      return '#dae3eb';
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.mainCard,
        {backgroundColor: determineBackgroundColor()},
        style,
      ]}>
      {/* {image ? (
        <ImageBackground
          resizeMode="stretch"
          source={{uri: image}}
          style={styles.profile}
        />
      ) : (
        <Skeleton style={styles.profile} />
      )} */}
      <View style={[{height: 40}, css.jcc]}>
        {name ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={styles.titleTxts}
              numberOfLines={2}
              ellipsizeMode="tail">
              {name}
            </Text>
            <Txt style={styles.titleTxt}>#{patientId}</Txt>
          </View>
        ) : (
          <Skeleton style={styles.skeletonText} />
        )}
      </View>

      <DateInfo date={nextVisit} label="Next Visit:" />
      <DateInfo date={PMDue} label="PM Due:" isPMDue />

      <View style={[css.row, css.aic, css.mb1]}>
        <Image source={icons.Location} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{location ? location : 'N/A'}</Txt>
      </View>
      <View style={[css.row, css.aic, css.mb1]}>
        <Image source={icons.devices} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{medicalDevices?.trim() || 'N/A'}</Txt>
      </View>
      <View style={[css.row, css.aic, css.mb1]}>
        <Image source={icons.masks} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{'N/A'}</Txt>
      </View>
      <View style={[css.row, css.aic, css.mb1]}>
        <Text style={styles.subTxt}>Billing: </Text>
        <Image source={icons.close} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{'0'} %</Txt>
      </View>
      <View style={[css.row, css.aic, css.mb1]}>
        <Text style={styles.subTxt}>Clinical: </Text>
        <Image source={icons.close} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{complaints || '0'} %</Txt>
      </View>

      {time && (
        <View style={[css.row, css.aic]}>
          <Image source={icons.Clock} style={styles.IconStyle} />
          <Txt style={styles.subTxt}>{time}</Txt>
        </View>
      )}

      {Button && (
        <TouchableOpacity onPress={navigateTo1} style={styles.btn}>
          <Txt style={styles.btnTxt}>Patient Details</Txt>
        </TouchableOpacity>
      )}

      {Button && (
        <TouchableOpacity
          onPress={navigateTo}
          style={styles.btn}
          disabled={status}>
          <Txt style={styles.btnTxt}>Submit Evaluation</Txt>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    justifyContent: 'center',
    marginBottom: normalize(10),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(3),
    borderRadius: normalize(5),
  },
  profile: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
  },
  skeletonText: {
    height: 20,
    minWidth: 100,
    width: '100%',
    marginTop: 10,
  },
  titleTxts: {
    fontSize: normalize(5.5),
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  titleTxt: {
    fontSize: normalize(5.5),
    fontFamily: fonts.SemiBold,
  },
  IconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  subTxt: {
    fontSize: 16,
    marginLeft: normalize(4),
    color: '#444444',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 13,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    marginTop: 16,
    backgroundColor: '#fff',
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  dateContainer: {
    borderRadius: 5,
    padding: 6,
  },
  dateText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  statusContainer: {
    marginLeft: normalize(1),
    borderRadius: 5,
  },
  statusText: {
    color: 'white',
    borderRadius: 4,
    fontWeight: '500',
  },
});

export default PatientCard;
