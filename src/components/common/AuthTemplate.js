import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Image, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../themes/colors';
import { fonts } from '../../themes/fonts'
import normalize from '../../utils/normalize'
import css from '../../themes/space'
import { images } from '../../themes/images'
import Txt from '../micro/Txt'



const AuthTemplate = (props) => {

    const [wrapperWidth, setWrapperWidth] = useState(calculateWrapperWidth());

    useEffect(() => {
        const handleOrientationChange = () => {
            setWrapperWidth(calculateWrapperWidth());
        };

        Dimensions?.addEventListener('change', handleOrientationChange);

        return () => {
            Dimensions?.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    function calculateWrapperWidth() {
        const { width } = Dimensions.get('window');

        return width > 1300
            ? width - normalize(100)
            : width > 1200
                ? width - normalize(85)
                : width > 1000
                    ? width - normalize(65)
                    : width > 900
                        ? width - normalize(55)
                        : width < 900
                            ? width - normalize(50)
                            : width - normalize(16);
    }

    console.log("wrapperWidth", wrapperWidth)
    return (
        <SafeAreaView style={[css.f1, { backgroundColor: colors.bgColor }, props.style]}>
            <KeyboardAvoidingView
                behavior={props?.behavior}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[css.f1, { width: wrapperWidth }, css.asc]} >
                        <View style={[]}>
                            <View style={[css.aic, css.jcc]}>
                                <View style={[css.mt4, styles.logoContainer]}>
                                    <Image style={[styles.logo]} source={images.logo} />
                                </View>
                                <Txt style={styles.headerText}>{props?.title}</Txt>
                                <Txt style={[styles.subHeaderText, css.mt5]}>{props?.subtitle}</Txt>
                            </View>
                        </View>
                        <View style={[css.f1, css.py11]}>
                            {props?.children}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default AuthTemplate

const styles = StyleSheet.create({
    headerText: {
        fontFamily: fonts.Medium,
        fontSize: normalize(12),
        color: colors.primaryTextColor,
    },
    subHeaderText: {
        fontFamily: fonts.Regular,
        fontSize: normalize(8),
        color: colors.secondaryTextColor,
        textAlign: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: normalize(30),
        paddingBottom: normalize(10),
    },
    logo: {
        resizeMode: 'contain',
        width: normalize(120),
        height: normalize(40),
    },
})