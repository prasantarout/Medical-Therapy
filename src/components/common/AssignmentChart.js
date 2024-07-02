import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomDropdown from './CustomDropdown';
import {years} from '../../utils/dumpAPI';
import TitleTxt from './TitleTxt';
import css, {width} from '../../themes/space';
import useScreenDimension from '../../utils/useScreenDimension';
import Divider from '../micro/Divider';
import Txt from '../micro/Txt';
import {LineChart} from 'react-native-gifted-charts';
import useOrientation from '../../utils/useOrientation';
import {Text} from 'react-native-svg';

const AssignmentChart = ({dataItem}) => {
  const [lineChartData, setLineChartData] = useState([]);
  useEffect(() => {
    setLineChartData(dataItem);
  }, [dataItem]);
  const [selectedyear, setSelectedYear] = useState('');
  const {screenWidth, screenHeight} = useScreenDimension();
  let orientation = useOrientation();

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

  const color1 = '#28328C';
  const color2 = '#3ABEF0';
  const color3 = '#FF9A6C';

  return (
    <View style={[styles.patientEnrollment, css.mt4]}>
      <View style={[css.card]}>
        <View style={[css.row, css.jcsb, css.aic]}>
          <TitleTxt title="Evaluation" />
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
          <LineChart
            data={lineChartData?.completed}
            data2={lineChartData?.pending}
            data3={lineChartData?.total}
            height={250}
            showHorizontalLines
            spacing={screenWidth / 15}
            initialSpacing={20}
            color1={color1}
            color2={color2}
            color3={color3}
            textColor1="black"
            textColor2="black"
            textColor3="black"
            dataPointsHeight={6}
            dataPointsWidth={6}
            dataPointsColor1={color1}
            dataPointsColor2={color2}
            dataPointsColor3={color3}
            textShiftY={-2}
            textShiftX={-5}
            textFontSize={13}
            rulesType="solid"
            maxValue={100}
          />
          <Divider />
          <View style={[css.row, css.aic, css.asc, css.mt3]}>
            <RenderTitles title="Total Evaluation" backgroundColor="#28328C" />

            <RenderTitles
              title="Complete Evaluation"
              backgroundColor="#3ABEF0"
            />
            <RenderTitles
              title="Pending Evaluation"
              backgroundColor="#FF9A6C"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssignmentChart;

const styles = StyleSheet.create({
  colorBox: {
    width: 19,
    height: 19,
    borderRadius: 3,
    marginRight: 8,
  },
  graphStyle: {
    width: width,
    backgroundColor: 'red',
  },
});
