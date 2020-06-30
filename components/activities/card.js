import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Card({ activity }) {
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
            <View
                // colors={['rgba(169,69,71,1)', 'rgba(185,88,94,1)']}
                // colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.85)']}
                // start={[0.8, 0.2]}
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
            </View>
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {itemDate(activity.date)}

                <View style={styles.activityValues}>
                    <View style={styles.item}>
                        <Text style={styles.itemLabel}>Distans:</Text>
                        <Text style={styles.itemValue}>
                            {activity.distance.toFixed(2)} km
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemLabel}>Tempo:</Text>
                        <Text style={styles.itemValue}>
                            {activity.speed} min/km
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemLabel}>Tid:</Text>
                        <Text style={styles.itemValue}>{activity.time}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        elevation: 2,
        backgroundColor: '#282828',
        marginVertical: 2.5,
        paddingVertical: 5,
        borderRadius: 3,
        marginHorizontal: 5,
    },
    cardContent: {
        // marginHorizontal: 17.5,
        // marginVertical: 17.5,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        borderColor: '#212121',
    },
    dateHighlight: {
        fontSize: 16,
        marginTop: -4,
        color: '#fff',
        fontWeight: 'bold',
    },
    dateText: {
        color: '#eee',
    },
    activityValues: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    item: {
        flexDirection: 'column',
        minWidth: 80,
    },
    itemLabel: {
        fontSize: 12,
        color: '#bbb',
    },
    itemValue: {
        fontSize: 16,
        fontWeight: '400',
        color: '#eee',
    },
});
