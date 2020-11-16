import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({children}) => {
    return (
        <LinearGradient
            colors={['#f64f59', '#c471ed', '#12c2e9']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <SafeAreaView style={styles.container}>{children}</SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});

export default Background;