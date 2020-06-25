import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export function FlatButton({ text, onPress, color }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...stylesFlat.button, ...stylesFlat[color] }}>
                <Text
                    style={{
                        ...stylesBasic.buttonText,
                    }}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export function HomeButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...stylesBasic.button, ...stylesHome.button }}>
                <Text
                    style={{
                        ...stylesBasic.buttonText,
                    }}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export function HomeButtonOpacity({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{ ...stylesBasic.button, ...stylesHomeOpacity.button }}
            >
                <Text
                    style={{
                        ...stylesBasic.buttonText,
                    }}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const stylesFlat = StyleSheet.create({
    button: {
        borderRadius: 2,
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

const stylesBasic = StyleSheet.create({
    button: {
        borderRadius: 2,
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
});

const stylesHome = StyleSheet.create({
    button: {
        // backgroundColor: '#000',
        backgroundColor: '#C74752',
    },
});

const stylesHomeOpacity = StyleSheet.create({
    button: {
        borderWidth: 1.5,
        borderColor: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
});

export default {
    FlatButton,
    HomeButton,
    HomeButtonOpacity,
};
