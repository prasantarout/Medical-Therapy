import { Image, ImageBackground, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import css, { width } from '../../themes/space';
import Txt from '../micro/Txt';
import { images } from '../../themes/images';
import normalize from '../../utils/normalize';
import { icons } from '../../themes/icons';
import Divider from '../micro/Divider';
import Modal from 'react-native-modal';
import TitleTxt from './TitleTxt';
import Button from '../buttons/Button';
import useScreenDimension from '../../utils/useScreenDimension';
import { widthToDp } from '../../utils/responsive';

let halfWidth = width / 2;

const NavBar = props => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    const screenWidth = useScreenDimension()
    console.log("screenWidth", screenWidth)

    const handleLogout = () => {
        setIsShowMenu(false)
        setTimeout(() => {
            setLogoutModal(true)
        }, 100)
    };

    const iconRoundStyle = {
        width: screenWidth / 20,
        height: screenWidth / 20,
        borderRadius: screenWidth,
    }
    const cloudRefreshStyle = {
        width: screenWidth / 23,
        height: screenWidth / 23,
    }

    return (
        <>
            <View style={[css.bgWhite]} >
                <SafeAreaView/>
                <View style={[css.rowBetween, styles.navWrap, css.aic]}>
                    <View style={[styles.logoArea, {
                        width: screenWidth / 4,
                        height: screenWidth / 18,
                        // backgroundColor: 'red',
                    }]}>
                        <Image source={images.logo} style={[styles.imgResponsive]} />
                    </View>
                    <View style={[styles.rightSection, css.row, css.aic, { width: screenWidth / 2.2, height: 50 }]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.navigate("MyPatient")}
                            style={[css.row, css.aic]}
                        >
                            <Image
                                style={[styles.cloudRefreshStyle, cloudRefreshStyle]}
                                source={icons.cloudRefresh}
                                resizeMode='contain'
                            />
                            <Txt style={[css.ml1, css.mt0, css.semiBold, css.fs17]} >Sync</Txt>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => props?.navigation?.navigate("Notification")}>
                            <Image style={[styles.iconRoundStyle, iconRoundStyle]} source={icons.bell} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[css.row, css.aic]}
                            onPress={() => setIsShowMenu(!isShowMenu)}>
                            <Image
                                style={[styles.iconRoundStyle, iconRoundStyle]}
                                source={{ uri: images.sampleUser }}
                            />
                            <Txt style={[css.fs18, css.ml1, css.semiBold]}> Welcome, Loise</Txt>
                            <Image source={icons.down} style={[styles.arrowStyle]} />
                        </TouchableOpacity>
                    </View>
                    {isShowMenu ? (
                        <View style={[styles.menuStyle]}>
                            <TouchableOpacity style={[css.row, css.center, css.f1]}>
                                <Image source={icons.user} style={[styles.menuIcon]} />
                            </TouchableOpacity>
                            <Divider />
                            <TouchableOpacity style={[css.row, css.center, css.f1]} onPress={handleLogout} >
                                <Image source={icons.logout} style={[styles.menuIcon]} />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
            </View>
            {isShowMenu ? (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setIsShowMenu(false)}
                    style={[StyleSheet.absoluteFill, styles.backdrop]}
                />
            ) : null}

            <Modal isVisible={logoutModal}>
                <View style={[css.f1, css.center]}>
                    <ImageBackground resizeMode='stretch' source={images.modalBg} style={[css.p3, styles.modalPanel]} >
                        <TouchableOpacity onPress={() => setLogoutModal(false)} style={[css.closeIconWrapStyle]} >
                            <Image source={icons.closeIcon} style={[css.closeIconStyle]} />
                        </TouchableOpacity>
                        <View style={[css.center, css.py4]} >
                            <Image source={icons.off} style={[styles.logoStyle]} />
                            <TitleTxt style={[css.mt3]} title="Do You Want To Logout" />
                            <Txt style={[styles.textLighte]} >Lorem ipsum dolor sit amet, consectetur adipiscing elit sagittis.</Txt>
                        </View>
                        <View style={[css.row, css.jcc]} >
                            <Button style={[styles.btn]} title="Yes" />
                            <Button onPress={() => setLogoutModal(false)} style={[styles.btn, styles.btnlight, css.ml2]} title="Cancel" />
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </>
    );
};

export default NavBar;

const styles = StyleSheet.create({
    navWrap: {
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        zIndex: 99,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 16,
    },
    logoArea: {
        alignItems: 'flex-start',
    },
    imgResponsive: {
        width: '100%',
        height: '100%',
        minWidth: 100,
        resizeMode: 'contain',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cloudRefreshStyle: {
        resizeMode: 'contain',
        marginLeft: 16,
    },
    iconRoundStyle: {
        // width: widthToDp(5),
        // height: widthToDp(5),
        marginLeft: 16,
        borderRadius: 100,
    },
    backdrop: {
        backgroundColor: 'rgb(0, 0, 0,0.8)',
        // backgroundColor:'red',
        zIndex: 50,
    },
    menuStyle: {
        zIndex: 99,
        backgroundColor: '#fff',
        position: 'absolute',
        width: 200,
        height: 150,
        right: 54,
        top: 120,
        borderRadius: 10,
        shadowColor: 'rgb(0,0,0,0.2)',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.58,
        shadowRadius: 30.0,
        elevation: 24,
    },
    menuIcon: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
    },
    arrowStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    modalPanel: {
        minWidth: width / 2.5,
        minHeight: width / 4
    },
    logoStyle: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    textLighte: {
        color: "#747A86",
    },
    btn: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnlight: {
        backgroundColor: '#b1b2bf'
    }
});

