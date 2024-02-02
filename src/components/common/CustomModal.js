import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import css, { width } from '../../themes/space';
import Txt from '../micro/Txt';
import { colors } from '../../themes/colors';
import { icons } from '../../themes/icons';
import { images } from '../../themes/images';
import { fonts } from '../../themes/fonts';


const CustomModal = (props) => {
    return (
        <Modal isVisible={props.isVisible}>
            <View style={[css.f1, css.center]}>
                <View style={[styles.modalStyle, css.p5, props.style, css.bgWhite]}>
                    <TouchableOpacity style={[styles.closeButtonStyle]} onPress={props.onCloseRequest} >
                        <Image source={icons.closeIcon} style={[styles.closeButtonInner]} />
                    </TouchableOpacity>
                    {props.children}
                    <View style={[styles.panel, css.px4]}>
                        <Image source={props.icon} style={[styles.emailLinkStyle, css.asc]} />
                        <View style={[]}>
                            <Txt style={[styles.headerText, css.tac]}>{props?.title}</Txt>
                            <Txt style={[styles.subHeaderText, css.mt5, css.tac]}>{props?.subtitle}</Txt>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export default CustomModal

const styles = StyleSheet.create({
    modalStyle: {
        borderRadius: normalize(10),
        minHeight: normalize(100),
        minWidth: normalize(100),
        // aspectRatio: 1
    },
    closeButtonStyle: {
        overflow: 'hidden',
        width: 120,
        height: 120,
        borderRadius: normalize(100),
        position: 'absolute',
        top: -20,
        right: -45,
    },
    closeButtonInner: {
        width: "100%",
        height: "100%",
    },
    closeButtonIcon: {
        color: colors.white,
        fontSize: normalize(5),
    },
    emailLinkStyle: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    modalWrap: {
        minHeight: normalize(120),
        minWidth: normalize(120)
    },
    headerText: {
        fontFamily: fonts.Bold,
        fontSize: 25,
        color: colors.primaryTextColor,
        lineHeight: 30,
        marginTop: normalize(5),
    },
    subHeaderText: {
        fontFamily: fonts.Regular,
        fontSize: 22,
        color: colors.secondaryTextColor,
        lineHeight: 30,
    },
    panel: {
        width: normalize(140),
        alignSelf: 'center',
    }
})