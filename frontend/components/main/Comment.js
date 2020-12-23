import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../../redux/actions/index'
import colors from '../config/colors'

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }


        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments)
                })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, props.users])


    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.footer}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={comments}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            {item.user !== undefined ?
                                <Text style={styles.commentUser}>
                                    {item.user.name} :
                                </Text>
                                : null}
                            <Text style={styles.commentText}>{item.text}</Text>
                        </View>
                    )}
                />
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.text_input}
                        placeholder='Write Comment'
                        placeholderTextColor='#fff'
                        onChangeText={(text) => setText(text)} />
                </View>
                <TouchableOpacity
                    style={styles.postButton}
                    onPress={() => onCommentSend()}
                >
                    <Text style={styles.buttonText}>Post Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    commentContainer: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    commentText: {
        fontSize: 16,
        fontWeight: '300',
        color: colors.black
    },
    commentUser: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secondary
    },
    container: {
        flex: 1, 
        backgroundColor: colors.primary
    },
    footer: {
        flex: 9,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        height: 70,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    inputArea: {
        flex: 1,
        width: '95%',
        paddingVertical: 5,
        marginHorizontal: 5,
        backgroundColor: 'grey',
    },
    postButton: {
        marginTop: 300,
        backgroundColor: colors.secondary,
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 15,
        width: '90%',
        marginVertical: 10,
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
    
})

const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);
