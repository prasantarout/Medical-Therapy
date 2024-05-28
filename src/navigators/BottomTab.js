import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/general/Home';
import {icons} from '../themes/icons';
import HelpnSupport from '../screens/general/HelpSupport/HelpnSupport';
import MyProfile from '../screens/general/Profile/MyProfile';
import {colors} from '../themes/colors';
import {fonts} from '../themes/fonts';
import PatientSessionTab from './PatientSessionTab';
import PatientTab from './PatientTab';

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
      <Tab.Screen name="Dashboard" component={Home} />
      <Tab.Screen name="Patients Session" component={PatientSessionTab} />
      <Tab.Screen name="Patients Queue" component={PatientTab} />
      <Tab.Screen name="Help & Support" component={HelpnSupport} />
      <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
    // <Text>tab navigator</Text>
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
