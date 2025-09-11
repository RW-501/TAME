import React from 'react';
import { ScrollView, Text, TextInput, Pressable, StyleSheet, View, Switch, Alert } from 'react-native';
import SessionTimer from '../../components/SessionTimer';
import { ACTIVE_BACKEND } from '../../config/backend';
import { LocalBackend, FirebaseBackend } from '../../backend';
import MFAGate from '../../auth/MFAGate';
const theme = require('../../config/tameTheme').TameTheme;

const DOMAINS = [
  { id: 'rhyming', label: 'Rhyming' },
  { id: 'syllables', label: 'Syllable awareness' },
  { id: 'onset-rime', label: 'Onset‑rime' },
  { id: 'blending', label: 'Blending' },
  { id: 'segmenting', label: 'Segmenting' },
  { id: 'deletion', label: 'Deletion' },
  { id: 'substitution', label: 'Substitution' },
];

export default function PhonologicalAwarenessForm() {
  const backend = ACTIVE_BACKEND === 'firebase' ? FirebaseBackend : LocalBackend;

  const [sid, setSid] = React.useState('S12345');
  const [billable, setBillable] = React.useState(true);
  const [ratings, setRatings] = React.useState<any>({});
  const [notes, setNotes] = React.useState('');

  const setR = (id: string, val: string) =>
    setRatings((r: any) => ({ ...r, [id]: val }));

  const save = async () => {
    try {
      await backend.saveArtifact({
        id: String(Date.now()),
        ts: Date.now(),
        studentId: sid,
        payload: { type: 'phonological-awareness', billable, ratings, notes },
      });
      Alert.alert('Saved', 'Assessment saved.');
    } catch (e: any) {
      Alert.alert('Error', e?.message || String(e));
    }
  };

  return (
<MFAGate allowSkip={true}>
      <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
        <Text style={[s.h, { color: theme.colors.primary }]}>
          Phonological Awareness — Diagnostic
        </Text>

        <TextInput
          style={s.in}
          value={sid}
          onChangeText={setSid}
          placeholder='Student ID'
        />

        <SessionTimer storageKey={`assess:phono:${sid}`} />

        <View style={s.row}>
          <Text>Billable?</Text>
          <Switch value={billable} onValueChange={setBillable} />
        </View>

        <View style={s.card}>
          {DOMAINS.map((d) => (
            <View key={d.id} style={s.line}>
              <Text style={{ flex: 1 }}>{d.label}</Text>
              {['+', '±', '-'].map((v) => (
                <Pressable
                  key={v}
                  style={[
                    s.pill,
                    { borderColor: theme.colors.primary, backgroundColor: ratings[d.id] === v ? theme.colors.primary : 'transparent' },
                  ]}
                  onPress={() => setR(d.id, v)}
                >
                  <Text style={[s.bt, { color: ratings[d.id] === v ? '#fff' : theme.colors.primary }]}>{v}</Text>
                </Pressable>
              ))}
            </View>
          ))}

          <Text style={{ marginTop: 8 }}>Notes</Text>
          <TextInput
            style={[s.in, { height: 80 }]}
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <Pressable style={[s.btn, { borderColor: theme.colors.primary }]} onPress={save}>
            <Text style={[s.bt, { color: theme.colors.primary }]}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  in: { borderWidth: 1, borderRadius: 10, padding: 8, marginTop: 8, backgroundColor: '#fff' },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 8 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10, backgroundColor: '#fff' },
  line: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  pill: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  bt: { fontWeight: '900', textAlign: 'center' },
  btn: { borderWidth: 2, borderRadius: 10, padding: 10, marginTop: 10, alignSelf: 'flex-start' },
});
