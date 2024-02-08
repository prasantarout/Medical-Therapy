import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import css from '../../themes/space';
import Txt from '../micro/Txt';
import { fonts } from '../../themes/fonts';
import { heightToDp as hp, widthToDp as wp } from '../../utils/responsive';
import normalize from '../../utils/normalize';
import useScreenDimension from '../../utils/useScreenDimension';


const ScoreCard = (props) => {

    const screenWidth = useScreenDimension()

    return (
        <View style={[css.py8, css.bgWhite, styles.card, props.style, css.aic,{
            maxWidth: screenWidth / 2.5,
            maxHeight: screenWidth / 2.5,
        }]}>
            <CircularProgress
                value={props?.value}
                radius={screenWidth / 12}
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
    card:{
        borderRadius: 10,
        flexGrow: 1,
        // maxWidth: 100
    },
    titleStyle:{
        color: '#444444',
        fontFamily: fonts.Medium,
        fontSize: 25
    }
})
