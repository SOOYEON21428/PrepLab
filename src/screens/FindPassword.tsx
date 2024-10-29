// src/screens/FindPassword.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  FindPassword: undefined;
};

type FindPasswordProps = StackScreenProps<RootStackParamList, 'FindPassword'>;

const FindPassword: React.FC<FindPasswordProps> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNextStep1 = () => {
    if (email) {
      setStep(2);
    } else {
      Alert.alert('오류', '이메일을 입력해주세요.');
    }
  };

  const handleVerify = () => {
    if (verificationCode === '123456') {
      setStep(3);
    } else {
      Alert.alert('오류', '인증번호가 올바르지 않습니다.');
    }
  };

  const handleResetPassword = () => {
    if (newPassword) {
      Alert.alert('성공', '비밀번호가 성공적으로 변경되었습니다.');
      navigation.goBack();
    } else {
      Alert.alert('오류', '새 비밀번호를 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>비밀번호를 재설정할 이메일을 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleNextStep1}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>인증번호를 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="인증번호 6자리"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
          <Text>이메일: {email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>인증</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>새 비밀번호를 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>비밀번호 재설정</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6BBF8A',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FindPassword;