import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Assignments from '../screens/general/Assignments/Assignments';
import AssignmentDetails from '../screens/general/Assignments/AssignmentDetails';
import EvaluationForm from '../screens/general/Assignments/EvaluationForm';
import EvaluationResult from '../screens/general/Assignments/EvaluationResult';

const Stack = createStackNavigator();
export default function AssignmentTab() {
  return (
    <Stack.Navigator initialRouteName="Assignments" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Assignment" component={Assignments} />
      <Stack.Screen name="AssignmentDetails" component={AssignmentDetails} />
      <Stack.Screen name="EvaluationForm" component={EvaluationForm} />
      <Stack.Screen name="EvaluationResult" component={EvaluationResult} />
    </Stack.Navigator>
  );
}
