// src/screens/auth/PhoneSignIn.tsx
import React from 'react';
import { ScrollView, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import authRN, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  const [phone, setPhone] = React.useState('+15555551234'); // default phone number
  const [confirm, setConfirm] = React.useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = React.useState('');

  // Start phone sign-in process
  const start = async () => {
    try {
      const confirmation = await authRN().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      Alert.alert('Code sent', 'Enter the SMS code you received.');
    } catch (e: any) {
      Alert.alert('Phone auth error', e?.message || String(e));
    }
  };

  // Verify the SMS code
  const verify = async () => {
    if (!confirm) return;
    try {
      await confirm.confirm(code);
      Alert.alert('Signed in', 'Phone sign-in complete');
    } catch (e: any) {
      Alert.alert('Verification failed', e?.message || String(e));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={s.h}>Phone / SMS Sign-In</Text>

      <TextInput
        style={s.in}
        value={phone}
        onChangeText={setPhone}
        placeholder="+1 555 555 1234"
        keyboardType="phone-pad"
      />

      <Pressable style={s.btn} onPress={start}>
        <Text style={s.bt}>Send Code</Text>
      </Pressable>

      {confirm && (
        <>
          <TextInput
            style={s.in}
            value={code}
            onChangeText={setCode}
            placeholder="123456"
            keyboardType="number-pad"
          />
          <Pressable style={s.btn} onPress={verify}>
            <Text style={s.bt}>Verify</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900' },
  in: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  bt: { fontWeight: '900' },
});
