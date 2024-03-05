import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import { icons } from '../themes/icons';
import Txt from '../components/micro/Txt';

const LoaderAnimated = (props) => {

    const { title, isVisible } = props

    return (
        <AnimatedLoader
            visible={isVisible}
            overlayColor="rgba(255,255,255,0.75)"
            source={icons.loader}
            // source={icons.heart}
            animationStyle={styles.lottie}
            speed={1}
        >
            <Txt>{title}</Txt>
        </AnimatedLoader>
    )
}

export default LoaderAnimated

const styles = StyleSheet.create({
    lottie: {
        width: 300,
        height: 300,
    }
})