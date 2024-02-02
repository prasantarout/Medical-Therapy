import { StyleSheet, FlatList, View, Image } from 'react-native'
import React from 'react'
import CalendarStrip from 'react-native-calendar-strip';
import css from '../../themes/space';
import TitleTxt from './TitleTxt';
import { assignmentList } from '../../utils/dumpAPI';
import Txt from '../micro/Txt';
import { icons } from '../../themes/icons';
import useOrientation from '../../utils/useOrientation';
import { colors } from '../../themes/colors';

const CalenderView = (props) => {

    const customDatesStylesFunc = date => {
        if (date.isoWeekday() === 5) { // Fridays
            return {
                dateNameStyle: { color: '#fff' },
                dateNumberStyle: { color: '#fff' },
                dateContainerStyle: { backgroundColor: '#3abef0' },
            }
        }
    }
    let orientation = useOrientation()
    let numColumns = 3
    let cardWidth = orientation == "LANDSCAPE" ? "33.3%" : "50%"


    return (
        <View style={[styles.patientEnrollment, css.mt4]}>
            <View style={[css.card]}>
                <View style={[css.row, css.jcsb, css.aic]}>
                    <TitleTxt title="Upcoming Assignment" />

                </View>
                <View style={[styles.calenderArea]}>
                    <CalendarStrip
                        customDatesStyles={customDatesStylesFunc}
                        scrollable
                        style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
                        calendarColor='transparent'
                        calendarHeaderStyle={{ color: 'black' }}
                        dateNumberStyle={{ color: 'black' }}
                        dateNameStyle={{ color: 'black' }}
                        iconContainer={{ flex: 0.1 }}
                    />
                </View>
                <View style={[css.f1, css.row, css.fw]}>
                    {
                        assignmentList?.map((item, index) => {
                            let borderLeftColor = orientation == "LANDSCAPE" ?(index % 3 === 0 ? colors.primary :
                                index % 3 === 1 ? colors.secondary :
                                    colors.primary):index % 2 === 0 ? colors.primary : colors.secondary``
                            return (
                                <View style={[styles.cardStyle, { width: cardWidth, borderLeftColor: borderLeftColor }]}>
                                    <Txt style={[css.bold, css.fs18]} >{item?.title}</Txt>
                                    <View style={[css.row, css.aic,{marginTop:10}]} >
                                        <View style={[css.row, css.aic]} >
                                            <Image source={icons.calender} style={[styles.iconStyle]} />
                                            <Txt style={[css.fs12, css.medium]}>{item?.date}</Txt>
                                        </View>
                                        <View style={[css.row, css.aic,css.ml3]} >
                                            <Image source={icons.clock2} style={[styles.iconStyle]} />
                                            <Txt style={[css.fs12, css.medium]}>{item?.time}</Txt>
                                        </View>
                                    </View>
                                    <View style={[css.row, css.aic,{marginTop:10}]} >
                                        <Image source={icons.location2} style={[styles.iconStyle]} />
                                        <Txt style={[css.fs12, css.medium]}>{item?.location}</Txt>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default CalenderView

const styles = StyleSheet.create({
    cardStyle: {
        padding: 16,
        borderLeftWidth: 2,
        marginBottom: 16
    },
    iconStyle: {
        width: 17,
        height: 17,
        marginRight: 10,
    }
})