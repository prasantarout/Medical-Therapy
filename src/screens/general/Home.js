import { Dimensions, Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import css, { width } from '../../themes/space';
import NavBar from '../../components/common/NavBar';
import SafeView from '../../components/common/SafeView';
import TitleTxt from '../../components/common/TitleTxt';
import HeaderTitle from '../../components/common/HeaderTitle';
import ScoreCard from '../../components/common/ScoreCard';
import QuickCounter from '../../components/common/QuickCounter';
import { icons } from '../../themes/icons';
import { colors } from '../../themes/colors';
import PatientEnrolmentChart from '../../components/common/PatientEnrolmentChart';
import useScreenDimension from '../../utils/useScreenDimension';
import useOrientation from '../../utils/useOrientation';
import AssignmentChart from '../../components/common/AssignmentChart';
import CalenderView from '../../components/common/CalenderView';
import { heightToDp as hp, widthToDp as wp } from '../../utils/responsive';
import { images } from '../../themes/images';

const Home = props => {
  const [visible, setVisible] = useState(false);
  const [years, setYears] = useState('');
  let screenWidthh = useScreenDimension();
  let orientation = useOrientation();

  // console.log('hiiiiiiiiiiiiiiiiiiiii');

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

  let paddingLast = { paddingRight: orientation == 'PORTRAIT' ? 0 : 16 };
  let paddingRight = { paddingRight: orientation == 'PORTRAIT' ? 16 : 0 };

  let counterCardWidth = {
    width: orientation == 'PORTRAIT' ? '50%' : '33.2%',
  };

  return (
    <SafeView sticky={[1]}>
      <View style={[css.f1, css.p4]}>
        <HeaderTitle title="Dashboard" />
        <View style={[css.row, css.jcse]}>
          {/* <ScoreCard
            title="Service Score"
            value={90}
            activeStrokeColor="#623792"
            activeStrokeSecondaryColor={'#343286'}
            style={[css.mr3]}
          />
          <ScoreCard
            title="Evaluation Score"
            value={70}
            activeStrokeColor="#623792"
            activeStrokeSecondaryColor={'#343286'}
          /> */}
          <View style={[styles.scoreCard]}>
            <Image source={images.serviceScore} style={[styles.scoreCard]} />
          </View>
          <View style={[styles.scoreCard]}>
            <Image source={images.evaluationScore} style={[styles.scoreCard]} />
          </View>
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
                value="200"
                title="Total Assignments"
                color="#28328C"
                icon={icons.assignment}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingLast, counterCardWidth]}>
              <QuickCounter
                value="200"
                title="Pending Assignments"
                color="#FA9A6C"
                icon={icons.pendingAssignment}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingRight, counterCardWidth]}>
              <QuickCounter
                value="200"
                title="Completed Assignments"
                color="#3ABEF0"
                icon={icons.completeAssignment}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View
              style={[styles.counterCardStyle, paddingLast, counterCardWidth]}>
              <QuickCounter
                value="200"
                title="Total Patients"
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
                value="200"
                title="Active Patients"
                color="#FA9A6C"
                icon={icons.activePatient}
                style={[styles.quickCounterStyle]}
              />
            </View>
            <View style={[styles.counterCardStyle, counterCardWidth]}>
              <QuickCounter
                value="200"
                title="Inactive Patients"
                color="#3ABEF0"
                icon={icons.inactivePatient}
                style={[styles.quickCounterStyle]}
              />
            </View>
          </View>
        </View>

        <View style={[css.mt4]}>
          <PatientEnrolmentChart />
        </View>
        <View style={[css.mt4]}>
          <AssignmentChart />
        </View>
        <View style={[css.mt4]}>
          <CalenderView />
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
    width: width / 3,
    height: width / 3,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    // borderRadius: 10
  }
});
