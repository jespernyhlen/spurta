import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import activitiesNavigator from './activitiesStack';
import homeNavigator from './homeStack';

const Drawer = createDrawerNavigator();

export default function drawerNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Home'
                drawerStyle={{
                    backgroundColor: '#29303A',
                }}
                drawerContentOptions={{
                    activeTintColor: '#eee',
                    activeBackgroundColor: '#000',
                    inactiveTintColor: '#ccc',
                    itemStyle: {
                        marginTop: 0,
                        borderRadius: 0,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                    },
                    labelStyle: {
                        letterSpacing: 1,
                        fontSize: 18,
                    },
                    style: {
                        marginHorizontal: -10,
                    },
                }}
            >
                <Drawer.Screen
                    name='Springtur'
                    component={homeNavigator}
                    options={{
                        drawerIcon: () => (
                            <MaterialIcons
                                style={{ padding: 0, marginRight: -10 }}
                                name='directions-run'
                                size={20}
                                color='white'
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name='Aktiviteter'
                    component={activitiesNavigator}
                    options={{
                        drawerIcon: () => (
                            <MaterialIcons
                                style={{ padding: 0, marginRight: -10 }}
                                name='trending-up'
                                size={20}
                                color='white'
                            />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
