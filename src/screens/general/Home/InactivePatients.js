/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SafeView from '../../../components/common/SafeView';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import {useNavigation} from '@react-navigation/native';
import Txt from '../../../components/micro/Txt';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import {icons} from '../../../themes/icons';
import CustomTable from '../../../components/common/CustomTable';
import {fonts} from '../../../themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getInactivePatientReq} from '../../../redux/reducer/DashboardReducer';
import Loader from '../../../utils/Loader';
import {getFormattedDate} from '../../../utils/DateConverter';

let dashboardStatus = '';

const headerDataArr = [
  {
    label: 'Patient Name',
    width: 4,
  },
  {
    label: 'Setup Date',
    width: 3,
    rowLeftIcon: icons.Calendar,
  },
  {
    label: 'Device',
    width: 3,
    rowLeftIcon: icons.device,
  },
  {
    label: 'Total Usage',
    width: 3,
    rowLeftIcon: icons.hourglass,
  },
  {
    label: 'Session Date',
    width: 3,
    rowLeftIcon: icons.Calendar,
  },
  {
    label: 'Session Time',
    width: 3,
    rowLeftIcon: icons.Clock,
  },
];

// const bodyDataArr = [['Test Tester', '2', '3', '4', '5', '6']];

const InactivePatients = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const [tableBodyDataArr, setTableBodyDataArr] = useState([]);

  const tableFormatConvert = () => {
    let formattedData = [];
    DashboardReducer?.getInactivePatientResponse?.data?.map(
      (bodyDataRow, bodyDataIndex) => {
        let row = {};
        row[headerDataArr[0].label] = bodyDataRow?.patient?.full_name || 'N/A';
        row[headerDataArr[1].label] = bodyDataRow?.patient?.setupDate || 'N/A';
        row[headerDataArr[2].label] = bodyDataRow.device_serial_no || 'N/A';
        row[headerDataArr[3].label] =
          bodyDataRow.total_usage_hours_on_device || 'N/A';
        row[headerDataArr[4].label] =
          getFormattedDate(bodyDataRow.session_date, 'Do-MMM') || 'N/A';
        row[headerDataArr[5].label] = bodyDataRow.session_time || 'N/A';

        formattedData.push(row);
      },
    );
    return formattedData;
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getInactivePatientReq());
    }
  }, [isFocused]);

  if (dashboardStatus === '' || DashboardReducer.status !== dashboardStatus) {
    switch (DashboardReducer.status) {
      case 'Dashboard/getInactivePatientReq':
        dashboardStatus = DashboardReducer.status;
        break;
      case 'Dashboard/getInactivePatientSuccess':
        dashboardStatus = DashboardReducer.status;
        setTableBodyDataArr(
          tableFormatConvert(DashboardReducer?.getInactivePatientResponse),
        );
        break;
      case 'Dashboard/getInactivePatientFailure':
        dashboardStatus = DashboardReducer.status;
        break;
    }
  }

  return (
    <SafeView sticky={[1]}>
      <Loader visible={dashboardStatus === 'Dashboard/getInactivePatientReq'} />
      <View style={styles.headerContainer}>
        <TitleTxt title="Inactive Patients" />
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

export default InactivePatients;

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
