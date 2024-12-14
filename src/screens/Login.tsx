import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(text));
  };

  const handleLogin = () => {
    if (emailValid && password) {
      navigation.navigate('Main');
    } else {
      Alert.alert('로그인 실패', '유효한 이메일과 비밀번호를 입력하세요.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, emailValid ? styles.validInput : styles.invalidInput]}
        placeholder="이메일"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={handleEmailChange}
      />
      
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#B0B0B0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}
      />
      
      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Text style={styles.togglePassword}>
          {passwordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        
        <View style={styles.linksContainer}>          
          <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
            <Text style={styles.link}>비밀번호 찾기</Text>
          </TouchableOpacity>
          
          <Text style={styles.separator}>|</Text>
          
          <TouchableOpacity onPress={() => navigation.navigate('Join')}>
            <Text style={styles.link}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6BBF8A',
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 5,
    marginBottom: 20,
  },
  validInput: {
    borderColor: '#6BBF8A',
  },
  invalidInput: {
    borderColor: 'green',
  },
  togglePassword: {
    color: '#6BBF8A',
    marginBottom: 20,
    alignSelf: 'flex-end',//
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6BBF8A',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: '#6BBF8A',
  },
  separator: {
    marginHorizontal: 10,
    color: '#6BBF8A',
  },
});

export default Login;
