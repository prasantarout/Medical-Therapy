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
import React, {useState} from 'react';
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

const HelpnSupport = () => {
  const [selected, setSelected] = useState('Accounts');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const categoryData = [
    {
      id: 1,
      title: 'Accounts',
    },
    {
      id: 2,
      title: 'Payments',
    },
    {
      id: 3,
      title: 'Enrolment',
    },
    {
      id: 4,
      title: 'Service Enrolment',
    },
  ];

  const supportData = [
    {
      id: 1,
      title:
        'Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed eget augue ac tellus eleifend dapibus id eget lectus?',
      value: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,`,
    },
    {
      id: 2,
      title:
        'Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed eget augue ac tellus eleifend dapibus id eget lectus?',
      value: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,`,
    },
    {
      id: 3,
      title:
        'Q. Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed eget augue ac tellus eleifend dapibus id eget lectus?',
      value: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,`,
    },
  ];

  const InputField = props => {
    return (
      <View style={[styles.InputField, props.style]}>
        <Txt style={styles.fieldTitle}>{props.title}</Txt>
        <TextInput
          placeholder={props.placeholder}
          value={props.Value}
          onChange={props.onChange}
          style={styles.input}
        />
      </View>
    );
  };

  const supportRenderItem = ({item, index}) => {
    return <QuestionCard title={item.title} value={item.value} />;
  };

  const categoryRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelected(item.title)}
        activeOpacity={0.6}
        style={[
          styles.categoryBtn,
          {
            backgroundColor:
              selected == item.title ? colors.secondary : colors.white,
            borderWidth: selected != item.title ? normalize(1) : null,
            borderColor: selected != item.title ? colors.secondary : null,
          },
        ]}>
        <Txt
          style={[
            styles.categoryTxt,
            {
              color: selected == item?.title ? colors.white : colors.secondary,
            },
          ]}>
          {item.title}
        </Txt>
      </TouchableOpacity>
    );
  };

  return (
    <SafeView>
      <NavBar />
      <ScrollView
        style={{paddingBottom: normalize(35)}}
        showsVerticalScrollIndicator={false}>
        <View
          style={[css.px5, css.f1, css.bgColor, {paddingTop: normalize(18)}]}>
          <TitleTxt title={'Help & Support'} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={{marginTop: normalize(11), marginBottom: normalize(8)}}
            data={categoryData}
            renderItem={categoryRenderItem}
          />
          <View style={styles.questionCtnr}>
            <FlatList
              data={supportData}
              renderItem={supportRenderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Txt style={styles.btnTxt}>Load more</Txt>
          </TouchableOpacity>
          <TitleTxt title={'Need any help!'} />
          <View style={styles.container}>
            <View style={[css.row, css.jcsb]}>
              <InputField
                title={'First Name'}
                placeholder={'Jhon'}
                Value={firstName}
                onChange={val => setFirstName(val)}
              />
              <InputField
                title={'Last Name'}
                placeholder={'Doe'}
                Value={lastName}
                onChange={val => setLastName(val)}
              />
            </View>
            <View style={[css.row, css.jcsb]}>
              <InputField
                title={'Email'}
                placeholder={'johndoe@gmail.com'}
                Value={email}
                onChange={val => setEmail(val)}
              />
              <InputField
                title={'Phone Number'}
                placeholder={'+1 123 321 4567'}
                Value={phone}
                onChange={val => setPhone(val)}
              />
            </View>

            <InputField
              title={'Message'}
              placeholder={'Type here'}
              Value={message}
              style={{width: '100%'}}
              onChange={val => setMessage(val)}
            />

            <TouchableOpacity activeOpacity={0.6} style={styles.uploadImageCtn}>
              <View style={styles.uploadSubContainer}>
                <ImageBackground
                  source={icons.uploadBg}
                  style={styles.uploadCtnr}>
                  <Image source={icons.attach} style={styles.uploadIcon} />
                </ImageBackground>
              </View>
              <Txt
                style={{
                  fontFamily: fonts.Regular,
                  color: '#444444',
                  fontWeight: '500',
                  fontSize: normalize(8),
                  marginLeft: normalize(8),
                }}>
                Upload Image
              </Txt>
              <Txt
                style={{
                  fontFamily: fonts.Regular,
                  color: '#9A9A9A',
                  fontWeight: '500',
                  fontSize: normalize(7),
                  marginLeft: normalize(5),
                }}>
                Maximum Size 5MB (.docx, .doc)
              </Txt>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsModalVisible(true)}
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
    width: '25%',
    height: normalize(23),
    backgroundColor: colors.primary,
    borderRadius: normalize(4),
    marginTop: normalize(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(20),
    marginLeft: normalize(10),
  },
  btnTxt: {
    color: colors.white,
    fontSize: normalize(8),
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
    paddingVertical: normalize(12),
    paddingLeft: normalize(15),
    width: '93%',
    borderWidth: normalize(1),
    borderStyle: 'dashed',
    borderRadius: normalize(5),
    alignItems: 'center',
    borderColor: '#C5C5C5',
    marginLeft: normalize(10),
    marginTop: normalize(10),
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
  },
  uploadSubContainer: {
    height: normalize(45),
    width: normalize(45),
    borderRadius: normalize(50),
    backgroundColor: '#EAEBEC',
    alignItems: 'center',
  },
  uploadCtnr: {
    height: normalize(65),
    width: normalize(65),
    resizeMode: 'contain',
    position: 'absolute',
    top: normalize(9),
  },
  uploadIcon: {
    height: normalize(15),
    width: normalize(15),
    resizeMode: 'contain',
    position: 'absolute',
    left: normalize(25),
    top: normalize(6),
  },
  categoryBtn: {
    paddingHorizontal: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(6),
    marginRight: normalize(5),
    borderRadius: normalize(20),
  },
  categoryTxt: {
    fontWeight: '600',
    fontSize: normalize(7),
    fontFamily: fonts.Regular,
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
    top: -38,
    right: -78,
  },
  closeBtn: {
    height: normalize(55),
    width: normalize(55),
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: normalize(12),
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
    fontSize: normalize(15),
    color: colors.primaryTextColor,
    marginTop: normalize(5),
  },
  subHeaderText: {
    fontFamily: fonts.Regular,
    fontSize: normalize(10),
    color: colors.secondaryTextColor,
  },
});
