/* eslint-disable react-hooks/exhaustive-deps */
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
import React, {useEffect, useState} from 'react';
import TitleTxt from '../../../components/common/TitleTxt';
import css, {height} from '../../../themes/space';
import SearchInput from '../../../components/inputs/SearchInput';
import normalize from '../../../utils/normalize';
import {colors} from '../../../themes/colors';
import SafeView from '../../../components/common/SafeView';
import PatientCard from '../../../components/common/PatientCard';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {icons} from '../../../themes/icons';
import Txt from '../../../components/micro/Txt';
import {fonts} from '../../../themes/fonts';
import useOrientation from '../../../utils/useOrientation';
import {widthToDp as wp} from '../../../utils/responsive';
import Button from '../../../components/buttons/Button';
import Divider from '../../../components/micro/Divider';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearQuestionListReq,
  getMyPatientReq,
} from '../../../redux/reducer/PatientReducer';
import BounceText from '../../../components/micro/BounceText';
import Loader from '../../../utils/Loader';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';

let getPatientStatus = '';
const width = Dimensions.get('window').width;

const MyPatient = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [patientInfo, setPatientInfo] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const isFocused = useIsFocused();
  const [isFocus, setIsFocus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDue, setSelectedDue] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const PatientReducer = useSelector(state => state?.PatientReducer);
  const orientation = useOrientation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPatientReq());
  }, []);

  let firstDropdown = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Inactive',
      value: 'inactive',
    },
  ];

  let secondDropdown = [
    {
      label: 'None',
      value: 'None',
    },
    {
      label: 'PM Due',
      value: 'PM Due',
    },
    {
      label: 'Next Visit Date',
      value: 'Next Visit Date',
    },
    {
      value: 'Patient added on',
      label: 'Patient added on',
    },
  ];

  const handleChangeDue = text => {
    setSelectedDue(text);
  };

  const handleChangeActive = text => {
    setSelectedStatus(text);
  };

  const paginateData = data => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = page => {
    console.log('Page change requested:', page); // Debugging log
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      dispatch(getMyPatientReq(page));
    }
  };

  const numColumns = orientation == 'PORTRAIT' ? 3 : 4;

  const PaginationControls = ({currentPage, totalPages, onPageChange}) => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <Text
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.disabledButton,
          ]}>
          Previous
        </Text>
      </TouchableOpacity>
      {Array.from({length: totalPages}, (_, index) => (
        <TouchableOpacity
          key={index + 1}
          onPress={() => onPageChange(index + 1)}
          style={[
            styles.pageNumber,
            currentPage === index + 1 && styles.activePage,
          ]}>
          <Text style={styles.pageNumberText}>{index + 1}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <Text
          style={[
            styles.paginationButton,
            currentPage === totalPages && styles.disabledButton,
          ]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );

  // console.log(currentPage,totalPages)

  const Modalinfo = ({title, value}) => {
    return (
      <View style={[css.row, css.aic]}>
        <Txt style={styles.title}>{title}</Txt>
        <Txt style={[styles.value]}>{value}</Txt>
      </View>
    );
  };

  // console.log(modalInfo,">>>>>>>?<<<<")

  const handleSearch = text => {
    setSearchData(text.toLowerCase());
    if (text === '') {
      setPatientInfo(PatientReducer.getMyPatientResponse?.data?.data);
    } else {
      const filteredPatients =
        PatientReducer.getMyPatientResponse?.data?.data.filter(patient =>
          patient.full_name.toLowerCase().includes(text.toLowerCase()),
        );
      setPatientInfo(filteredPatients);
    }
  };

  useEffect(() => {
    if (PatientReducer.getMyPatientResponse?.data?.data) {
      const total = PatientReducer.getMyPatientResponse?.data?.total;
      setTotalPages(Math.ceil(total / itemsPerPage));
      setPatientInfo(
        paginateData(PatientReducer.getMyPatientResponse?.data?.data),
      );
    }
  }, [currentPage, PatientReducer.getMyPatientResponse?.data?.data]);

  // console.log(PatientReducer.getMyPatientResponse?.data,">>>>??>")

  useFocusEffect(
    React.useCallback(() => {
      if (
        getPatientStatus === '' ||
        PatientReducer.status !== getPatientStatus
      ) {
        switch (PatientReducer.status) {
          case 'PATIENT/getMyPatientReq':
            getPatientStatus = PatientReducer.status;
            setIsLoading(true);
            break;
          case 'PATIENT/getMyPatientSuccess':
            getPatientStatus = PatientReducer.status;
            setPatientInfo(PatientReducer?.getMyPatientResponse?.data?.data);
            setIsLoading(false);
            break;
          case 'PATIENT/getMyPatientFailure':
            getPatientStatus = PatientReducer.status;
            setIsLoading(false);
            break;
        }
      }
    }, [PatientReducer.status, isFocused, patientInfo]),
  );

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

  const PatientsRenderItem = ({item, index}) => {
    return (
      <PatientCard
        // onPress={() => {
        //   setModalVisible(true);
        //   setModalInfo(item);
        // }}
        name={item.full_name}
        medicalDevices={
          item?.resmeduser
            ? item?.resmeduser?.device_serial_no +
              '  ' +
              item?.resmeduser?.device_type_desc
            : ''
        }
        nextVisit={item?.next_visit_date}
        complaints={item?.compliance_percentage}
        PMDue={item?.pm_due_date}
        location={item?.city_address?.slice(0, 20) + '...'}
        date={moment(item?.dob).format('MM-DD-YYYY')}
        image={item?.profile_photo_url}
        Button={true}
        navigateTo={() => {
          navigation.navigate('ServiceEnrollment', {data: item}),
            dispatch(clearQuestionListReq({}));
        }}
        // navigateTo={() => {
        //   navigation.navigate('FlatListView')
        //     // dispatch(clearQuestionListReq({}));
        // }}
        navigateTo1={() => {
          setModalVisible(true);
          setModalInfo(item);
        }}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                iconStyle={styles.iconStyle}
                data={secondDropdown?.length > 0 ? secondDropdown : []}
                labelField="label"
                valueField="value"
                placeholder="None"
                value={selectedDue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSelectedDue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                iconStyle={styles.iconStyle}
                data={firstDropdown ? firstDropdown : []}
                labelField="label"
                valueField="value"
                placeholder="All"
                value={selectedStatus}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSelectedStatus(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={[css.f1, {marginTop: 20}]}>
              <SearchInput
                style={[]}
                placeholder="Search here..."
                value={searchData}
                onChangeText={text => handleSearch(text)}
                onPressFilter={() => setShowFilter(!showFilter)}
              />
            </View>
            {/* {showFilter ? (
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
            ) : null} */}
          </View>
          {/* {console.log('patientInfo', patientInfo)} */}
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
          {/* {console.log(patientInfo,">>>>>>>>?????sss")} */}
        </View>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </SafeView>
      <Modal
        onBackdropPress={() => {
          setModalVisible(false);
          setModalInfo('');
        }}
        backdropOpacity={0}
        isVisible={modalVisible}
        deviceHeight={height}
        // deviceWidth={width}
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
                  source={{uri: `${modalInfo?.profile_photo_url}&size=${200}`}}
                  resizeMode="cover"
                  style={[
                    styles.profileImage,
                    {
                      width: 250,
                      height: 250,
                    },
                  ]}
                />

                <Button
                  title="View Session"
                  style={[css.mt2, css.w100]}
                  onPress={() => {
                    setModalVisible(false);
                    setTimeout(() => {
                      navigation.navigate('MyPatientsSession', {
                        ecn: modalInfo?.ecn,
                        full_name: modalInfo?.full_name,
                      });
                    }, 100);
                  }}
                />
                <Button
                  title="Submit Evaluation"
                  style={[css.mt2, css.w100]}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('ServiceEnrollment', {
                      data: modalInfo,
                      isPatient: true,
                    });
                  }}
                />
              </View>
              {/* {console.log(modalInfo, '>>>>>>>>>info')} */}
              <View style={[css.ml5, css.jcc]}>
                <Modalinfo title="Name:" value={modalInfo?.full_name} />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Phone No.:"
                  value={
                    modalInfo?.phone_number ? modalInfo?.phone_number : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Email Address:"
                  value={
                    modalInfo?.email_address ? modalInfo?.email_address : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Location:"
                  value={
                    modalInfo?.city_address
                      ? modalInfo?.city_address.slice(0, 6)
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Devices:"
                  value={
                    modalInfo?.resmeduser?.device_type_desc
                      ? modalInfo?.resmeduser?.device_type_desc
                      : 'N/A'
                  }
                />

                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Device Serial No:"
                  value={
                    modalInfo?.resmeduser?.device_serial_no
                      ? modalInfo?.resmeduser?.device_serial_no
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Mask:"
                  value={
                    modalInfo?.resmeduser?.mask_size
                      ? modalInfo?.resmeduser?.mask_size
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Setup Date:"
                  value={
                    modalInfo?.resmeduser?.setupDate
                      ? modalInfo?.resmeduser?.setupDate
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Last Visit:"
                  value={
                    modalInfo?.resmeduser?.last_visit_date
                      ? modalInfo?.resmeduser?.last_visit_date
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Next Visit Date:"
                  value={
                    modalInfo?.next_visit_date
                      ? moment(modalInfo?.next_visit_date).format('MM/DD/YYYY')
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="PM Due:"
                  value={
                    modalInfo?.pm_due_date ? modalInfo?.pm_due_date : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Compliance:"
                  value={
                    modalInfo?.compliance_percentage
                      ? modalInfo?.compliance_percentage + '%'
                      : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Total Sessions:"
                  value={
                    modalInfo?.total_session ? modalInfo?.total_session : 'N/A'
                  }
                />
                <Divider style={[styles.dividerGap]} />
                <Modalinfo
                  title="Total Usage(min):"
                  value={
                    modalInfo?.total_usage_time
                      ? modalInfo?.total_usage_time
                      : 'N/A'
                  }
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

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.primaryTextColor,
  },
  disabledButton: {
    color: '#d3d3d3',
  },
  pageNumber: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.primaryTextColor,
  },
  pageNumberText: {
    color: colors.white,
  },
  activePage: {
    backgroundColor: colors.primary,
  },
  dropdown: {
    borderColor: colors?.lightGrey,
    marginHorizontal: 10,
    paddingHorizontal: normalize(2),
    height: normalize(25),
    width: normalize(80),
    borderWidth: 0.4,
    borderColor: colors.lightWhite,
    borderRadius: normalize(3),
  },
  placeholderStyle: {
    fontSize: normalize(6),
    color: colors?.searchPlaceholder,
    marginLeft: normalize(5),
  },
  selectedTextStyle: {
    fontSize: normalize(7),
    marginLeft: normalize(5),
    color: colors?.searchPlaceholder,
  },
  iconStyle: {
    width: normalize(20),
    height: normalize(20),
    // marginHorizontal: normalize(35),
  },
  inputSearchStyle: {
    height: normalize(40),
    fontSize: normalize(14),
    color: 'red',
  },
  itemTextStyle: {
    color: colors.ternaryTextColor,
  },
});
