import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import colors from '../config/colors'

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.userText}>{item.user.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            <View style={styles.descContainer}>
                                <Text style={styles.captionUser}>{item.user.name}:</Text>
                                <Text style={styles.captionText}>{item.caption}</Text>
                            </View>
                            <Text
                                style={styles.comment}
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                            </Text>
                            { item.currentUserLike ?
                                (
                                    <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => onDislikePress(item.user.uid, item.id)}
                                    >
                                        <Text style={styles.buttonText}>Dislike</Text>
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => onLikePress(item.user.uid, item.id)}
                                    >
                                        <Text style={styles.buttonText}>Like</Text>
                                    </TouchableOpacity>
                                )
                            }
                            
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
        alignSelf: 'center',
        marginHorizontal: 10,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '100%'
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    captionText: {
        fontSize: 16,
        fontWeight: '300',
        color: colors.black
    },
    captionUser: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secondary
    },
    comment: {
        flex: 1,
        marginTop: -5,
        paddingLeft: 10
    },
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3,
        backgroundColor: colors.white,
        paddingHorizontal: 5
    },
    descContainer: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
    },
    userText: {
        flex: 1,
        color: colors.secondary,
        fontSize: 18,
        paddingLeft: 10,
        marginVertical: 10,
        fontWeight: 'bold'
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);
