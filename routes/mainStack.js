import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/header';
import Main from '../components/Main';

const Stack = createStackNavigator();

export default function mainNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='Main' screenOptions={screenOptions}>
            <Stack.Screen
                name='Main'
                component={Main}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Main' />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#111',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
};
