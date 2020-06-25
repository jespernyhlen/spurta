import React, { useState, useEffect } from 'react';
import AuthContext from '../AuthContext';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import { HomeButton, HomeButtonOpacity } from '../shared/button';

export default function Logout({ navigation }) {
    const [userID, setUserID] = useState('');
    const [displayName, setDisplayName] = useState('');

    const { signOut } = React.useContext(AuthContext);

    let userSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                signOut();
            })
            .catch((error) => {
                console.log(error.message);
                Alert.alert(error.message);
            });
    };

    useEffect(() => {
        setUserID(firebase.auth().currentUser.uid);
        setDisplayName(firebase.auth().currentUser.displayName);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Hello, {displayName}</Text>
            <Text style={styles.textStyle}>UserID: {userID}</Text>
            <HomeButton text='Logga ut' onPress={() => userSignOut()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#fff',
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20,
    },
});
