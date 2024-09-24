import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPatient from '../../screens/general/Patient/MyPatient';
import AddPatient from '../../screens/general/Patient/AddPatient';
import Assignment from '../../screens/general/Patient/Assignment';
import EnrolmentQueue from '../../screens/general/Patient/EnrolmentQueue';
import ServiceEnrollment from '../../screens/general/Patient/ServiceEnrollment';
import MyPatientSessionDetails from '../../screens/general/Patient/MyPatientSessionDetails';
import MyPatientsSession from '../../screens/general/Patient/MyPatientsSession';
import FlatList from '../../screens/general/Home/FlatList';
import FlatListView from '../../screens/general/Home/FlatList';
import UpdatePatient from '../../screens/general/Patient/UpdatePatient';
import EvaluationList from '../../screens/general/Patient/EvaluationList';

const MyPatientStack = createStackNavigator();
const MyPatientNavigator = () => {
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
      <MyPatientStack.Screen name="UpdatePatient" component={UpdatePatient} />
      <MyPatientStack.Screen name="EvaluationList" component={EvaluationList} />
      <MyPatientStack.Screen
        name="MyPatientsSession"
        component={MyPatientsSession}
      />
      <MyPatientStack.Screen
        name="MyPatientSessionDetails"
        component={MyPatientSessionDetails}
      />
      <MyPatientStack.Screen name="FlatListView" component={FlatListView} />
    </MyPatientStack.Navigator>
  );
};

export default MyPatientNavigator;
