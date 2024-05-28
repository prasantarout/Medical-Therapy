import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomDropdown from './CustomDropdown';
import {years} from '../../utils/dumpAPI';
import TitleTxt from './TitleTxt';
import css, {width} from '../../themes/space';
import useScreenDimension from '../../utils/useScreenDimension';
import Divider from '../micro/Divider';
import Txt from '../micro/Txt';
import {BarChart} from 'react-native-gifted-charts';
import useOrientation from '../../utils/useOrientation';
import moment from 'moment';

const PatientEnrolmentChart = ({dataItem}) => {
  const [barChartData, setBarChartData] = useState([]);
  const [selectedyear, setSelectedYear] = useState('');
  const {screenWidth, screenHeight} = useScreenDimension();
  useEffect(() => {
    setBarChartData(getFormattedData(dataItem));
  }, [dataItem, selectedyear]);

  let orientation = useOrientation();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 2; i--) {
      years.push(i);
    }
  }, []);

  const RenderTitles = ({title, backgroundColor}) => {
    return (
      <View style={[css.row, css.aic, css.mr2]}>
        <View style={[styles.colorBox, {backgroundColor: backgroundColor}]} />
        <Txt
          style={[
            css.textPrimary,
            css.medium,
            orientation == 'LANDSCAPE' ? css.fs20 : css.fs15,
            {marginTop: 4},
          ]}>
          {title}
        </Txt>
      </View>
    );
  };

  return (
    <View style={[styles.patientEnrollment, css.mt4]}>
      <View style={[css.card]}>
        <View style={[css.row, css.jcsb, css.aic]}>
          <TitleTxt title="patient enrolment" />
          <CustomDropdown
            data={years}
            labelField="label"
            valueField="value"
            placeholder={years[0].label}
            value={selectedyear}
            onChange={item => setSelectedYear(item?.value)}
          />
        </View>
        <View style={[styles.chartArea]}>
          <BarChart
            data={barChartData}
            barWidth={8}
            spacing={screenWidth / 17.4}
            xAxisThickness={1}
            yAxisThickness={0}
            yAxisTextStyle={[css.textPrimary]}
            // noOfSections={3}
            activeOpacity={0.8}
            maxValue={100}
            lineBehindBars={true}
            rulesType="solid"
          />
          <Divider />

          <View style={[css.row, css.aic, css.asc, css.mt3]}>
            <RenderTitles title="Active Patient" backgroundColor="#28328C" />
            <RenderTitles title="Inactive Patient" backgroundColor="#3ABEF0" />
          </View>
        </View>
      </View>
    </View>
  );
};
const getFormattedData = dataItem => {
  let newList = [];
  if (dataItem) {
    const totalMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    totalMonth.map((value, index) => {
      newList.push({
        value: dataItem?.active_enrollment[index][value],
        label: value,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: {color: 'gray'},
        frontColor: '#28328c',
      });
      newList.push({
        value: dataItem?.inactive_enrollment[index][value],
        frontColor: '#3abef0',
      });
    });
  }
  return newList;
};
export default PatientEnrolmentChart;

const styles = StyleSheet.create({
  colorBox: {
    width: 19,
    height: 19,
    borderRadius: 3,
    marginRight: 10,
  },
  graphStyle: {
    width: width,
    backgroundColor: 'red',
  },
});
