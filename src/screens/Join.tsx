import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const Join: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [step, setStep] = useState(1); // 단계 관리

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(text));
  };

  const handleNext = () => {
    if (emailValid) {
      setStep(2); // 이메일 입력 후 비밀번호 입력 단계로 이동
    } else {
      Alert.alert('유효한 이메일을 입력하세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>이메일을 입력해 주세요</Text>
      
      <TextInput
        style={[styles.input, emailValid ? styles.validInput : styles.invalidInput]}
        placeholder="이메일"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={handleEmailChange}
      />

      <TouchableOpacity
        onPress={handleNext}
        style={[styles.button, emailValid ? styles.buttonActive : styles.buttonInactive]}
        disabled={!emailValid} // 버튼 비활성화
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 5,
    marginBottom: 15,
  },
  validInput: {
    borderColor: '#6BBF8A',
  },
  invalidInput: {
    borderColor: 'red',
  },
  button: {
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#6BBF8A',
  },
  buttonInactive: {
    backgroundColor: '#D3D3D3', // 비활성화 색상
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Join;
