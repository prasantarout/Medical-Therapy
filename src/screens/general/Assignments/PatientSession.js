import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import css from '../../../themes/space'
import Tabs from '../../../components/common/Tabs'
import TitleTxt from '../../../components/common/TitleTxt'
import CalendarStrip from 'react-native-calendar-strip';
import { fonts } from '../../../themes/fonts'
import { icons } from '../../../themes/icons'
import useOrientation from '../../../utils/useOrientation'
import { upcomingAssignmentList } from '../../../utils/dumpAPI'
import Txt from '../../../components/micro/Txt'
import { colors } from '../../../themes/colors'
import SafeView from '../../../components/common/SafeView'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { getUpcomingAssignmentsReq } from '../../../redux/reducer/CmsReducer'


let upComingAssignmentStatus = ""

const PatientSession = (props) => {

    const orientation = useOrientation()
    const [activeTab, setActiveTab] = useState(0)
    const tabs = ['Upcoming Assignments', 'Completed Assignments'];
    // const initialTab = 0;
    const [numCols, setColumnNo] = useState(orientation == 'PORTRAIT' ? 1 : 2);
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const CmsReducer = useSelector(state => state.CmsReducer)
    
    useEffect(() => {
        dispatch(getUpcomingAssignmentsReq())
        console.log("getUpcomingAssignmentsReq - useeffect")
    }, [isFocused])

    const handleTabPress = (index) => {
        setActiveTab(index)
    };

    const customDatesStylesFunc = date => {
        if (date.isoWeekday() === 5) {
            return {
                // dateNameStyle: { color: '#fff' },
                // dateNumberStyle: { color: '#fff' },
                // dateContainerStyle: { backgroundColor: '#3abef0' },
            }
        }
    }

    const renderAssignments = ({ item, index }) => {
        return (
            <View style={[css.card, css.mb2]} >
                <View style={[css.row, css.jcsb, css.aic]}>
                    <View style={[css.w70]} >
                        <Txt style={[css.fs18]} >{item?.discription}</Txt>
                    </View>
                    <Image source={activeTab == 0 ? icons.inProcess : icons.cardCompleted} style={[styles.cardRightIcon]} />
                </View>
                <View style={[css.row, css.aic, css.mt2]} >
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
                </View>
                <View style={[css.row, css.aic]} >
                    <View style={[css.row, css.aic, styles.iconTextContainer]} >
                        <Image source={icons.cardCalender} style={[styles.cardIconStyle]} />
                        <Txt style={[css.fs18, css.ml1]} >{item?.date}</Txt>
                    </View>
                    <View style={[css.row, css.aic, styles.iconTextContainer]} >
                        <Image source={icons.cardClock} style={[styles.cardIconStyle]} />
                        <Txt style={[css.fs18, css.ml1]} >{item?.email}</Txt>
                    </View>
                </View>
                <View style={[css.mt2, css.row]} >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.viewButon, css.center]}
                        onPress={() => props.navigation.navigate('AssignmentDetails', {
                            "type": activeTab,
                            "item": item
                        })}
                    >
                        <Txt style={[styles.viewButonText]}>View</Txt>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    if (upComingAssignmentStatus === '' || CmsReducer.status !== upComingAssignmentStatus) {
        switch (CmsReducer.status) {
            case 'CMS/getUpcomingAssignmentsReq':
                upComingAssignmentStatus = CmsReducer.status;
                console.log("getUpcomingAssignmentsReq", CmsReducer.status)
                break;
            case 'CMS/getUpcomingAssignmentsSuccess':
                upComingAssignmentStatus = CmsReducer.status;
                console.log("getUpcomingAssignmentsSuccess", CmsReducer.status)
                break;
            case 'CMS/getUpcomingAssignmentsFailure':
                upComingAssignmentStatus = CmsReducer.status;
                console.log("getUpcomingAssignmentsFailure", CmsReducer.status)
                break;
        }
    }

    return (
        <SafeView {...props}>

            <View style={[css.px4, css.f1]}>
                {/* <Tabs tabs={tabs} initialTab={activeTab} onTabPress={handleTabPress} /> */}
                <TitleTxt style={[css.mt4]} title="Patient Session" />
                <View style={[styles.assignmentList, css.f1]}>
                    <View style={[styles.calenderArea]}>
                        <CalendarStrip
                            customDatesStyles={customDatesStylesFunc}
                            scrollable={false}
                            calendarHeaderFormat='DD MMM, YYYY'
                            numDaysInWeek={1}
                            calendarAnimation={{ type: 'sequence', duration: 30 }}
                            style={[styles.calenderStrip]}
                            calendarColor='transparent'
                            calendarHeaderStyle={[styles.dateStyle]}
                            dateNumberStyle={{ color: 'black' }}
                            dateNameStyle={{ color: 'black' }}
                            calendarHeaderContainerStyle={[styles.calendarHeaderStyle]}
                            dayContainerStyle={[styles.dayContainerStyle]}
                            iconLeft={icons.leftArrow}
                            iconRight={icons.leftArrow}
                            iconStyle={[styles.iconStyle]}
                            iconLeftStyle={[styles.iconLeftStyle]}
                        />
                    </View>
                    <View style={[css.f1]} >
                        <FlatList
                            data={upcomingAssignmentList}
                            numColumns={numCols}
                            key={numCols}
                            renderItem={renderAssignments}
                        />
                    </View>
                </View>
            </View>
        </SafeView>
    )
}

export default PatientSession

const styles = StyleSheet.create({
    calenderArea: {
        width: 200,
    },
    calendarHeaderStyle: {
        position: 'absolute',
        top: 38,
        left: 40,
        zIndex: 99
    },
    dayContainerStyle: {
        backgroundColor: 'transparent',
        width: 100,
        zIndex: -1,
        opacity: 0
    },
    dateStyle: {
        fontFamily: fonts.Regular,
        fontSize: 20,
        color: '#444444'
    },
    iconLeftStyle: {
        transform: [{ rotate: '180deg' }]
    },
    iconStyle: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    cardRightIcon: {
        resizeMode: 'contain',
        height: 25,
        width: 100
    },
    cardIconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    iconTextContainer: {
        paddingRight: 10,
        minWidth: 150,
        marginRight: 16,
        marginBottom: 5,
    },
    viewButon: {
        backgroundColor: '#e9ebf3',
        paddingHorizontal: 50,
        paddingVertical: 12,
        borderRadius: 10
    },
    viewButonText: {
        color: colors.primary,
        fontFamily: fonts.Bold,
        fontSize: 18
    },
})