import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/header';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

export default function signupNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Signup'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Signup'
                component={Signup}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Registrera' />
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
