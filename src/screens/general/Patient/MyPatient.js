import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import TitleTxt from '../../../components/common/TitleTxt';
import css, {height} from '../../../themes/space';
import SearchInput from '../../../components/inputs/SearchInput';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import SafeView from '../../../components/common/SafeView';
import {images} from '../../../themes/images';
import PatientCard from '../../../components/common/PatientCard';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {icons} from '../../../themes/icons';
import Txt from '../../../components/micro/Txt';
import {fonts} from '../../../themes/fonts';
import useScreenDimension from '../../../utils/useScreenDimension';
import useOrientation from '../../../utils/useOrientation';
import {widthToDp as wp} from '../../../utils/responsive';
import Button from '../../../components/buttons/Button';
import Divider from '../../../components/micro/Divider';
import {useDispatch, useSelector} from 'react-redux';
import {getPatientReq} from '../../../redux/reducer/PatientReducer';
import CustomToast from '../../../utils/Toast';
import BounceText from '../../../components/micro/BounceText';
import Loader from '../../../utils/Loader';
import moment from 'moment';
import {myPatient} from '../../../utils/dumpAPI';

let getPatientStatus = '';

const width = Dimensions.get('window').width;

const MyPatient = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [patientInfo, setPatientInfo] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  const PatientReducer = useSelector(state => state?.PatientReducer);
  // const width = useScreenDimension();
  const {screenHeight} = useScreenDimension();
  const orientation = useOrientation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const sortedData = patientInfo?.sort((a, b) => {
  //     const dateA = new Date(a.setupDate);
  //     const dateB = new Date(b.setupDate);
  //     if (dateA.getTime() === dateB.getTime()) {
  //         return a.id - b.id;
  //     }
  //     return dateA - dateB;
  // });
  //   console.log("myPatientt-sortedData", sortedData)
  // }, [patientInfo])

  useEffect(() => {
    dispatch(getPatientReq());
  }, []);

  const numColumns = orientation == 'PORTRAIT' ? 3 : 4;

  const Modalinfo = ({title, value}) => {
    return (
      <View style={[css.row, css.aic]}>
        <Txt style={styles.title}>{title}</Txt>
        <Txt style={[styles.value]}>{value}</Txt>
      </View>
    );
  };

  const handleSearch = text => {
    setSearchData(text.toLowerCase());
    if (text === '') {
      setPatientInfo(PatientReducer.getPatientResponse?.data?.data);
    } else {
      const filteredPatients =
        PatientReducer.getPatientResponse?.data?.data.filter(patient =>
          patient.full_name.toLowerCase().includes(text.toLowerCase()),
        );
      setPatientInfo(filteredPatients);
    }
  };
  console.log(PatientReducer.getPatientResponse?.data?.data,">>>>>>>?????")


  if (getPatientStatus === '' || PatientReducer.status !== getPatientStatus) {
    switch (PatientReducer.status) {
      case 'PATIENT/getPatientReq':
        getPatientStatus = PatientReducer.status;
        setIsLoading(true);
        break;
      case 'PATIENT/getPatientSuccess':
        getPatientStatus = PatientReducer.status;
        console.log(
          'getPatientSuccess',
          PatientReducer.getPatientResponse?.data?.data,
        );
        // setTimeout(() => {
        //   setPatientInfo(PatientReducer.getPatientResponse?.data?.data)
        //   setIsLoading(false)
        // })
        setPatientInfo(PatientReducer?.getPatientResponse?.data?.data);
        setIsLoading(false);
        // CustomToast("Profile Updated Successfully")
        break;
      case 'PATIENT/getPatientFailure':
        getPatientStatus = PatientReducer.status;
        setIsLoading(false);
        break;
    }
  }

  const renderEmptyComponent = () => {
    return (
      <View style={[css.center, css.f1]}>
        {isLoading ? (
          <Loader visible={true} />
        ) : (
          <BounceText title="No Patient Found" />
        )}
      </View>
    );
  };

  const FilterButton = ({onPress, title, style, titleStyle}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[style, styles.filterBtnStyle]}>
        <Txt style={[titleStyle]}>{title}</Txt>
      </TouchableOpacity>
    );
  };

  // Repeated012
  const sortFunction = value => {
    if (value === 'New') {
      const sortedPatients = [...patientInfo].sort(
        (a, b) => new Date(b.setupDate) - new Date(a.setupDate),
      );
      setPatientInfo(sortedPatients);
    } else if (value === 'Repeated') {
      const sortedPatients = [...patientInfo].sort(
        (a, b) => new Date(a.setupDate) - new Date(b.setupDate),
      );
      setPatientInfo(sortedPatients);
    }
  };

  const PatientsRenderItem = ({item, index}) => {
    return (
      <PatientCard
        onPress={() => {
          setModalVisible(true);
          setModalInfo(item);
        }}
        name={item.full_name}
        location={item.location}
        date={item.setupDate}
        image={item.profile_photo_url}
        Button={true}
        navigateTo={() => navigation.navigate('ServiceEnrollment')}
        style={{
          width: orientation == 'LANDSCAPE' ? width / 4 - 18 : width / 3 - 23,
          marginLeft:
            orientation == 'LANDSCAPE'
              ? index % 4 == 0
                ? 0
                : normalize(3)
              : index % 3 == 0
              ? 0
              : normalize(3),
        }}
      />
    );
  };

  return (
    <>
      <SafeView {...props}>
        <View style={[css.px5, css.f1, css.py4]}>
          <TitleTxt title={'My Patients'} />
          <View style={[css.mt4]}>
            <View style={[css.f1]}>
              <SearchInput
                style={[]}
                placeholder="Search here..."
                value={searchData}
                onChangeText={text => handleSearch(text)}
                onPressFilter={() => setShowFilter(!showFilter)}
              />
            </View>
            {showFilter ? (
              <View style={[css.row, css.pt3, css.aic]}>
                <View style={[css.f1, css.center, css.row]}>
                  <Txt style={[css.fs18, css.semiBold]}>Filter</Txt>
                  <View style={[css.ml4, css.row, css.aic]}>
                    <FilterButton
                      title="In Process"
                      titleStyle={
                        filterBy == 'In Process'
                          ? styles.activeText
                          : styles.in_activeText
                      }
                      style={[
                        filterBy == 'In Process'
                          ? styles.active
                          : styles.in_active,
                      ]}
                      onPress={() => setFilterBy('In Process')}
                    />
                    <FilterButton
                      title="Completed"
                      titleStyle={
                        filterBy == 'Completed'
                          ? styles.activeText
                          : styles.in_activeText
                      }
                      style={[
                        filterBy == 'Completed'
                          ? styles.active
                          : styles.in_active,
                        css.ml2,
                      ]}
                      onPress={() => setFilterBy('Completed')}
                    />
                  </View>
                  <Txt style={[css.ml4, css.fs18, css.semiBold]}>Sort by</Txt>
                  <View style={[css.row, css.aic, css.ml3]}>
                    <FilterButton
                      title="New"
                      titleStyle={
                        sortBy == 'New'
                          ? styles.activeText
                          : styles.in_activeText
                      }
                      style={[
                        sortBy == 'New' ? styles.active : styles.in_active,
                      ]}
                      onPress={() => {
                        setSortBy('New');
                        sortFunction('New');
                      }}
                    />
                    <FilterButton
                      title="Repeated"
                      titleStyle={
                        sortBy == 'Repeated'
                          ? styles.activeText
                          : styles.in_activeText
                      }
                      style={[
                        sortBy == 'Repeated' ? styles.active : styles.in_active,
                        css.ml2,
                      ]}
                      onPress={() => {
                        setSortBy('Repeated');
                        sortFunction('Repeated');
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
          <FlatList
            numColumns={numColumns}
            key={numColumns}
            showsVerticalScrollIndicator={false}
            data={patientInfo}
            // data={[]}
            keyExtractor={item => item.id}
            renderItem={PatientsRenderItem}
            style={{flex: 1, marginTop: normalize(10)}}
            columnWrapperStyle={[]}
            contentContainerStyle={[css.fg1]}
            ListEmptyComponent={renderEmptyComponent}
          />
          {console.log(patientInfo,">>>>>>>>?????sss")}
        </View>
      </SafeView>
      <Modal
        onBackdropPress={() => {
          setModalVisible(false);
          setModalInfo('');
        }}
        backdropOpacity={0}
        isVisible={modalVisible}
        deviceHeight={height}
        deviceWidth={width}
        style={[css.m0, css.p0]}
        statusBarTranslucent={true}>
        <View style={[css.f1, css.center, styles.backdrop]}>
          <View style={[styles.modalStyle, {maxWidth: width - normalize(16)}]}>
            <TouchableOpacity
              style={[styles.closeBtnCtnr]}
              activeOpacity={0.9}
              onPress={() => {
                setModalVisible(false);
                setModalInfo('');
              }}>
              <Image source={icons.closeIcon} style={[styles.closeBtn]} />
            </TouchableOpacity>
            <Txt style={[styles.modalTitle, {fontSize: wp(2, width)}]}>
              Patient Details
            </Txt>
            <View style={[css.row, css.mt1]}>
              <View style={[css.jcc, css.aic]}>
                <ImageBackground
                  source={{uri: modalInfo?.profile_photo_url}}
                  resizeMode="cover"
                  style={[
                    styles.profileImage,
                    {
                      width: 250,
                      height: 250,
                    },
                  ]}></ImageBackground>

                <Button
                  title="View Session"
                  style={[css.mt2, css.w100]}
                  onPress={() => {
                    setModalVisible(false), navigation.navigate('Assignment');
                  }}
                />
              </View>

              <View style={[css.ml5, css.jcc]}>
                <Modalinfo title="Name:" value={modalInfo?.full_name} />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Phone No.:"
                  value={modalInfo?.phone ? modalInfo?.phone : 'N/A'}
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Email Address:"
                  value={modalInfo?.email ? modalInfo?.email : 'N/A'}
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Location:"
                  value={modalInfo?.location ? modalInfo?.location : 'N/A'}
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Date:"
                  value={moment(modalInfo?.created_at).format('YYYY-MM-DD')}
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Time:"
                  value={moment(modalInfo?.created_at).format('hh:mm A')}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyPatient;

const styles = StyleSheet.create({
  Button: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    marginLeft: 16,
  },
  filterBtnStyle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: colors.primaryTextColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryTextColor,
  },
  activeText: {
    color: colors.white,
  },
  in_activeText: {
    color: colors.primaryTextColor,
  },
  in_active: {
    borderWidth: 1,
    borderColor: colors.primaryTextColor,
    borderRadius: 10,
  },
  Button2: {
    backgroundColor: colors.primary,
    marginLeft: normalize(4),
  },
  btn: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 16,
    // width: 240
  },
  btnTxt: {
    fontSize: 17,
    color: colors.primary,
  },
  btnTxt2: {
    fontSize: 19,
    color: '#fff',
  },
  modalStyle: {
    backgroundColor: colors.bgColor,
    borderRadius: 10,
    padding: 40,
  },
  closeBtnCtnr: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  closeBtn: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
  },
  modalTitle: {
    color: colors.primaryTextColor,
    fontFamily: fonts.SemiBold,
  },
  profileImage: {
    resizeMode: 'cover',
  },
  btn2: {
    height: 55,
    width: '100%',
    backgroundColor: colors.white,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(2),
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  modalbtnTxt: {
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  newCtn: {
    paddingHorizontal: normalize(5),
    paddingVertical: 5,
    backgroundColor: colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontFamily: fonts.Regular,
    color: '#444444',
    fontSize: 18,
    width: 160,
  },
  value: {
    fontFamily: fonts.Regular,
    fontWeight: '400',
    color: colors.primary,
    fontSize: 18,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  dividerGap: {
    marginVertical: 12,
  },
});
