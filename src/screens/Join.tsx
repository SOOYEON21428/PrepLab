import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const Join: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [step, setStep] = useState(1);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(text));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordValid(text.length >= 8);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleBirthdateChange = (text: string) => {
    setBirthdate(text);
  };

  const handleNext = () => {
    if (step === 1) {
      if (emailValid) {
        setStep(2);
      } else {
        Alert.alert('유효한 이메일을 입력하세요.');
      }
    } else if (step === 2) {
      if (passwordValid) {
        setStep(3);
      } else {
        Alert.alert('비밀번호는 8자 이상이어야 합니다.');
      }
    } else if (step === 3) {
      if (password === confirmPassword) {
        setStep(4);
      } else {
        Alert.alert('비밀번호가 일치하지 않습니다.');
      }
    } else if (step === 4) {
      // 생년월일 입력 단계
      Alert.alert('회원가입 완료', `입력한 이메일: ${email}, 비밀번호: ${password}, 이름: ${name}, 생년월일: ${birthdate}`);
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>이메일</Text>을 입력해 주세요
          </Text>
          <TextInput
            style={[styles.input, emailValid ? styles.validInput : styles.invalidInput]}
            placeholder="이메일"
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={handleEmailChange}
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>비밀번호</Text>를 입력해 주세요
          </Text>
          <TextInput
            style={[styles.input, passwordValid ? styles.validInput : styles.invalidInput]}
            placeholder="비밀번호"
            placeholderTextColor="#B0B0B0"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
          />
          <Text style={styles.passwordHint}>{passwordValid ? '8자리 이상' : '8자 이상 입력해 주세요'}</Text>
          
          {/* 비밀번호 확인 입력 필드 */}
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>비밀번호 확인</Text>을 입력해 주세요
          </Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            placeholderTextColor="#B0B0B0"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={true}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>이름</Text>을 입력해 주세요 (영어/한국어 가능)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="이름"
            placeholderTextColor="#B0B0B0"
            value={name}
            onChangeText={handleNameChange}
          />
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>생년월일</Text>을 입력해 주세요
          </Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#B0B0B0"
            value={birthdate}
            onChangeText={handleBirthdateChange}
          />
        </>
      )}

      <TouchableOpacity
        onPress={handleNext}
        style={[
          styles.button,
          (step === 1 && emailValid) || 
          (step === 2 && passwordValid && password === confirmPassword) || 
          (step === 3 && name) || 
          (step === 4 && birthdate) ? styles.buttonActive : styles.buttonInactive
        ]}
        disabled={(step === 1 && !emailValid) || 
                   (step === 2 && (!passwordValid || password !== confirmPassword)) || 
                   (step === 3 && !name) ||
                   (step === 4 && !birthdate)}
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
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  greenText: {
    color: '#6BBF8A',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 5,
    marginBottom: 15,
    height: 50,
  },
  validInput: {
    borderColor: '#6BBF8A',
  },
  invalidInput: {
    borderColor: 'red',
  },
  passwordHint: {
    color: 'black',
    marginBottom: 10,
    alignSelf: 'flex-start',
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
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Join;
