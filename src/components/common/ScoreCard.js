import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import css from '../../themes/space';
import Txt from '../micro/Txt';
import { fonts } from '../../themes/fonts';

const ScoreCard = (props) => {
    return (
        <View style={[css.py8, css.bgWhite, styles.card, props.style, css.aic]}>
            <CircularProgress
                value={props?.value}
                radius={120}
                duration={2000}
                activeStrokeWidth={25}
                inActiveStrokeWidth={20}
                activeStrokeColor={props?.activeStrokeColor}
                activeStrokeSecondaryColor={props?.activeStrokeSecondaryColor}
                inActiveStrokeColor={'#f5f5f5'}
                inActiveStrokeOpacity={1}
                maxValue={100}
                rotation={-150}
                circleBackgroundColor="#fff"
            >
            </CircularProgress>
            <View style={[css.aic, css.mt3]}>
                <Txt style={[css.fs18, styles.titleStyle]}>{props.title}</Txt>
            </View>
        </View>
    )
}
// 343286

export default ScoreCard

const styles = StyleSheet.create({
    innerCircle:{
        backgroundColor: 'red',
        width:'100%',
        height:'100%'
    },
    card:{
        borderRadius: 10,
        flex: 1
    },
    titleStyle:{
        color: '#444444',
        fontFamily: fonts.Medium,
        fontSize: 25
    }
})
