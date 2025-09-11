import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MFAGate from '../../auth/MFAGate';
const theme = require('../../config/tameTheme').TameTheme;

export default function TherapistTools() {
  const nav: any = useNavigation();

  const tools = [
    { label: '👑 Admin — Set Roles', screen: 'AdminRoles' },
    { label: 'Therapist Live View (📸 Snapshot)', screen: 'TherapistLiveView' },
    { label: 'Benchmark Assessment', screen: 'BenchmarkRunner' },
    { label: 'Phonological Awareness', screen: 'PhonoAwarenessForm' },
    { label: '🔐 Set up MFA (Authenticator)', screen: 'MFASetup' },
    { label: '🧩 Recovery Codes', screen: 'RecoveryCodes' },
  ];

  return (
    <MFAGate>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
        <Text style={[s.h, { color: theme.colors.primary }]}>Therapist Tools</Text>
        {tools.map((tool, i) => (
          <Pressable
            key={i}
            style={[s.btn, { borderColor: theme.colors.primary }]}
            onPress={() => nav.navigate(tool.screen)}
          >
            <Text style={[s.bt, { color: theme.colors.primary }]}>{tool.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  btn: { borderWidth: 2, borderRadius: 10, padding: 12, marginTop: 8 },
  bt: { fontWeight: '900', textAlign: 'center' },
});
