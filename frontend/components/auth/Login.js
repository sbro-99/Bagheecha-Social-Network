import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'

import colors from '../config/colors'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome!</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>
                        Email
                    </Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor='#fff'
                            style={styles.text_input}
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>
                        Password
                    </Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor='#fff'
                            style={styles.text_input}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => this.onSignUp()}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    container: {
        flex: 1, 
        backgroundColor: colors.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    inputArea: {
        marginTop: 10,
        width: '100%',
        paddingVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 10
    },
    footer: {
        flex: 3,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    loginButton: {
        marginTop: 130,
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10,
    },
    text_input: {
        color: colors.white,
        paddingLeft: 10
    },
    text_header: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        marginLeft: 5,
        color: colors.black,
        fontSize: 18
    }
})
export default Login
