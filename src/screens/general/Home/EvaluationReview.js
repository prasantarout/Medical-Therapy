/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../../components/common/SafeView';
import Loader from '../../../utils/Loader';
import TitleTxt from '../../../components/common/TitleTxt';
import {useNavigation, useRoute} from '@react-navigation/native';
import Txt from '../../../components/micro/Txt';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {getEvaluationReviewReq} from '../../../redux/reducer/DashboardReducer';
import {icons} from '../../../themes/icons';

let dashboardStatus = '';

const getFormattedUserData = data => {
  return [
    {
      label: 'First Name',
      value: data?.patient?.first_name,
    },
    {
      label: 'Last Name',
      value: data?.patient?.last_name,
    },
    {
      label: 'Setup Date',
      value: data?.patient?.setupDate,
    },
    {
      label: 'Device',
      value:
        data?.patient?.device_serial_no + ' ' + data?.patient?.device_type_desc,
    },
    {
      label: 'Therapist Name',
      value: data?.therapist?.full_name,
    },
    {
      label: 'Location',
      value: data?.patient?.location,
    },
    {
      label: 'Evaluation Type',
      value: data?.question_type,
    },
  ];
};

const getFormattedClinicData = ({data, type, notType}) => {
  let newList = [];

  data?.evaluation_question_answer?.map(item => {
    if (type && type === item?.question?.type) {
      newList.push({
        label: item?.question?.title,
        value: item?.answer,
        type: item?.question?.type,
      });
    }
    if (notType && type !== item?.question?.type) {
      newList.push({
        label: item?.question?.title,
        value: item?.answer,
        type: item?.question?.type,
      });
    }
  });
  return newList;
};

const EvaluationReview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvaluationReviewReq({param: route?.params?.id}));
  }, []);

  if (dashboardStatus === '' || DashboardReducer?.status !== dashboardStatus) {
    switch (DashboardReducer?.status) {
      case 'Dashboard/getEvaluationReviewReq':
        dashboardStatus = DashboardReducer?.status;
        break;
      case 'Dashboard/getEvaluationReviewSuccess':
        dashboardStatus = DashboardReducer.status;
        break;
      case 'Dashboard/getEvaluationReviewFailure':
        dashboardStatus = DashboardReducer.status;
        break;
    }
  }

  return (
    <SafeView sticky={[1]}>
      <Loader visible={false} />
      <View style={styles.headerContainer}>
        <TitleTxt title="Evaluation Review" />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Txt style={styles.btnTxt}>Back</Txt>
        </TouchableOpacity>
      </View>
      <View style={[css.f1, css.p4, css.pt0]}>
        <View style={styles.mainContainer}>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Evaluation Status: </Text>
            <Text style={styles.statusText}>{route?.params?.status}</Text>
          </View>
          <View style={[css.row, css.fw, css.mt5]}>
            {getFormattedUserData(
              DashboardReducer?.getEvaluationReviewData,
            ).map((item, index) => {
              return <UserDetailsComponent {...item} />;
            })}
          </View>
          <View style={css.border} />
          {getFormattedClinicData({
            data: DashboardReducer?.getEvaluationReviewData,
            type: 'number_rating',
          })?.length > 0 ? (
            <>
              <View style={[css.row, css.aic, css.my5]}>
                <View style={[css.row, css.w30]}>
                  <Text style={styles.labelTextBig}>Rate The Therapist</Text>
                </View>
                <View style={[css.row, css.f1, css.jcse, css.aic]}>
                  <View style={css.w30}>
                    <Text style={styles.valueTextSmall}>Not Satisfied</Text>
                  </View>
                  <View style={css.w40}>
                    <Text style={styles.valueTextSmall}>Need Improvement</Text>
                  </View>
                  <View style={css.w20}>
                    <Text style={styles.valueTextSmall}>Satisfied</Text>
                  </View>
                  <View style={css.w10}>
                    <Text style={styles.valueTextSmall}>Great</Text>
                  </View>
                </View>
              </View>
              {getFormattedClinicData({
                data: DashboardReducer?.getEvaluationReviewData,
                type: 'number_rating',
              })?.map((item, index) => {
                return <NumberRatingComponent {...item} />;
              })}
            </>
          ) : (
            <></>
          )}
          <View style={[css.row, css.fw, css.mt5]}>
            {getFormattedClinicData({
              data: DashboardReducer?.getEvaluationReviewData,
              notType: 'number_rating',
            })?.map((item, index) => {
              return item?.type === 'input_text' ? (
                <InputTextComponent {...item} />
              ) : item?.type === 'radio_rating' ? (
                <RadioRatingsComponent {...item} />
              ) : (
                <></>
              );
            })}
          </View>
        </View>
      </View>
    </SafeView>
  );
};

