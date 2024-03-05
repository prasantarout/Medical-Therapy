import { Alert, FlatList, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getPatientSessionReq } from '../../../redux/reducer/PatientReducer'
import moment from 'moment'

let getPatientSessionStatus = ""

const PatientSession = (props) => {

    const orientation = useOrientation()
    const [activeTab, setActiveTab] = useState(0)
    const tabs = ['Upcoming Assignments', 'Completed Assignments'];
    // const initialTab = 0;
    const [numCols, setColumnNo] = useState(orientation == 'PORTRAIT' ? 1 : 2);
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const CmsReducer = useSelector(state => state.CmsReducer)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [readableDate, setReadableDate] = useState("");
    const PatientReducer = useSelector(state => state.PatientReducer)
    // ecn
    useEffect(() => {
        let obj = { session_date: '2024-02-12' }
        dispatch(getPatientSessionReq(obj))
        let todaysDateString = moment(new Date().toISOString().split('T')[0]);
        let todaysDate = moment(todaysDateString).format('Do MMMM');
        setReadableDate(todaysDate)
        
    }, [isFocused])


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let selectedDate = moment(date).format('Do MMMM')
        setReadableDate(selectedDate)
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    const handleSelect = (ecn) => {
        const isSelected = selectedItems.includes(ecn);
        if (isSelected) {
            setSelectedItems(selectedItems.filter(item => item !== ecn));
        } else {
            setSelectedItems([...selectedItems, ecn]);
        }
        
    }


    const IconTextBlock = ({ icon, title, textStyle, name, cardIconStyle }) => {
        return (
            <View style={[styles.iconTextContainer]} >
                <View style={[css.row, css.aic]} >
                    {icon ? <Image source={icon} style={[styles.cardIconStyle, cardIconStyle]} /> : null}
                    <Txt style={[css.fs17, css.ml1, textStyle]} >{name}</Txt>
                </View>
                <View style={[css.row, css.aic]} >
                    <View style={[styles.cardIconStyle]} />
                    <Txt style={[css.fs15, css.ml1, css.textLighte]} >{title}</Txt>
                </View>
            </View>
        )
    }

    const renderAssignments = ({ item, index }) => {       
        
        return (
            <Pressable
                style={[css.card, css.mb2, {
                    backgroundColor: selectedItems?.includes(item.ecn) ? 'rgba(0,0,0,0.1)' : "#fff"
                }]}
                onLongPress={() => handleSelect(item?.ecn)}
                onPress={() => selectedItems?.length > 0 ? handleSelect(item?.ecn) : null}
            >
                <View style={[css.row, css.jcsb, css.aic]}>
                    <View style={[css.row, css.aic]} >
                        {item?.profile_photo_url ?
                            <Image source={{ uri: item?.profile_photo_url }} style={[styles.cardUserStyle]} /> :
                            <Image source={icons.userBlue} style={[styles.cardUserStyle]} />
                        }
                        <Txt style={[css.fs18,]} >{item?.patient_name}</Txt>
                    </View>
                    <Image source={item?.status == 'Pending' ? icons.inProcess : icons.cardCompleted} style={[styles.cardRightIcon]} />
                </View>

                <View style={[css.row, css.aic, css.mt3]} >
                    <IconTextBlock icon={icons.cardCalender} name="Setup Date" title={item?.setUpDate} />
                    <IconTextBlock icon={icons.cardClock} name="Total Usage On Device" title={item?.total_hours_usages} />
                    <IconTextBlock icon={icons.location2} cardIconStyle={{ tintColor: colors.primary }} name="Location" title={item?.location} />
                </View>
                <View style={[css.row, css.aic, css.mt2]} >
                    <IconTextBlock icon={icons.cardCalender} name="Session Date" title={item?.sessionDate} />
                    <IconTextBlock icon={icons.cardClock} name="Session Time" title={item?.receiptTime} />
                </View>
                <View style={[css.mt2, css.row]} >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.viewButon, css.center]}
                        onPress={() => props.navigation.navigate('PatientSessionDetails', {
                            "type": activeTab,
                            "item": item
                        })}
                    >
                        <Txt style={[styles.viewButonText]}>View</Txt>
                    </TouchableOpacity>
                </View>
            </Pressable>
        )
    }

    if (getPatientSessionStatus === '' || PatientReducer.status !== getPatientSessionStatus) {
        switch (PatientReducer.status) {
            case 'PATIENT/getPatientSessionReq':
                getPatientSessionStatus = PatientReducer.status;
                break;
            case 'PATIENT/getPatientSessionSuccess':
                getPatientSessionStatus = PatientReducer.status;
                break;
            case 'PATIENT/getPatientSessionFailure':
                getPatientSessionStatus = PatientReducer.status;
                break;
        }
    }

    return (
        <SafeView {...props}>
            <View style={[css.px4, css.f1]}>
                <TitleTxt style={[css.mt4]} title="Patient Session" />
                <View style={[styles.assignmentList, css.f1]}>
                    <View style={[styles.calenderArea, css.row, css.aic]}>
                        <TouchableOpacity onPress={showDatePicker} activeOpacity={0.7} >
                            <Image source={icons.calender} style={[styles.calendarIconStyle]} />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <Txt style={[css.fs17, css.semiBold]} >{readableDate}</Txt>
                    </View>
                    <View style={[css.f1]} >
                        <FlatList
                            data={PatientReducer?.getPatientSessionResponse?.data?.data}
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
        marginBottom: 20,
        marginTop: 16
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
    calendarIconStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: colors.primary,
        marginRight: 20
    },
    cardUserStyle: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 100,
        // tintColor: colors.primary,
    }
})