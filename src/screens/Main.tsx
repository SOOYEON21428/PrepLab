import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>필가이드</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <TextInput
              style={styles.searchInput}
              placeholder="어떤 의약품/영양제를 찾으세요?"
              editable={false} // Prevent direct editing to enforce navigation
            />
          </TouchableOpacity>
        </View>

        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationText}>
            설문을 통해 약과 영양제를 맞춤 추천받아요!
          </Text>
          <TouchableOpacity style={styles.recommendationButton}>
            <Text style={styles.recommendationButtonText}>맞춤 추천받기</Text>
          </TouchableOpacity>
          <Image
            style={styles.recommendationImage}
            source={{ uri: 'https://via.placeholder.com/60' }}
          />
        </View>

        <View style={styles.medicineSection}>
          <Text style={styles.sectionTitle}>💊 증상에 따른 약</Text>
          <View style={styles.medicineOptions}>
            <View style={styles.medicineOption}>
              <Image
                style={styles.medicineImage}
                source={{ uri: 'https://via.placeholder.com/50' }}
              />
              <Text style={styles.medicineOptionTitle}>일반 의약품</Text>
              <Text style={styles.medicineOptionDescription}>처방전 없이 구매 가능한 약품</Text>
            </View>
            <View style={styles.medicineOption}>
              <Image
                style={styles.medicineImage}
                source={{ uri: 'https://via.placeholder.com/50' }}
              />
              <Text style={styles.medicineOptionTitle}>약국 영양제</Text>
              <Text style={styles.medicineOptionDescription}>약국에서 파는 영양제</Text>
            </View>
          </View>
        </View>

        <View style={styles.healthColumn}>
          <Text style={styles.sectionTitle}>💡 오늘의 건강 칼럼</Text>
          <View style={styles.healthContent}>
            <View style={styles.healthItem}>
              <Image
                style={styles.healthImage}
                source={{ uri: 'https://via.placeholder.com/100' }}
              />
              <Text style={styles.healthText}>약 복용 시 주의사항</Text>
            </View>
            <View style={styles.healthItem}>
              <Image
                style={styles.healthImage}
                source={{ uri: 'https://via.placeholder.com/100' }}
              />
              <Text style={styles.healthText}>해열제 교차 복용</Text>
            </View>
          </View>
          <View style={styles.healthContent}>
            <View style={styles.healthItem}>
              <Image
                style={styles.healthImage}
                source={{ uri: 'https://via.placeholder.com/100' }}
              />
              <Text style={styles.healthText}>증상별 생리통약</Text>
            </View>
            <View style={styles.healthItem}>
              <Image
                style={styles.healthImage}
                source={{ uri: 'https://via.placeholder.com/100' }}
              />
              <Text style={styles.healthText}>약의 보관과 분리수거</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>의약품</Text>
        <Text style={styles.footerText}>복약 달력</Text>
        <Text style={styles.footerText}>구급함</Text>
        <Text style={styles.footerText}>주변 약국</Text>
        <Text style={styles.footerText}>내 정보</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  recommendationBox: {
    margin: 20,
    padding: 20,
    backgroundColor: '#c8e6c9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendationText: {
    fontSize: 16,
    flex: 1,
  },
  recommendationButton: {
    backgroundColor: '#6BBF8A',
    padding: 10,
    borderRadius: 20,
  },
  recommendationButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recommendationImage: {
    width: 60,
    height: 60,
    marginLeft: 10,
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
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  medicineImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  medicineOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicineOptionDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  healthColumn: {
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#d1c4e9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
});

export default Main;
