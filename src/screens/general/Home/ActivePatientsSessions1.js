/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SafeView from '../../../components/common/SafeView';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Txt from '../../../components/micro/Txt';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import {icons} from '../../../themes/icons';
import CustomTable from '../../../components/common/CustomTable';
import {fonts} from '../../../themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../utils/Loader';
import {getPatientReq} from '../../../redux/reducer/PatientReducer';

let patientStatus = '';

const headerDataArr = [
  {
    label: 'Session Date',
    enableSort: true,
    width: 4,
  },
  {
    label: 'Receipt Time',
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
    label: 'Duration',
    enableSort: true,
    width: 3,
    rowLeftIcon: icons.hourglass,
  },
];

// const bodyDataArr = [['Test Tester', '2', '3', '4', '5', '6']];

const ActivePatientsSessions1 = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const route = useRoute();
  const PatientReducer = useSelector(state => state?.PatientReducer);
  const [tableBodyDataArr, setTableBodyDataArr] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const tableFormatConvert = () => {
    let formattedData = [];
    PatientReducer?.getPatientResponse?.data?.data.map(
      (bodyDataRow, bodyDataIndex) => {
        let row = {};
        row[headerDataArr[0].label] = bodyDataRow?.session_date || 'N/A';
        row[headerDataArr[1].label] = bodyDataRow?.receipt_time || 'N/A';
        row[headerDataArr[2].label] = bodyDataRow?.device || 'N/A';
        row[headerDataArr[3].label] = bodyDataRow?.duration || 'N/A';

        formattedData.push(row);
      },
    );
    return formattedData;
  };

  console.log(PatientReducer?.getPatientResponse?.data.data, '>>>>patient');

  useEffect(() => {
    if (isFocused) {
      dispatch(getPatientReq({page_no: 0, ecn: route?.params?.ecn}));
    }
  }, [isFocused]);

  if (patientStatus === '' || PatientReducer.status !== patientStatus) {
    switch (PatientReducer.status) {
      case 'PATIENT/getPatientReq':
        patientStatus = PatientReducer.status;
        break;
      case 'PATIENT/getPatientSuccess':
        patientStatus = PatientReducer.status;
        setTableBodyDataArr([...tableBodyDataArr, ...tableFormatConvert()]);
        break;
      case 'PATIENT/getPatientFailure':
        patientStatus = PatientReducer.status;
        break;
    }
  }

  return (
    <SafeView sticky={[1]}>
      <Loader visible={PatientReducer.status === 'PATIENT/getPatientReq'} />
      <View style={styles.headerContainer}>
        <TitleTxt title={`Patient Sessions: ${route?.params?.full_name}`} />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Txt style={styles.btnTxt}>Back</Txt>
        </TouchableOpacity>
      </View>
      <View style={[css.f1, css.p4, css.pt0]}>
        <CustomTable
          tableHeaderDataArr={headerDataArr}
          tableBodyDataArr={tableBodyDataArr}
          actionButtonText={'View'}
          onPressActionButton={(value, index) => {
            navigation.navigate('ActivePatientSessionDetails');
          }}
          onBottomReach={() => {
            dispatch(
              getPatientReq({
                page_no: pageNo + 1,
                ecn: route?.params?.ecn,
              }),
            );
            setPageNo(pageNo + 1);
          }}
        />
      </View>
    </SafeView>
  );
};

export default ActivePatientsSessions1;

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
