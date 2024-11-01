import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavigationBarProps {
  activeItem: string;
  onSelect: (item: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeItem, onSelect }) => {
  const items: { name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { name: '의약품', icon: 'medkit-outline' },
    { name: '복약 달력', icon: 'calendar-outline' },
    { name: '구급함', icon: 'medkit-outline' },
    { name: '주변 약국', icon: 'add-circle-outline' },
    { name: '내 정보', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {items.map(item => (
        <TouchableOpacity key={item.name} onPress={() => onSelect(item.name)} style={styles.item}>
          <Ionicons
            name={item.icon}
            size={24}
            color={activeItem === item.name ? '#6DA37E' : '#A0A0A0'}
          />
          <Text style={[styles.text, activeItem === item.name && styles.activeText]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  item: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 5,
  },
  activeText: {
    color: '#6DA37E',
  },
});

export default NavigationBar;