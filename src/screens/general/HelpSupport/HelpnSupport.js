import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import css from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import {colors} from '../../../themes/colors';
import normalize from '../../../utils/normalize';
import {fonts} from '../../../themes/fonts';
import QuestionCard from '../../../components/common/QuestionCard';
import Txt from '../../../components/micro/Txt';
import {icons} from '../../../themes/icons';
import Modal from 'react-native-modal';
import {images} from '../../../themes/images';
import SimpleInput from '../../../components/inputs/SimpleInput';
import {useDispatch, useSelector} from 'react-redux';
import {
  contactUsForSupportReq,
  helpAndSupportReq,
  helpSupportTypeReq,
} from '../../../redux/reducer/CmsReducer';
import CustomToast from '../../../utils/Toast';
import DocumentPicker from 'react-native-document-picker';

let status = '';
let contactUsForSupportstatus = '';

const HelpnSupport = props => {
  const [selected, setSelected] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [helpSupportType, setHelpSupportType] = useState();
  const [helpSupportData, setHelpSupportData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [document, setDocument] = useState();
  const [documentName, setDocumentName] = useState('');
  const CmsReducer = useSelector(state => state.CmsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(helpSupportTypeReq());
    getHelpSupportFunc(selected);
  }, []);

  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/helpSupportTypeReq':
        status = CmsReducer.status;
        break;
      case 'CMS/helpSupportTypeSuccess':
        status = CmsReducer.status;
        setHelpSupportType(CmsReducer?.helpSupportTypeResponse?.data);
        break;
      case 'CMS/helpSupportTypeFailure':
        status = CmsReducer.status;
        break;
      case 'CMS/helpAndSupportReq':
        status = CmsReducer.status;
        break;
      case 'CMS/helpAndSupportSuccess':
        status = CmsReducer.status;
        setHelpSupportData(CmsReducer?.helpAndSupportResponse?.data);
        break;
      case 'CMS/helpAndSupportFailure':
        status = CmsReducer.status;
        break;
      case 'CMS/contactUsForSupportReq':
        status = CmsReducer.status;
        break;
      case 'CMS/contactUsForSupportSuccess':
        setIsModalVisible(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setDocument('');
        setDocumentName('');
        status = CmsReducer.status;
        break;
      case 'CMS/contactUsForSupportFailure':
        status = CmsReducer.status;
        break;
    }
  }

  const supportRenderItem = ({item, index}) => {
    return <QuestionCard title={item?.question} value={item?.answer} />;
  };

  const getHelpSupportFunc = item => {
    let obj = {
      type_id: item,
    };
    dispatch(helpAndSupportReq(obj));
  };

  const categoryRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(item.id);
          getHelpSupportFunc(item.id);
        }}
        activeOpacity={0.6}
        style={[
          styles.categoryBtn,
          {
            backgroundColor:
              selected == item.id ? colors.secondary : colors.white,
            borderWidth: selected != item.id ? 1.5 : null,
            borderColor: selected != item.id ? colors.secondary : null,
          },
        ]}>
        <Txt
          style={[
            styles.categoryTxt,
            {
              color: selected == item?.id ? colors.white : colors.secondary,
            },
          ]}>
          {item.title}
        </Txt>
      </TouchableOpacity>
    );
  };

  const nameRegex = /^[a-zA-Z ]+$/;
  const phoneRegex = /^\+?[0-9\s-()]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (firstName == '') {
      CustomToast('Please enter your First Name');
    } else if (!nameRegex.test(firstName)) {
      CustomToast('Please enter a Valid First Name');
    } else if (lastName == '') {
      CustomToast('Please enter your Last Name');
    } else if (!nameRegex.test(lastName)) {
      CustomToast('Please enter a Valid Last Name');
    } else if (email == '') {
      CustomToast('Please enter your Email');
    } else if (!emailRegex.test(email)) {
      CustomToast('Please enter a Valid Email');
    } else if (phone == '') {
      CustomToast('Please enter your Phone Number');
    } else if (phone.length < 10 || phone.length > 16) {
      CustomToast('Please enter a Valid Phone Number');
    } else if (document == '' || document == undefined) {
      CustomToast('Please select document');
    } else {
      let obj = new FormData();
      obj.append('first_name', firstName);
      obj.append('last_name', lastName);
      obj.append('email', email);
      obj.append('phone', phone);
      obj.append('message', message);
      obj.append('attachment', document);
      // console.log('attachment', document);
      dispatch(contactUsForSupportReq(obj));
    }
  };

  const handleDocumentUpload = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setDocument(response[0]);
      setDocumentName(response[0]?.name);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  // setDocumentName
  //   contactUsForSupportReq
  // contactUsForSupportSuccess
  // contactUsForSupportFailure

  return (
    <SafeView {...props}>
      <ScrollView
        style={{paddingBottom: normalize(35)}}
        showsVerticalScrollIndicator={false}>
        <View style={[css.px5, css.f1, css.py4]}>
          <TitleTxt title={'Help & Support'} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={[css.my3]}
            data={helpSupportType}
            renderItem={categoryRenderItem}
          />
          {helpSupportData?.length > 0 ? (
            <>
              <View style={styles.questionCtnr}>
                <FlatList
                  data={helpSupportData}
                  renderItem={supportRenderItem}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
                <Txt style={styles.btnTxt}>Load more</Txt>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.questionCtnr}>
              <Text style={styles.NoDataTxt}>No Related Questions Found</Text>
            </View>
          )}
          <TitleTxt title={'Need any help!'} />
          <View style={styles.container}>
            <View style={[css.row, css.fw, css.aic]}>
              <View style={[css.w50]}>
                <SimpleInput
                  title="First Name"
                  style={[css.mr2]}
                  value={firstName}
                  placeholder="Enter First Name"
                  onChangeText={val => setFirstName(val)}
                />
              </View>
              <View style={[css.w50]}>
                <SimpleInput
                  title="Last Name"
                  style={[css.ml2]}
                  value={lastName}
                  placeholder="Enter Last Name"
                  onChangeText={val => setLastName(val)}
                />
              </View>
              <View style={[css.w50, css.mt10]}>
                <SimpleInput
                  title="Email"
                  style={[css.mr2]}
                  autoCapitalize="none"
                  value={email}
                  placeholder="Enter Email"
                  onChangeText={val => setEmail(val)}
                />
              </View>
              <View style={[css.w50, css.mt10]}>
                <SimpleInput
                  title="Phone Number"
                  style={[css.ml2]}
                  value={phone}
                  placeholder="Enter Phone Number"
                  onChangeText={val => setPhone(val)}
                />
              </View>
              <View style={[css.w100]}>
                <SimpleInput
                  title="Message"
                  style={[css.mr2]}
                  value={message}
                  placeholder="Type here..."
                  onChangeText={val => setMessage(val)}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleDocumentUpload();
              }}
              activeOpacity={0.6}
              style={styles.uploadImageCtn}>
              <View style={styles.uploadSubContainer}>
                <ImageBackground
                  source={icons.uploadBg}
                  style={styles.uploadCtnr}>
                  <Image
                    source={documentName ? icons.docx : icons.attach}
                    style={styles.uploadIcon}
                  />
                </ImageBackground>
              </View>
              {documentName ? (
                <Txt style={[css.fs18, css.semiBold, css.ml2]}>
                  {documentName}
                </Txt>
              ) : (
                <>
                  <Txt
                    style={{
                      fontFamily: fonts.Medium,
                      color: '#444444',
                      fontSize: 20,
                      marginLeft: 12,
                    }}>
                    Attach File
                  </Txt>
                  <Txt
                    style={{
                      fontFamily: fonts.Medium,
                      color: '#9A9A9A',
                      fontSize: 19,
                      marginLeft: 10,
                    }}>
                    Maximum Size 5MB (.docx, .doc)
                  </Txt>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSubmit()}
              style={styles.btn}>
              <Text style={styles.btnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        backdropOpacity={0.8}
        isVisible={isModalVisible}
        style={[css.m0, css.center]}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={[styles.closeBtnCtnr]}
            activeOpacity={0.9}
            onPress={() => setIsModalVisible(false)}>
            <Image source={icons.closeBtn} style={[styles.closeBtn]} />
          </TouchableOpacity>
          <Image source={images.ThumpsUp} style={styles.thumpsUp} />
          <Txt style={[styles.headerText, css.tac]}>Thank You</Txt>
          <Txt style={[styles.subHeaderText, css.mt1, css.tac]}>
            Thank you for contact us!
          </Txt>
        </View>
      </Modal>
    </SafeView>
  );
};

