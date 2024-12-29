import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const Main: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../../assets/icon/화면내로고.png')} />
          <TouchableOpacity>
            <Image style={styles.notificationIcon} source={require('../../assets/icon/alarm.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="어떤 의약품/영양제를 찾으세요?"
            editable={false}
          />
        </View>

        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationText}>필가이드님, 반가워요!</Text>
          <Text style={styles.recommendationSubText}>가벼운 증상은 스스로 해결해볼까요?</Text>
          <TouchableOpacity style={styles.recommendationButton}>
            <Text style={styles.recommendationButtonText}>셀프케어 시작하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.symptomIcons}>
          {['감기/몸살', '코감기', '목감기', '두통', '근육통'].map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <Image style={styles.symptomImage} source={{ uri: 'https://via.placeholder.com/50' }} />
              <Text style={styles.symptomText}>{symptom}</Text>
            </View>
          ))}
        </View>

        <View style={styles.medicineSection}>
          <Text style={styles.sectionTitle}>💊 이럴 땐, 이런 약</Text>
          <View style={styles.medicineOptions}>
            {['근육통 완화', '두통 해결'].map((medicine, index) => (
              <View key={index} style={styles.medicineOption}>
                <Image style={styles.medicineImage} source={{ uri: 'https://via.placeholder.com/100' }} />
                <Text style={styles.medicineOptionTitle}>{medicine}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.healthColumn}>
          <Text style={styles.sectionTitle}>💡 오늘의 건강 칼럼</Text>
          <View style={styles.healthContent}>
            {['약 복용 시 주의사항', '해열제 교차 복용'].map((column, index) => (
              <View key={index} style={styles.healthItem}>
                <Image style={styles.healthImage} source={{ uri: 'https://via.placeholder.com/100' }} />
                <Text style={styles.healthText}>{column}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 87,
    height: 24,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  recommendationBox: {
    width: 370,
    height: 152,
    backgroundColor: '#6EAF7C',
    borderRadius: 24,
    marginTop: 20,
    marginLeft:20,
    padding: 20,
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
    color: 'white',
  },
  recommendationSubText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
    fontWeight: 600,
  },
  recommendationButton: {
    width: 109,
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationButtonText: {
    color: '#656565',
    fontWeight: 'regular',
    fontSize: 12,
    fontStyle: 'normal',
  },
  symptomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  symptomItem: {
    alignItems: 'center',
  },
  symptomImage: {
    width: 50,
    height: 50,
  },
  symptomText: {
    fontSize: 12,
    marginTop: 5,
  },
  medicineSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicineOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicineOption: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  medicineImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  medicineOptionTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  healthColumn: {
    padding: 20,
  },
  healthContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  healthItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  healthImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  healthText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Main;