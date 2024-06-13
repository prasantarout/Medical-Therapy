import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/general/Home';
import {icons} from '../themes/icons';
import HelpnSupport from '../screens/general/HelpSupport/HelpnSupport';
import MyProfile from '../screens/general/Profile/MyProfile';
import {colors} from '../themes/colors';
import {fonts} from '../themes/fonts';
import PatientSessionTab from './PatientSessionTab';
import PatientTab from './PatientTab';
import {createStackNavigator} from '@react-navigation/stack';
import ActivePatients from '../screens/general/Home/ActivePatients';
import CompletedEvaulation from '../screens/general/Home/CompletedEvaulation';
import CurrentMonthSessionData from '../screens/general/Home/CurrentMonthSessionData';
import InactivePatients from '../screens/general/Home/InactivePatients';
import PendingEvaulation from '../screens/general/Home/PendingEvaulation';
import ActivePatientsSession from '../screens/general/Home/ActivePatientsSession';

const Tab = createBottomTabNavigator();

const BottomTab = props => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {marginBottom: 6, fontFamily: fonts.Medium},
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: {backgroundColor: colors.primary, height: 80},
        tabBarIcon: ({focused}) => TabIcon({focused: focused, route: route}),
      })}>
      <Tab.Screen name="Dashboard" component={DashboardNavigator} />
      <Tab.Screen name="Patients Session" component={PatientSessionTab} />
      <Tab.Screen name="Patients Queue" component={PatientTab} />
      <Tab.Screen name="Help & Support" component={HelpnSupport} />
      <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
  );
};

const DashboardStack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <DashboardStack.Screen name="Home" component={Home} />
      <DashboardStack.Screen name="ActivePatients" component={ActivePatients} />
      <DashboardStack.Screen
        name="ActivePatientsSession"
        component={ActivePatientsSession}
      />
      <DashboardStack.Screen
        name="CompletedEvaulation"
        component={CompletedEvaulation}
      />
      <DashboardStack.Screen
        name="CurrentMonthSessionData"
        component={CurrentMonthSessionData}
      />
      <DashboardStack.Screen
        name="InactivePatients"
        component={InactivePatients}
      />
      <DashboardStack.Screen
        name="PendingEvaulation"
        component={PendingEvaulation}
      />
    </DashboardStack.Navigator>
  );
};

const TabIcon = ({focused, route}) => {
  let iconName;
  let iconColor = focused ? colors.secondary : colors.white;

  if (route.name === 'Dashboard') {
    iconName = icons.navHome;
  } else if (route.name === 'Patients Session') {
    iconName = icons.navAssignment;
  } else if (route.name === 'Patients Queue') {
    iconName = icons.navPatient;
  } else if (route.name === 'Help & Support') {
    iconName = icons.navHelp;
  } else if (route.name === 'My Profile') {
    iconName = icons.navProfile;
  }
  return (
    <Image source={iconName} style={[{tintColor: iconColor}, styles.tabIcon]} />
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: 8,
  },
});
