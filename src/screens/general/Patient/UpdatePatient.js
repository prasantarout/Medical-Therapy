/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import TitleTxt from '../../../components/common/TitleTxt';
import css from '../../../themes/space';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import Txt from '../../../components/micro/Txt';
import moment from 'moment';
import {fonts} from '../../../themes/fonts';
import {icons} from '../../../themes/icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SimpleInput from '../../../components/inputs/SimpleInput';
import connectionrequest from '../../../utils/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListOfSatisfactionReq,
  getListOfTherapiesReq,
  satisfactionQuestionListReq,
  storeServiceEnrolmentReq,
  submitEvaluationReq,
  updatePatientReq,
} from '../../../redux/reducer/PatientReducer';
import CustomToast from '../../../utils/Toast';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import Loader from '../../../utils/Loader';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import QuestionComponent from '../../../components/common/QuestionComponent';
import RadioQuestionComponent from '../../../components/common/RadioQuestionComponent';
import TextInputComponent from '../../../components/common/TextInputComponent';
import TextInputWrapper from '../../../components/common/TextInputWrapper';

const UpdatePatient = props => {
  let patientData = props?.route?.params?.patient
    ? props?.route?.params?.patient
    : '';
    let getPatientStatus = '';
  let status = '';
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:30 am');
  const [remark, setRemark] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [categoryItem, setCategoryItem] = useState([]);
  const [sortedQuestions, setSortedQuestions] = useState([]);

  const [doctorName, setDoctorName] = useState(patientData?.doctor || '');
  const [nextVisitDate, setNextVisitDate] = useState(
    patientData?.next_visit_date || '',
  );
  const [pmDueDate, setPmDueDate] = useState(patientData?.pm_due_date || '');
  const [dateOfDeath, setDateOfDeath] = useState(patientData?.death_date || '');
  const [dischargeDate, setDischargeDate] = useState(
    patientData?.discharge_date || '',
  );
  const [currentPicker, setCurrentPicker] = useState('');
  const [errors, setErrors] = useState({});
  const PatientReducer = useSelector(state => state.PatientReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const tags = ['Satisfied', 'Need Improvement', 'Not Satisfied', 'Great'];
  const navigation = useNavigation();

  const showDatePicker = pickerType => {
    setCurrentPicker(pickerType);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = selectedDate => {
    const formattedDate = moment(selectedDate).format('L');
    switch (currentPicker) {
      case 'last_visit':
        setDate(formattedDate);
        break;
      case 'next_visit':
        setNextVisitDate(formattedDate);
        break;
      case 'pm_due':
        setPmDueDate(formattedDate);
        break;
      case 'death_date':
        setDateOfDeath(formattedDate);
        break;
      case 'discharge_date':
        setDischargeDate(formattedDate);
        break;
    }
    hideDatePicker();
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleTimeConfirm = time => {
    setTime(moment(time).format('LT'));
    hideTimePicker();
  };

  const handleUpdatePatient = () => {
    const updatedData = {
      patientId: patientData?.id,
      last_date: date
        ? date
        : patientData?.last_visit_date
        ? patientData?.last_visit_date
        : '',
      next_date: nextVisitDate
        ? nextVisitDate
        : patientData?.next_visit_date
        ? patientData?.next_visit_date
        : '',
      patient_ecn: patientData?.ecn || '',
      patient_doctor: doctorName
        ? doctorName
        : patientData?.doctor
        ? patientData?.doctor
        : '',
      pm_due_date: pmDueDate
        ? pmDueDate
        : patientData?.pm_due_date
        ? patientData?.pm_due_date
        : '',
      death_date: dateOfDeath
        ? dateOfDeath
        : patientData?.death_date
        ? patientData?.death_date
        : '',
      discharge_date: dischargeDate
        ? dischargeDate
        : patientData?.discharge_date
        ? patientData?.discharge_date
        : '',
    };
    connectionrequest()
      .then(res => {
        dispatch(updatePatientReq(updatedData));
      })
      .catch(err => {
        CustomToast('Please connect To Internet');
      });
  };

  const hasNumberRatingQuestions =
    sortedQuestions?.length > 0 &&
    sortedQuestions.some(question => question.type === 'number_rating');

  const ValueField = props => {
    const isDateField = [
      'Doctor',
      'Last visit date',
      'Next visit date',
      'PM Due Date',
      'Date Of Death',
      'Discharge Date',
    ].includes(props.title);

    // useFocusEffect(
    //   React.useCallback(() => {
    //     if (
    //       getPatientStatus === '' ||
    //       PatientReducer.status !== getPatientStatus
    //     ) {
    //       switch (PatientReducer.status) {
    //         case 'PATIENT/updatePatientReq':
    //           getPatientStatus = PatientReducer.status;
    //           setIsLoading(true);
    //           break;
    //         case 'PATIENT/updatePatientSuccess':
    //           getPatientStatus = PatientReducer.status;
    //            navigation.navigate('')
    //           break;
    //         case 'PATIENT/updatePatientFailure':
    //           getPatientStatus = PatientReducer.status;
    //           setIsLoading(false);
    //           break;
    //       }
    //     }
    //   }, [PatientReducer.status, isFocused]),
    // );



    return (
      <View style={styles.ValueField}>
        <Txt style={[styles.fieldTitle, css.fs20]}>{props.title}</Txt>
        {isDateField ? (
          <TextInputWrapper
            title={props?.title}
            value={props?.value}
            onChangeText={props?.onChangeText}
            editable={props?.editable}
            isDateInput={props?.isDate}
            isDisable={props?.disabled}
            dateIcon={props?.isDate ? icons.Calendar : null}
            dateIconPress={props?.isDate ? props?.onDateIconPress : null}
          />
        ) : (
          <TouchableOpacity
            onPress={props.onPress}
            style={styles.buttonCtnr}
            activeOpacity={0.7}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                //   justifyContent:'center'
              }}>
              <Text style={styles.subtxt} numberOfLines={1}>
                {props.value}
              </Text>
              {/* <Image source={props.icon} style={[styles.icon, props.style]} /> */}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={{flex: 1}}>
      <SafeView {...props}>
        <View style={[css.px5, css.f1, css.py4]}>
          <Loader
            visible={
              PatientReducer?.status == 'PATIENT/storeServiceEnrolmentReq' ||
              PatientReducer?.status == 'PATIENT/submitEvaluationReq' ||
              PatientReducer?.status == 'PATIENT/updatePatientReq'
            }
          />
          <View style={styles.headerContainer}>
            <TitleTxt title={'Update Patient Data'} />
            <TouchableOpacity
              style={styles.btns}
              onPress={() => navigation.goBack()}>
              <Txt style={styles.btnTxt}>Back</Txt>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'First Name'}
                value={patientData?.full_name ? patientData?.full_name : 'N/A'}
                editable={false}
              />
              <ValueField
                title={'Phone No'}
                editable={false}
                value={
                  patientData?.phone_number ? patientData?.phone_number : 'N/A'
                }
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Email Address'}
                value={
                  patientData?.email_address
                    ? patientData?.email_address
                    : 'N/A'
                }
              />
              <ValueField
                title={'Location'}
                value={
                  patientData?.location ? patientData?.location : 'N/A'
                }
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Device'}
                value={
                  patientData?.resmeduser?.device_serial_no
                    ? patientData?.resmeduser?.device_serial_no +
                      '-' +
                      patientData?.resmeduser?.device_type_desc
                    : 'N/A'
                }
              />
              <ValueField
                title={'Mask'}
                value={patientData?.mask_type ? patientData?.mask_type : 'N/A'}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Compliance'}
                value={
                  patientData?.compliance_percentage
                    ? patientData?.compliance_percentage +  '%'
                    : 'N/A'
                }
              />
              <ValueField
                title={'Doctor'}
                value={doctorName}
                editable={true}
                onChangeText={text => setDoctorName(text)}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Last visit date'}
                value={date || patientData?.last_visit_date}
                editable={true}
                isDate={true}
                onDateIconPress={() => showDatePicker('last_visit')}
              />
              <ValueField
                title={'Next visit date'}
                // value={
                //   patientData?.next_visit_date
                //     ? patientData?.next_visit_date
                //     : 'N/A'
                // }
                value={nextVisitDate || patientData?.next_visit_date}
                editable={true}
                isDate={true}
                onDateIconPress={() => showDatePicker('next_visit')}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Last Admission Date'}
                value={
                  patientData?.last_admission_date
                    ? patientData?.last_admission_date
                    : 'N/A'
                }
              />
              <ValueField
                title={'Last MD Visit'}
                value={
                  patientData?.last_md_visit
                    ? patientData?.last_md_visit
                    : 'N/A'
                }
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'PM Due Date'}
                // value={
                //   patientData?.pm_due_date ? patientData?.pm_due_date : 'N/A'
                // }
                value={pmDueDate || patientData?.pm_due_date}
                editable={true}
                isDate={true}
                onDateIconPress={() => showDatePicker('pm_due')}
              />
              <ValueField
                title={'PM Due Date Countdown'}
                value={
                  patientData?.pm_countdown ? patientData?.pm_countdown : 'N/A'
                }
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Date Of Death'}
                // value={
                //   patientData?.pm_due_date ? patientData?.pm_due_date : 'N/A'
                // }
                value={dateOfDeath || patientData?.death_date}
                editable={patientData?.status !== 0 ? true : false}
                isDate={true}
                disabled={patientData?.status === 0 ? true : false}
                onDateIconPress={() => showDatePicker('death_date')}
              />
              <ValueField
                title="Discharge Date"
                disabled={patientData?.status === 0 ? true : false}
                value={dischargeDate || patientData?.discharge_date}
                editable={patientData?.status !== 0 ? true : false}
                isDate={true}
                onDateIconPress={() => showDatePicker('discharge_date')}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Last MD Visit With Whom'}
                value={
                  patientData?.last_md_visit_with_whom
                    ? patientData?.last_md_visit_with_whom
                    : 'N/A'
                }
              />
              <ValueField
                title={'Plan Of Care'}
                value={
                  patientData?.plan_of_care ? patientData?.plan_of_care : 'N/A'
                }
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Plan Of Goals'}
                value={
                  patientData?.plan_of_goals
                    ? patientData?.plan_of_goals
                    : 'N/A'
                }
              />
              <ValueField
                title={'Plan Of Obstacles'}
                value={
                  patientData?.plan_of_obstacles
                    ? patientData?.plan_of_obstacles
                    : 'N/A'
                }
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Plan Of Meet Goals'}
                value={
                  patientData?.plan_of_meet_goals
                    ? patientData?.plan_of_meet_goals
                    : 'N/A'
                }
              />
              {/* <ValueField title={'Plan Of Obstacles'} value={data?.last_name} /> */}
            </View>
            {patientData?.status !== 0 && (
              <TouchableOpacity
                style={styles.btn}
                onPress={handleUpdatePatient}>
                <Txt style={styles.btnTxt}>Submit</Txt>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </SafeView>
    </KeyboardAvoidingView>
  );
};

export default UpdatePatient;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    backgroundColor: colors.white,
    marginTop: normalize(12),
    borderRadius: normalize(5),
  },
  ValueField: {padding: normalize(10), width: '50%'},
  fieldTitle: {
    fontFamily: fonts.Regular,
    color: colors.primary,
    paddingBottom: normalize(4),
  },
  buttonCtnr: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: normalize(7.5),
    // paddingBottom: normalize(15),
  },
  icon: {
    height: normalize(8),
    width: normalize(8),
    resizeMode: 'contain',
    marginRight: normalize(5),
    tintColor: '#B3B3B3',
  },
  subtxt: {
    fontFamily: fonts.Regular,
    color: colors.secondaryTextColor,
    fontSize: 18,
    fontWeight: '500',
    // textAlign: 'center',
  },
  btns: {
    width: '24%',
    marginLeft: normalize(9),
    height: normalize(23),
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '24%',
    marginLeft: normalize(9),
    height: normalize(23),
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    marginTop: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors?.placeholder,
    marginTop: 8,
    marginRight: 12,
    color: '#808080',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    color: 'black',
  },
  dropdown: {
    borderColor: colors?.lightGrey,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.borderColor,
    paddingHorizontal: 8,
    height: normalize(16),
  },
  placeholderStyle: {
    fontSize: normalize(6),
    color: colors?.searchPlaceholder,
  },
  selectedTextStyle: {
    fontSize: normalize(7),
    color: '#808080',
  },
  iconStyle: {
    width: normalize(20),
    height: normalize(20),
  },
  inputSearchStyle: {
    height: normalize(40),
    fontSize: normalize(14),
    color: 'red',
  },
  itemTextStyle: {
    color: colors.ternaryTextColor,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: normalize(5),
    justifyContent: 'flex-end',
    // gap:normalize(28)
  },
  tag: {
    fontSize: normalize(5),
    fontFamily: fonts.Regular,
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: normalize(6),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
