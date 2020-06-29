import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityHome from '../screens/activityHome';
import Activity from '../screens/activity';
import Header from '../shared/header';

const Stack = createStackNavigator();

export default function activityNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='ActvityHome'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='ActvityHome'
                component={ActivityHome}
                options={{
                    headerTitle: () => (
                        <Header navigation={navigation} title='Löpning' />
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
        backgroundColor: '#fff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    headerTitleAlign: 'center',
};
