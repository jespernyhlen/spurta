import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export function FlatButton({ text, onPress, color }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...stylesFlat.button, ...stylesFlat[color] }}>
                <Text style={stylesFlat.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function HomeButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...stylesHome.button }}>
                <Text style={stylesHome.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function HomeButtonOpacity({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...stylesHomeOpacity.button }}>
                <Text style={stylesHome.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const stylesFlat = StyleSheet.create({
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

const stylesHome = StyleSheet.create({
    button: {
        borderRadius: 2,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 7.5,
        backgroundColor: '#C74752',

        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 1,
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

const stylesHomeOpacity = StyleSheet.create({
    button: {
        borderRadius: 2,
        borderWidth: 1.5,
        borderColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 7.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 22,
        textAlign: 'center',
        letterSpacing: 1,
    },
    green: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    orange: {
        backgroundColor: '#FFB904',
    },
});

export default {
    FlatButton,
    HomeButton,
    HomeButtonOpacity,
};
