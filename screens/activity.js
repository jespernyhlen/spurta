import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { globalStyles, images } from '../styles/global';
import {
    getDistance,
    avgTempo,
    msToMin,
    minToMinSec,
    mpsToMinutesPerKm,
    meterToKilometer,
} from '../utils/utils';
import * as firebase from 'firebase';
import { FlatButton } from '../shared/button';

export default function Activity({ route, navigation }) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [distance, setDistance] = useState(1000);

    const [activityInfo, setActivityInfo] = useState({
        speed: null,
        lat: null,
        lon: null,
        time: null,
        prevLat: null,
        prevLon: null,
        prevTime: null,
    });

    let _getLocationAsync = async () => {
        let position = await Location.getCurrentPositionAsync({
            accuracy: 5,
        });
        console.log('------------------');

        return {
            speed: position.coords.speed,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            time: position.timestamp,
        };
    };

    useFocusEffect(
        React.useCallback(() => {
            // Set component as mounted to avoid setting state when switching "routes"
            let isMounted = true;

            // Start time when tracking starts
            setStartTime(!startTime ? Date.now() : startTime);

            (async () => {
                let { status } = await Permissions.askAsync(
                    Permissions.LOCATION
                );
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                } else {
                    setTimeout(async () => {
                        let newActivityInfo = await _getLocationAsync();
                        let prevLat = activityInfo.lat;
                        let prevLon = activityInfo.lon;
                        let newLat = newActivityInfo.lat;
                        let newLon = newActivityInfo.lon;
                        let newDistance = 0;

                        // If previous coords and new exists, compare to increase total distance
                        if (prevLat && prevLon && newLat && newLon) {
                            let prevCoords = {
                                lat: prevLat,
                                lon: prevLon,
                            };
                            let newCoords = {
                                lat: newLat,
                                lon: newLon,
                            };
                            newDistance = getDistance(prevCoords, newCoords);
                        }

                        // If component is still mounted, update activity information
                        if (isMounted) {
                            setDistance(distance + newDistance);

                            setActivityInfo({
                                speed: newActivityInfo.speed,
                                lat: newLat,
                                lon: newLon,
                                time: newActivityInfo.time,
                                prevLat: prevLat,
                                prevLon: prevLon,
                                prevTime: activityInfo.time,
                            });
                        }
                    }, 1000);
                }
            })();
            return () => (isMounted = false);
        }, [activityInfo])
    );

    let activityTime = '--||--';
    let activitySpeed = '--||--';
    let activityAVGSpeed = '--||--';

    if (startTime && activityInfo.time) {
        let timeInfo = minToMinSec(
            msToMin(activityInfo.time) - msToMin(startTime)
        );

        activityTime = timeInfo.minutes + ':' + timeInfo.seconds;
    }

    if (activityInfo.speed > 0.2) {
        let speedInfo = mpsToMinutesPerKm(activityInfo.speed);

        activitySpeed =
            speedInfo.minutes < 60
                ? speedInfo.minutes + ':' + speedInfo.seconds
                : '--||--';
    }

    if (distance > 1) {
        let AVGTempo = avgTempo(
            distance,
            msToMin(activityInfo.time) - msToMin(startTime)
        );

        activityAVGSpeed = AVGTempo.minutes + ':' + AVGTempo.seconds;
    }

    const handlePress = () => {
        let userID = 1;
        let activityID = 1;

        let name = 'userID';

        let activityData = {
            day: '2020-04-31',
            time: activityTime,
            speed: activityAVGSpeed,
            distance: distance,
        };

        let newActivityKey = firebase
            .database()
            .ref()
            .child('activities')
            .push().key;

        var updates = {};
        updates[
            '/activities/' + userID + '/activities/' + newActivityKey
        ] = activityData;

        firebase
            .database()
            .ref()
            .update(updates)
            .then((error) => {
                if (error) {
                    // The write failed...
                    console.log('Failed to save results to database');
                } else {
                    // Data saved successfully!
                    console.log('Successfully saved to database');
                }
            });

        console.log(distance);

        console.log(meterToKilometer(100));
    };

    return (
        <View style={globalStyles.fullContainer}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.time}>{activityTime}</Text>
                    <Text style={styles.descText}>tid</Text>
                </View>
                <View style={styles.contentHighligt}>
                    {/* <Text>{distance}</Text> */}
                    <Text style={styles.timeHighlight}>
                        {meterToKilometer(distance)}
                    </Text>
                    <Text
                        style={{
                            ...styles.descText,
                            ...styles.descTextHighlight,
                        }}
                    >
                        kilometer
                    </Text>
                </View>
                <View style={styles.contentRow}>
                    <View style={styles.content}>
                        <Text style={styles.time}>{activitySpeed}</Text>
                        <Text style={styles.descText}>aktuellt tempo</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.time}>{activityAVGSpeed}</Text>
                        <Text style={styles.descText}>medel tempo</Text>
                    </View>
                </View>
            </View>

            <FlatButton
                text='stoppa aktivitet'
                color='orange'
                onPress={() => handlePress()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    time: {
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 20,
    },
    timeHighlight: {
        fontSize: 54,
        fontWeight: '700',
        textAlign: 'center',
        color: '#000',
    },
    contentHighligt: {
        paddingVertical: 40,
        backgroundColor: '#eee',
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    content: {
        paddingVertical: 30,
    },
    descText: {
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#222',
    },
    descTextHighlight: {
        color: '#111',
        paddingBottom: 6,
    },
});

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, Button, Image } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
// import { globalStyles, images } from '../styles/global';
// import {
//     getDistance,
//     minToMinSec,
//     mpsToMinutesPerKm,
//     meterToKilometer,
// } from '../utils/utils';

