import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SafeView from '../../../components/common/SafeView'
import NavBar from '../../../components/common/NavBar'
import css from '../../../themes/space'
import TitleTxt from '../../../components/common/TitleTxt'
import Txt from '../../../components/micro/Txt'
import { icons } from '../../../themes/icons'
import { colors } from '../../../themes/colors'
import Divider from '../../../components/micro/Divider'
import Button from '../../../components/buttons/Button'

const AssignmentDetails = (props) => {

    const [item, setItem] = useState(props?.route?.params?.item)
    console.log("params", props?.route?.params?.type)
    let title = props.route.params?.type == 0 ? 'Upcoming Assignment' : 'Completed Assignment'



    return (
        <SafeView {...props}>
            <View style={[css.f1, css.px4]} >
                <TitleTxt title={title} />
                <View style={[css.mt10, css.card]} >
                    <View style={[css.rowBetween]} >
                        <View style={[css.w60]}>
                            <Txt style={[css.fs18, css.semiBold]} >{item?.discription}</Txt>
                        </View>
                        <Image
                            style={[styles.cardRightIcon]}
                            source={props.route.params?.type == 0 ? icons.inProcess : icons.cardCompleted} />
                    </View>
                    <View style={[css.row]} >
                        <TouchableOpacity activeOpacity={0.8} style={[styles.tagStyle, css.mt3]} >
                            <Txt style={[styles.tagTextStyle]}>Repeated</Txt>
                        </TouchableOpacity>
                    </View>
                    <View style={[css.row, css.aic, css.mt2, css.w60, css.fw]} >
                        <View style={[css.row, css.aic, styles.iconTextContainer]} >
                            <Image source={icons.cardUser} style={[styles.cardIconStyle]} />
                            <Txt style={[css.fs18, css.ml1]} >{item?.title}</Txt>
                        </View>
                        <View style={[css.row, css.aic, styles.iconTextContainer]} >
                            <Image source={icons.cardPhone} style={[styles.cardIconStyle]} />
                            <Txt style={[css.fs18, css.ml1]} >{item?.phone}</Txt>
                            
                        </View>
                        <View style={[css.row, css.aic, styles.iconTextContainer]} >
                            <Image source={icons.cardMail} style={[styles.cardIconStyle]} />
                            <Txt style={[css.fs18, css.ml1]} >{item?.email}</Txt>
                        </View>
                        <View style={[css.row, styles.iconTextContainer, css.mt2]} >
                            <Image source={icons.location2} style={[styles.cardIconStyle]} />
                            <Txt style={[css.fs18, css.ml1]} >{item?.location}</Txt>
                        </View>
                    </View>

                    <View style={[css.row, css.mb5, css.mt2]}>
                        <View style={[css.row, css.aic, styles.blueTagStyle]} >
                            <Image source={icons.cardCalender} style={[styles.tagIconStyle]} />
                            <Txt style={[css.fs18, css.ml1, css.textPrimary, css.medium]} >{item?.date}</Txt>
                        </View>
                        <View style={[css.row, css.aic, styles.blueTagStyle, css.ml3]} >
                            <Image source={icons.cardClock} style={[styles.tagIconStyle]} />
                            <Txt style={[css.fs18, css.ml1, css.textPrimary, css.medium]} >{item?.time}</Txt>
                        </View>
                        <View style={[css.row, css.aic, styles.blueTagStyle, css.ml3]} >
                            <Image source={icons.cardSetting} style={[styles.tagIconStyle]} />
                            <Txt style={[css.fs18, css.ml1, css.textPrimary, css.medium]} >Service</Txt>
                        </View>
                    </View>
                    <Divider />
                    <View style={[css.mt5]} >
                        <Txt style={[css.fs25, css.bold]} >Details</Txt>
                        <Txt style={[css.fs17, css.regular, styles.detailsStyle]}>{item?.details}</Txt>
                    </View>
                    <View style={[css.row]}>
                        <Button
                            title={props.route.params?.type == 0 ? "Mark As Complete" : "View Evaluation Review"}
                            style={[css.mt3]}
                            onPress={() => props.navigation?.navigate(props.route.params?.type == 0 ? 'EvaluationForm' : 'EvaluationResult')}
                        />
                    </View>
                </View>
            </View>
        </SafeView>
    )
}


export default AssignmentDetails

const styles = StyleSheet.create({
    cardRightIcon: {
        resizeMode: 'contain',
        height: 25,
        width: 100
    },
    tagStyle: {
        backgroundColor: "#e5f8fd",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    tagTextStyle: {
        color: colors.secondary
    },
    iconTextContainer: {
        paddingRight: 10,
        minWidth: 150,
        marginRight: 16,
        marginBottom: 5,
    },
    cardIconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#979797'
    },
    tagIconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: colors.primary
    },
    blueTagStyle: {
        backgroundColor: '#f2f3f8',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsStyle: {
        lineHeight: 30,
        color: colors.ternaryTextColor
    }
})