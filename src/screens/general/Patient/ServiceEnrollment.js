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
} from '../../../redux/reducer/PatientReducer';
import CustomToast from '../../../utils/Toast';
import {useIsFocused} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import Loader from '../../../utils/Loader';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import QuestionComponent from '../../../components/common/QuestionComponent';
import RadioQuestionComponent from '../../../components/common/RadioQuestionComponent';
import TextInputComponent from '../../../components/common/TextInputComponent';
const ServiceEnrollment = props => {
  let status = '';
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:30 am');
  const [remark, setRemark] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isFocus, setIsFocus] = useState(false);
  const [categoryItem, setCategoryItem] = useState([]);
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [numberRatingValues, setNumberRatingValues] = useState({});
  const [radioRatingValues, setRadioRatingValues] = useState({});
  const [radioRatingValues1, setRadioRatingValues1] = useState({});
  const [textInputValues, setTextInputValues] = useState({});

  const [errors, setErrors] = useState({});
  const PatientReducer = useSelector(state => state.PatientReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const data =
    props?.route?.params?.isPatient !== false
      ? props?.route?.params?.data
      : props?.route?.params?.data.data;
  // console.log(data, 'dataServiceEnrollment');
  const tags = ['Satisfied', 'Need Improvement', 'Not Satisfied', 'Great'];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    setDate(moment(time).format('L'));
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

  const handleEnroll = () => {
    const requiredFields = sortedQuestions.filter(
      question =>
        question.type === 'number_rating' ||
        question.type === 'radio_rating' ||
        question.type === 'input_text',
    );
    let valid = true;
    let newErrors = {};

    requiredFields.forEach(question => {
      const value =
        question.type === 'number_rating'
          ? numberRatingValues[question.id]
          : question.type === 'radio_rating'
          ? radioRatingValues1[question.id]
          : textInputValues[question.id];
      if (!value) {
        newErrors[question.id] = `${question.title} is required`;
        valid = false;
      }
    });
    setErrors(newErrors);
    if (!valid) {
      setErrors(newErrors);
      CustomToast('Please fill all required fields');
      return;
    }
    const formattedAnswers = {
      ...numberRatingValues,
      ...radioRatingValues1,
      ...textInputValues,
    };
    const obj = {
      parent_question_id: sortedQuestions[0]?.parent_id,
      patient_id: data?.id,
      answers: Object?.entries(formattedAnswers)?.map(([key, value]) => ({
        [key]: value,
      })),
    };
    connectionrequest()
      .then(res => {
        dispatch(submitEvaluationReq(obj));
      })
      .catch(err => {
        // console.log(err, 'err');
        CustomToast('Please connect To Internet');
      });
  };

  useEffect(() => {
    connectionrequest()
      .then(res => {
        dispatch(getListOfTherapiesReq());
        dispatch(getListOfSatisfactionReq());
      })
      .catch(err => {
        CustomToast('Please connect To Internet');
      });
  }, [isFocused]);

  const handleSelect = (questionId, value) => {
    setNumberRatingValues(prevValues => ({
      ...prevValues,
      [questionId]: value,
    }));
  };

  const handleRadioSelect = (questionId, value) => {
    setRadioRatingValues(prevState => ({
      ...prevState,
      [questionId]: value,
    }));

    setRadioRatingValues1(prevState => ({
      ...prevState,
      [questionId]: Math.max(...value),
    }));
  };

  const handleTextChange = (questionId, text) => {
    setTextInputValues(prevState => ({
      ...prevState,
      [questionId]: text,
    }));
  };

  useEffect(() => {
    if (status == '' || PatientReducer.status != status) {
      switch (PatientReducer.status) {
        case 'PATIENT/storeServiceEnrolmentReq':
          status = PatientReducer.status;
          break;
        case 'PATIENT/storeServiceEnrolmentSuccess':
          status = PatientReducer.status;
          props?.navigation?.navigate('MyPatient');
          break;
        case 'PATIENT/storeServiceEnrolmentFailure':
          status = PatientReducer.status;
          break;

        case 'PATIENT/satisfactionQuestionListReq':
          status = PatientReducer.status;
          break;
        case 'PATIENT/satisfactionQuestionListSuccess':
          status = PatientReducer.status;
          const questionListData = PatientReducer?.questionListRes?.data || [];
          setSortedQuestions(
            questionListData
              ? questionListData
                  .filter(q => q?.type === 'number_rating')
                  .concat(
                    questionListData.filter(q => q?.type !== 'number_rating'),
                  )
              : [],
          );
          break;
        case 'PATIENT/satisfactionQuestionListFailure':
          status = PatientReducer.status;
          break;

        case 'PATIENT/submitEvaluationReq':
          status = PatientReducer.status;
          break;
        case 'PATIENT/submitEvaluationSuccess':
          status = PatientReducer.status;
          props?.navigation?.goBack('');
          break;
        case 'PATIENT/submitEvaluationFailure':
          status = PatientReducer.status;
          break;
      }
    }
  }, [PatientReducer?.status]);


  // console.log(sortedQuestions, 'sortedQuestions');

  const hasNumberRatingQuestions =
    sortedQuestions?.length > 0 &&
    sortedQuestions.some(question => question.type === 'number_rating');
  const ValueField = props => {
    return (
      <View style={styles.ValueField}>
        <Txt style={[styles.fieldTitle, css.fs20]}>{props.title}</Txt>
        <TouchableOpacity
          onPress={props.onPress}
          style={styles.buttonCtnr}
          activeOpacity={0.7}>
          <View style={[css.row, css.jcsb, css.aic]}>
            <Txt style={styles.subtxt}>{props.value}</Txt>
            <Image source={props.icon} style={[styles.icon, props.style]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = item => {
    const isSelected = categoryItem?.includes(item?._id);
    return (
      <View style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.selectedTextStyle}>{item?.title}</Text>
        </View>
        {isSelected && (
          <Image source={icons?.CircleCheck} style={{height: 20, width: 20}} />
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
              PatientReducer?.status == 'PATIENT/submitEvaluationReq'
            }
          />
          <TitleTxt title={'Evaluation Form'} />
          <View style={styles.container}>
            <View style={[css.row, css.jcsb]}>
              <ValueField title={'First Name'} value={data?.first_name} />
              <ValueField title={'Last Name'} value={data?.last_name} />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField
                title={'Setup Date'}
                value={data?.resmeduser?.setupDate}
              />
              <ValueField
                title={'Device'}
                value={data?.resmeduser?.device_type_desc}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <ValueField title={'Therapist Name'} value={'Therapist user'} />
              <ValueField title={'Location'} value={data?.city_address} />
            </View>
            <View style={[css.row, css.px5]}>
              <View style={[css.w50, css.mt5]}>
                <Txt style={[css.fs20]}>{'About Satisfaction'}</Txt>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={styles.itemTextStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    PatientReducer?.getListOfSatisfactionRes?.data?.length > 0
                      ? PatientReducer?.getListOfSatisfactionRes?.data
                      : []
                  }
                  labelField="title"
                  valueField="id"
                  placeholder="Services"
                  value={categoryItem}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    connectionrequest()
                      .then(() => {
                        dispatch(
                          satisfactionQuestionListReq({
                            parent_question_id: item?.id,
                          }),
                        );
                      })
                      .catch(error => {
                        // console.log(error);
                      });
                    setCategoryItem(item);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.container}>
              {hasNumberRatingQuestions && (
                <View style={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <Text key={index} style={styles.tag}>
                      {tag}
                    </Text>
                  ))}
                </View>
              )}
              {categoryItem &&
                sortedQuestions?.length > 0 &&
                sortedQuestions.map(question => {
                  switch (question.type) {
                    case 'number_rating':
                      return (
                        <QuestionComponent
                          key={question.id}
                          question={question}
                          selectedValue={numberRatingValues[question.id]}
                          onSelect={handleSelect}
                        />
                      );
                    case 'radio_rating':
                      return (
                        <RadioQuestionComponent
                          key={question.id}
                          question={question}
                          selectedValue={radioRatingValues[question.id]}
                          onSelect={handleRadioSelect}
                        />
                      );
                    case 'input_text':
                      return (
                        <TextInputComponent
                          key={question.id}
                          question={question}
                          onChangeText={text =>
                            handleTextChange(question.id, text)
                          }
                        />
                      );
                    default:
                      return null;
                  }
                })}
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleEnroll}>
              <Txt style={styles.btnTxt}>Submit</Txt>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
          </View>
        </View>
      </SafeView>
    </KeyboardAvoidingView>
  );
};

export default ServiceEnrollment;

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
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    paddingBottom: normalize(6),
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
});
