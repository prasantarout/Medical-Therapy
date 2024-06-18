/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import {fonts} from '../../../themes/fonts';
import {icons} from '../../../themes/icons';
import Txt from '../../../components/micro/Txt';
import {colors} from '../../../themes/colors';
import SafeView from '../../../components/common/SafeView';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getPatientSessionReq} from '../../../redux/reducer/PatientReducer';
import connectionrequest from '../../../utils/NetInfo';
import CustomToast from '../../../utils/Toast';
import Loader from '../../../utils/Loader';
import CustomCalender from '../../../components/common/CustomCalender';
import CustomModal from '../../../components/common/CustomModal';
import normalize from '../../../utils/normalize';
import {getFormattedDate} from '../../../utils/DateConverter';
import {global} from '../../../utils/global';

const height = Dimensions.get('screen').height;

let calenderOptions = [
  'Last 7 days',
  'Last 15 days',
  'Last 30 days',
  'Last 45 days',
  'Last 90 days',
  'Custom Date',
];

let getPatientSessionStatus = '';

const PatientSession = props => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const PatientReducer = useSelector(state => state.PatientReducer);
  const [pageNo, setPageNo] = useState(1);
  const [sessionData, setSessionData] = useState([]);
  const [selectedCalenderOption, setSelectedCalenderOption] = useState(
    calenderOptions[0],
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectDateType = type => {
    setSelectedCalenderOption(type);
    switch (type) {
      case calenderOptions[0]:
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 7)));
        setEndDate(new Date());
        break;
      case calenderOptions[1]:
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 15)));
        setEndDate(new Date());
        break;
      case calenderOptions[2]:
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)));
        setEndDate(new Date());
        break;
      case calenderOptions[3]:
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 45)));
        setEndDate(new Date());
        break;
      case calenderOptions[4]:
        setStartDate(new Date(new Date().setDate(new Date().getDate() - 90)));
        setEndDate(new Date());
        break;
      case calenderOptions[5]:
        setStartDate('');
        setEndDate('');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isFocused && !global.patientSessionFocus) {
      selectDateType(calenderOptions[0]);
      setPageNo(1);
      fetchData(0);
    }
  }, [isFocused]);

  const fetchData = pageNumber => {
    connectionrequest()
      .then(res => {
        dispatch(
          getPatientSessionReq({
            start_date: getFormattedDate(startDate, 'YYYY-MM-DD'),
            end_date: getFormattedDate(endDate, 'YYYY-MM-DD'),
            page_no: pageNumber,
          }),
        );
      })
      .catch(err => {
        console.log(err, 'err');
        CustomToast('Please connect To Internet');
      });
  };

  const handleSelect = ecn => {
    const isSelected = selectedItems.includes(ecn);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(item => item !== ecn));
    } else {
      setSelectedItems([...selectedItems, ecn]);
    }
  };

  const renderAssignments = ({item, index}) => {
    return (
      <Pressable
        style={[
          css.card,
          css.mb3,
          {
            backgroundColor: selectedItems?.includes(item.ecn)
              ? 'rgba(0,0,0,0.1)'
              : '#fff',
          },
        ]}
        onLongPress={() => handleSelect(item?.ecn)}
        onPress={() =>
          selectedItems?.length > 0 ? handleSelect(item?.ecn) : null
        }>
        <View style={[css.row, css.jcsb, css.aic]}>
          <View style={[css.row, css.aic]}>
            {item?.profile_photo_url ? (
              <Image
                source={{uri: item?.profile_photo_url}}
                style={[styles.cardUserStyle]}
              />
            ) : (
              <Image source={icons.userBlue} style={[styles.cardUserStyle]} />
            )}
            <Txt style={[css.fs18]}>{item?.patient_name}</Txt>
          </View>
          <Image
            source={
              item?.status === 'Pending' ? icons.inProcess : icons.cardCompleted
            }
            style={[styles.cardRightIcon]}
          />
        </View>

        <View style={[css.row, css.aic, css.mt3]}>
          <IconTextBlock
            icon={icons.cardCalender}
            name="Setup Date"
            title={item?.setUpDate}
          />
          <IconTextBlock
            icon={icons.cardClock}
            name="Total Usage On Device"
            title={item?.total_hours_usages}
          />
          <IconTextBlock
            icon={icons.location2}
            cardIconStyle={{tintColor: colors.primary}}
            name="Location"
            title={item?.location}
          />
        </View>
        <View style={[css.row, css.aic, css.mt2]}>
          <IconTextBlock
            icon={icons.cardCalender}
            name="Session Date"
            title={item?.sessionDate}
          />
          <IconTextBlock
            icon={icons.cardClock}
            name="Session Time"
            title={item?.receiptTime}
          />
        </View>
        <View style={[css.mt2, css.row]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.viewButon, css.center]}
            onPress={() => {
              global.patientSessionFocus = true;
              props.navigation.navigate('PatientSessionDetails', {
                ecn: item?.ecn,
                date: item?.sessionDate,
              });
            }}>
            <Txt style={[styles.viewButonText]}>View</Txt>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  if (
    getPatientSessionStatus === '' ||
    PatientReducer.status !== getPatientSessionStatus
  ) {
    switch (PatientReducer.status) {
      case 'PATIENT/getPatientSessionReq':
        getPatientSessionStatus = PatientReducer.status;
        break;
      case 'PATIENT/getPatientSessionSuccess':
        getPatientSessionStatus = PatientReducer.status;
        if (pageNo === 1) {
          setSessionData(PatientReducer?.getPatientSessionResponse?.data);
        } else {
          setSessionData([
            ...sessionData,
            ...PatientReducer?.getPatientSessionResponse?.data,
          ]);
        }
        break;
      case 'PATIENT/getPatientSessionFailure':
        getPatientSessionStatus = PatientReducer.status;
        break;
    }
  }

  return (
    <>
      <SafeView {...props}>
        <View style={[css.px4, css.f1]}>
          <Loader
            visible={PatientReducer?.status === 'PATIENT/getPatientSessionReq'}
          />
          <TitleTxt style={[css.mt4]} title="Patient Session" />
          <View style={[styles.assignmentList, css.f1]}>
            <View style={[styles.calenderArea, css.row, css.aic]}>
              <TouchableOpacity
                onPress={() => {
                  global.patientSessionFocus = false;
                  setDatePickerVisibility(true);
                }}
                activeOpacity={0.7}
                style={[css.row, css.aic]}>
                <Image
                  source={icons.calender}
                  style={[styles.calendarIconStyle]}
                />
                <Txt style={[css.fs17, css.semiBold]}>
                  {`${
                    getFormattedDate(startDate, 'Do-MMMM') || 'Start Date'
                  } - ${getFormattedDate(endDate, 'Do-MMMM') || 'End Date'}`}
                </Txt>
              </TouchableOpacity>
            </View>

            {sessionData?.length > 0 ? (
              <View
                style={[
                  css.jcc,
                  css.aifs,
                  css.w100,
                  {height: height - normalize(130)},
                ]}>
                <FlatList
                  data={sessionData}
                  renderItem={renderAssignments}
                  showsVerticalScrollIndicator={false}
                  onEndReached={() => {
                    fetchData(pageNo);
                    setPageNo(pageNo + 1);
                  }}
                />
              </View>
            ) : (
              <View
                style={[
                  css.jcc,
                  css.aic,
                  css.w100,
                  {height: height - normalize(130)},
                ]}>
                <Txt style={css.fs23}>No Assignments Found </Txt>
              </View>
            )}
          </View>
        </View>
      </SafeView>
      <CustomModal
        isVisible={isDatePickerVisible}
        onCloseRequest={() => {
          setDatePickerVisibility(false);
        }}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalLeftContainer}>
            <View>
              <CalenderOptions
                selectedOption={selectedCalenderOption}
                setSelectedOption={selectDateType}
              />
            </View>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => {
                setPageNo(1);
                fetchData(0);
                setDatePickerVisibility(false);
              }}>
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalRightContainer}>
            <CustomCalender
              type={selectedCalenderOption}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

