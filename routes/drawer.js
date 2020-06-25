import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import activitiesNavigator from './activitiesStack';
import activityNavigator from './activityStack';
import loginNavigator from './loginStack';
import signupNavigator from './signupStack';
// import mainNavigator from './mainStack';
// import Signup from '../components/Signup';

const Drawer = createDrawerNavigator();

export default function drawerNavigator({ isLoggedIn }) {
    console.log(isLoggedIn);
    return isLoggedIn ? (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Löpning'
                drawerStyle={{
                    backgroundColor: '#222',
                }}
                drawerContentOptions={drawerContentOptions}
            >
                <Drawer.Screen
                    name='Löpning'
                    component={activityNavigator}
                    options={drawerIcon('directions-run')}
                />
                <Drawer.Screen
                    name='Aktiviteter'
                    component={activitiesNavigator}
                    options={drawerIcon('trending-up')}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    ) : (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Login'>
                <Drawer.Screen
                    name='Logga in'
                    component={loginNavigator}
                    options={{
                        gestureEnabled: false,
                        swipeEnabled: false,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const drawerContentOptions = {
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
};

const drawerIcon = (iconName) => {
    return {
        drawerIcon: () => (
            <MaterialIcons
                style={{ padding: 0, marginRight: -10 }}
                name={iconName}
                size={20}
                color='white'
            />
        ),
    };
};

{
    /* <Drawer.Screen
                    name='Registrera'
                    component={signupNavigator}
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
                /> */
}
