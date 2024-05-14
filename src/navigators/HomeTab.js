import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/general/Home';

const Stack = createStackNavigator();
export default function HomeTab() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
