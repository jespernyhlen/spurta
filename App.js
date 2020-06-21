import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import drawerNavigator from './routes/drawer';

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
