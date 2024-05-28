/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  EvaluationEnrolmentReq,
  getDashboardReq,
  patientEnrolmentReq,
} from '../../redux/reducer/DashboardReducer';
import css, {width} from '../../themes/space';
import SafeView from '../../components/common/SafeView';
import {Image, StyleSheet, View} from 'react-native';
import HeaderTitle from '../../components/common/HeaderTitle';
import ScoreCard from '../../components/common/ScoreCard';
import PatientEnrolmentChart from '../../components/common/PatientEnrolmentChart';
import AssignmentChart from '../../components/common/AssignmentChart';
import CalenderView from '../../components/common/CalenderView';
import {colors} from '../../themes/colors';
import {images} from '../../themes/images';
import TitleTxt from '../../components/common/TitleTxt';
import QuickCounter from '../../components/common/QuickCounter';
import {icons} from '../../themes/icons';
import useOrientation from '../../utils/useOrientation';
import {useIsFocused} from '@react-navigation/native';
import {AnimatedCircularProgress} from '../../components/common/CircularProgressBar';

let dashboardStatus = '';

const Home = props => {
  let orientation = useOrientation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [year, setYear] = useState(moment().format('YYYY-MM-DD'));
  const [years, setYears] = useState('2024');
  const [dashboardData, setDashboardData] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [sessionsDateData, setSessionsDateData] = useState('');

  useEffect(() => {
    let obj = {
      date: date,
      enrolment_year: years,
    };
    dispatch(getDashboardReq(obj));
    dispatch(patientEnrolmentReq());
    dispatch(EvaluationEnrolmentReq());
  }, [isFocused]);

  const data = [
    {
      label: '2024',
      value: '2024',
    },
    {
      label: '2025',
      value: '2025',
    },
    {
      label: '2026',
      value: '2026',
    },
    {
      label: '2027',
      value: '2027',
    },
    {
      label: '2028',
      value: '2028',
    },
  ];

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
        // console.log("CalenderView-Dashboard:", DashboardReducer?.getDashboardResponse?.data)
        setDashboardData(DashboardReducer?.getDashboardResponse?.data);
        setSessionsData(DashboardReducer?.getDashboardResponse?.data?.sessions);
        // setSessionsDateData(DashboardReducer?.getDashboardResponse?.data?.sessions[0]?.session_date)
        break;
      case 'Dashboard/getDashboardFailure':
        dashboardStatus = DashboardReducer.status;
        // console.log('initiated-fail', DashboardReducer.status);
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
                value={dashboardData?.total_session}
                title="Total Session Data"
                color="#28328C"
                icon={icons.assignment}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingLast, counterCardWidth]}>
              <QuickCounter
                value={dashboardData?.monthly_session}
                title="Current Month Session Data"
                color="#FA9A6C"
                icon={icons.pendingAssignment}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingRight, counterCardWidth]}>
              <QuickCounter
                value={dashboardData?.complete_evaluation}
                title="Completed Evaulation"
                color="#3ABEF0"
                icon={icons.completeAssignment}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingLast, counterCardWidth]}>
              <QuickCounter
                value={dashboardData?.pending_evaluation}
                title="Pending Evaulation"
                color="#28328C"
                icon={icons.totalPatient}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[
                styles.counterCardStyle,
                styles.counterPadding,
                counterCardWidth,
              ]}>
              <QuickCounter
                value={dashboardData?.active_patient}
                title="Active Patients"
                color="#FA9A6C"
                icon={icons.activePatient}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View style={[styles.counterCardStyle, counterCardWidth]}>
              <QuickCounter
                value={dashboardData?.inactive_patient}
                title="Inactive Patients"
                color="#3ABEF0"
                icon={icons.inactivePatient}
                style={[styles.quickCounterStyle]}
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
