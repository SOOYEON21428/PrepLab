import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/Login';
import Join from './src/screens/Join';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: '이메일 로그인' }} />
        <Stack.Screen name="Join" component={Join} options={{title: '회원가입'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
