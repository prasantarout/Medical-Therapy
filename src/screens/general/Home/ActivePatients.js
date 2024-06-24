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
import {icons} from '../../../themes/icons';
import CustomTable from '../../../components/common/CustomTable';
import {fonts} from '../../../themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {getActivePatientReq} from '../../../redux/reducer/DashboardReducer';
import Loader from '../../../utils/Loader';

let dashboardStatus = '';

const headerDataArr = [
  {
    label: 'Patient Name',
    enableSort: true,
    width: 4,
  },
  {
    label: 'Location',
    enableSort: true,
    width: 4,
  },
  {
    label: 'Setup Date',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.Calendar,
  },
  {
    label: 'Device',
    enableSort: true,
    width: 6,
    rowLeftIcon: icons.device,
  },
  {
    label: 'Total Usage',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.hourglass,
  },
];

// const bodyDataArr = [['Test Tester', '2', '3', '4', '5', '6']];

const ActivePatients = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const DashboardReducer = useSelector(state => state.DashboardReducer);
  const [tableBodyDataArr, setTableBodyDataArr] = useState([]);

  const tableFormatConvert = () => {
    let formattedData = [];
    DashboardReducer?.getActivePatientResponse?.data?.map(
      (bodyDataRow, bodyDataIndex) => {
        let row = {};
        row[headerDataArr[0].label] = bodyDataRow?.full_name || 'N/A';
        row[headerDataArr[1].label] = bodyDataRow?.location || 'N/A';
        row[headerDataArr[2].label] = bodyDataRow?.Setup_Date || 'N/A';
        row[headerDataArr[3].label] = bodyDataRow?.device || 'N/A';
        row[headerDataArr[4].label] = bodyDataRow?.total_usage || 'N/A';

        formattedData.push(row);
      },
    );
    return formattedData;
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getActivePatientReq());
    }
  }, [isFocused]);

  if (dashboardStatus === '' || DashboardReducer.status !== dashboardStatus) {
    switch (DashboardReducer.status) {
      case 'Dashboard/getActivePatientReq':
        dashboardStatus = DashboardReducer.status;
        break;
      case 'Dashboard/getActivePatientSuccess':
        dashboardStatus = DashboardReducer.status;
        setTableBodyDataArr(
          tableFormatConvert(DashboardReducer?.getActivePatientResponse?.data),
        );
        break;
      case 'Dashboard/getActivePatientFailure':
        dashboardStatus = DashboardReducer.status;
        break;
    }
  }

  return (
    <SafeView sticky={[1]}>
      <Loader visible={dashboardStatus === 'Dashboard/getActivePatientReq'} />
      <View style={styles.headerContainer}>
        <TitleTxt title="Active Patient" />
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
            navigation.navigate('ActivePatientsSession', {
              ecn: DashboardReducer?.getActivePatientResponse?.data[index]?.ecn,
              full_name:
                DashboardReducer?.getActivePatientResponse?.data[index]
                  ?.full_name,
            });
          }}
          tableHeaderDataArr={headerDataArr}
          // tableBodyDataArr={bodyDataArr}
          tableBodyDataArr={tableBodyDataArr}
        />
      </View>
    </SafeView>
  );
};

export default ActivePatients;

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
