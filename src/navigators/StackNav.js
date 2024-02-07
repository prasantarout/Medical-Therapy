import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Splash from '../screens/auth/Splash';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPScreen from '../screens/auth/OTPScreen';
import Home from '../screens/general/Home';
import { NavigationContainer } from '@react-navigation/native';
import MyPatient from '../screens/general/Patient/MyPatient';
import EnrolmentQueue from '../screens/general/Patient/EnrolmentQueue';
import Assignment from '../screens/general/Patient/Assignment';
import ServiceEnrollment from '../screens/general/Patient/ServiceEnrollment';
import AddPatient from '../screens/general/Patient/AddPatient';
import HelpnSupport from '../screens/general/HelpSupport/HelpnSupport';
import BottomTab from './BottomTab';
import Assignments from '../screens/general/Assignments/Assignments';
import AssignmentDetails from '../screens/general/Assignments/AssignmentDetails';
import EvaluationForm from '../screens/general/Assignments/EvaluationForm';

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const Screens =
  // AuthReducer?.token == null  ?
  // {
  //   Signup: Signup,
  //   Login: Login,
  //   ForgotPassword: ForgotPassword,
  //   OTPScreen: OTPScreen,
  // }
  // :
  {
    // EvaluationForm:EvaluationForm,
    BottomTab:BottomTab,
    // 

    // Signup: Signup,
    // Login: Login,
    // ForgotPassword: ForgotPassword,
    // OTPScreen: OTPScreen,
    // MyPatient: MyPatient,
    // HelpnSupport: HelpnSupport,
    // EnrolmentQueue: EnrolmentQueue,
    // ServiceEnrolment: ServiceEnrollment,
    // AddPatient: AddPatient,
    // Assignment: Assignment,
    // Home: Home,
  };

  if (AuthReducer.isLoading) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false,
          }}
          initialRouteName="Splash">
          {Object.entries({
            ...Screens,
          }).map(([name, component]) => {
            return (
              <Stack.Screen key={name} name={name} component={component} />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNav;

const styles = StyleSheet.create({});
