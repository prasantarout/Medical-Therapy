import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CustomDropdown from './CustomDropdown'
import { years } from '../../utils/dumpAPI'
import TitleTxt from './TitleTxt'
import css, { width } from '../../themes/space'
import { BarChart, LineChart } from "react-native-chart-kit";
import normalize from '../../utils/normalize'
import useScreenWidth from '../../utils/useScreenWidth'
import Divider from '../micro/Divider'
import Txt from '../micro/Txt'
import PureChart from 'react-native-pure-chart';

const PatientEnrolmentChart = () => {

    const [selectedyear, setSelectedYear] = useState("");

    const screenWidth = useScreenWidth()

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            },
            {
                data: [50, 70, 30, 10, 80, 20, 30, 70, 40, 50, 40, 20],
                // color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                strokeWidth: 2
            },
        ]
    };

    var data = [
        {
            seriesName: 'series1',
            data: [
              {x: '2018-02-01', y: 30},
              {x: '2018-02-02', y: 200},
              {x: '2018-02-03', y: 170},
              {x: '2018-02-04', y: 250},
              {x: '2018-02-05', y: 10},
              {x: '2018-02-06', y: 20},
              {x: '2018-02-07', y: 100},
              {x: '2018-02-08', y: 140},
              {x: '2018-02-09', y: 550},
              {x: '2018-02-10', y: 40},
            ],
            color: '#297AB1'
          },
          {
            seriesName: 'series2',
            data: [
              {x: '2018-02-01', y: 20},
              {x: '2018-02-02', y: 100},
              {x: '2018-02-03', y: 140},
              {x: '2018-02-04', y: 550},
              {x: '2018-02-05', y: 40},
              {x: '2018-02-06', y: 20},
              {x: '2018-02-07', y: 100},
              {x: '2018-02-08', y: 140},
              {x: '2018-02-09', y: 550},
              {x: '2018-02-10', y: 40},
            ],
            color: 'yellow'
          }
    ]
      
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForBackgroundLines:{
            strokeDasharray: "" 
        },
        // useShadowColorFromDataset: true 
      };

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
                    {/* <BarChart
                        style={styles.graphStyle}
                        data={chartData}
                        
                        width={screenWidth - normalize(30)}
                        height={300}
                        chartConfig={chartConfig}
                        verticalLabelRotation={0}
                        fromZero
                        stacked={true}
                    /> */}
                    <PureChart data={data} type='bar' style={[css.w100]} />
                    <Divider/>
                    <View style={[css.row]}>
                        <View style={[css.row, css.aic]}>
                            <View style={[styles.colorBox]} />
                            <Txt></Txt>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PatientEnrolmentChart

const styles = StyleSheet.create({
    colorBox:{
        width: 25,
        height: 25,
        borderRadius: 3,
        backgroundColor: '#343286'
    }
})