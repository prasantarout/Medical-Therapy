import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CustomDropdown from './CustomDropdown'
import { years } from '../../utils/dumpAPI'
import TitleTxt from './TitleTxt'
import css, { width } from '../../themes/space'
import useScreenWidth from '../../utils/useScreenWidth'
import Divider from '../micro/Divider'
import Txt from '../micro/Txt'
import { LineChart } from "react-native-gifted-charts"
import useOrientation from '../../utils/useOrientation'

const AssignmentChart = () => {

    const [selectedyear, setSelectedYear] = useState("");
    const screenWidth = useScreenWidth()
    let orientation = useOrientation()

    const lineData = [
        { value: 50, dataPointText: '0' },
        { value: 10, dataPointText: '10' },
        { value: 8, dataPointText: '8' },
        { value: 58, dataPointText: '58' },
        { value: 56, dataPointText: '56' },
        { value: 78, dataPointText: '78' },
        { value: 74, dataPointText: '74' },
        { value: 98, dataPointText: '98' },
        { value: 56, dataPointText: '56' },
        { value: 78, dataPointText: '78' },
        { value: 74, dataPointText: '74' },
        { value: 98, dataPointText: '98' },
    ];

    const lineData2 = [
        { value: 0, dataPointText: '0' },
        { value: 20, dataPointText: '20' },
        { value: 18, dataPointText: '18' },
        { value: 40, dataPointText: '40' },
        { value: 36, dataPointText: '36' },
        { value: 60, dataPointText: '60' },
        { value: 54, dataPointText: '54' },
        { value: 85, dataPointText: '85' },
        { value: 56, dataPointText: '56' },
        { value: 78, dataPointText: '78' },
        { value: 74, dataPointText: '74' },
        { value: 98, dataPointText: '98' },
    ];
    const lineData3 = [
        { value: 80, dataPointText: '0' },
        { value: 35, dataPointText: '20' },
        { value: 28, dataPointText: '18' },
        { value: 50, dataPointText: '40' },
        { value: 66, dataPointText: '36' },
        { value: 20, dataPointText: '60' },
        { value: 44, dataPointText: '54' },
        { value: 65, dataPointText: '85' },
        { value: 86, dataPointText: '56' },
        { value: 38, dataPointText: '78' },
        { value: 44, dataPointText: '74' },
        { value: 18, dataPointText: '98' },
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

    const color1 = '#28328C'
    const color2 = '#3ABEF0'
    const color3 = '#FF9A6C'

    return (
        <View style={[styles.patientEnrollment, css.mt4]}>
            <View style={[css.card]}>
                <View style={[css.row, css.jcsb, css.aic]}>
                    <TitleTxt title="assignment" />
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
                    <LineChart
                        data={lineData}
                        data2={lineData2}
                        data3={lineData3}
                        height={250}
                        showHorizontalLines
                        spacing={screenWidth / 12.6}
                        initialSpacing={0}
                        color1={color1}
                        color2={color2}
                        color3={color3}
                        textColor1="transparent"
                        textColor2="transparent"
                        textColor3="transparent"
                        dataPointsHeight={6}
                        dataPointsWidth={6}
                        dataPointsColor1={color1}
                        dataPointsColor2={color2}
                        dataPointsColor3={color3}
                        textShiftY={-2}
                        textShiftX={-5}
                        textFontSize={13}
                        rulesType='solid'
                    />
                    <Divider />

                    <View style={[css.row, css.aic, css.asc, css.mt3]}>
                        <RenderTitles
                            title="Total Assignment"
                            backgroundColor="#28328C"
                        />
                        <RenderTitles
                            title="Pending Assignment"
                            backgroundColor="#3ABEF0"
                        />
                        <RenderTitles
                            title="Complete Assignment"
                            backgroundColor="#FF9A6C"
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AssignmentChart

const styles = StyleSheet.create({
    colorBox: {
        width: 19,
        height: 19,
        borderRadius: 3,
        marginRight: 8
    },
    graphStyle: {
        width: width,
        backgroundColor: 'red',
    }
})