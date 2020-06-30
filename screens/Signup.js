import React, { useState } from 'react';
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
import { MD5 } from '../utils/utils';

export default function Signup({ navigation }) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let registerUser = () => {
        if (email === '' && password === '') {
            Alert.alert('Enter details to signup!');
        } else {
            setIsLoading(true);

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: displayName,
                        photoURL:
                            'https://www.gravatar.com/avatar/' +
                            MD5(email) +
                            '?s=200',
                    });
                    console.log('User registered successfully!');
                    setDisplayName('');
                    setEmail('');
                    setPassword('');
                })
                .catch((error) => {
                    console.log(error.message);
                    Alert.alert(error.message);
                });
            setIsLoading(false);
        }
    };

    if (isLoading) {
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
                                value={displayName}
                                onChangeText={(val) => setDisplayName(val)}
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
                                value={email}
                                onChangeText={(val) => setEmail(val)}
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
                                value={password}
                                onChangeText={(val) => setPassword(val)}
                                maxLength={15}
                                secureTextEntry={true}
                            />
                        </View>

                        <HomeButton
                            text='Registrera dig'
                            color='green'
                            onPress={() => registerUser()}
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
                                onPress={() => navigation.navigate('Login')}
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
        width: '100%',
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
