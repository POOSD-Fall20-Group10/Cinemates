import React from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const MainButton = props => {
    <View>
    <Button style={styles.button_container}/>
    </View>
};

const styles = StyleSheet.create({
    button_container: {
        marginTop: 20,
        marginBottom: -30,
        color: 'light-gray'
    }
});

export default MainButton;
