import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/general/Home';
import MyPatient from '../screens/general/Patient/MyPatient';
import { icons } from '../themes/icons';
import Assignments from '../screens/general/Assignments/Assignments';
import HelpnSupport from '../screens/general/HelpSupport/HelpnSupport';
import MyProfile from '../screens/general/Profile/MyProfile';
import { colors } from '../themes/colors';
import normalize from '../utils/normalize';
import { fonts } from '../themes/fonts';
import AssignmentTab from './AssignmentTab';
import PatientTab from './PatientTab';

const BottomTab = (props) => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.secondary,
      tabBarHideOnKeyboard: true,
      tabBarLabelPosition: "below-icon",
      tabBarLabelStyle: { marginBottom: 6, fontFamily: fonts.Medium },
      tabBarInactiveTintColor: colors.white,
      tabBarStyle: { backgroundColor: colors.primary, height: 65 },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconColor = focused ? colors.secondary : colors.white

        if (route.name === 'Home') {
          iconName = icons.navHome;
        } else if (route.name === 'Assignment') {
          iconName = icons.navAssignment;
        } else if (route.name === 'Patient') {
          iconName = icons.navPatient;
        } else if (route.name === 'Help & Support') {
          iconName = icons.navHelp;
        } else if (route.name === 'My Profile') {
          iconName = icons.navProfile;
        }
        return <Image source={iconName}
          style={[{ tintColor: iconColor }, styles.tabIcon]} />;
      },
    })} >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Assignment" component={AssignmentTab} />
      <Tab.Screen name="Patient" component={PatientTab} />
      <Tab.Screen name="Help & Support" component={HelpnSupport} />
      <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  tabIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: 8
  }
})
