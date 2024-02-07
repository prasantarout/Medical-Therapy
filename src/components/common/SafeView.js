import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import css from '../../themes/space'

const SafeView = (props) => {
    return (
        <SafeAreaView style={[css.f1, props.style]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[css.fg1]} stickyHeaderIndices={props.sticky} >
            <View style={[styles.avoidStatusBar]}>
                {props.children}
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SafeView

const styles = StyleSheet.create({
    avoidStatusBar: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : null,
        flex: 1,
        backgroundColor: '#f0f5fb',
    }
})