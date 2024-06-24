/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SafeView from '../../../components/common/SafeView';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Txt from '../../../components/micro/Txt';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import CustomTable from '../../../components/common/CustomTable';
import {fonts} from '../../../themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {getCompletedEvaulationReq} from '../../../redux/reducer/DashboardReducer';
import {getFormattedDate} from '../../../utils/DateConverter';
import Loader from '../../../utils/Loader';

let dashboardStatus = '';

const headerDataArr = [
  {
    label: 'Submitted Date',
    width: 3,
  },
  {
    label: 'Patient Name',
    width: 4,
  },
  {
    label: 'Evaluation Form Type',
    width: 4.5,
  },
  {
    label: 'Evaluation Status',
    width: 4,
  },
];

// const bodyDataArr = [['Test Tester', '2', '3', '4']];

const CompletedEvaulation = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const [tableBodyDataArr, setTableBodyDataArr] = useState([]);

  const tableFormatConvert = () => {
    let formattedData = [];
    DashboardReducer?.getCompletedEvaulationResponse?.data?.map(
      (bodyDataRow, bodyDataIndex) => {
        let row = {};
        row[headerDataArr[0].label] =
          getFormattedDate(bodyDataRow.created_at, 'Do-MMM-YYYY') || 'N/A';
        row[headerDataArr[1].label] = bodyDataRow?.patient_name || 'N/A';
        row[headerDataArr[2].label] = bodyDataRow.question_type || 'N/A';
        row[headerDataArr[3].label] = bodyDataRow.status || 'N/A';

        formattedData.push(row);
      },
    );
    return formattedData;
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getCompletedEvaulationReq());
    }
  }, [isFocused]);

  if (dashboardStatus === '' || DashboardReducer.status !== dashboardStatus) {
    switch (DashboardReducer.status) {
      case 'Dashboard/getCompletedEvaulationReq':
        dashboardStatus = DashboardReducer.status;
        break;
      case 'Dashboard/getCompletedEvaulationSuccess':
        dashboardStatus = DashboardReducer.status;
        setTableBodyDataArr(
          tableFormatConvert(
            DashboardReducer?.getCompletedEvaulationResponse?.data,
          ),
        );
        break;
      case 'Dashboard/getCompletedEvaulationFailure':
        dashboardStatus = DashboardReducer.status;
        break;
    }
  }

  return (
    <SafeView sticky={[1]}>
      <Loader
        visible={dashboardStatus === 'Dashboard/getCompletedEvaulationReq'}
      />
      <View style={styles.headerContainer}>
        <TitleTxt title="Completed Evaluations" />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Txt style={styles.btnTxt}>Back</Txt>
        </TouchableOpacity>
      </View>
      <View style={[css.f1, css.p4, css.pt0]}>
        <CustomTable
          actionButtonText={'View'}
          onPressActionButton={(value, index) => {
            console.log(value, index);
          }}
          tableHeaderDataArr={headerDataArr}
          // tableBodyDataArr={bodyDataArr}
          tableBodyDataArr={tableBodyDataArr}
          paddingBottom={100}
        />
      </View>
    </SafeView>
  );
};

export default CompletedEvaulation;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(8),
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(16),
    paddingHorizontal: normalize(10),
  },
  btnTxt: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  calenderContainer: {
    flexDirection: 'row',
  },
  calenderTextContainer: {
    flexDirection: 'row',
    width: normalize(75),
    height: normalize(20),
    alignItems: 'center',
  },
  calenderText: {
    marginLeft: 10,
    color: colors.primaryTextColor,
    fontSize: 22,
    fontFamily: fonts.Medium,
  },
  calenderIcon: {
    height: normalize(8),
    width: normalize(8),
    resizeMode: 'contain',
    tintColor: colors.primaryTextColor,
  },
});
