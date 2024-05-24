import {ScrollView, StyleSheet, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../../components/common/SafeView';
import NavBar from '../../../components/common/NavBar';
import css, {height} from '../../../themes/space';
import TitleTxt from '../../../components/common/TitleTxt';
import Txt from '../../../components/micro/Txt';
import {NotificationList} from '../../../utils/LocalData';
import NotificationCard from '../../../components/common/NotificationCard';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {notificationListRequest} from '../../../redux/reducer/AuthReducer';
import normalize from '../../../utils/normalize';
import moment from 'moment';
import {colors} from '../../../themes/colors';

const Notification = props => {
  const [notificationList, setNotificationList] = useState([]);
  const AuthReducer = useSelector(state => state.AuthReducer);
  // console.log(AuthReducer?.NotificationListRes, '?????????');
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(notificationListRequest());
      return () => {};
    }, []),
  );

  const notificationListRender = ({item, index}) => {
    return (
      <View style={[css.mb3]}>
        <NotificationCard
          image={item?.profilePic}
          title={item?.name}
          info={item?.title}
          description={item?.desc}
          time={item?.time}
        />
      </View>
    );
  };
  return (
    <SafeView {...props}>
      <View style={[css.px5, css.f1]}>
        <TitleTxt title={'Notification'} />
        <Txt style={[css.fs16, css.semiBold]}>
          {moment().format('MMM Do YY')}
        </Txt>
        <View style={[css.f1]}>
          <FlatList
            data={
              AuthReducer?.NotificationListRes?.data?.length > 0
                ? AuthReducer?.NotificationListRes?.data
                : []
            }
            renderItem={notificationListRender}
            ListEmptyComponent={() => {
              return (
                <View style={[css.f1, css.center, {marginTop: height / 2.5}]}>
                  <Txt
                    style={[
                      css.fs20,
                      css.semiBold,
                      {color: colors.searchPlaceholder},
                    ]}>
                    Not Yet found any notification
                  </Txt>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
