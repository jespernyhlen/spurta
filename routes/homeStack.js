import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Activity from '../screens/activity';
import Header from '../shared/header';

const Stack = createStackNavigator();

export default function homeNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Springtur' />
                    ),
                }}
            />
            <Stack.Screen
                name='Activity'
                component={Activity}
                options={{ title: 'Aktivitet' }}
            />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#29303A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    headerTitleAlign: 'center',
};
