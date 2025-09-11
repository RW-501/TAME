import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import MFAGate from '../auth/MFAGate';
import { manifests } from '../assets/books';
const theme = require('../config/tameTheme').TameTheme;

export default function ReadingLibrary() {
  const openPDF = (file: string) => {
    try {
      const path = `assets/books/${file}`; // bundle-relative path
      Linking.openURL(path);
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to open PDF');
    }
  };

  return (
<MFAGate allowSkip={true}>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
        {manifests.map((manifest, idx) => (
          <React.Fragment key={idx}>
            <Text style={[s.h, { color: theme.colors.primary }]}>{manifest.title}</Text>
            <Text style={{ marginBottom: 12 }}>Schedule: {manifest.schedule}</Text>

            {manifest.files.map((f: string, i: number) => (
              <Pressable key={i} style={s.btn} onPress={() => openPDF(f)}>
                <Text style={s.bt}>{f}</Text>
              </Pressable>
            ))}

            <View style={{ height: 20 }} /> {/* spacing between manifests */}
          </React.Fragment>
        ))}
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900', marginBottom: 8 },
  btn: { borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 6, backgroundColor: '#fff', borderColor: '#E5E7EB' },
  bt: { fontWeight: '900' },
});
