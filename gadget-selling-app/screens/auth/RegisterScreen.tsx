import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../store/useAuthStore';
import type { RootStackParamList } from '../../navigation/types';

// ─── Types ────────────────────────────────────────────────────────────────────
type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterNavigationProp;
}

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
};

// ─── Validation ───────────────────────────────────────────────────────────────
function validateForm(
  name: string,
  email: string,
  password: string,
  phone: string
): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Enter a valid email';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Minimum 6 characters';
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (!phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (digitsOnly.length !== 10) {
    errors.phone = 'Enter a valid 10-digit phone number';
  }

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Bug fix #1 — guard against state updates on unmounted component
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const register = useAuthStore((s) => s.register);

  const handleNameChange = useCallback((text: string) => {
    setName(text);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  }, [errors.name]);

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  }, [errors.email]);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  }, [errors.password]);

  const handlePhoneChange = useCallback((text: string) => {
    const numeric = text.replace(/\D/g, '');
    setPhone(numeric);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  }, [errors.phone]);

  // Bug fix #2 — handleRegister now in useCallback, consistent with other handlers
  const handleRegister = useCallback(async () => {
    const validationErrors = validateForm(name, email, password, phone);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim().toLowerCase(), password, phone);
      // Bug fix #3 — setLoading BEFORE navigate to avoid post-unmount state update
      if (isMounted.current) setLoading(false);
      navigation.replace('RoleSelect');
    } catch (error) {
      if (isMounted.current) {
        setLoading(false);
        Alert.alert(
          'Registration Failed',
          'Something went wrong. Please try again.',
          [{ text: 'OK' }]
        );
      }
    }
  }, [name, email, password, phone, register, navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.primary} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.sub}>Join GadgetShop today</Text>

          <Input
            label="Full Name"
            placeholder="Your full name"
            value={name}
            onChangeText={handleNameChange}
            icon="person-outline"
            autoCapitalize="words"
            error={errors.name}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            error={errors.email}
          />
          <Input
            label="Password"
            placeholder="Min. 6 characters"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            icon="lock-closed-outline"
            error={errors.password}
          />
          <Input
            label="Phone Number"
            placeholder="10-digit mobile number"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="number-pad"
            icon="call-outline"
            error={errors.phone}
            maxLength={10}
          />

          <Button
            label="Create Account"
            onPress={handleRegister}
            loading={loading}
            fullWidth
            size="lg"
            style={styles.submitBtn}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl, paddingTop: Spacing.lg },
  back: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.lg, alignSelf: 'flex-start' },
  backText: { color: Colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.medium },
  title: { fontSize: FontSize.xxxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, marginBottom: Spacing.xl, marginTop: Spacing.xs },
  submitBtn: { marginTop: Spacing.md },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  footerText: { color: Colors.textSecondary, fontSize: FontSize.md },
  link: { color: Colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.semiBold },
});
