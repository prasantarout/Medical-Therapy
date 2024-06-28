import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AddPatient from '../screens/general/Patient/AddPatient';
import Assignment from '../screens/general/Patient/Assignment';
import EnrolmentQueue from '../screens/general/Patient/EnrolmentQueue';
import MyPatient from '../screens/general/Patient/MyPatient';
import ServiceEnrollment from '../screens/general/Patient/ServiceEnrollment';
import {useFocusEffect} from '@react-navigation/native';
import PatientSession from '../screens/general/Assignments/PatientSession';
import ActivePatientsSession from '../screens/general/Home/ActivePatientsSession';
import ActivePatientsSessions1 from '../screens/general/Home/ActivePatientsSessions1';

const Stack = createStackNavigator();
export default function PatientTab({navigation}) {
  const resetNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MyPatient'}],
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      resetNavigation();
    }, [navigation]),
  );

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyPatients">
      <Stack.Screen name="MyPatient" component={MyPatient} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="Assignment" component={Assignment} />
      <Stack.Screen name="EnrolmentQueue" component={EnrolmentQueue} />
      <Stack.Screen name="ServiceEnrollment" component={ServiceEnrollment} />
      <Stack.Screen
        name="ActivePatientsSessions1"
        component={ActivePatientsSessions1}
      />
    </Stack.Navigator>
  );
}
