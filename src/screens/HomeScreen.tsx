import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
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
      </Animated.View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialIconText}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialIconText}>N</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Text style={styles.socialIconText}>G</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>이메일로 시작하기</Text>
      </TouchableOpacity>
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
    width: 150, // 로고 너비
    height: 150, // 로고 높이
    resizeMode: 'contain',
    marginBottom: 240, // 로고와 SNS 아이콘 사이의 간격 추가
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  socialIcon: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  socialIconText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#6EAF7C',
    padding: 15,
    borderRadius: 35,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
