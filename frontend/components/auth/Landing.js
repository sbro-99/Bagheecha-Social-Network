import React from 'react'
import { Text, View, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

export default function Landing({ navigation }) {
    return (
        <ImageBackground
            style={styles.background}
            source = {require('../../assets/welcomeBackground.jpg')}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/bagheechaLogo.png')}/>
                <Text style={styles.logoText}>Bagheecha</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style = {styles.registerButton}
                    onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    
    background: {
        flex: 1,
        paddingBottom: 100,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    buttonsContainer: {
        paddingHorizontal: 10,
        width: '100%',
        height: 70,
    },
    loginButton: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10,
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoContainer: {
        position: "absolute",
        top: 80,
        alignItems: 'center',
    },
    logoText: {
        color: colors.black,
        textShadowColor: colors.white,
        textShadowRadius: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    registerButton: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})
