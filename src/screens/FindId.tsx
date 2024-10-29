// src/screens/FindId.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  FindId: undefined;
};

type FindIdProps = StackScreenProps<RootStackParamList, 'FindId'>;

const FindId: React.FC<FindIdProps> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');

  const handleNextStep1 = () => {
    if (phoneNumber) {
      setStep(2);
    } else {
      Alert.alert('오류', '휴대폰 번호를 입력해주세요.');
    }
  };

  const handleVerify = () => {
    if (verificationCode === '123456') {
      setEmail('pillguide@naver.com');
      setStep(3);
    } else {
      Alert.alert('오류', '인증번호가 올바르지 않습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>휴대폰 번호를 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="휴대폰 번호"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
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
          <Text>휴대폰 번호: {phoneNumber}</Text>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>인증</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>휴대폰 번호와 일치하는 아이디입니다.</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{email}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>돌아가기</Text>
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
  resultBox: {
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
  },
});

export default FindId;