import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CustomDropdown from './CustomDropdown'
import { years } from '../../utils/dumpAPI'
import TitleTxt from './TitleTxt'
import css, { width } from '../../themes/space'
import useScreenDimension from '../../utils/useScreenDimension'
import Divider from '../micro/Divider'
import Txt from '../micro/Txt'
import { BarChart } from 'react-native-gifted-charts';
import useOrientation from '../../utils/useOrientation'

const PatientEnrolmentChart = () => {

    const [selectedyear, setSelectedYear] = useState("");

    const screenWidth = useScreenDimension()
    let orientation = useOrientation()

    const barData = [
        {
            value: 40,
            label: 'Jan',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 20, frontColor: '#3abef0' },
        {
            value: 50,
            label: 'Feb',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 40, frontColor: '#3abef0' },
        {
            value: 75,
            label: 'Mar',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 25, frontColor: '#3abef0' },
        {
            value: 30,
            label: 'Apr',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 20, frontColor: '#3abef0' },
        {
            value: 60,
            label: 'May',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 40, frontColor: '#3abef0' },
        {
            value: 65,
            label: 'Jun',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 30, frontColor: '#3abef0' },
        {
            value: 40,
            label: 'Jul',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 20, frontColor: '#3abef0' },
        {
            value: 50,
            label: 'Aug',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 40, frontColor: '#3abef0' },
        {
            value: 75,
            label: 'SEP',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
            activeOpacity: 1
        },
        { value: 25, frontColor: '#3abef0' },
        {
            value: 30,
            label: 'OCT',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 20, frontColor: '#3abef0' },
        {
            value: 60,
            label: 'Nov',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 40, frontColor: '#3abef0' },
        {
            value: 65,
            label: 'Dec',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#28328c',
        },
        { value: 30, frontColor: '#3abef0' },
    ];

    const RenderTitles = ({ title, backgroundColor }) => {
        return (
            <View style={[css.row, css.aic, css.mr2]}>
                <View style={[styles.colorBox, { backgroundColor: backgroundColor }]} />
                <Txt style={[css.textPrimary, css.medium, orientation == 'LANDSCAPE' ? css.fs20 : css.fs15, { marginTop: 4 }]}>
                    {title}
                </Txt>
            </View>
        )
    }

    return (
        <View style={[styles.patientEnrollment, css.mt4]}>
            <View style={[css.card]}>
                <View style={[css.row, css.jcsb, css.aic]}>
                    <TitleTxt title="patient enrolment" />
                    <CustomDropdown
                        data={years}
                        labelField='label'
                        valueField='value'
                        placeholder={years[0].label}
                        value={selectedyear}
                        onChange={(item) => setSelectedYear(item?.value)}
                    />
                </View>
                <View style={[styles.chartArea]}>
                    <BarChart
                        data={barData}
                        barWidth={8}
                        spacing={screenWidth / 17.4}
                        xAxisThickness={1}
                        yAxisThickness={0}
                        yAxisTextStyle={[css.textPrimary]}
                        // noOfSections={3}
                        activeOpacity={0.8}
                        maxValue={100}
                        lineBehindBars={true}
                        rulesType='solid'
                    />
                    <Divider />

                    <View style={[css.row, css.aic, css.asc, css.mt3]}>
                        <RenderTitles
                            title="New Patient"
                            backgroundColor="#28328C"
                        />
                        <RenderTitles
                            title="Repeated Patient"
                            backgroundColor="#3ABEF0"
                        />
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

export default PatientEnrolmentChart

const styles = StyleSheet.create({
    colorBox: {
        width: 19,
        height: 19,
        borderRadius: 3,
        marginRight: 10
    },
    graphStyle: {
        width: width,
        backgroundColor: 'red',
    }
})