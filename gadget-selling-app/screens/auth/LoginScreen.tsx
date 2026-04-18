import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../store/useAuthStore';

// ─── Person A's screen — placeholder provided by Person E ───
export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const login = useAuthStore((s) => s.login);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password.trim()) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigation.replace('RoleSelect');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>⚡ GadgetShop</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.sub}>Sign in to continue</Text>

          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            error={errors.email}
          />
          <Input
            label="Password"
            placeholder="Min. 6 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed-outline"
            error={errors.password}
          />

          <Button label="Sign In" onPress={handleLogin} loading={loading} fullWidth size="lg" style={{ marginTop: Spacing.md }} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl, paddingTop: Spacing.xxl },
  logo: { fontSize: FontSize.xxl, color: Colors.primary, fontWeight: FontWeight.bold, marginBottom: Spacing.xl },
  title: { fontSize: FontSize.xxxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl, marginTop: Spacing.xs },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  footerText: { color: Colors.textSecondary, fontSize: FontSize.md },
  link: { color: Colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.semiBold },
});



