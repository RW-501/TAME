import React from 'react';
import { Image, Pressable, Text, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import GameLibrary from './src/screens/GameLibrary';
import ReadingLibrary from './src/screens/ReadingLibrary';
import TherapistTools from './src/screens/therapist/TherapistTools';
import TherapistLiveView from './src/screens/therapist/TherapistLiveView';
import BenchmarkRunner from './src/screens/assessments/BenchmarkRunner';
import PhonoAwarenessForm from './src/screens/assessments/PhonoAwarenessForm';
import MFASetup from './src/screens/auth/MFASetup';
import MFAVerify from './src/screens/auth/MFAVerify';
import RecoveryCodes from './src/screens/auth/RecoveryCodes';
import PhoneSignIn from './src/screens/auth/PhoneSignIn';
import AdminRoles from './src/screens/admin/AdminRoles';

// Theme
const theme = require('./src/config/tameTheme').TameTheme;

// Navigation
const Stack = createNativeStackNavigator();

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    primary: theme.colors.primary,
    text: theme.colors.text,
    border: theme.colors.border,
  },
};

// Helper for custom back button
const BackButton = ({ navigation }: { navigation: any }) => {
  if (Platform.OS === 'web') {
    return (
      <button
        onClick={() => navigation.goBack()}
        style={{
          fontSize: 24,
          background: 'none',
          border: 'none',
          color: theme.colors.primary,
          cursor: 'pointer',
          marginRight: 16,
        }}
      >
        ←
      </button>
    );
  } else {
    return (
      <Pressable onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
        <Text style={{ fontSize: 24, color: theme.colors.primary }}>←</Text>
      </Pressable>
    );
  }
};

export default function App() {
  return (
    <NavigationContainer theme={NavTheme}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitle: () => (
            <Image
              source={require('./assets/brand/tame-logo.jpg')}
              style={{ width: 96, height: 28, borderRadius: 6, resizeMode: 'contain' }}
            />
          ),
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerLeft: () => null }} // No back button
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerLeft: () => null }} // No back button
        />
        <Stack.Screen
          name="GameLibrary"
          component={GameLibrary}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="ReadingLibrary"
          component={ReadingLibrary}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="TherapistTools"
          component={TherapistTools}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="TherapistLiveView"
          component={TherapistLiveView}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="BenchmarkRunner"
          component={BenchmarkRunner}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="PhonoAwarenessForm"
          component={PhonoAwarenessForm}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="MFASetup"
          component={MFASetup}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="MFAVerify"
          component={MFAVerify}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="RecoveryCodes"
          component={RecoveryCodes}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="PhoneSignIn"
          component={PhoneSignIn}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
        <Stack.Screen
          name="AdminRoles"
          component={AdminRoles}
          options={({ navigation }) => ({ headerLeft: () => <BackButton navigation={navigation} /> })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
