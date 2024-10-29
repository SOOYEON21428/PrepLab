import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1800,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Home');
    });
  }, [navigation, translateX]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.title}>필가이드</Text>
        <Text style={styles.subtitle}>PREP LAB</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6BBF8A',
  },
  subtitle: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  loginText: {
    color: '#6BBF8A',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default SplashScreen;
