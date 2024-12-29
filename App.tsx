import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/Login';
import Join from './src/screens/Join';
import FindId from './src/screens/FindId';
import FindPassword from './src/screens/FindPassword';
import Main from './src/screens/Main';
import Search from './src/screens/Search';
import NavigationBar from './src/components/NavigationBar';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Join: undefined;
  FindId: undefined;
  FindPassword: undefined;
  Main: undefined;
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: '이메일 로그인' }} />
        <Stack.Screen name="Join" component={Join} options={{ title: '이메일로 회원가입' }} />
        <Stack.Screen name="FindId" component={FindId} options={{ title: '아이디 찾기' }} />
        <Stack.Screen name="FindPassword" component={FindPassword} options={{ title: '비밀번호 찾기' }} />
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;