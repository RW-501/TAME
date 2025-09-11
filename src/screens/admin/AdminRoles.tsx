import React from 'react';
import { ScrollView, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { Picker } from '@react-native-picker/picker';
import MFAGate from '../../auth/MFAGate';
import { useAuth } from '../../auth/useAuth';

export default function AdminRoles() {
  const [email, setEmail] = React.useState('therapist@example.com');
  const [role, setRole] = React.useState<'therapist' | 'admin'>('therapist');
  const [loading, setLoading] = React.useState(false);

  const { mfaEnabled, loading: authLoading } = useAuth();

  const setUserRole = async () => {
    if (!mfaEnabled) {
      return Alert.alert('MFA Required', 'Please complete multi-factor authentication before changing roles.');
    }
    if (!email.includes('@')) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }

    setLoading(true);
    try {
      const fn = httpsCallable(getFunctions(), 'setUserRole');
      const res: any = await fn({ email, role });
      Alert.alert('Role Updated', res?.data?.message || 'OK');
    } catch (e: any) {
      Alert.alert('Error', e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </ScrollView>
    );
  }

  return (
    <MFAGate>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={s.h}>Admin — Set User Role</Text>

        <TextInput
          style={s.in}
          value={email}
          onChangeText={setEmail}
          placeholder='user@example.com'
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <Picker
          selectedValue={role}
          onValueChange={v => setRole(v as 'therapist' | 'admin')}
          style={s.picker}
        >
          <Picker.Item label="Therapist" value="therapist" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>

        <Pressable style={s.btn} onPress={setUserRole} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.bt}>Set Role</Text>}
        </Pressable>
      </ScrollView>
    </MFAGate>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  in: { borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 8 },
  picker: { marginTop: 8, borderWidth: 1, borderRadius: 10 },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
  },
  bt: { fontWeight: '900', color: '#fff', textAlign: 'center' },
});
