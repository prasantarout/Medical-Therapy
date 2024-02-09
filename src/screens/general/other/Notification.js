import { ScrollView, StyleSheet, FlatList, View } from 'react-native'
import React from 'react'
import SafeView from '../../../components/common/SafeView'
import NavBar from '../../../components/common/NavBar'
import css from '../../../themes/space'
import TitleTxt from '../../../components/common/TitleTxt'
import Txt from '../../../components/micro/Txt'
import { NotificationList } from '../../../utils/LocalData'
import NotificationCard from '../../../components/common/NotificationCard'

const Notification = (props) => {

    const notificationListRender = ({ item, index }) => {
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
        )
    }
    return (
        <SafeView>
            
            <View style={[css.px5, css.f1]}>
                <TitleTxt title={'Notification'} />
                <Txt style={[css.fs16, css.semiBold]} >3rd Feb, 2024</Txt>
                <View style={[css.f1]} >
                    <FlatList
                        data={NotificationList}
                        renderItem={notificationListRender} />
                </View>
            </View>
        </SafeView>
    )
}

export default Notification

const styles = StyleSheet.create({})