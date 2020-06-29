import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/header';
import Main from '../screens/Logout';

const Stack = createStackNavigator();

export default function logoutNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Logout'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Logout'
                component={Main}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Logga ut' />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#222',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
};
