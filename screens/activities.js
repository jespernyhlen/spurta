import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import Card from '../shared/card';

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

    function toLocalDate(epoch_time) {
        let days = {
            0: 'Söndag',
            1: 'Måndag',
            2: 'Tisdag',
            3: 'Onsdag',
            4: 'Torsdag',
            5: 'Fredag',
            6: 'Lördag',
        };
        // for eg. epoch_time = 1487086694.213
        let date = new Date(epoch_time);
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDay();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let weekDay = days[day];
        let dateString =
            year +
            '-' +
            (month < 10 ? '0' : '') +
            month +
            '-' +
            (day < 10 ? '0' : '') +
            day;

        let timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes;
        return [weekDay, dateString, timeString];
    }

    let itemDate = (date) => {
        let dateArray = toLocalDate(date);
        console.log(dateArray);
        return (
            <LinearGradient
                // colors={['rgba(169,69,71,1)', 'rgba(185,88,94,1)']}
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.85)']}
                start={[0.8, 0.2]}
                style={styles.dateRow}
            >
                <Text style={{ ...styles.item, ...styles.dateHighlight }}>
                    {dateArray[0]}
                </Text>
                <Text style={{ ...styles.item, ...styles.dateText }}>
                    {dateArray[1]}
                </Text>
                <Text style={{ ...styles.item, ...styles.dateText }}>
                    {dateArray[2]}
                </Text>
            </LinearGradient>
        );
    };

    if (activities) {
        let activityKeys = Object.keys(activities);
        return (
            <View
                style={globalStyles.fullContainer}
                style={{ marginVertical: 5 }}
            >
                <FlatList
                    data={activityKeys}
                    keyExtractor={(item, index) => Math.random()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => console.log('heeey')}>
                            <Card>
                                {itemDate(activities[item].date)}

                                <View style={styles.activityValues}>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLabel}>
                                            Distans:
                                        </Text>
                                        <Text style={styles.itemValue}>
                                            {activities[item].distance.toFixed(
                                                2
                                            )}{' '}
                                            km
                                        </Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLabel}>
                                            Tempo:
                                        </Text>
                                        <Text style={styles.itemValue}>
                                            {activities[item].speed} min/km
                                        </Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.itemLabel}>
                                            Tid:
                                        </Text>
                                        <Text style={styles.itemValue}>
                                            {activities[item].time}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        borderColor: '#888',
        backgroundColor: '#ddd',
    },
    dateHighlight: {
        fontSize: 16,
        marginTop: -4,
        color: '#fff',
    },
    dateText: {
        color: '#eee',
    },
    activityValues: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'column',
        minWidth: 80,
    },
    itemLabel: {
        fontSize: 12,
        color: '#888',
    },
    itemValue: {
        fontSize: 16,
        fontWeight: '400',
    },
});
