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
  const [confirmPassword, setConfirmPassword] = useState('');
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
    setVerificationCode('');
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setStep(2);
      setTimerRunning(true);
      Keyboard.dismiss();
    } else {
      Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
    }
  };

  const handleVerify = () => {
    if (verificationCode === '123456') {
      setStep(3);
      setTimerRunning(false);
      Keyboard.dismiss();
    } else {
      Alert.alert('오류', '인증번호가 올바르지 않습니다.');
    }
  };

  const handleNewPasswordSubmit = () => {
    if (newPassword.length >= 8) {
      setStep(4);
      Keyboard.dismiss();
    } else {
      Alert.alert('오류', '비밀번호는 8자리 이상이어야 합니다.');
    }
  };

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      setStep(5);
    } else {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
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
          <Text style={styles.title}><Text style={styles.highlight}>이메일</Text>을 입력해주세요</Text>
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
          <Text style={styles.title}><Text style={styles.highlight}>인증번호</Text>를 입력해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="인증번호 6자리"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={handleVerify}
          />
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{formatTimer(timer)}</Text>
          </View>
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>인증번호 재요청</Text>
          </TouchableOpacity>
          <Text style={styles.emailLabel}>아이디</Text>
          <TextInput
            style={styles.emailInput}
            value={email}
            editable={false}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.title}><Text style={styles.highlight}>비밀번호</Text>를 재설정 해주세요</Text>
          <TextInput
            style={styles.input}
            placeholder="영어, 숫자, 특수문자 포함 8자리 이상"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleNewPasswordSubmit}
          />
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.title}>
            <Text style={styles.highlight}>비밀번호</Text> 확인을 위해{'\n'}한번 더 입력해주세요{'\n'}
          </Text>          
          <TextInput
            style={styles.input}
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleResetPassword}
          />
        </>
      )}

      {step === 5 && (
        <View style={styles.centeredContainer}>
          <Text style={styles.title}>
            <Text style={styles.highlight}>비밀번호 재설정</Text>이{'\n'}완료되었습니다.{'\n'}
          </Text>        
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>로그인하러 가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000000',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  highlight: {
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
    marginTop: 20,
  },
  buttonNext: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center', // 버튼 텍스트 중앙 정렬
  },
  timerContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  timer: {
    fontSize: 16,
    color: '#6EAF7C',
  },
  resendButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  resendText: {
    color: '#6EAF7C',
    fontSize: 16,
  },
  emailLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
  },
  emailInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
    width: '100%',
  },
});

export default FindPassword;