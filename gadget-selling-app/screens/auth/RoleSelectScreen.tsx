import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius, Shadow } from '../../constants/theme';
import { useAuthStore } from '../../store/useAuthStore';

// ─── Person A's screen — placeholder provided by Person E ───
export default function RoleSelectScreen({ navigation }: any) {
  const setRole = useAuthStore((s) => s.setRole);

  const choose = async (role: 'buyer' | 'seller') => {
    await setRole(role);
    navigation.replace(role === 'buyer' ? 'BuyerTabs' : 'SellerTabs');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Who are you?</Text>
        <Text style={styles.sub}>Choose your role to get started</Text>

        <TouchableOpacity style={[styles.card, styles.buyerCard]} onPress={() => choose('buyer')} activeOpacity={0.85}>
          <Text style={styles.cardEmoji}>🛍️</Text>
          <Text style={styles.cardTitle}>I'm a Buyer</Text>
          <Text style={styles.cardSub}>Browse, compare and buy the latest gadgets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.sellerCard]} onPress={() => choose('seller')} activeOpacity={0.85}>
          <Text style={styles.cardEmoji}>🏪</Text>
          <Text style={styles.cardTitle}>I'm a Seller</Text>
          <Text style={styles.cardSub}>List your gadgets and connect with buyers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.xl, justifyContent: 'center' },
  title: { fontSize: FontSize.display, color: Colors.textPrimary, fontWeight: FontWeight.bold, textAlign: 'center' },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xxl, marginTop: Spacing.sm },
  card: { borderRadius: Radius.xl, padding: Spacing.xl, marginBottom: Spacing.lg, alignItems: 'center', ...Shadow.md },
  buyerCard: { backgroundColor: Colors.primary },
  sellerCard: { backgroundColor: Colors.accent },
  cardEmoji: { fontSize: 56, marginBottom: Spacing.md },
  cardTitle: { fontSize: FontSize.xxl, color: '#fff', fontWeight: FontWeight.bold },
  cardSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: Spacing.xs, lineHeight: 20 },
});



