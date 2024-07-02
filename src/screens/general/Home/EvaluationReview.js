import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SafeView from '../../../components/common/SafeView';
import Loader from '../../../utils/Loader';
import TitleTxt from '../../../components/common/TitleTxt';
import {useNavigation} from '@react-navigation/native';
import Txt from '../../../components/micro/Txt';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import {fonts} from '../../../themes/fonts';

const userData = [
  {
    label: 'First Name',
    value: 'Bruce',
  },
  {
    label: 'Last Name',
    value: 'Morse',
  },
  {
    label: 'Setup Date',
    value: '01 Oct 2019',
  },
  {
    label: 'Device',
    value: '23183327670 - AirCurve 10 ST',
  },
  {
    label: 'Therapist Name',
    value: 'therapist user',
  },
  {
    label: 'Location',
    value: 'CMT Lewiston',
  },
  {
    label: 'Evaluation Type',
    value: 'Respiratory Plan of Care',
  },
];

const clinicData = [
  {
    label: 'MRN',
    value: 'test 23',
  },
  {
    label: 'Date Of Birth:',
    value: '1990-07-01',
  },
  {
    label: 'Primary Contact',
    value: 'N/A',
  },
  {
    label: 'Primary Contact Relationship To Patient:',
    value: 'N/A',
  },
  {
    label: 'Emergency Contacts',
    value: 'N/A',
  },
  {
    label: 'Diagnosis',
    value: 'N/A',
  },
  {
    label: 'Allergies',
    value: 'N/A',
  },
  {
    label: 'Names And Contact Numbers',
    value: 'N/A',
  },
  {
    label: 'Start Of Care',
    value: 'N/A',
  },
  {
    label: 'Physician',
    value: 'N/A',
  },
  {
    label: 'Nursing Agency',
    value: 'N/A',
  },
  {
    label: 'Evaluation Type',
    value: 'N/A',
  },
  {
    label: 'Initial Assessment',
    value: 'N/A',
  },
  {
    label: 'Re-Assessment',
    value: 'N/A',
  },
  {
    label: 'Last Admission Date',
    value: 'N/A',
  },
  {
    label: 'Last MD Visit',
    value: 'N/A',
  },
  {
    label: 'Last MD Visit With Whom',
    value: 'N/A',
  },
  {
    label: 'Plan Of Care',
    value: 'N/A',
  },
  {
    label: 'Plan Of Goals',
    value: 'N/A',
  },
  {
    label: 'Plan Of Obstacles',
    value: 'N/A',
  },
  {
    label: 'Plan Of Meet Goals',
    value: 'N/A',
  },
  {
    label: 'PM Due Date',
    value: 'N/A',
  },
];

const EvaluationReview = () => {
  const navigation = useNavigation();

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
            <Text style={styles.statusText}>Pending</Text>
          </View>
          <View style={[css.row, css.fw, css.mt5]}>
            {userData.map((item, index) => {
              return <UserDetailsComponent {...item} />;
            })}
          </View>
          <View style={css.border} />
          <View style={[css.mb5, css.mt5]}>
            <Text style={styles.labelTextBig}>Rate The Therapist</Text>
            <View style={[css.row, css.jcsb]}>
              <Text style={styles.valueTextSmall}>Not Satisfied</Text>
              <Text style={styles.valueTextSmall}>Need Improvement</Text>
              <Text style={styles.labelTextSmall}>Satisfied</Text>
              <Text style={styles.valueTextSmall}>Great</Text>
            </View>
          </View>
          <View style={css.border} />
          <View style={[css.row, css.fw, css.mt5]}>
            {clinicData.map((item, index) => {
              return <ClinicDetailsComponent {...item} />;
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

const ClinicDetailsComponent = ({label, value}) => {
  return (
    <View style={[css.w50, css.mb5]}>
      <Text style={styles.labelTextBig}>{label}</Text>
      <Text
        style={value !== 'N/A' ? styles.labelTextSmall : styles.valueTextSmall}>
        {value}
      </Text>
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
});