// import FlatButton from '../shared/button';

// export default function Activity({ route, navigation }) {
//     const [errorMsg, setErrorMsg] = useState(null);
//     const [startTime, setStartTime] = useState(null);
//     const [distance, setDistance] = useState(0);

//     const [activityInfo, setActivityInfo] = useState({
//         speed: null,
//         lat: null,
//         lon: null,
//         time: null,
//         prevLat: null,
//         prevLon: null,
//         prevTime: null,
//     });

//     let _getLocationAsync = async () => {
//         let position = await Location.getCurrentPositionAsync({
//             accuracy: 5,
//         });

//         return {
//             speed: position.coords.speed,
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//             time: position.timestamp,
//         };
//     };

//     useFocusEffect(
//         React.useCallback(() => {
//             setStartTime(!startTime ? Date.now() : startTime);
//             (async () => {
//                 let { status } = await Permissions.askAsync(
//                     Permissions.LOCATION
//                 );
//                 if (status !== 'granted') {
//                     setErrorMsg('Permission to access location was denied');
//                 } else {
//                     let newActivityInfo = await _getLocationAsync();
//                     setTimeout(() => {
//                         console.log('-----------------NEW----------------');
//                         console.log(newActivityInfo.lat);
//                         console.log(newActivityInfo.lon);
//                         console.log('------OLD-----');
//                         console.log(activityInfo.lat);
//                         console.log(activityInfo.lon);
//                         console.log('Old Distance: ' + distance);

//                         let prevLat = activityInfo.lat;
//                         let prevLon = activityInfo.lon;
//                         let newLat = newActivityInfo.lat;
//                         let newLon = newActivityInfo.lon;
//                         let newDistance = 0;

//                         if (prevLat && prevLon && newLat && newLon) {
//                             let prevCoords = {
//                                 lat: prevLat,
//                                 lon: prevLon,
//                             };
//                             let newCoords = {
//                                 lat: newLat,
//                                 lon: newLon,
//                             };
//                             newDistance = getDistance(prevCoords, newCoords);

//                             console.log('New Distance: ' + newDistance);
//                             console.log(
//                                 'Total Distance: ' + (distance + newDistance)
//                             );
//                         }
//                         setDistance(distance + newDistance);

//                         setActivityInfo({
//                             speed: newActivityInfo.speed,
//                             lat: newLat,
//                             lon: newLon,
//                             time: newActivityInfo.time,
//                             prevLat: prevLat,
//                             prevLon: prevLon,
//                             prevTime: activityInfo.time,
//                         });
//                     }, 2000);
//                 }
//             })();
//         }, [activityInfo])
//     );

//     return (
//         <View style={globalStyles.fullContainer}>
//             <View style={styles.container}>
//                 <View style={styles.content}>
//                     <Text style={styles.time}>
//                         {startTime && activityInfo.time
//                             ? minToMinSec(
//                                   activityInfo.time - startTime
//                               )
//                             : '--||--'}
//                     </Text>
//                     <Text style={styles.descText}>tid</Text>
//                 </View>
//                 <View style={styles.contentHighligt}>
//                     {/* <Text>{distance}</Text> */}
//                     <Text style={styles.timeHighlight}>
//                         {meterToKilometer(distance)}
//                     </Text>
//                     <Text
//                         style={{
//                             ...styles.descText,
//                             ...styles.descTextHighlight,
//                         }}
//                     >
//                         kilometer
//                     </Text>
//                 </View>
//                 <View style={styles.contentRow}>
//                     <View style={styles.content}>
//                         <Text style={styles.time}>
//                             {activityInfo.speed > 0.2
//                                 ? mpsToMinutesPerKm(activityInfo.speed)
//                                 : '--||--'}
//                         </Text>
//                         <Text style={styles.descText}>aktuellt tempo</Text>
//                     </View>
//                     <View style={styles.content}>
//                         <Text style={styles.time}>8:21</Text>
//                         <Text style={styles.descText}>medel tempo</Text>
//                     </View>
//                 </View>
//             </View>

//             <FlatButton
//                 text='stoppa'
//                 color='orange'
//                 onPress={() => {
//                     navigation.navigate('Home');
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'space-evenly',
//     },
//     time: {
//         fontSize: 36,
//         fontWeight: '700',
//         textAlign: 'center',
//         marginTop: 20,
//     },
//     timeHighlight: {
//         fontSize: 54,
//         fontWeight: '700',
//         textAlign: 'center',
//         color: '#000',
//     },
//     contentHighligt: {
//         paddingVertical: 40,
//         backgroundColor: '#eee',
//     },
//     contentRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//     },
//     content: {
//         paddingVertical: 30,
//     },
//     descText: {
//         fontSize: 14,
//         textAlign: 'center',
//         textTransform: 'uppercase',
//         letterSpacing: 1,
//         color: '#222',
//     },
//     descTextHighlight: {
//         color: '#111',
//         paddingBottom: 6,
//     },
// });
