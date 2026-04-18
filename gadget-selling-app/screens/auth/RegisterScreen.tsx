import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../store/useAuthStore';

// ─── Person A's screen — placeholder provided by Person E ───
export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const register = useAuthStore((s) => s.register);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password || password.length < 6) e.password = 'Minimum 6 characters';
    if (!phone.trim() || phone.length < 10) e.phone = 'Enter a valid 10-digit phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    await register(name, email, password, phone);
    setLoading(false);
    navigation.replace('RoleSelect');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.sub}>Join GadgetShop today</Text>

          <Input label="Full Name" placeholder="Your full name" value={name} onChangeText={setName} icon="person-outline" error={errors.name} />
          <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" icon="mail-outline" error={errors.email} />
          <Input label="Password" placeholder="Min. 6 characters" value={password} onChangeText={setPassword} secureTextEntry icon="lock-closed-outline" error={errors.password} />
          <Input label="Phone Number" placeholder="10-digit mobile number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" icon="call-outline" error={errors.phone} maxLength={10} />

          <Button label="Create Account" onPress={handleRegister} loading={loading} fullWidth size="lg" style={{ marginTop: Spacing.md }} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl, paddingTop: Spacing.lg },
  back: { marginBottom: Spacing.lg },
  backText: { color: Colors.primary, fontSize: FontSize.md },
  title: { fontSize: FontSize.xxxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl, marginTop: Spacing.xs },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  footerText: { color: Colors.textSecondary, fontSize: FontSize.md },
  link: { color: Colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.semiBold },
});



