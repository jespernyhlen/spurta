import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>{props.children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        elevation: 2,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 3,
        marginHorizontal: 5,
    },
    cardContent: {
        // marginHorizontal: 17.5,
        // marginVertical: 17.5,
    },
});
