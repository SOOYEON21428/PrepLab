import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['아미노펜', '탁센', '타이레놀']);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '일반 의약품', '전문 의약품', '영양제'];

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://your-api-url.com/search`, {
            params: { q: query },
          });
          console.log(response.data); // 응답 구조 확인
          setPopularSearches(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
          // 에러 처리 로직 추가 가능
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    } else {
      setPopularSearches([]);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="제품명, 성분명으로 검색"
          value={query}
          onChangeText={setQuery}
        />
        <Icon name="search" size={24} color="#888" />
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 검색어</Text>
          <View style={styles.tagContainer}>
            {recentSearches.map((term, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.popularHeader}>
            <Text style={styles.sectionTitle}>인기 검색어</Text>
            <Text style={styles.timestamp}>10.11 12:00 기준</Text>
          </View>
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.category,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={popularSearches}
              keyExtractor={(item, index) => index.toString()} // 각 항목에 고유 키 부여
              renderItem={({ item }) => (
                <View style={styles.popularItem}>
                  <Text style={styles.popularIndex}>{item.rank}</Text>
                  <Text style={styles.popularTerm}>{item.term}</Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 14,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  category: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#444',
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  popularIndex: {
    width: 20,
    fontSize: 16,
    color: '#4caf50',
  },
  popularTerm: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Search;
