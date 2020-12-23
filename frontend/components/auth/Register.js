import React, { Component } from 'react'
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'

import colors from '../config/colors'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
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
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>
                        Name
                    </Text>
                    <View style={styles.inputArea}>
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor='#fff'
                            style={styles.text_input}
                            onChangeText={(name) => this.setState({ name })}
                        />
                    </View>
                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>
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
                        style={styles.signupButton}
                        onPress={() => this.onSignUp()}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
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
    footer: {
        flex: 4,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    inputArea: {
        marginTop: 10,
        width: '100%',
        paddingVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 10
    },
    signupButton: {
        marginTop: 70,
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

export default Register
