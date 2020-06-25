import React, { useState, useEffect } from 'react';
import AuthContext from '../AuthContext';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import * as firebase from 'firebase';

import MapView from 'react-native-maps';
import { globalStyles } from '../styles/global';
import { HomeButton, FlatButton } from '../shared/button';

export default function activityHome({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    let _getLocationAsync = async () => {
        let position = await Location.getCurrentPositionAsync({
            accuracy: 5,
        });

        let currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
        };
        console.log(position.coords);

        setLocation(currentLocation);
    };
    let interval = null;

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                let { status } = await Permissions.askAsync(
                    Permissions.LOCATION
                );
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                } else {
                    interval = setInterval(() => {
                        _getLocationAsync();
                    }, 5000);
                }
            })();
            return () => clearInterval(interval);
        }, [])
    );

    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (activityInfo) {
    //     text = activityInfo.speed.toFixed(2);
    // }

    return (
        <View style={globalStyles.fullContainer}>
            {/* <Text>{text} km / h</Text> */}
            <MapView
                initialRegion={location}
                showsCompass={true}
                showsUserLocation={true}
                rotateEnabled={true}
                style={{ flex: 1 }}
            />
            <FlatButton
                text='starta aktivitet'
                color='green'
                onPress={() => {
                    navigation.navigate('Activity');
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        paddingRight: 8,
        paddingBottom: 8,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },
});
