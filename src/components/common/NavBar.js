import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

let halfWidth = width / 2;

const NavBar = props => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    const handleLogout = () => {
        setIsShowMenu(false)
        setTimeout(() => {
            setLogoutModal(true)
        }, 100)
    };

    return (
        <>
            <View style={[css.row, styles.navWrap, css.aic]}>
                <View style={[styles.logoArea]}>
                    <Image source={images.logo} style={[styles.imgResponsive]} />
                </View>
                <View style={[styles.rightSection, css.row, css.aic]}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("MyPatient")}>
                        <Image
                            style={[styles.cloudRefreshStyle]}
                            source={icons.cloudRefresh}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => props?.navigation?.navigate("Notification")}>
                        <Image style={[styles.iconRoundStyle]} source={icons.bell} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[css.row, css.aic]}
                        onPress={() => setIsShowMenu(!isShowMenu)}>
                        <Image
                            style={[styles.iconRoundStyle]}
                            source={{
                                uri: 'https://images.unsplash.com/photo-1532170579297-281918c8ae72?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wyMTM1OTR8fGVufDB8fHx8fA%3D%3D',
                            }}
                        />
                        <Txt style={[css.fs18, css.ml1, css.medium]}> Welcome, Manish</Txt>
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
        padding: 16,
        // height: 100,
        backgroundColor: '#fff',
        zIndex: 99,
        top: -50,
        paddingTop: 50,
    },
    logoArea: {
        maxWidth: width / 2.5,
        alignItems: 'flex-start',
    },
    imgResponsive: {
        width: normalize(110),
        height: 80,
        resizeMode: 'contain',
    },
    rightSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cloudRefreshStyle: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginLeft: normalize(10),
    },
    iconRoundStyle: {
        width: 70,
        height: 70,
        marginLeft: normalize(10),
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

