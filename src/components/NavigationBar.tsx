import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface NavigationBarProps {
  activeItem: string;
  onSelect: (item: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeItem, onSelect }) => {
  const items = [
    { name: '의약품', icon: require('../../assets/icon/탭바_의약품.png') },
    { name: '복약 달력', icon: require('../../assets/icon/탭바_복약달력.png') },
    { name: '구급함', icon: require('../../assets/icon/탭바_구급함.png') },
    { name: '주변 약국', icon: require('../../assets/icon/탭바_주변약국.png') },
    { name: '내 정보', icon: require('../../assets/icon/탭바_내정보.png') },
  ];

  return (
    <View style={styles.container}>
      {items.map(item => (
        <TouchableOpacity key={item.name} onPress={() => onSelect(item.name)} style={styles.item}>
          <Image
            source={item.icon}
            style={[
              styles.icon,
              { tintColor: activeItem === item.name ? '#6DA37E' : '#A0A0A0' }
            ]}
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
  icon: {
    width: 24,
    height: 24,
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