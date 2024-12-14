import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Join: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationValid, setVerificationValid] = useState(false);
  const [terms, setTerms] = useState([
    { id: 1, text: "만 14세 이상입니다.", checked: false, expanded: false },
    { id: 2, text: "서비스 이용약관", checked: false, expanded: false },
    { id: 3, text: "개인정보 처리방침", checked: false, expanded: false },
    { id: 4, text: "민감정보수집 동의", checked: false, expanded: false },
    { id: 5, text: "위치기반 서비스 이용약관", checked: false, expanded: false },
    { id: 6, text: "마케팅 활용 동의 [선택]", checked: false, expanded: false },
  ]);
  const [allChecked, setAllChecked] = useState(false);
  const [step, setStep] = useState(1);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (text: string) => {
    setEmail(text);
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

  const handlePhoneNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formattedNumber = cleaned;
    if (cleaned.length > 3) {
      formattedNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    }
    if (cleaned.length > 7) {
      formattedNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    setPhoneNumber(formattedNumber);
  };

  const handleVerificationCodeChange = (text: string) => {
    setVerificationCode(text);
    setVerificationValid(text === '12345');
  };

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const termsContent: { [key: string]: string } = {
    '1': "만 14세 이상이어야 합니다.",
    '2': "서비스 이용약관에 대한 자세한 내용은 다음과 같습니다...",
    '3': "개인정보 처리방침에 대한 자세한 내용은 다음과 같습니다...",
    '4': "민감정보수집 동의에 대한 자세한 내용은 다음과 같습니다...",
    '5': "위치기반 서비스 이용약관에 대한 자세한 내용은 다음과 같습니다...",
    '6': "마케팅 활용 동의는 선택 사항이며, 이에 대한 내용은 다음과 같습니다...",
  };

  const toggleAllChecked = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setTerms(terms.map(term => ({ ...term, checked: newCheckedState })));
  };

  const toggleTermChecked = (id: number) => {
    const newTerms = terms.map(term =>
      term.id === id ? { ...term, checked: !term.checked } : term
    );
    setTerms(newTerms);
    setAllChecked(newTerms.every(term => term.checked));
  };

  const toggleTermExpanded = (id: number) => {
    setTerms(terms.map(term =>
      term.id === id ? { ...term, expanded: !term.expanded } : term
    ));
  };

  const handleNext = () => {
    switch (step) {
      case 1:
        if (emailValid) setStep(2);
        else Alert.alert('유효한 이메일을 입력하세요.');
        break;
      case 2:
        if (passwordValid && password === confirmPassword) setStep(3);
        else Alert.alert('비밀번호가 일치하지 않거나 유효하지 않습니다.');
        break;
      case 3:
        if (name) setStep(4);
        else Alert.alert('이름을 입력하세요.');
        break;
      case 4:
        if (birthdate) setStep(5);
        else Alert.alert('생년월일을 입력하세요.');
        break;
      case 5:
        if (gender) setStep(6);
        else Alert.alert('성별을 선택하세요.');
        break;
      case 6:
        if (phoneNumber) setStep(7);
        else Alert.alert('휴대폰 번호를 입력하세요.');
        break;
      case 7:
        if (verificationValid) setStep(8);
        else Alert.alert('인증번호가 틀렸어요.');
        break;
      case 8:
        setStep(9);
        break;
      case 9:
        if (terms.every(term => term.checked || term.text.includes('[선택]'))) {
          Alert.alert('회원가입 완료', `입력한 이메일: ${email}, 이름: ${name}, 생년월일: ${birthdate}, 성별: ${gender}, 휴대폰 번호: ${phoneNumber}`);
          navigation.navigate('Login');
        } else {
          Alert.alert('필수 약관에 동의해 주세요.');
        }
        break;
      default:
        break;
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

          {passwordValid && (
            <>
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
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>이름</Text>을 입력해 주세요
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

      {step >= 4 && (
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
            onSubmitEditing={() => setStep(5)}
          />
        </>
      )}

      {step >= 5 && birthdate && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>성별</Text>을 선택해 주세요
          </Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderButton, gender === '남성' ? styles.genderSelected : null]}
              onPress={() => {
                handleGenderSelect('남성');
                setStep(6);
              }}
            >
              <Text style={styles.genderText}>남성</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === '여성' ? styles.genderSelected : null]}
              onPress={() => {
                handleGenderSelect('여성');
                setStep(6);
              }}
            >
              <Text style={styles.genderText}>여성</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step >= 6 && gender && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>휴대폰 번호</Text>를 입력해 주세요
          </Text>
          <TextInput
            style={styles.input}
            placeholder="010-0000-0000"
            placeholderTextColor="#B0B0B0"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
            onSubmitEditing={() => setStep(7)}
          />
        </>
      )}

      {step === 7 && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>인증번호</Text>를 입력해 주세요
          </Text>
          <TextInput
            style={[styles.input, verificationValid ? styles.validInput : styles.invalidInput]}
            placeholder="인증번호"
            placeholderTextColor="#B0B0B0"
            value={verificationCode}
            onChangeText={handleVerificationCodeChange}
            keyboardType="numeric"
          />
        </>
      )}

      {step === 8 && (
        <>
          <Text style={styles.subtitle}>
            입력한 정보를 확인해 주세요
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>휴대폰 번호</Text>
            <Text style={styles.input}>{phoneNumber}</Text>

            <Text style={styles.infoText}>성별</Text>
            <Text style={styles.input}>{gender}</Text>

            <Text style={styles.infoText}>생년월일</Text>
            <Text style={styles.input}>{birthdate}</Text>

            <Text style={styles.infoText}>이름</Text>
            <Text style={styles.input}>{name}</Text>
          </View>
        </>
      )}

      {step === 9 && (
        <>
          <Text style={styles.subtitle}>
            <Text style={styles.greenText}>약관</Text>을 확인해 주세요
          </Text>
          <TouchableOpacity
            style={styles.allCheckContainer}
            onPress={toggleAllChecked}
          >
            <MaterialIcons
              name={allChecked ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={allChecked ? '#6BBF8A' : '#B0B0B0'}
            />
            <Text style={styles.allCheckText}>전체 약관 동의</Text>
          </TouchableOpacity>
          <ScrollView style={styles.termsContainer}>
            {terms.map(term => (
              <View key={term.id}>
                <TouchableOpacity
                  style={styles.termItem}
                  onPress={() => toggleTermChecked(term.id)}
                >
                  <MaterialIcons
                    name={term.checked ? 'check-circle' : 'radio-button-unchecked'}
                    size={24}
                    color={term.checked ? '#6BBF8A' : '#B0B0B0'}
                  />
                  <Text style={styles.termText}>{term.text}</Text>
                  <TouchableOpacity onPress={() => toggleTermExpanded(term.id)}>
                    <MaterialIcons
                      name={term.expanded ? 'expand-less' : 'expand-more'}
                      size={24}
                      color="#B0B0B0"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
                {term.expanded && (
                  <Text style={styles.termContent}>{termsContent[term.id.toString()]}</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}

      <TouchableOpacity
        onPress={handleNext}
        style={[
          styles.button,
          (step === 1 && emailValid) ||
          (step === 2 && passwordValid && password === confirmPassword) ||
          (step === 3 && name) ||
          (step === 4 && birthdate) ||
          (step === 5 && gender) ||
          (step === 6 && phoneNumber) ||
          (step === 7 && verificationValid) ||
          (step === 9 && terms.every(term => term.checked || term.text.includes('[선택]'))) ? styles.buttonActive : styles.buttonInactive
        ]}
        disabled={(step === 1 && !emailValid) ||
                  (step === 2 && (!passwordValid || password !== confirmPassword)) ||
                  (step === 3 && !name) ||
                  (step === 4 && !birthdate) ||
                  (step === 5 && !gender) ||
                  (step === 6 && !phoneNumber) ||
                  (step === 7 && !verificationValid) ||
                  (step === 9 && !terms.every(term => term.checked || term.text.includes('[선택]')))}
      >
        <Text style={styles.buttonText}>{step === 9 ? '완료' : '다음'}</Text>
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
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
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
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  genderButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderSelected: {
    backgroundColor: '#6BBF8A',
  },
  genderText: {
    color: 'black',
  },
  allCheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 5,
    width: '100%',
  },
  allCheckText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  termsContainer: {
    marginBottom: 20,
    maxHeight: 150,
    width: '100%',
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 5,
  },
  termText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'black',
    flexShrink: 1,
  },
  termContent: {
    marginLeft: 34,
    color: '#6BBF8A',
    marginBottom: 10,
  },
});

export default Join;