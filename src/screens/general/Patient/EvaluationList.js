import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import TitleTxt from '../../../components/common/TitleTxt';
import SafeView from '../../../components/common/SafeView';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import Txt from '../../../components/micro/Txt';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fonts} from '../../../themes/fonts';
import {getEvaluationReviewReq} from '../../../redux/reducer/DashboardReducer';

const evaluations = [
  {
    date: '05 Sep 2024',
    assessment: 'Assessment example two',
    status: 'Approved',
  },
  {
    date: '09 Sep 2024',
    assessment: 'CAT Assessment',
    status: 'Approved',
  },
  {
    date: '11 Sep 2024',
    assessment: 'CAT Assessment',
    status: 'Approved',
  },
];

const EvaluationList = props => {
  const navigation = useNavigation();
  let patientData = props?.route?.params?.patient
    ? props?.route?.params?.patient
    : '';
  const AuthReducer = useSelector(state => state?.AuthReducer);
  const DashboardReducer = useSelector(state => state?.DashboardReducer);
  const dispatch = useDispatch();
  // useEffect(()=>{

  // },[DashboardReducer?.status])
  // console.log(DashboardReducer?.getEvaluationReviewData, '>>>>>>propsData');

  useEffect(() => {
    dispatch(getEvaluationReviewReq({param: patientData?.id}));
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.column}>{item.date}</Text>
      <Text style={styles.column}>{item.assessment}</Text>
      <Text style={styles.column}>{item.status}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const ValueField = props => {
    return (
      <View style={styles.ValueField}>
        <Txt style={[styles.fieldTitle, css.fs20]}>{props.title}</Txt>
        <TouchableOpacity
          onPress={props.onPress}
          style={styles.buttonCtnr}
          activeOpacity={0.7}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.subtxt} numberOfLines={1}>
              {props.value}
            </Text>
            {/* <Image source={props.icon} style={[styles.icon, props.style]} /> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={{flex: 1}}>
      <SafeView {...props}>
        <View style={[css.px5, css.f1, css.py4]}>
          <View style={styles.headerContainer}>
            <TitleTxt title={'Patient Details:'} />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.goBack()}>
              <Txt style={styles.btnTxt}>Back</Txt>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'First Name'}
                value={
                  patientData?.first_name ? patientData?.first_name : 'N/A'
                }
              />
              <ValueField
                title={'Last Name'}
                value={patientData?.last_name ? patientData?.last_name : 'N/A'}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Setup Date'}
                value={
                  patientData?.resmeduser?.setupDate
                    ? patientData?.resmeduser?.setupDate
                    : 'N/A'
                }
              />
              <ValueField
                title={'Device'}
                value={
                  patientData?.resmeduser?.device_serial_no
                    ? patientData?.resmeduser?.device_serial_no +
                      '-' +
                      patientData?.resmeduser?.device_type_desc
                    : 'N/A'
                }
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Therapist Name'}
                value={
                  AuthReducer?.ProfileResponse?.data?.full_name
                    ? AuthReducer?.ProfileResponse?.data?.full_name
                    : 'N/A'
                }
              />
              <ValueField
                title={'Location'}
                value={patientData?.full_address}
              />
            </View>
            <View style={styles.containers}>
              <Text style={styles.title}>Evaluation List:</Text>
              <View style={styles.headerRow}>
                <Text style={styles.headerColumn}>Submitted Date</Text>
                <Text style={styles.headerColumn}>Assessment</Text>
                <Text style={styles.headerColumn}>Evaluation Status</Text>
                <Text style={styles.headerColumn}>Action</Text>
              </View>
              <FlatList
                data={evaluations}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </SafeView>
    </KeyboardAvoidingView>
  );
};

export default EvaluationList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    backgroundColor: colors.white,
    marginTop: normalize(12),
    borderRadius: normalize(5),
  },
  ValueField: {padding: normalize(5), width: '50%'},
  fieldTitle: {
    fontFamily: fonts.Regular,
    color: colors.primary,
    paddingBottom: normalize(4),
  },
  buttonCtnr: {
    // borderWidth: 1,
    borderColor: colors.borderColor,
    padding: normalize(7.5),
    // paddingBottom: normalize(15),
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
    fontSize: 18,
    fontWeight: '500',
    // textAlign: 'center',
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(16),
    paddingHorizontal: normalize(10),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(8),
  },
  btnTxt: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  containers: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerColumn: {
    // flex:0.,
    fontWeight: 'bold',
    fontSize: normalize(7),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  column: {
    flex: 1,
    fontSize: normalize(6),
  },
  button: {
    backgroundColor: '#cfe2ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#0056b3',
    fontWeight: 'bold',
  },
});
