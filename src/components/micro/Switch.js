import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../../themes/icons'
import { colors } from '../../themes/colors'

const Switch = (props) => {
    const { isActive, toggleSwitch } = props
    const { isOn, onPress } = props
    const animatedValue = new Animated.Value(isActive ? 1 : 0);
  
    const switchTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
      });
    
      const handleToggle = () => {
        Animated.timing(animatedValue, {
          toValue: isActive ? 0 : 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
    
        toggleSwitch();
      };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggle}
            style={[styles.container, { backgroundColor: isActive ? colors.primary : "#e2e5ff" }]}
        >
            <Animated.View style={[styles.innerCircle,isActive && styles.switchActive, { transform: [{ translateX: switchTranslateX }] }]} />
        </TouchableOpacity>
    )
}

export default Switch

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 35,
        borderRadius: 100,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    innerCircle: {
        width: 25,
        height: 25,
        borderRadius: 100,
        backgroundColor: colors.primary,
    },
    innerCircleOn: {
        width: 25,
        height: 25,
        borderRadius: 100,
        backgroundColor: "#fff",
        transform: [{ translateX: 25 }]
    },
})