import React from 'react';
import { ScrollView, Text, TextInput, Pressable, StyleSheet, View, Alert } from 'react-native';
import SessionTimer from '../../components/SessionTimer';
import { ACTIVE_BACKEND } from '../../config/backend';
import { LocalBackend, FirebaseBackend } from '../../backend';
import MFAGate from '../../auth/MFAGate';
const theme = require('../../config/tameTheme').TameTheme;

const SECTIONS = {
  'Schedule 1': [{ id: 'letter-names', label: 'Letter Names', max: 26 }],
  'Schedule 2A': [{ id: 'short-vowels-5', label: 'Short Vowels (a,e,i,o,u)', max: 5 }],
  'Schedule 2B': [{ id: 'final-e', label: 'VCe words', max: 20 }],
  'Schedule 2C': [{ id: 'stable-final', label: 'Stable Final Syllables', max: 10 }],
};

export default function BenchmarkRunner() {
  const backend = ACTIVE_BACKEND === 'firebase' ? FirebaseBackend : LocalBackend;
  const [sid, setSid] = React.useState('S12345');
  const [sched, setSched] = React.useState('Schedule 2A');
  const [scores, setScores] = React.useState<any>({});

  const setScore = (id: string, v: string) =>
    setScores((s: any) => ({ ...s, [id]: Number(v || 0) }));

  const save = async () => {
    try {
      await backend.saveArtifact({
        id: String(Date.now()),
        ts: Date.now(),
        studentId: sid,
        payload: { type: 'benchmark', schedule: sched, scores },
      });
      Alert.alert('Saved', 'Benchmark saved.');
    } catch (e: any) {
      Alert.alert('Error', e?.message || String(e));
    }
  };

  return (
<MFAGate allowSkip={true}>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
        <Text style={[s.h, { color: theme.colors.primary }]}>Benchmark Assessment</Text>

        <TextInput
          style={s.in}
          value={sid}
          onChangeText={setSid}
          placeholder='Student ID'
        />

        <SessionTimer storageKey={`assess:bench:${sid}:${sched}`} />

        <View style={s.card}>
          {SECTIONS[sched].map((sec: any) => (
            <View key={sec.id} style={s.line}>
              <Text style={{ flex: 1, fontWeight: '900' }}>{sec.label}</Text>
              <TextInput
                style={s.inSmall}
                keyboardType='numeric'
                onChangeText={(v) => setScore(sec.id, v)}
              />
            </View>
          ))}

          <Pressable style={[s.btn, { borderColor: theme.colors.primary }]} onPress={save}>
            <Text style={[s.bt, { color: theme.colors.primary }]}>Save Benchmark</Text>
          </Pressable>
        </View>
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  in: { borderWidth: 1, borderRadius: 10, padding: 8, marginTop: 8, backgroundColor: '#fff' },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10, backgroundColor: '#fff' },
  line: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  inSmall: { borderWidth: 1, borderRadius: 10, padding: 6, width: 80, backgroundColor: '#fff' },
  btn: { borderWidth: 2, borderRadius: 10, padding: 10, marginTop: 10, alignSelf: 'flex-start' },
  bt: { fontWeight: '900', textAlign: 'center' },
});
