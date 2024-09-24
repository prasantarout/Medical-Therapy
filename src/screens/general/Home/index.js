/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useOrientation from '../../../utils/useOrientation';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {
  EvaluationEnrolmentReq,
  getAcknowledgementReq,
  getDashboardReq,
  patientEnrolmentReq,
} from '../../../redux/reducer/DashboardReducer';
import TitleTxt from '../../../components/common/TitleTxt';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import ScoreCard from '../../../components/common/ScoreCard';
import css, {width, height} from '../../../themes/space';
import HeaderTitle from '../../../components/common/HeaderTitle';
import SafeView from '../../../components/common/SafeView';
import QuickCounter from '../../../components/common/QuickCounter';
import {icons} from '../../../themes/icons';
import PatientEnrolmentChart from '../../../components/common/PatientEnrolmentChart';
import AssignmentChart from '../../../components/common/AssignmentChart';
import CalenderView from '../../../components/common/CalenderView';
import {colors} from '../../../themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTokenSuccess} from '../../../redux/reducer/AuthReducer';
import constants from '../../../utils/constants';
import CalendarScreen from '../../../components/common/CalendarScreen';
import Txt from '../../../components/micro/Txt';
import Divider from '../../../components/micro/Divider';
import Modal from 'react-native-modal';
import normalize from '../../../utils/normalize';
import {widthToDp as wp} from '../../../utils/responsive';
import Button from '../../../components/buttons/Button';
import PatientReducer, {
  patientDetailsReq,
} from '../../../redux/reducer/PatientReducer';
import {fonts} from '../../../themes/fonts';
let dashboardStatus = '';

