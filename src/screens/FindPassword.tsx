import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  FindPassword: undefined;
};

type FindPasswordProps = StackScreenProps<RootStackParamList, 'FindPassword'>;

const FindPassword: React.FC<FindPasswordProps> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [timer, setTimer] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      Alert.alert('시간 초과', '인증 시간이 만료되었습니다.');
      resetToEmailStep();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerRunning, timer]);

  const resetToEmailStep = () => {
    setStep(1);
    setTimer(180);
    setTimerRunning(false);
    setEmail('');
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setStep(2);
      setTimerRunning(true);
      Keyboard.dismiss(); // Dismiss the keyboard
    } else {
      Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
    }
  };

  const handleVerify = () => {
    if (verificationCode === '123456') {
      setStep(3);
      setTimerRunning(false);
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

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>

      {step === 1 && (
        <>
          <Text style={styles.title}>이메일을 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            returnKeyType="done"
            onSubmitEditing={handleEmailSubmit}
          />
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
          <Text style={styles.timer}>{formatTimer(timer)}</Text>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>인증</Text>
          </TouchableOpacity>
          <Text style={styles.email}>아이디: {email}</Text>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}>비밀번호를 재설정 해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="영어, 숫자, 특수문자 포함 8자리 이상"
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
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000000',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: '#6EAF7C',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#6EAF7C',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6EAF7C',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  timer: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 10,
    color: '#6EAF7C',
  },
  email: {
    marginTop: 10,
    fontSize: 16,
    color: '#000000',
  },
});

export default FindPassword;