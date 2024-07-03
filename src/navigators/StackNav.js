import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import Splash from '../screens/auth/Splash';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPScreen from '../screens/auth/OTPScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import BottomTab from './BottomTab';
import Notification from '../screens/general/other/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../utils/constants';
import {getTokenSuccess} from '../redux/reducer/AuthReducer';
import ResetPassword from '../screens/auth/ResetPassword';

const StackNav = ({props}) => {
  const Stack = createNativeStackNavigator();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [profileStatus, setProfileStatus] = useState('');
  const dispatch = useDispatch();

  const Screens =
    AuthReducer?.token == null
      ? {
          Login: Login,
          Signup: Signup,
          ForgotPassword: ForgotPassword,
          OTPScreen: OTPScreen,
          ResetPassword:ResetPassword
        }
      : {
          BottomTab: BottomTab,
          Notification: Notification,
        };

  const initialRouteName = AuthReducer?.token == null ? 'Splash' : 'BottomTab';
  
  
  useEffect(() => {
    if (profileStatus === '' || AuthReducer.status !== profileStatus) {
      switch (AuthReducer.status) {
        case 'Auth/LogoutRequest':
          // setProfileStatus(AuthReducer.status);
          break;
        case 'Auth/LogoutSuccess':
          setProfileStatus(AuthReducer.status);
          AsyncStorage.removeItem(constants.APP_TOKEN);
          dispatch(getTokenSuccess(null));
          break;
        case 'Auth/LogoutFailure':
          // setProfileStatus(AuthReducer.status);
          break;
        default:
          break;
      }
    }
  }, [AuthReducer.status, profileStatus, dispatch]);

  useEffect(() => {
    if (!AuthReducer.token && profileStatus === 'Auth/LogoutSuccess') {
      props?.navigation.navigate('Login');
    }
  }, [AuthReducer.token, profileStatus]);


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
