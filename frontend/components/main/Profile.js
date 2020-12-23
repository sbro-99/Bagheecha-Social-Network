import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import colors from '../config/colors'

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={styles.userText}>{user.name}</Text>
                <Text style={styles.emailText}>{user.email}</Text>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => onUnfollow()}
                            >
                                <Text style={styles.buttonText}>Following</Text>
                            </TouchableOpacity>
                        ) :
                        (
                            <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => onFollow()}
                            >
                                <Text style={styles.buttonText}>Follow</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) :
                    <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onLogout()}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>

                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    actionButton: {
        marginTop: 20,
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '100%',
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    containerInfo: {
        margin: 20,
        paddingVertical: 10
    },
    containerGallery: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: colors.white
    },
    containerImage: {
        flex: 1 / 3,
        marginHorizontal: 5
    },
    emailText: {
        color: colors.white
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    userText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 30
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);
