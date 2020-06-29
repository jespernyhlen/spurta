import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
    ImageBackground,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import { HomeButton, HomeButtonOpacity } from '../shared/button';

import { AsyncStorage } from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <ImageBackground
                source={{
                    uri:
                        'https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                }}
                style={styles.container}
                blurRadius={1}
            >
                <LinearGradient
                    colors={['rgba(36,33,52,0.3)', 'rgba(10,10,30,0.85)']}
                    start={[0.1, 0.3]}
                    style={styles.inputContainer}
                >
                    <Text style={styles.headerMainText}>springa</Text>
                    <Text style={styles.headerText}>
                        Gå med för att enkelt spåra din utveckling som löpare.
                    </Text>

                    <HomeButton
                        text='Logga in'
                        color='green'
                        onPress={() => this.props.navigation.navigate('Login')}
                    />

                    <HomeButtonOpacity
                        text='Registrera dig'
                        color='green'
                        onPress={() => this.props.navigation.navigate('Signup')}
                    />
                </LinearGradient>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    headerMainText: {
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 30,
    },
});
