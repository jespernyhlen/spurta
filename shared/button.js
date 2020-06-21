import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function FlatButton({ text, onPress, color }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...styles.button, ...styles[color] }}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: '#13CD5D',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 5 },
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
        letterSpacing: 1,
    },
    green: {
        backgroundColor: '#13CD5D',
    },
    orange: {
        backgroundColor: '#FFB904',
    },
});
