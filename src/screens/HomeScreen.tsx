import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MFAGate from '../auth/MFAGate';
const theme = require('../config/tameTheme').TameTheme;

export default function HomeScreen() {
  const nav: any = useNavigation();

  return (
    <MFAGate>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
        <Image
          source={require('../../assets/brand/tame-logo.jpg')}
          style={{ width: 120, height: 120, borderRadius: 12, alignSelf: 'center' }}
        />
        <Text style={[s.h, { color: theme.colors.primary, alignSelf: 'center' }]}>
          TAME — Triple A Multisensory Education
        </Text>

        <Pressable style={s.btn} onPress={() => nav.navigate('GameLibrary')}>
          <Text style={s.bt}>🎮 Game Library</Text>
        </Pressable>
        <Pressable style={s.btn} onPress={() => nav.navigate('ReadingLibrary')}>
          <Text style={s.bt}>📚 Reading Library</Text>
        </Pressable>
        <Pressable style={s.btn} onPress={() => nav.navigate('TherapistTools')}>
          <Text style={s.bt}>🛠 Therapist Tools</Text>
        </Pressable>
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900', marginTop: 8 },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  bt: { fontWeight: '900' },
});
