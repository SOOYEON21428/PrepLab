import React from 'react';
import styled from 'styled-components';

interface ProfileProps {
  name: string;
  age: string;
  imageUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ name, age, imageUrl }) => {
  return (
    <ProfileContainer>
      <ProfileImage src={imageUrl} alt={`${name}의 프로필`} />
      <ProfileName>{name}</ProfileName>
      <ProfileAge>{age}</ProfileAge>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  width: 138px;
  height: 201px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 20px;
  opacity: 1;
  text-align: center;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProfileName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProfileAge = styled.div`
  font-size: 14px;
  color: #888;
`;//