const IconTextBlock = ({icon, title, textStyle, name, cardIconStyle}) => {
  return (
    <View style={[styles.iconTextContainer]}>
      <View style={[css.row, css.aic]}>
        {icon ? (
          <Image source={icon} style={[styles.cardIconStyle, cardIconStyle]} />
        ) : null}
        <Txt style={[css.fs17, css.ml1, textStyle]}>{name}</Txt>
      </View>
      <View style={[css.row, css.aic]}>
        <View style={[styles.cardIconStyle]} />
        <Txt style={[css.fs15, css.ml1, css.textLighte]}>{title}</Txt>
      </View>
    </View>
  );
};

const CalenderOptions = ({selectedOption, setSelectedOption, onPress}) => {
  return calenderOptions.map((value, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedOption(value);
        }}
        style={
          value === selectedOption
            ? styles.activeSelectedOption
            : styles.inactiveSelectedOption
        }>
        <Text
          style={
            value === selectedOption
              ? styles.activeOptionText
              : styles.inactiveOptionText
          }>
          {value}
        </Text>
      </TouchableOpacity>
    );
  });
};

export default PatientSession;

const styles = StyleSheet.create({
  modalMainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalLeftContainer: {
    marginRight: normalize(10),
    width: normalize(50),
    justifyContent: 'space-between',
    height: normalize(150),
  },
  modalRightContainer: {
    height: normalize(150),
    width: normalize(150),
  },
  activeSelectedOption: {
    padding: normalize(2),
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  inactiveSelectedOption: {
    padding: normalize(2),
  },
  inactiveOptionText: {
    fontFamily: fonts.Bold,
    color: colors.primary,
  },
  activeOptionText: {
    fontFamily: fonts.Bold,
    color: colors.white,
  },
  doneBtn: {
    padding: normalize(2),
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  doneBtnText: {
    fontFamily: fonts.Bold,
    color: colors.white,
    textAlign: 'center',
  },
  calenderArea: {
    marginBottom: 20,
    marginTop: 16,
  },
  calendarHeaderStyle: {
    position: 'absolute',
    top: 38,
    left: 40,
    zIndex: 99,
  },
  dayContainerStyle: {
    backgroundColor: 'transparent',
    width: 100,
    zIndex: -1,
    opacity: 0,
  },
  dateStyle: {
    fontFamily: fonts.Regular,
    fontSize: 20,
    color: '#444444',
  },
  iconLeftStyle: {
    transform: [{rotate: '180deg'}],
  },
  iconStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  cardRightIcon: {
    resizeMode: 'contain',
    height: 25,
    width: 100,
  },
  cardIconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
    borderRadius: 10,
  },
  viewButonText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
    fontSize: 18,
  },
  calendarIconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: colors.primary,
    marginRight: 20,
  },
  cardUserStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 100,
  },
});
