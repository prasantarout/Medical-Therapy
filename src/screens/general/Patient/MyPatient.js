import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TitleTxt from '../../../components/common/TitleTxt';
import css, { height } from '../../../themes/space';
import SearchInput from '../../../components/inputs/SearchInput';
import normalize from '../../../utils/normalize';
import { colors } from '../../../themes/colors';
import SafeView from '../../../components/common/SafeView';
import { images } from '../../../themes/images';
import PatientCard from '../../../components/common/PatientCard';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { icons } from '../../../themes/icons';
import Txt from '../../../components/micro/Txt';
import { fonts } from '../../../themes/fonts';
import useScreenDimension from '../../../utils/useScreenDimension';
import useOrientation from '../../../utils/useOrientation';
import { widthToDp as wp } from '../../../utils/responsive';
import Button from '../../../components/buttons/Button';
import Divider from '../../../components/micro/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientReq } from '../../../redux/reducer/PatientReducer';
import CustomToast from '../../../utils/Toast';
import BounceText from '../../../components/micro/BounceText';

let getPatientStatus = ""

const MyPatient = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [patientInfo, setPatientInfo] = useState();
  const [showFilter, setShowFilter] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const PatientReducer = useSelector(state => state?.PatientReducer)
  const width = useScreenDimension();
  const orientation = useOrientation();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPatientReq());
  }, [])

  // useEffect(() => {
  //   sortByDateDescending(patientInfo)
  // }, [filterBy])

  // const sortByDateDescending = (patients) => {
  //   return patients?.sort((a, b) => new Date(b.setupDate) - new Date(a.setupDate));
  // };
  const numColumns = orientation == 'PORTRAIT' ? 3 : 4;

  const PatientsRenderItem = ({ item, index }) => {
    return (
      <PatientCard
        onPress={() => setModalVisible(true)}
        name={item.full_name}
        location={item.location}
        date={item.setupDate}
        image={item.profile_photo_url}
        Button={true}
        navigateTo={() => navigation.navigate('ServiceEnrollment')}
        style={{
          width: orientation == 'LANDSCAPE' ? width / 4 - 35 : width / 3 - 35,
          marginLeft: orientation == 'LANDSCAPE' ? index % 4 == 0 ? 0 : normalize(2.5) : index % 3 == 0 ? 0 : normalize(2.5),
        }}
      />
    );
  };

  const Modalinfo = ({ title, value }) => {
    return (
      <View style={[css.row, css.aic]}>
        <Txt style={styles.title}>{title}</Txt>
        <Txt style={[styles.value]}>{value}</Txt>
      </View>
    );
  };
  console.log("filteredPatients-patientInfo", patientInfo)
  const handleSearch = (text) => {
    setSearchData(text.toLowerCase());
    if (text === "") {
      setPatientInfo(PatientReducer.getPatientResponse?.data?.data);
    } else {
      const filteredPatients = PatientReducer.getPatientResponse?.data?.data.filter(patient => patient.full_name.toLowerCase().includes(text.toLowerCase()));
      console.log("filteredPatients :", filteredPatients)
      setPatientInfo(filteredPatients);
    }
  };

  if (getPatientStatus === "" || PatientReducer.status !== getPatientStatus) {
    switch (PatientReducer.status) {
      case "PATIENT/getPatientReq":
        getPatientStatus = PatientReducer.status;
        console.log("getPatientReq")
        break;
      case "PATIENT/getPatientSuccess":
        getPatientStatus = PatientReducer.status;
        console.log("getPatientSuccess", PatientReducer.getPatientResponse?.data?.data)
        setPatientInfo(PatientReducer.getPatientResponse?.data?.data)
        // CustomToast("Profile Updated Successfully")
        break;
      case "PATIENT/getPatientFailure":
        getPatientStatus = PatientReducer.status;
        console.log("getPatientFailure")
        break;
    }
  }

  const renderEmptyComponent = () => {
    return (
      <View style={[css.center, css.f1]} >
        <BounceText title="No Patient Found" />
      </View>
    )
  }

  const FilterButton = ({ onPress, title, style, titleStyle }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[style, styles.filterBtnStyle]} >
        <Txt style={[titleStyle]} >{title}</Txt>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <SafeView {...props} >
        <View style={[css.px5, css.f1, css.py4]}>
          <TitleTxt title={'My Patients'} />
          <View style={[css.mt4]}>
            <View style={[css.f1]}>
              <SearchInput
                style={[]}
                placeholder='Search here...'
                value={searchData}
                onChangeText={(text) => handleSearch(text)}
                onPressFilter={() => setShowFilter(!showFilter)}
              />
            </View>
            {showFilter ?
              <View style={[css.row, css.pt3, css.aic]}>
                <View style={[css.f1, css.center, css.row]}>
                  <Txt style={[css.fs18, css.semiBold]} >Filter</Txt>
                  <View style={[css.ml4, css.row, css.aic]}>
                    <FilterButton
                      title="In Process"
                      titleStyle={filterBy == "In Process" ? styles.activeText : styles.in_activeText}
                      style={[filterBy == "In Process" ? styles.active : styles.in_active]}
                      onPress={() => setFilterBy("In Process")}
                    />
                    <FilterButton
                      title="Completed"
                      titleStyle={filterBy == "Completed" ? styles.activeText : styles.in_activeText}
                      style={[filterBy == "Completed" ? styles.active : styles.in_active, css.ml2]}
                      onPress={() => setFilterBy("Completed")}
                    />
                  </View>
                  <Txt style={[css.ml4, css.fs18, css.semiBold]} >Sort by</Txt>
                  <View style={[css.row, css.aic, css.ml3]}>
                    <FilterButton
                      title="New"
                      titleStyle={sortBy == "New" ? styles.activeText : styles.in_activeText}
                      style={[sortBy == "New" ? styles.active : styles.in_active]}
                      onPress={() => setSortBy("New")}
                    />
                    <FilterButton
                      title="Repeated"
                      titleStyle={sortBy == "Repeated" ? styles.activeText : styles.in_activeText}
                      style={[sortBy == "Repeated" ? styles.active : styles.in_active, css.ml2]}
                      onPress={() => setSortBy("Repeated")}
                    />
                  </View>
                </View>
              </View> : null

            }
          </View>
          <FlatList
            numColumns={numColumns}
            key={numColumns}
            showsVerticalScrollIndicator={false}
            data={patientInfo}
            keyExtractor={item => item.id}
            renderItem={PatientsRenderItem}
            style={{ flex: 1, marginTop: normalize(10) }}
            columnWrapperStyle={[]}
            contentContainerStyle={[css.fg1]}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>
      </SafeView>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0}
        isVisible={modalVisible}
        deviceHeight={height}
        deviceWidth={width}
        style={[css.m0, css.p0]}
        statusBarTranslucent={true}>
        <View style={[css.f1, css.center, styles.backdrop]}>
          <View
            style={[styles.modalStyle, { maxWidth: width - normalize(50) }]}>
            <TouchableOpacity
              style={[styles.closeBtnCtnr]}
              activeOpacity={0.9}
              onPress={() => setModalVisible(false)}>
              <Image source={icons.closeIcon} style={[styles.closeBtn]} />
            </TouchableOpacity>
            <Txt style={[styles.modalTitle, { fontSize: wp(2.6, width) }]}>
              Patient Details
            </Txt>
            <View style={[css.row, css.mt4]}>
              <View style={[css.jcc, css.aic]}>
                <ImageBackground
                  source={images.patientZoomPic}
                  style={[
                    styles.profileImage,
                    {
                      width: width / 4,
                      height: width / 4,
                    },
                  ]}>
                  <View style={styles.newCtn}>
                    <Txt style={[css.fs14, css.medium, css.textWhite]}>
                      New
                    </Txt>
                  </View>
                </ImageBackground>

                <Button
                  title="All Assignments"
                  style={[css.mt2, css.w100]}
                  onPress={() => {
                    setModalVisible(false),
                      navigation.navigate('Assignment');
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false),
                      navigation.navigate('ServiceEnrollment');
                  }}
                  activeOpacity={0.8}
                  style={[styles.btn2]}>
                  <Text
                    style={[styles.modalbtnTxt, { color: colors.primary }]}>
                    Service Enroll now
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[css.ml5, css.jcc]}>
                <Modalinfo title="Name:" value="Jennifer Morrison" />
                <Divider style={[css.my3]} />
                <Modalinfo title="Phone No.:" value="(041) 12345 14578" />
                <Divider style={[css.my3]} />
                <Modalinfo
                  title="Email Address:"
                  value="morrijennifer@gmail.com"
                />
                <Divider style={[css.my3]} />
                <Modalinfo
                  title="Location:"
                  value="32A, Lorem Ipsum, Lorem"
                />
                <Divider style={[css.my3]} />
                <Modalinfo title="Date:" value="12 March 2023" />
                <Divider style={[css.my3]} />
                <Modalinfo title="Time:" value="04:00 P.M" />
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
    justifyContent: "center",
    alignItems: "center",
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
    padding: 30,
  },
  closeBtnCtnr: {
    position: 'absolute',
    top: -30,
    right: -30,
  },
  closeBtn: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  modalTitle: {
    color: colors.primaryTextColor,
    fontFamily: fonts.SemiBold,
  },
  profileImage: {
    // maxWidth: 200,
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
    paddingHorizontal: normalize(3),
    paddingVertical: normalize(1),
    backgroundColor: colors.primary,
    borderRadius: normalize(3),
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(23),
    position: 'absolute',
    top: normalize(7),
    left: normalize(6),
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
    // width: normalize(93),
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

});
