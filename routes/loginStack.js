import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/header';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Stack = createStackNavigator();

export default function loginNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={screenOptions}
            headerMode='none'
        >
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Home' />
                    ),
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Logga in' />
                    ),
                }}
            />
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
