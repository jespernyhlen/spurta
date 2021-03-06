import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#eee',
        paddingBottom: 5,
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#eee',
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: '#111',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
});

export const images = {
    '1': require('../assets/route.png'),
    '2': require('../assets/activities.png'),
    '3': require('../assets/logout.png'),
};
