import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AddPatient from '../screens/general/Patient/AddPatient';
import Assignment from '../screens/general/Patient/Assignment';
import EnrolmentQueue from '../screens/general/Patient/EnrolmentQueue';
import MyPatient from '../screens/general/Patient/MyPatient';
import ServiceEnrollment from '../screens/general/Patient/ServiceEnrollment';



const Stack = createStackNavigator();
export default function PatientTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AddPatient" component={AddPatient} />
            <Stack.Screen name="Assignment" component={Assignment} />
            <Stack.Screen name="EnrolmentQueue" component={EnrolmentQueue} />
            <Stack.Screen name="MyPatient" component={MyPatient} />
            <Stack.Screen name="ServiceEnrollment" component={ServiceEnrollment} />
        </Stack.Navigator>
    );
}
