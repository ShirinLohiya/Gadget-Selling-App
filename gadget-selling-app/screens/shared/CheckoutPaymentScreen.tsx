import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { Button } from '../../components/Button';
import { useCartStore } from '../../store/useCartStore';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', emoji: '📱' },
  { id: 'card', label: 'Credit / Debit Card', emoji: '💳' },
  { id: 'netbanking', label: 'Net Banking', emoji: '🏦' },
  { id: 'cod', label: 'Cash on Delivery', emoji: '💵' },
];

// ─── Person C's screen — scaffold provided by Person E ───
export default function CheckoutPaymentScreen({ navigation }: any) {
  const [selected, setSelected] = useState('upi');
  const [paying, setPaying] = useState(false);
  const { clearCart, getTotal } = useCartStore();

  const handlePay = async () => {
    setPaying(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    setPaying(false);
    const orderId = `ORD${Date.now()}`;
    navigation.replace('OrderConfirmation', { orderId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.step}>Step 3 of 3</Text>

      {PAYMENT_METHODS.map((m) => (
        <TouchableOpacity key={m.id} style={[styles.card, m.id === selected && styles.cardActive]} onPress={() => setSelected(m.id)}>
          <Text style={styles.cardEmoji}>{m.emoji}</Text>
          <Text style={styles.cardLabel}>{m.label}</Text>
          {m.id === selected && <View style={styles.radio} />}
        </TouchableOpacity>
      ))}

      <Text style={styles.total}>Total: ₹{getTotal().toLocaleString('en-IN')}</Text>

      <View style={styles.footer}>
        {paying ? (
          <View style={styles.payingRow}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={styles.payingText}>Processing payment...</Text>
          </View>
        ) : (
          <Button label={`Pay ₹${getTotal().toLocaleString('en-IN')}`} onPress={handlePay} fullWidth size="lg" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background, padding: Spacing.md },
  back: { marginBottom: Spacing.sm },
  backText: { color: Colors.primary, fontSize: FontSize.md },
  title: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  step: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.lg, marginTop: 4 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1.5, borderColor: Colors.border },
  cardActive: { borderColor: Colors.primary },
  cardEmoji: { fontSize: 22, marginRight: Spacing.md },
  cardLabel: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  radio: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.primary },
  total: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: FontWeight.bold, textAlign: 'center', marginTop: Spacing.md },
  footer: { position: 'absolute', bottom: Spacing.xl, left: Spacing.md, right: Spacing.md },
  payingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm },
  payingText: { color: Colors.textSecondary, fontSize: FontSize.md },
});



