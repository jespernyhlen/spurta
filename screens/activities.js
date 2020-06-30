import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { globalStyles } from '../styles/global';
import Card from '../components/activities/card';

import * as firebase from 'firebase';

export default function Activities() {
    const [activities, setActivities] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            // Set component as mounted to avoid setting state when switching "routes"
            let isMounted = true;

            let userID = firebase.auth().currentUser.uid;
            let userEmail = firebase.auth().currentUser.email;
            console.log(userEmail);
            let activities = firebase
                .database()
                .ref('activities/' + userID + '/activities');
            activities.on('value', (snapshot) => {
                let data = snapshot.val() ? snapshot.val() : {};
                console.log(data);

                setActivities(data);
            });
            return () => (isMounted = false);
        }, [])
    );

    if (activities) {
        let activityKeys = Object.keys(activities);
        return (
            <View
                style={globalStyles.fullContainer}
                style={{ paddingVertical: 5, backgroundColor: '#121212' }}
            >
                <FlatList
                    data={activityKeys}
                    keyExtractor={(item, index) => String(Math.random())}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => console.log('heeey')}>
                            <Card activity={activities[item]} />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({});