const Home = props => {
  const navigation = useNavigation();
  let orientation = useOrientation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const [sessionsData, setSessionsData] = useState([]);
  const AuthReducer = useSelector(state => state?.AuthReducer);
  const PatientReducer = useSelector(state => state?.PatientReducer);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState({});

  useEffect(() => {
    let obj = {
      date: moment(new Date()).format('YYYY-MM-DD').toString,
      enrolment_year: new Date().getFullYear().toString(),
    };
    dispatch(getDashboardReq(obj));
    dispatch(patientEnrolmentReq());
    dispatch(EvaluationEnrolmentReq());
    dispatch(getAcknowledgementReq());
    checkAcknowledgment();
  }, [isFocused]);

  let paddingLast = {paddingRight: orientation === 'PORTRAIT' ? 0 : 16};
  let paddingRight = {paddingRight: orientation === 'PORTRAIT' ? 16 : 0};

  let counterCardWidth = {
    width: orientation === 'PORTRAIT' ? '50%' : '33.2%',
  };

  useEffect(() => {
    if (dashboardStatus === '' || DashboardReducer.status !== dashboardStatus) {
      switch (DashboardReducer.status) {
        case 'Dashboard/getDashboardReq':
          dashboardStatus = DashboardReducer.status;
          break;
        case 'Dashboard/getDashboardSuccess':
          dashboardStatus = DashboardReducer.status;
          setSessionsData(DashboardReducer?.getDashboardResponse?.data?.events);
          break;
        case 'Dashboard/getDashboardFailure':
          dashboardStatus = DashboardReducer.status;
          break;
      }
    }
  }, [DashboardReducer.status, sessionsData]);

  // console.log(DashboardReducer?.getDashboardResponse?.data, '>>>>>>??>????');

  useEffect(() => {
    const setAndGetSessionValue = async () => {
      try {
        await AsyncStorage.setItem('sessionValue', JSON.stringify(true));
        const sessionValue = await AsyncStorage.getItem('sessionValue');
        // console.log(typeof sessionValue, '??????>>>>sss');
      } catch (error) {
        console.error('Error setting or getting session value', error);
      }
    };
    setAndGetSessionValue();
  }, []);

  const onDateSelected = selectedDate => {
    const selected_Date = moment(selectedDate).format('YYYY-MM-DD');
    let obj = {
      date: selected_Date,
      enrolment_year: moment(selectedDate).format('YYYY'),
    };
    dispatch(getDashboardReq(obj));
  };

  const Modalinfo = ({title, value}) => {
    return (
      <View style={[css.row, css.aic]}>
        <Txt style={styles.title}>{title}</Txt>
        <Txt style={[styles.value]}>{value}</Txt>
      </View>
    );
  };

  useEffect(() => {
    if (PatientReducer?.status === 'PATIENT/patientDetailsSuccess') {
      setModalVisible(true);
    }
  }, [PatientReducer?.status]);

  // Function to check if the acknowledgment has been done
  const checkAcknowledgment = async () => {
    const acknowledgmentStatus = await AsyncStorage.getItem('acknowledged');
    if (!acknowledgmentStatus) {
      setModalOpen(true); // Show the modal if not acknowledged
    }
  };
  // Handle user checkbox

  const handleCheck = userFullName => {
    setCheckedUsers(prevState => ({
      ...prevState,
      [userFullName]: !prevState[userFullName],
    }));
  };

  // Handle acknowledgment button press
  const handleAcknowledge = async () => {
    const allChecked = DashboardReducer?.acknowledgementRes?.every(
      user => checkedUsers[user.full_name],
    );
    if (allChecked) {
      // console.log('hel;ll');
      setModalOpen(false);
      await AsyncStorage.setItem('acknowledged', 'true');
    } else {
      alert('Please acknowledge all users before confirming.');
    }
  };

  const renderUser = ({item}) => {
    const {full_name, pm_due_date} = item;
    const isChecked = checkedUsers[full_name] || false;

    return (
      <View style={styles.userContainer}>
        <TouchableOpacity
          onPress={() => handleCheck(full_name)}
          style={{
            width: normalize(10),
            height: normalize(10),
            borderWidth: 2,
            borderColor: '#1E6CA5',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isChecked && (
            <View
              style={{
                backgroundColor: '#1692f8',
                height: normalize(10),
                width: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Image
                style={{
                  width: normalize(7),
                  height: normalize(7),
                  resizeMode: 'contain',
                  tintColor: 'white',
                }}
                source={icons.done}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: normalize(10),
            fontSize: normalize(7),
            fontWeight: '500',
            color:'#000000'
          }}>
          {full_name} (PM Due:{' '}
          {moment(pm_due_date).format('MM/DD/YYYY') || 'N/A'})
        </Text>
      </View>
    );
  };

  return (
    <>
      <SafeView sticky={[1]}>
        <View style={[css.f1, css.p4]}>
          <HeaderTitle title="Dashboard" />
          <View style={[css.row, css.jcse]}>
            <ScoreCard title="Service Score" value={0} />
            {/* {console.log(
            DashboardReducer?.getDashboardResponse?.data,
            '??????>>>>sedd',
          )} */}
            <ScoreCard
              title="Evaluation Score"
              value={0}
              strokeColor="#14BEF0"
            />
          </View>
          <View style={[styles.quickCounter, css.mt4]}>
            <TitleTxt title="Quick Counter" />
            <View style={[css.row, css.jcsb, css.fw, css.mt4, css.f1]}>
              <View
                style={[
                  styles.counterCardStyle,
                  styles.counterPadding,
                  counterCardWidth,
                ]}>
                <QuickCounter
                  value={
                    DashboardReducer?.getDashboardResponse?.data?.active_patient
                  }
                  title="Active Patients"
                  color="#FA9A6C"
                  icon={icons.activePatient}
                  containerStyle={[styles.quickCounterStyle]}
                  pressable
                  onPress={() => {
                    // navigation.navigate('ActivePatients');
                    navigation.navigate('BottomTab', {screen: 'My Patients'});
                  }}
                />
              </View>
              <View
                style={[
                  styles.counterCardStyle,
                  paddingLast,
                  counterCardWidth,
                ]}>
                <QuickCounter
                  value={
                    DashboardReducer?.getDashboardResponse?.data
                      ?.monthly_session
                  }
                  title="Assessments Completed 
                (Current Month)"
                  color="#FA9A6C"
                  icon={icons.pendingAssignment}
                  containerStyle={[styles.quickCounterStyle]}
                  pressable
                  onPress={() => {
                    // navigation.navigate('MyPatient');
                    // navigation.navigate('Patients Session');
                  }}
                />
              </View>
              <View
                style={[
                  styles.counterCardStyle,
                  paddingLast,
                  counterCardWidth,
                ]}>
                <QuickCounter
                  value={
                    DashboardReducer?.getDashboardResponse?.data
                      ?.new_patient_current_month
                  }
                  title={
                    <>
                      New Patients
                      {'\n'}
                      <Text style={{fontSize: 20}}>(Current Month)</Text>
                    </>
                  }
                  color="#28328C"
                  icon={icons.pendingAssignment}
                  containerStyle={[styles.quickCounterStyle]}
                  pressable
                  onPress={() => {
                    navigation.navigate('BottomTab', {screen: 'My Patients'});
                    // navigation.navigate('PendingEvaulation');
                  }}
                />
              </View>
              <View
                style={[
                  styles.counterCardStyle,
                  styles.counterPadding,
                  counterCardWidth,
                ]}>
                <QuickCounter
                  value={
                    DashboardReducer?.getDashboardResponse?.data
                      ?.pending_pm_current_month
                  }
                  title={
                    <>
                      Pending PMs
                      {'\n'}
                      <Text style={{fontSize: 20}}>(Current Month)</Text>
                    </>
                  }
                  color="#28328C"
                  icon={icons.assignment}
                  containerStyle={[styles.quickCounterStyle]}
                  pressable
                  onPress={() => {
                    navigation.navigate('BottomTab', {screen: 'My Patients'});
                  }}
                />
              </View>
              <View
                style={[
                  styles.counterCardStyle,
                  paddingRight,
                  counterCardWidth,
                ]}>
                <QuickCounter
                  value={
                    DashboardReducer?.getDashboardResponse?.data
                      ?.complete_evaluation
                  }
                  title="Compliant Patients"
                  color="#3ABEF0"
                  icon={icons.completeAssignment}
                  containerStyle={[styles.quickCounterStyle]}
                  // pressable
                  onPress={() => {
                    // navigation.navigate('MyPatient');
                    // navigation.navigate('CompletedEvaulation');
                  }}
                />
              </View>
              <View style={[styles.counterCardStyle, counterCardWidth]}>
                <QuickCounter
                  value={
                    DashboardReducer?.getDashboardResponse?.data
                      ?.pending_visit_current_month
                  }
                  title={
                    <>
                      Pending Visits
                      {'\n'}
                      <Text style={{fontSize: 20}}>(Current Month)</Text>
                    </>
                  }
                  color="#3ABEF0"
                  icon={icons.inactivePatient}
                  containerStyle={[styles.quickCounterStyle]}
                  pressable
                  onPress={() => {
                    navigation.navigate('BottomTab', {screen: 'My Patients'});
                    // navigation.navigate('InactivePatients');
                  }}
                />
              </View>
            </View>
          </View>
          <CalendarScreen
            date={sessionsData?.[0]?.session_date}
            data={DashboardReducer?.getDashboardResponse?.data?.events}
            onDateSelected={onDateSelected}
            onPress={id => dispatch(patientDetailsReq(id))}
          />
          {/* {console.log(sessionsData, '>>>>>>>>??>>>>ed')} */}

          <View style={[css.mt4]}>
            <PatientEnrolmentChart
              dataItem={DashboardReducer?.patientEnrolmentRes?.data}
            />
            {/* {console.log(DashboardReducer?.patientEnrolmentRes?.data,">>>>>??>>>ss")} */}
          </View>
          <View style={[css.mt4]}>
            <AssignmentChart dataItem={DashboardReducer?.evaluationRes?.data} />
          </View>
          <View style={[css.mt4]}>
            {/* <CalenderView
            {...props}
            date={sessionsData?.[0]?.session_date}
            data={sessionsData}
            onDateSelected={onDateSelected}
          /> */}
          </View>
        </View>
      </SafeView>
      <Modal
        onBackdropPress={() => {
          setModalVisible(false);
          setModalInfo('');
        }}
        backdropOpacity={0}
        isVisible={modalVisible}
        deviceHeight={height}
        deviceWidth={width}
        style={[css.m0, css.p0]}
        statusBarTranslucent={true}>
        <View style={[css.f1, css.center, styles.backdrop]}>
          <View style={[styles.modalStyle, {maxWidth: width - normalize(16)}]}>
            <TouchableOpacity
              style={[styles.closeBtnCtnr]}
              activeOpacity={0.9}
              onPress={() => {
                setModalVisible(false);
                setModalInfo('');
              }}>
              <Image source={icons.closeIcon} style={[styles.closeBtn]} />
            </TouchableOpacity>
            <Txt style={[styles.modalTitle, {fontSize: wp(2, width)}]}>
              Patient Details
            </Txt>
            <View style={[css.row, css.mt1]}>
              <View style={[css.jcc, css.aic]}>
                <ImageBackground
                  source={{
                    uri: `${
                      PatientReducer?.patientDetailsRes?.data?.profile_photo_url
                    }&size=${200}`,
                  }}
                  resizeMode="cover"
                  style={[
                    styles.profileImage,
                    {
                      width: 250,
                      height: 250,
                    },
                  ]}
                />
                {/* MyPatientsSession */}
                <Button
                  title="View Session"
                  style={[css.mt2, css.w100]}
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      navigation.navigate('My Patients', {
                        screen: 'MyPatientsSession',
                        params: {
                          ecn: PatientReducer?.patientDetailsRes?.data?.ecn,
                          full_name:
                            PatientReducer?.patientDetailsRes?.data?.full_name,
                        },
                      });
                    }, 1000);
                  }}
                />
                <Button
                  title="Submit Evaluation"
                  style={[css.mt2, css.w100]}
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      navigation.navigate('My Patients', {
                        screen: 'ServiceEnrollment',
                        params: {
                          data: PatientReducer.patientDetailsRes,
                          isPatient: false,
                        },
                      });
                    }, 1000);
                  }}
                />
              </View>
              <View style={[css.ml5, css.jcc]}>
                <Modalinfo
                  title="Name:"
                  value={PatientReducer?.patientDetailsRes?.data?.full_name}
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Phone No.:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.phone_number
                      ? PatientReducer?.patientDetailsRes?.data?.phone_number
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Email Address:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.email_address
                      ? PatientReducer?.patientDetailsRes?.data?.email_address
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Location:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.city_address
                      ? PatientReducer?.patientDetailsRes?.data?.city_address.slice(
                          0,
                          6,
                        )
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Devices:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.resmeduser
                      ?.device_type_desc
                      ? PatientReducer?.patientDetailsRes?.data?.resmeduser
                          ?.device_type_desc
                      : 'N/A'
                  }
                />

                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Device Serial No:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.resmeduser
                      ?.device_serial_no
                      ? PatientReducer?.patientDetailsRes?.data?.resmeduser
                          ?.device_serial_no
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Mask:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.resmeduser
                      ?.mask_size
                      ? PatientReducer?.patientDetailsRes?.data?.resmeduser
                          ?.mask_size
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Setup Date:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.resmeduser
                      ?.setupDate
                      ? PatientReducer?.patientDetailsRes?.data?.resmeduser
                          ?.setupDate
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Last Visit:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.resmeduser
                      ?.last_visit_date
                      ? PatientReducer?.patientDetailsRes?.data?.resmeduser
                          ?.last_visit_date
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Next Visit Date:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.next_visit_date
                      ? PatientReducer?.patientDetailsRes?.data?.next_visit_date
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="PM Due:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.pm_due_date
                      ? PatientReducer?.patientDetailsRes?.data?.pm_due_date
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Compliance:"
                  value={
                    PatientReducer?.patientDetailsRes?.data
                      ?.compliance_percentage
                      ? PatientReducer?.patientDetailsRes?.data
                          ?.compliance_percentage + '%'
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Total Sessions:"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.total_session
                      ? PatientReducer?.patientDetailsRes?.data?.total_session
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Total Usage(min):"
                  value={
                    PatientReducer?.patientDetailsRes?.data?.total_usage_time
                      ? PatientReducer?.patientDetailsRes?.data
                          ?.total_usage_time
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Date:"
                  value={moment(
                    PatientReducer?.patientDetailsRes?.data?.created_at,
                  ).format('YYYY-MM-DD')}
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Time:"
                  value={moment(
                    PatientReducer?.patientDetailsRes?.data?.created_at,
                  ).format('hh:mm A')}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        backdropOpacity={0}
        visible={modalOpen}
        style={[css.m0, css.p0]}
        statusBarTranslucent={true}
        onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>
              Missed/Past Due Appointments!
            </Text>
            <ScrollView style={styles.scrollView}>
              <FlatList
                data={DashboardReducer?.acknowledgementRes}
                renderItem={renderUser}
                keyExtractor={item => item.full_name}
              />
            </ScrollView>
            <Text style={styles.acknowledgeText}>
              By acknowledging, you affirm your commitment to promptly address
              and resolve these past due appointments.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleAcknowledge}
                style={styles.btn_wrapper}>
                <Text style={styles.btn_text}>Acknowledge</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  counterCardStyle: {
    minWidth: '33%',
    maxHeight: 180,
    marginBottom: 16,
    overflow: 'hidden',
  },
  quickCounterStyle: {},
  counterPadding: {
    paddingRight: 16,
  },
  menuStyle: {
    borderWidth: 1,
  },
  textStyle: {
    color: colors.primaryTextColor,
  },
  scoreCard: {
    width: width / 2.5,
    height: width / 2.5,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    // borderRadius: 10
  },
  btn: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 16,
    // width: 240
  },
  btnTxt: {
    fontSize: 17,
    color: colors.primary,
  },
  btnTxt2: {
    fontSize: 19,
    color: '#fff',
  },
  modalStyle: {
    backgroundColor: colors.bgColor,
    borderRadius: 10,
    padding: 40,
  },
  closeBtnCtnr: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  closeBtn: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
  },
  modalTitle: {
    color: colors.primaryTextColor,
    fontFamily: fonts.SemiBold,
  },
  profileImage: {
    resizeMode: 'cover',
  },
  btn2: {
    height: 55,
    width: '100%',
    backgroundColor: colors.white,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(2),
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  modalbtnTxt: {
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  newCtn: {
    paddingHorizontal: normalize(5),
    paddingVertical: 5,
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontFamily: fonts.Regular,
    color: '#444444',
    fontSize: 18,
    width: 160,
  },
  value: {
    fontFamily: fonts.Regular,
    fontWeight: '400',
    color: colors.primary,
    fontSize: 18,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  dividerGap: {
    marginVertical: 12,
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.primaryTextColor,
  },
  disabledButton: {
    color: '#d3d3d3',
  },
  pageNumber: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.primaryTextColor,
  },
  pageNumberText: {
    color: colors.white,
  },
  activePage: {
    backgroundColor: colors.primary,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },
  acknowledgeText: {
    marginTop: normalize(10),
    marginBottom: 10,
    fontSize: normalize(9),
    // textAlign: 'start',
    marginHorizontal: normalize(5),
    color:'#000000'
  },
  scrollView: {
    maxHeight: 400,
    marginTop: normalize(10),
    
  },
  buttonContainer: {
    //  flex:1
    width: normalize(100),
  },
  btn_wrapper: {
    paddingHorizontal: 14,
    paddingVertical: normalize(7),
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  btn_text: {
    color: colors.white,
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
});
