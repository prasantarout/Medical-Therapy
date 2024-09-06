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
    daysRemaining: dateMoment.diff(today, 'days'),
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
    backgroundColor = isPast || isFuture ? 'green' : 'transparent';
    textColor = isPast || isFuture ? 'white' : colors.black;
    displayText = isPast ? 'Past Due' : `${daysRemaining} days`;
  } else if (isPast) {
    backgroundColor = 'green';
    displayText = 'Past Due';
    textColor = 'white';
  } else if (isFuture) {
    backgroundColor = 'yellow';
    displayText = `${daysRemaining} days`;
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
        <View
          style={[
            styles.statusContainer,
            {
              padding: isPast ? 6 : 0,
              backgroundColor: isFuture ? 'transparent' : 'red',
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: isFuture ? 'black' : textColor},
            ]}>
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
  } = props;

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.mainCard, style]}>
      {image ? (
        <ImageBackground
          resizeMode="stretch"
          source={{uri: image}}
          style={styles.profile}
        />
      ) : (
        <Skeleton style={styles.profile} />
      )}
      <View style={[{height: 40}, css.jcc]}>
        {name ? (
          <Txt style={styles.titleTxt}>{name}</Txt>
        ) : (
          <Skeleton style={styles.skeletonText} />
        )}
      </View>

      <DateInfo date={nextVisit} label="Next Visit:" />
      <DateInfo date={PMDue} label="PM Due:" isPMDue />

      <View style={[css.row, css.aic, css.mb1]}>
        <Image source={icons.Location} style={styles.IconStyle} />
        <Txt style={styles.subTxt}>{location || 'N/A'}</Txt>
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
        <Text style={styles.subTxt}>Compliant: </Text>
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
        <TouchableOpacity onPress={navigateTo} style={styles.btn}>
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
    backgroundColor: colors.white,
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
  titleTxt: {
    fontSize: 20,
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
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginTop: 16,
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
