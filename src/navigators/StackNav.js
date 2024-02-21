import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Splash from '../screens/auth/Splash';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPScreen from '../screens/auth/OTPScreen';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './BottomTab';
import Notification from '../screens/general/other/Notification';

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const Screens =
    AuthReducer?.token == null ?
      {
        Login: Login,
        Signup: Signup,
        ForgotPassword: ForgotPassword,
        OTPScreen: OTPScreen,
      }
      :
      {
        BottomTab: BottomTab,
        Notification: Notification
      };

  const initialRouteName = AuthReducer?.token == null ? 'Splash' : 'BottomTab';

  if (AuthReducer?.isLoading) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false,
          }}
          initialRouteName={initialRouteName}>
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
