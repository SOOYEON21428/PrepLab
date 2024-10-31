import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Home');
    });
  }, [navigation, translateX]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Image source={require('../../assets/png/Asset2.png')} style={styles.logo} />
        <Image source={require('../../assets/CI/PrepLogo.png')} style={styles.subtitleLogo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 134.9,
    position: 'absolute',
    top: 194,
    left: 136,
  },
  subtitleLogo: {
    width: 88,
    height: 18,
    position: 'absolute',
    top: 656,
    left: 166,
  },
});

export default SplashScreen;