import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Txt from '../micro/Txt'
import { colors } from '../../themes/colors'
import { fonts } from '../../themes/fonts'
import css from '../../themes/space'

const SimpleInput = (props) => {

    const { style, value, placeholder, title, onChangeText, inputStyle, titleStyle, multiline } = props

    return (
        <View style={[style, styles.contianerStyle]}>
            <Txt style={[css.fs20, titleStyle]} >{title}</Txt>
            <TextInput
                style={[inputStyle, styles.inputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
            />
        </View>
    )
}

export default SimpleInput

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        width: '100%',
        fontSize: 18,
        color: colors.ternaryTextColor,
        fontFamily: fonts.Regular,
    },
    contianerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    }
})