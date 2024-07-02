import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PatientSession from '../../screens/general/Assignments/PatientSession';
import PatientSessionDetails from '../../screens/general/Assignments/PatientSessionDetails';
import EvaluationForm from '../../screens/general/Assignments/EvaluationForm';
import EvaluationResult from '../../screens/general/Assignments/EvaluationResult';

const PatientSessionStack = createStackNavigator();

const PatientSessionNavigator = () => {
  return (
    <PatientSessionStack.Navigator
      initialRouteName="PatientSession"
      screenOptions={{headerShown: false}}>
      <PatientSessionStack.Screen
        name="PatientSession"
        component={PatientSession}
      />
      <PatientSessionStack.Screen
        name="PatientSessionDetails"
        component={PatientSessionDetails}
      />
      <PatientSessionStack.Screen
        name="EvaluationForm"
        component={EvaluationForm}
      />
      <PatientSessionStack.Screen
        name="EvaluationResult"
        component={EvaluationResult}
      />
    </PatientSessionStack.Navigator>
  );
};
export default PatientSessionNavigator;
