import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { startTotpEnrollment } from '../../auth/mfa';
import { useNavigation } from '@react-navigation/native'; // <-- import here

const theme = require('../../config/tameTheme').TameTheme;

export default function MFASetup() {
  const navigation = useNavigation(); // <-- call inside component

  const [qrUrl, setQrUrl] = React.useState<string | undefined>();
  const [secret, setSecret] = React.useState<string | undefined>();
  const [otp, setOtp] = React.useState('');
  const [finalizeFn, setFinalizeFn] = React.useState<((code: string) => Promise<void>) | null>(null);
  const [enrolled, setEnrolled] = React.useState(false);

  const begin = async () => {
    console.log("▶️ Start TOTP pressed");
    try {
      const { secret, qrCodeUrl, finalize } = await startTotpEnrollment() as any;
      console.log("Secret:", secret, "QR URL:", qrCodeUrl);
      setSecret(secret);
      setQrUrl(qrCodeUrl);
      setFinalizeFn(() => finalize);
    } catch (e: any) {
      console.error("TOTP begin failed", e);
      Alert.alert('Failed', e?.message || String(e));
    }
  };

  const complete = async () => {
    try {
      if (!finalizeFn) throw new Error('Tap Start TOTP first');
      await finalizeFn(otp);
      setEnrolled(true);
      Alert.alert('Success', 'TOTP enrolled successfully!');

      // <-- navigate to HomeScreen after enrollment
      navigation.replace('HomeScreen');

    } catch (e: any) {
      Alert.alert('Failed', e?.message || String(e));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: theme.colors.surface }}>
      <Text style={[s.h, { color: theme.colors.primary }]}>Multi-Factor Authentication (TOTP)</Text>
      
      {!enrolled && (
        <Pressable style={[s.btn, { borderColor: theme.colors.primary }]} onPress={begin}>
          <Text style={[s.bt, { color: theme.colors.primary }]}>Start TOTP</Text>
   {!enrolled && (
  <Pressable
    style={[s.btn, { borderColor: theme.colors.secondary, marginTop: 6 }]}
    onPress={() => navigation.replace('HomeScreen')}
  >
    <Text style={[s.bt, { color: theme.colors.secondary }]}>Skip MFA</Text>
  </Pressable>
)}
        </Pressable>
      )}

      {qrUrl && !enrolled && (
        <View style={s.card}>
          <Text style={{ marginBottom: 8 }}>Scan this QR code in your Authenticator app:</Text>
          <QRCode value={qrUrl} size={180} />
          <Text selectable style={{ marginTop: 8 }}>Secret (backup): {secret}</Text>
          <TextInput
            style={s.in}
            placeholder='Enter 6-digit code'
            value={otp}
            onChangeText={setOtp}
            keyboardType='number-pad'
          />
          <Pressable style={[s.btn, { borderColor: theme.colors.primary }]} onPress={complete}>
            <Text style={[s.bt, { color: theme.colors.primary }]}>Verify & Enroll</Text>
          </Pressable>
        </View>
      )}

      {enrolled && (
        <View style={s.card}>
          <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>
            ✅ MFA is now enabled for your account.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  btn: { borderWidth: 2, borderRadius: 10, padding: 10, marginTop: 10, alignSelf: 'flex-start' },
  bt: { fontWeight: '900' },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10, backgroundColor: '#fff' },
  in: { borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 8, borderColor: '#CBD5E1', backgroundColor: '#fff' },
});
