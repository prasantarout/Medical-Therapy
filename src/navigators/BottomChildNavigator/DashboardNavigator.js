import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/general/Home';
import ActivePatients from '../../screens/general/Home/ActivePatients';
import ActivePatientsSession from '../../screens/general/Home/ActivePatientsSession';
import CompletedEvaulation from '../../screens/general/Home/CompletedEvaulation';
import CurrentMonthSessionData from '../../screens/general/Home/CurrentMonthSessionData';
import InactivePatients from '../../screens/general/Home/InactivePatients';
import PendingEvaulation from '../../screens/general/Home/PendingEvaulation';
import PatientSessionDetails from '../../screens/general/Assignments/PatientSessionDetails';
import EvaluationReview from '../../screens/general/Home/EvaluationReview';

const DashboardStack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <DashboardStack.Screen name="Home" component={Home} />
      <DashboardStack.Screen name="ActivePatients" component={ActivePatients} />
      <DashboardStack.Screen
        name="ActivePatientsSession"
        component={ActivePatientsSession}
      />
      <DashboardStack.Screen
        name="CompletedEvaulation"
        component={CompletedEvaulation}
      />
      <DashboardStack.Screen
        name="CurrentMonthSessionData"
        component={CurrentMonthSessionData}
      />
      <DashboardStack.Screen
        name="InactivePatients"
        component={InactivePatients}
      />
      <DashboardStack.Screen
        name="PendingEvaulation"
        component={PendingEvaulation}
      />
      <DashboardStack.Screen
        name="ActivePatientSessionDetails"
        component={PatientSessionDetails}
      />
      <DashboardStack.Screen
        name="EvaluationReview"
        component={EvaluationReview}
      />
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigator;
