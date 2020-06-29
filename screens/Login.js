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
import { HomeButton, HomeButtonOpacity } from '../shared/button';

import { AsyncStorage } from 'react-native';
export default function Login({ navigation }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let userLogin = (email, password) => {
        if (email === '' && password === '') {
            Alert.alert('Enter details to login!');
        } else {
            setIsLoading(true);

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    // console.log(res);
                    console.log('User logged-in successfully!');

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
                    'https://images.pexels.com/photos/421160/pexels-photo-421160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            }}
            style={styles.container}
            blurRadius={1.5}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient
                    colors={['rgba(36,33,52,0.3)', 'rgba(10,20,30,0.9)']}
                    start={[0.1, 0.2]}
                    style={{ flex: 1 }}
                    style={styles.gradientWrapper}
                >
                    <View style={styles.container}>
                        <View style={styles.inputItem}>
                            <MaterialIcons
                                name='email'
                                size={18}
                                color='#aaa'
                                style={styles.inputIcon}
                            />

                            <TextInput
                                keyboardShouldPersistTaps='handled'
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
                            text='Logga in'
                            onPress={() => userLogin(email, password)}
                        />
                        <View style={styles.loginTextContainer}>
                            <Text style={styles.loginText}>
                                Har du ingen användare?
                            </Text>
                            <Text
                                style={{
                                    ...styles.loginText,
                                    ...styles.loginLink,
                                }}
                                onPress={() => navigation.navigate('Signup')}
                            >
                                Registrera dig
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
    headerText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 50,
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
        width: '100%',
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

// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TextInput,
//     Button,
//     Alert,
//     ActivityIndicator,
//     ImageBackground,
//     Keyboard,
//     TouchableWithoutFeedback,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { MaterialIcons } from '@expo/vector-icons';
// import * as firebase from 'firebase';
// import { HomeButton, HomeButtonOpacity } from '../shared/button';

// import { AsyncStorage } from 'react-native';
// export default class Login extends Component {
//     constructor() {
//         super();
//         this.state = {
//             email: '',
//             password: '',
//             isLoading: false,
//         };
//     }

//     updateInputVal = (val, prop) => {
//         const state = this.state;
//         state[prop] = val;
//         this.setState(state);
//     };

//     userLogin = () => {
//         if (this.state.email === '' && this.state.password === '') {
//             Alert.alert('Enter details to signin!');
//         } else {
//             this.setState({
//                 isLoading: true,
//             });
//             firebase
//                 .auth()
//                 .signInWithEmailAndPassword(
//                     this.state.email,
//                     this.state.password
//                 )
//                 .then((res) => {
//                     console.log(res);
//                     console.log('User logged-in successfully!');
//                     this.setState({
//                         isLoading: false,
//                         email: '',
//                         password: '',
//                     });
//                     this.props.navigation.navigate('ActivityHome');
//                 })
//                 .catch((error) =>
//                     this.setState({ errorMessage: error.message })
//                 );
//         }
//     };

//     render() {
//         if (this.state.isLoading) {
//             return (
//                 <View style={styles.preloader}>
//                     <ActivityIndicator size='large' color='#9E9E9E' />
//                 </View>
//             );
//         }
//         return (
//             <ImageBackground
//                 source={{
//                     uri:
//                         'https://images.pexels.com/photos/421160/pexels-photo-421160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//                 }}
//                 style={styles.container}
//                 blurRadius={1.5}
//             >
//                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     <LinearGradient
//                         colors={['rgba(36,33,52,0.3)', 'rgba(10,20,30,0.9)']}
//                         start={[0.1, 0.2]}
//                         style={{ flex: 1 }}
//                         style={styles.gradientWrapper}
//                     >
//                         <View style={styles.container}>
//                             <View style={styles.inputItem}>
//                                 <MaterialIcons
//                                     name='email'
//                                     size={18}
//                                     color='#aaa'
//                                     style={styles.inputIcon}
//                                 />

//                                 <TextInput
//                                     style={styles.inputStyle}
//                                     placeholder='E-post'
//                                     value={this.state.email}
//                                     onChangeText={(val) =>
//                                         this.updateInputVal(val, 'email')
//                                     }
//                                 />
//                             </View>
//                             <View style={styles.inputItem}>
//                                 <MaterialIcons
//                                     name='lock'
//                                     size={18}
//                                     color='#aaa'
//                                     style={styles.inputIcon}
//                                 />
//                                 <TextInput
//                                     style={styles.inputStyle}
//                                     placeholder='Lösenord'
//                                     value={this.state.password}
//                                     onChangeText={(val) =>
//                                         this.updateInputVal(val, 'password')
//                                     }
//                                     maxLength={15}
//                                     secureTextEntry={true}
//                                 />
//                             </View>

//                             <HomeButton
//                                 text='Logga in'
//                                 color='green'
//                                 onPress={() => this.userLogin()}
//                             />
//                             <View style={styles.loginTextContainer}>
//                                 <Text style={styles.loginText}>
//                                     Har du ingen användare?
//                                 </Text>
//                                 <Text
//                                     style={{
//                                         ...styles.loginText,
//                                         ...styles.loginLink,
//                                     }}
//                                     onPress={() =>
//                                         this.props.navigation.navigate('Signup')
//                                     }
//                                 >
//                                     Registrera dig
//                                 </Text>
//                             </View>
//                         </View>
//                     </LinearGradient>
//                 </TouchableWithoutFeedback>
//             </ImageBackground>
//         );
//     }
// }
