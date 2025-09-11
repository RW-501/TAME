import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import MFAGate from '../auth/MFAGate';
const theme = require('../config/tameTheme').TameTheme;

export default function GameLibrary() {
  return (
<MFAGate allowSkip={true}>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
        <Text style={[s.h, { color: theme.colors.primary }]}>Game Library</Text>
        <Text style={{ marginTop: 8 }}>
          Here you can list your games, modules, or learning experiences.
        </Text>
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900' },
});
