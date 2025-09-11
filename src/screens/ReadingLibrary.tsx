import React from 'react'; 
import { ScrollView, Text, StyleSheet, Pressable, View, Image, Platform } from 'react-native';
import MFAGate from '../auth/MFAGate';
import { manifests } from '../assets/books'; // <-- correct path
const theme = require('../config/tameTheme').TameTheme;

export default function ReadingLibrary() {
  const openPDF = (file: string) => {
    try {
      const url = Platform.OS === 'web'
        ? `/books/${file}` // public folder path for web
        : `books/${file}`; // native path (optional, adjust if needed)

      // On web, open in new tab
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        // For native, use Linking to open the file if needed
        // Linking.openURL(url); 
        alert('PDF open on native not implemented yet');
      }
    } catch (e: any) {
      alert(`Error: ${e?.message || 'Failed to open PDF'}`);
    }
  };

  return (
    <MFAGate allowSkip={true}>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
        {manifests.map((manifest, idx) => (
          <View key={idx} style={s.card}>
            <Text style={[s.title, { color: theme.colors.primary }]}>{manifest.title}</Text>
            <Text style={s.schedule}>Schedule: {manifest.schedule}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filesContainer}>
              {manifest.files.map((f: string, i: number) => (
                <Pressable key={i} style={s.fileBtn} onPress={() => openPDF(f)}>
                  <Text style={s.fileText} numberOfLines={1}>📄 {f}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: '900', marginBottom: 6 },
  schedule: { marginBottom: 12, color: '#6B7280' },
  filesContainer: { flexDirection: 'row', gap: 12 },
  fileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    marginRight: 8,
    minWidth: 140,
  },
  fileText: { fontWeight: '700', color: theme.colors.primary, marginLeft: 6, flexShrink: 1 },
});
