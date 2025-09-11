// src/auth/MFAGate.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from './useAuth';
import { useNavigation } from '@react-navigation/native';

const theme = require('../config/tameTheme').TameTheme;

type Props = {
  children: React.ReactNode;
};

export default function MFAGate({ children }: Props) {
  const { user, mfaEnabled, loading } = useAuth();
  const nav: any = useNavigation();

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={s.center}>
        <Text style={s.text}>You must be signed in to access this content.</Text>
        <Pressable style={s.btn} onPress={() => nav.navigate('Login')}>
          <Text style={s.bt}>Go to Login</Text>
        </Pressable>
      </View>
    );
  }

  if (!mfaEnabled) {
    return (
      <View style={s.center}>
        <Text style={s.text}>Multi-Factor Authentication is required to continue.</Text>
        <Pressable
          style={s.btn}
          onPress={() => nav.navigate('MFASetup')}
        >
          <Text style={s.bt}>Set Up MFA</Text>
        </Pressable>
      </View>
    );
  }

  return <>{children}</>;
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 16 },
  btn: { borderWidth: 2, borderRadius: 10, padding: 12, marginTop: 8, borderColor: theme.colors.primary },
  bt: { fontWeight: '900', color: theme.colors.primary },
});
