import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, FontSize, FontWeight, Radius, Shadow } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';
import type { UserRole } from '../../store/useAuthStore';
import type { RootStackParamList } from '../../navigation/types';

// ─── Types ────────────────────────────────────────────────────────────────────
type RoleSelectNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RoleSelect'>;

interface Props {
  navigation: RoleSelectNavigationProp;
}

interface RoleCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  role: 'buyer' | 'seller';
  onPress: (role: 'buyer' | 'seller') => void;
  isLoading: boolean;
  activeRole: UserRole;
}

// ─── Role Card ────────────────────────────────────────────────────────────────
function RoleCard({ emoji, title, subtitle, role, onPress, isLoading, activeRole }: RoleCardProps) {
  const isThisLoading = isLoading && activeRole === role;
  const isOtherLoading = isLoading && activeRole !== role;
  const cardStyle = role === 'buyer' ? styles.buyerCard : styles.sellerCard;

  return (
    <TouchableOpacity
      style={[styles.card, cardStyle, isOtherLoading && styles.cardDisabled]}
      onPress={() => onPress(role)}
      activeOpacity={0.85}
      disabled={isLoading}
    >
      {isThisLoading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.cardSpinner} />
      ) : (
        <>
          <Text style={styles.cardEmoji}>{emoji}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSub}>{subtitle}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RoleSelectScreen({ navigation }: Props) {
  const setRole = useAuthStore((s) => s.setRole);
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>(null);

  // Bug fix #1 — guard against double state update on unmounted component
  // (both setLoading + setActiveRole were firing in finally after navigation.replace)
  const isMounted = useRef(true);
  useEffect(() => () => { isMounted.current = false; }, []);

  const handleChoose = useCallback(async (role: 'buyer' | 'seller') => {
    setLoading(true);
    setActiveRole(role);
    try {
      await setRole(role);
      // Bug fix #2 — reset state BEFORE navigate, not in finally after unmount
      if (isMounted.current) {
        setLoading(false);
        setActiveRole(null);
      }
      navigation.replace(role === 'buyer' ? 'BuyerTabs' : 'SellerTabs');
    } catch (error) {
      if (isMounted.current) {
        setLoading(false);
        setActiveRole(null);
        Alert.alert(
          'Something went wrong',
          'Could not save your role. Please try again.',
          [{ text: 'OK' }]
        );
      }
    }
  }, [setRole, navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Who are you?</Text>
        <Text style={styles.sub}>Choose your role to get started</Text>

        <RoleCard
          emoji="🛍️"
          title="I'm a Buyer"
          subtitle="Browse, compare and buy the latest gadgets"
          role="buyer"
          onPress={handleChoose}
          isLoading={loading}
          activeRole={activeRole}
        />
        <RoleCard
          emoji="🏪"
          title="I'm a Seller"
          subtitle="List your gadgets and connect with buyers"
          role="seller"
          onPress={handleChoose}
          isLoading={loading}
          activeRole={activeRole}
        />

        <Text style={styles.note}>You can switch roles later from your profile settings.</Text>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.xl, justifyContent: 'center' },
  title: { fontSize: FontSize.display, color: Colors.textPrimary, fontWeight: FontWeight.bold, textAlign: 'center' },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xxl, marginTop: Spacing.sm },
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
    ...Shadow.md,
  },
  buyerCard: { backgroundColor: Colors.primary },
  sellerCard: { backgroundColor: Colors.accent },
  cardDisabled: { opacity: 0.4 },
  cardSpinner: { paddingVertical: Spacing.md },
  cardEmoji: { fontSize: 56, marginBottom: Spacing.md },
  cardTitle: { fontSize: FontSize.xxl, color: '#fff', fontWeight: FontWeight.bold },
  cardSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: Spacing.xs, lineHeight: 20 },
  note: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center', marginTop: Spacing.md },
});
