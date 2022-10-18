import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Routes from './src/routes'
import { NavigationContainer } from '@react-navigation/native'
import AuthProvider from './src/context/auth'
import 'react-native-gesture-handler';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <Routes />
      <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  );
}



