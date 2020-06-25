import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import drawerNavigator from './routes/drawer';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'example',
    authDomain: 'exampe',
    databaseURL: 'example',
    projectId: 'example',
    storageBucket: 'example',
    messagingSenderId: 'example',
    appId: 'example',
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const getFonts = () =>
    Font.loadAsync({
        'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
        'nunito-extrabold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    });

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                case 'USER_ID':
                    return {
                        ...prevState,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
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
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                console.log(data);

                dispatch({
                    type: 'SIGN_IN',
                    token: 'dummy-auth-token',
                });
                // navigation.navigate('ActivityHome');
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    if (fontLoaded) {
        let userLoggedIn = state.userToken == null ? true : false;
        // let userLoggedIn = state.userToken == null ? false : true;

        return (
            <AuthContext.Provider value={authContext}>
                {drawerNavigator({ isLoggedIn: userLoggedIn })}
            </AuthContext.Provider>
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
