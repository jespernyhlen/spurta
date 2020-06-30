import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import UserContext from './UserContext';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import drawerNavigator from './routes/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import drawerNavigator from './routes/drawer2';
import * as firebase from 'firebase';
import { MaterialIcons, Foundation } from '@expo/vector-icons';
import { DrawerContent } from './screens/DrawerContent';

import activitiesNavigator from './routes/activitiesStack';
import activityNavigator from './routes/activityStack';
import loginNavigator from './routes/loginStack';
import logoutNavigator from './routes/logoutStack';

// Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: 'example',
//     authDomain: 'exampe',
//     databaseURL: 'example',
//     projectId: 'example',
//     storageBucket: 'example',
//     messagingSenderId: 'example',
//     appId: 'example',
// };
var firebaseConfig = {
    apiKey: 'AIzaSyBI9GM35y1lVMz8S7CLfmzbXpilUOIHg_I',
    authDomain: 'spurta-0280.firebaseapp.com',
    databaseURL: 'https://spurta-0280.firebaseio.com',
    projectId: 'spurta-0280',
    storageBucket: 'spurta-0280.appspot.com',
    messagingSenderId: '27895407077',
    appId: '1:27895407077:web:0ef5d9d59cdd8784554f0c',
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const Drawer = createDrawerNavigator();

const getFonts = () =>
    Font.loadAsync({
        'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
        'nunito-extrabold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    });

const initialUserState = {
    username: '',
    email: '',
    loggedIn: false,
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [user, setUser] = useState(initialUserState);

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#fff',
        },
    };

    const theme = CustomDefaultTheme;

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    username: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    loggedIn: true,
                });
            } else {
                setUser(initialUserState);
            }
        });

        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
                console.log('Restoring token failed');
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    if (fontLoaded) {
        const screenWidth = Dimensions.get('screen').width;
        return (
            <UserContext.Provider value={{ userInfo: user }}>
                {user.loggedIn ? (
                    <NavigationContainer theme={theme}>
                        <Drawer.Navigator
                            initialRouteName='Löpning'
                            drawerStyle={{
                                backgroundColor: '#181818',
                                width: screenWidth - screenWidth / 10,
                            }}
                            // drawerContentOptions={drawerContentOptions}
                            drawerContent={(props) => (
                                <DrawerContent {...props} />
                            )}
                        >
                            <Drawer.Screen
                                name='ActivityHome'
                                component={activityNavigator}
                            />
                            <Drawer.Screen
                                name='Activities'
                                component={activitiesNavigator}
                            />
                            <Drawer.Screen
                                name='Logout'
                                component={logoutNavigator}
                            />
                        </Drawer.Navigator>
                    </NavigationContainer>
                ) : (
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName='Login'>
                            <Drawer.Screen
                                name='Logga in'
                                component={loginNavigator}
                                options={{
                                    gestureEnabled: false,
                                    swipeEnabled: false,
                                }}
                            />
                        </Drawer.Navigator>
                    </NavigationContainer>
                )}
            </UserContext.Provider>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontLoaded(true)}
            />
        );
    }
}
