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
import { MaterialIcons } from '@expo/vector-icons';

import * as firebase from 'firebase';
import { FlatButton, HomeButton } from '../shared/button';

export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false,
        };
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    registerUser = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!');
        } else {
            this.setState({
                isLoading: true,
            });
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName,
                    });
                    console.log('User registered successfully!');
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: '',
                    });
                    this.props.navigation.navigate('Login');
                })
                .catch((error) =>
                    this.setState({ errorMessage: error.message })
                );
        }
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size='large' color='#9E9E9E' />
                </View>
            );
        }
        return (
            <ImageBackground
                source={{
                    uri:
                        'https://images.pexels.com/photos/2284163/pexels-photo-2284163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                }}
                style={styles.container}
                blurRadius={1.5}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient
                        colors={['rgba(36,33,52,0.3)', 'rgba(10,10,30,0.9)']}
                        start={[-0.1, 0.1]}
                        style={{ flex: 1 }}
                        style={styles.gradientWrapper}
                    >
                        <View style={styles.container}>
                            <View style={styles.inputItem}>
                                <MaterialIcons
                                    name='person'
                                    size={18}
                                    color='#aaa'
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder='Namn'
                                    value={this.state.displayName}
                                    onChangeText={(val) =>
                                        this.updateInputVal(val, 'displayName')
                                    }
                                />
                            </View>
                            <View style={styles.inputItem}>
                                <MaterialIcons
                                    name='email'
                                    size={18}
                                    color='#aaa'
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder='E-post'
                                    value={this.state.email}
                                    onChangeText={(val) =>
                                        this.updateInputVal(val, 'email')
                                    }
                                />
                            </View>
                            <View style={styles.inputItem}>
                                <MaterialIcons
                                    name='lock'
                                    size={18}
                                    color='#aaa'
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder='Lösenord'
                                    value={this.state.password}
                                    onChangeText={(val) =>
                                        this.updateInputVal(val, 'password')
                                    }
                                    maxLength={15}
                                    secureTextEntry={true}
                                />
                            </View>

                            <HomeButton
                                text='Registrera dig'
                                color='green'
                                onPress={() => this.registerUser()}
                            />

                            <View style={styles.loginTextContainer}>
                                <Text style={styles.loginText}>
                                    Har du redan en användare?
                                </Text>
                                <Text
                                    style={{
                                        ...styles.loginText,
                                        ...styles.loginLink,
                                    }}
                                    onPress={() =>
                                        this.props.navigation.navigate('Login')
                                    }
                                >
                                    Logga in
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
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
    },
    gradientWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 30,
    },
    inputItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 2,
    },
    inputIcon: {
        paddingLeft: 12,
    },
    inputStyle: {
        padding: 10,
        color: '#fff',
    },
    loginTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: '#bbb',
        marginTop: 25,
        textAlign: 'center',
        marginHorizontal: 2,
    },
    loginLink: {
        color: '#fff',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
