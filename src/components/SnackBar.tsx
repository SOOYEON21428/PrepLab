import React from 'react';
import styled from 'styled-components';

interface SnackBarProps {
  message: string;
  type: 'error' | 'success';
}

const SnackBarContainer = styled.div<{ type: 'error' | 'success' }>`
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  background-color: ${({ type }) => (type === 'error' ? '#e57373' : '#81c784')};
`;

const SnackBar: React.FC<SnackBarProps> = ({ message, type }) => {
  return (
    <SnackBarContainer type={type}>
      {type === 'error' ? '❗' : '📢'} {message}
    </SnackBarContainer>
  );
};

export default SnackBar;