import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import drawerNavigator from './routes/drawer';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'example',
    authDomain: 'example',
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
    if (fontLoaded) {
        return drawerNavigator();
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontLoaded(true)}
            />
        );
    }
}