const UserDetailsComponent = ({label, value}) => {
  return (
    <View style={[css.w50, css.mb5]}>
      <Text style={styles.labelTextSmall}>{label}</Text>
      <Text style={styles.valueTextSmall}>{value}</Text>
    </View>
  );
};

const InputTextComponent = ({label, value}) => {
  return (
    <View style={[label.length > 30 ? css.w100 : css.w50, css.mb5]}>
      <Text style={styles.labelTextBig}>{label}</Text>
      <Text
        style={value !== 'N/A' ? styles.labelTextSmall : styles.valueTextSmall}>
        {value}
      </Text>
    </View>
  );
};

const NumberRatingComponent = ({label, value}) => {
  return (
    <View style={[css.row, css.aic, css.w100, css.mb5]}>
      <View style={[css.row, css.w30, css.aic]}>
        <Text style={styles.labelTextSmall}>{label}</Text>
      </View>
      <View style={[css.row, css.f1, css.jcse, css.aic]}>
        {Array.apply(null, Array(4)).map((_, index) => {
          return (
            <View
              style={[
                styles.ratingsIconContainer,
                index === 0
                  ? css.w30
                  : index === 1
                  ? css.w40
                  : index === 2
                  ? css.w20
                  : css.w10,
              ]}>
              <Image
                style={styles.redioIcon}
                source={
                  value <= index ? icons.radioInactive : icons.radioActive
                }
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RadioRatingsComponent = ({label, value}) => {
  return (
    <View style={[css.w100, css.mb5]}>
      <Text style={styles.labelTextBig}>{label}</Text>
      <View style={[css.row, css.aic]}>
        {Array.apply(null, Array(10)).map((_, index) => {
          return (
            <View style={styles.radioIconContainer}>
              <Image
                style={styles.redioIcon}
                source={value < index ? icons.radioInactive : icons.radioActive}
              />
              <Text style={styles.radioIconText}>
                {index === 0 ? 'Worst' : ''}
                {index === 9 ? 'Best' : ''}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default EvaluationReview;

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
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: normalize(4),
    padding: normalize(10),
    flex: 1,
  },
  statusContainer: {
    width: normalize(130),
    height: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(20),
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  statusLabel: {
    fontSize: normalize(8),
    color: colors.white,
    fontFamily: fonts.Medium,
  },
  statusText: {
    fontSize: normalize(8),
    color: colors.secondary,
    fontFamily: fonts.Medium,
  },
  labelTextSmall: {
    fontSize: normalize(7),
    color: colors.primary,
    fontFamily: fonts.Medium,
  },
  labelTextBig: {
    fontSize: normalize(8),
    color: colors.black,
    fontFamily: fonts.Medium,
  },
  valueTextSmall: {
    fontSize: normalize(7),
    color: colors.black,
    fontFamily: fonts.Regular,
  },
  redioIcon: {
    height: normalize(9),
    width: normalize(9),
    resizeMode: 'contain',
  },
  radioIconText: {
    fontSize: normalize(7),
    color: colors.black,
    fontFamily: fonts.Regular,
    position: 'absolute',
    bottom: -normalize(12),
  },
  radioIconContainer: {
    width: normalize(24),
    marginBottom: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(5),
  },
  ratingsIconContainer: {
    width: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
