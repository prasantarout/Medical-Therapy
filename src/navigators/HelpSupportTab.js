import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HelpnSupport from '../screens/general/HelpSupport/HelpnSupport';



const Stack = createStackNavigator();
export default function HomeSupportTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HelpnSupport" component={HelpnSupport} />
        </Stack.Navigator>
    );
}
