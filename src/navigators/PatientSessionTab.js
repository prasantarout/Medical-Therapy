import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PatientSession from '../screens/general/Assignments/PatientSession';
import PatientSessionDetails from '../screens/general/Assignments/PatientSessionDetails';
import EvaluationForm from '../screens/general/Assignments/EvaluationForm';
import EvaluationResult from '../screens/general/Assignments/EvaluationResult';

const Stack = createStackNavigator();
export default function PatientSessionTab() {
  return (
    <Stack.Navigator initialRouteName="PatientSession" screenOptions={{headerShown: false}}>
      <Stack.Screen name="PatientSession" component={PatientSession} />
      <Stack.Screen name="PatientSessionDetails" component={PatientSessionDetails} />
      <Stack.Screen name="EvaluationForm" component={EvaluationForm} />
      <Stack.Screen name="EvaluationResult" component={EvaluationResult} />
    </Stack.Navigator>
  );
}
