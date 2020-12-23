import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

import firebase from 'firebase';
import colors from '../config/colors';
require('firebase/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Search</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Type Here..."
                        placeholderTextColor='#fff'
                        style={styles.text_input}
                        onChangeText={(search) => fetchUsers(search)} />
                </View>

                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={users}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                            <Text style={styles.text_result}>{item.name}</Text>
                        </TouchableOpacity>

                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    inputArea: {
        width: '100%',
        paddingVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 10
    },
    text_header: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 30
    },
    text_input: {
        color: colors.white,
        paddingLeft: 10
    },
    text_result: {
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secondary
    },
    footer: {
        flex: 9,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
})