export default HelpnSupport;

const styles = StyleSheet.create({
  questionCtnr: {
    backgroundColor: colors.white,
    width: '100%',
    paddingTop: normalize(18),
    paddingHorizontal: normalize(15),
    marginTop: normalize(8),
    borderRadius: normalize(5),
    paddingBottom: normalize(8),
  },
  question: {
    fontFamily: fonts.Regular,
    color: colors.primary,
    fontSize: normalize(7),
    fontWeight: '500',
  },
  answer: {
    fontFamily: fonts.Regular,
    color: colors.secondaryTextColor,
    fontSize: normalize(7),
    fontWeight: '500',
  },
  questionStyle: {
    paddingBottom: normalize(9),
    borderBottomWidth: normalize(1),
    marginBottom: normalize(9),
    borderColor: '#E6E6E6',
  },
  btn: {
    alignSelf: 'flex-start',
    height: 55,
    backgroundColor: colors.primary,
    borderRadius: 6,
    marginTop: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  btnTxt: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '500',
  },
  container: {
    paddingTop: normalize(12),
    paddingHorizontal: normalize(8),
    backgroundColor: colors.white,
    marginTop: normalize(12),
    borderRadius: normalize(5),
    paddingBottom: normalize(5),
  },
  InputField: {
    width: '50%',
    padding: normalize(10),
  },
  fieldTitle: {
    fontFamily: fonts.Regular,
    fontSize: normalize(9),
    color: colors.primary,
  },
  input: {
    height: normalize(30),
    width: '100%',
    fontFamily: fonts.Regular,
    fontSize: normalize(10),
    color: colors.secondaryTextColor,
    borderBottomWidth: normalize(1),
    borderColor: '#E5E5E5',
    fontWeight: '500',
    paddingBottom: normalize(3),
  },
  uploadImageCtn: {
    paddingVertical: 20,
    paddingLeft: 35,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#C5C5C5',
    marginTop: 30,
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    minHeight: 150,
  },
  uploadSubContainer: {
    height: 90,
    width: 90,
    borderRadius: 50,
    backgroundColor: '#EAEBEC',
    alignItems: 'center',
  },
  uploadCtnr: {
    height: 155,
    width: 155,
    resizeMode: 'contain',
    position: 'absolute',
    top: 12,
  },
  uploadIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    position: 'absolute',
    left: 59,
    top: 15,
  },
  categoryBtn: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginRight: normalize(5),
    borderRadius: normalize(20),
  },
  categoryTxt: {
    fontSize: 17,
    fontFamily: fonts.SemiBold,
  },
  modal: {
    backgroundColor: colors.bgColor,
    borderRadius: normalize(3),
    width: '87%',
    paddingVertical: normalize(27),
    paddingHorizontal: normalize(12),
    alignItems: 'center',
  },
  closeBtnCtnr: {
    position: 'absolute',
    top: -32,
    right: -70,
  },
  closeBtn: {
    height: normalize(55),
    width: normalize(55),
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 20,
    color: colors.primaryTextColor,
    fontWeight: '600',
  },
  thumpsUp: {
    height: normalize(70),
    width: normalize(70),
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: fonts.SemiBold,
    fontSize: 30,
    color: colors.primaryTextColor,
    marginTop: normalize(5),
  },
  subHeaderText: {
    fontFamily: fonts.Regular,
    fontSize: 25,
    color: colors.secondaryTextColor,
  },
  NoDataTxt: {
    fontFamily: fonts.Regular,
    fontSize: 22,
    textAlign: 'center',
    color: colors.secondaryTextColor,
    paddingBottom: 18,
  },
});
