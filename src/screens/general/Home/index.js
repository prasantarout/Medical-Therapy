/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useOrientation from '../../../utils/useOrientation';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {
  EvaluationEnrolmentReq,
  getDashboardReq,
  patientEnrolmentReq,
} from '../../../redux/reducer/DashboardReducer';
import TitleTxt from '../../../components/common/TitleTxt';
import {StyleSheet, View} from 'react-native';
import ScoreCard from '../../../components/common/ScoreCard';
import css, {width} from '../../../themes/space';
import HeaderTitle from '../../../components/common/HeaderTitle';
import SafeView from '../../../components/common/SafeView';
import QuickCounter from '../../../components/common/QuickCounter';
import {icons} from '../../../themes/icons';
import PatientEnrolmentChart from '../../../components/common/PatientEnrolmentChart';
import AssignmentChart from '../../../components/common/AssignmentChart';
import CalenderView from '../../../components/common/CalenderView';
import {colors} from '../../../themes/colors';

let dashboardStatus = '';

const Home = props => {
  const navigation = useNavigation();
  let orientation = useOrientation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    let obj = {
      date: moment(new Date()).format('YYYY-MM-DD').toString,
      enrolment_year: new Date().getFullYear().toString(),
    };
    dispatch(getDashboardReq(obj));
    dispatch(patientEnrolmentReq());
    dispatch(EvaluationEnrolmentReq());
  }, [isFocused]);

  let paddingLast = {paddingRight: orientation === 'PORTRAIT' ? 0 : 16};
  let paddingRight = {paddingRight: orientation === 'PORTRAIT' ? 16 : 0};

  let counterCardWidth = {
    width: orientation === 'PORTRAIT' ? '50%' : '33.2%',
  };

  if (dashboardStatus === '' || DashboardReducer.status !== dashboardStatus) {
    switch (DashboardReducer.status) {
      case 'Dashboard/getDashboardReq':
        dashboardStatus = DashboardReducer.status;
        break;
      case 'Dashboard/getDashboardSuccess':
        dashboardStatus = DashboardReducer.status;
        setSessionsData(DashboardReducer?.getDashboardResponse?.data?.sessions);
        break;
      case 'Dashboard/getDashboardFailure':
        dashboardStatus = DashboardReducer.status;
        break;
    }
  }

  const onDateSelected = selectedDate => {
    const selected_Date = moment(selectedDate).format('YYYY-MM-DD');
    let obj = {
      date: selected_Date,
      enrolment_year: moment(selectedDate).format('YYYY'),
    };
    dispatch(getDashboardReq(obj));
  };

  return (
    <SafeView sticky={[1]}>
      <View style={[css.f1, css.p4]}>
        <HeaderTitle title="Dashboard" />
        <View style={[css.row, css.jcse]}>
          <ScoreCard
            title="Service Score"
            value={DashboardReducer?.getDashboardResponse?.data?.service_score}
          />
          <ScoreCard
            title="Evaluation Score"
            value={
              DashboardReducer?.getDashboardResponse?.data?.evaluation_score
            }
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
                  DashboardReducer?.getDashboardResponse?.data?.total_session
                }
                title="Total Session Data"
                color="#28328C"
                icon={icons.assignment}
                containerStyle={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingLast, counterCardWidth]}>
              <QuickCounter
                value={
                  DashboardReducer?.getDashboardResponse?.data?.monthly_session
                }
                title="Current Month Session Data"
                color="#FA9A6C"
                icon={icons.pendingAssignment}
                containerStyle={[styles.quickCounterStyle]}
                pressable
                onPress={() => {
                  navigation.navigate('Patients Session');
                }}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingRight, counterCardWidth]}>
              <QuickCounter
                value={
                  DashboardReducer?.getDashboardResponse?.data
                    ?.complete_evaluation
                }
                title="Completed Evaulation"
                color="#3ABEF0"
                icon={icons.completeAssignment}
                containerStyle={[styles.quickCounterStyle]}
                pressable
                onPress={() => {
                  navigation.navigate('CompletedEvaulation');
                }}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingLast, counterCardWidth]}>
              <QuickCounter
                value={
                  DashboardReducer?.getDashboardResponse?.data
                    ?.pending_evaluation
                }
                title="Pending Evaulation"
                color="#28328C"
                icon={icons.assignment}
                containerStyle={[styles.quickCounterStyle]}
                pressable
                onPress={() => {
                  navigation.navigate('PendingEvaulation');
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
                  DashboardReducer?.getDashboardResponse?.data?.active_patient
                }
                title="Active Patients"
                color="#FA9A6C"
                icon={icons.activePatient}
                containerStyle={[styles.quickCounterStyle]}
                pressable
                onPress={() => {
                  navigation.navigate('ActivePatients');
                }}
              />
            </View>
            <View style={[styles.counterCardStyle, counterCardWidth]}>
              <QuickCounter
                value={
                  DashboardReducer?.getDashboardResponse?.data?.inactive_patient
                }
                title="Inactive Patients"
                color="#3ABEF0"
                icon={icons.inactivePatient}
                containerStyle={[styles.quickCounterStyle]}
                pressable
                onPress={() => {
                  navigation.navigate('InactivePatients');
                }}
              />
            </View>
          </View>
        </View>

        <View style={[css.mt4]}>
          <PatientEnrolmentChart
            dataItem={DashboardReducer?.patientEnrolmentRes?.data}
          />
        </View>
        <View style={[css.mt4]}>
          <AssignmentChart dataItem={DashboardReducer?.evaluationRes?.data} />
        </View>
        <View style={[css.mt4]}>
          <CalenderView
            {...props}
            date={sessionsData?.[0]?.session_date}
            data={sessionsData}
            onDateSelected={onDateSelected}
          />
        </View>
      </View>
    </SafeView>
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
});
