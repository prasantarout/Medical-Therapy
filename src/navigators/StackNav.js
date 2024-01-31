import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Splash from '../screens/auth/Splash';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPScreen from '../screens/auth/OTPScreen';
import Home from '../screens/general/Home';
import {NavigationContainer} from '@react-navigation/native';
import MyPatient from '../screens/general/MyPatient';
import EnrolmentQueue from '../screens/general/EnrolmentQueue';

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
      // Subscription:withIAPContext(Subscription),

      MyPatient: MyPatient,
      EnrolmentQueue: EnrolmentQueue,
      Home: Home,
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
