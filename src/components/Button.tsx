import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#6DA37E', // 녹색
  },
  secondaryButton: {
    backgroundColor: '#D3D3D3', // 회색
  },
  disabledButton: {
    backgroundColor: '#E0E0E0', // 비활성화된 회색
  },
  text: {
    color: '#FFFFFF', // 기본 텍스트 색상
    fontSize: 16,
  },
  disabledText: {
    color: '#A0A0A0', // 비활성화된 텍스트 색상
  },
});

export default Button;