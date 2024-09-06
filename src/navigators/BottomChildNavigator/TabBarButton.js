import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TabBarButton = ({children, onPress, route}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (route.name === 'My Patients') {
      // Reset navigation stack when 'My Patients' tab is pressed
      navigation.reset({
        index: 0,
        routes: [{name: 'My Patients'}],
      });
    } else {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.tabButton}>
      {children}
    </Pressable>
  );
};

export default TabBarButton;
const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
