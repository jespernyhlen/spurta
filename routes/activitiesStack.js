import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Activities from '../screens/activities';
import Header from '../shared/header';

const Stack = createStackNavigator();

export default function activitiesNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Activities'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Activities'
                component={Activities}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Aktiviteter' />
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
