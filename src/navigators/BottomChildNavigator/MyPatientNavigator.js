/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MyPatient from '../../screens/general/Patient/MyPatient';
import AddPatient from '../../screens/general/Patient/AddPatient';
import Assignment from '../../screens/general/Patient/Assignment';
import EnrolmentQueue from '../../screens/general/Patient/EnrolmentQueue';
import ServiceEnrollment from '../../screens/general/Patient/ServiceEnrollment';
import ActivePatientsSessions1 from '../../screens/general/Home/ActivePatientsSessions1';

const MyPatientStack = createStackNavigator();
const MyPatientNavigator = ({navigation}) => {
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
    <MyPatientStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyPatient">
      <MyPatientStack.Screen name="MyPatient" component={MyPatient} />
      <MyPatientStack.Screen name="AddPatient" component={AddPatient} />
      <MyPatientStack.Screen name="Assignment" component={Assignment} />
      <MyPatientStack.Screen name="EnrolmentQueue" component={EnrolmentQueue} />
      <MyPatientStack.Screen
        name="ServiceEnrollment"
        component={ServiceEnrollment}
      />
      <MyPatientStack.Screen
        name="ActivePatientsSessions1"
        component={ActivePatientsSessions1}
      />
    </MyPatientStack.Navigator>
  );
};

export default MyPatientNavigator;
