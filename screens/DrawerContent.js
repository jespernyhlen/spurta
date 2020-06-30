import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserContext from '../UserContext';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from 'react-native-reanimated';

export function DrawerContent(props) {
    const { userInfo } = React.useContext(UserContext);
    return (
        <View style={{ flex: 1, margin: 0 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row' }}>
                            <Avatar.Image
                                source={{
                                    uri: userInfo.photoURL,
                                }}
                                size={50}
                            />
                            <View
                                style={{
                                    marginLeft: 15,
                                    flexDirection: 'column',
                                }}
                            >
                                <Title style={styles.title}>
                                    {userInfo.username}
                                </Title>
                                <Caption style={styles.caption}>
                                    {userInfo.email}
                                </Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='run-fast'
                                    color={iconOptions.color}
                                    size={iconOptions.size}
                                    style={{ paddingLeft: 5 }}
                                />
                            )}
                            labelStyle={iconLabel}
                            label='Löpning'
                            onPress={() => {
                                props.navigation.navigate('ActivityHome');
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Icon
                                    name='poll'
                                    color={iconOptions.color}
                                    size={iconOptions.size}
                                    style={{ paddingLeft: 5 }}
                                />
                            )}
                            labelStyle={iconLabel}
                            label='Aktiviteter'
                            onPress={() => {
                                props.navigation.navigate('Activities');
                            }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={() => (
                        <Icon
                            name='exit-to-app'
                            color={iconOptions.color}
                            size={iconOptions.size}
                            style={{ paddingLeft: 5 }}
                        />
                    )}
                    labelStyle={iconLabel}
                    label='Logga ut'
                    onPress={() => {
                        props.navigation.navigate('Logout');
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const iconOptions = {
    color: '#fff',
    size: 24,
};

const iconLabel = {
    color: iconOptions.color,
    letterSpacing: 1,
    fontSize: 16,
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        marginTop: -3,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingVertical: 25,
        backgroundColor: '#111',
    },
    title: {
        fontSize: 22,
        marginTop: 3,
        marginLeft: 5,
        color: '#fff',
    },
    caption: {
        marginLeft: 5,
        fontSize: 12,
        lineHeight: 14,
        color: '#ccc',
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 10,
    },
    drawerItem: {
        color: '#eee',
    },
    bottomDrawerSection: {
        marginBottom: 2,
        paddingTop: 4,
    },
});
