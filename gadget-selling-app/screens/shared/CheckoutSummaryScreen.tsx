import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { Button } from '../../components/Button';
import { useCartStore } from '../../store/useCartStore';

// ─── Person C's screen — Cart & Checkout Lead ───
export default function CheckoutSummaryScreen({ route, navigation }: any) {
  const { items, getSubtotal, getDiscount, getTotal } = useCartStore();
  const address = route.params?.address;

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Order Summary</Text>
      <Text style={styles.step}>Step 2 of 3</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Items */}
        {items.map((item) => (
          <View key={item.productId} style={styles.row}>
            <Text style={styles.itemName} numberOfLines={1}>{item.name} × {item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</Text>
          </View>
        ))}

        {/* Delivery Address */}
        {address && (
          <View style={styles.addressBox}>
            <Text style={styles.sectionLabel}>📍 Delivering To:</Text>
            <Text style={styles.addrName}>{address.name}</Text>
            <Text style={styles.addrLine}>{address.line}</Text>
            <Text style={styles.addrPhone}>📱 {address.phone}</Text>
          </View>
        )}

        <View style={styles.divider} />
        <View style={styles.row}><Text style={styles.label}>Subtotal</Text><Text style={styles.value}>₹{getSubtotal().toLocaleString('en-IN')}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Discount</Text><Text style={[styles.value, { color: Colors.success }]}>-₹{getDiscount().toLocaleString('en-IN')}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Delivery</Text><Text style={styles.value}>{getSubtotal() > 50000 ? 'Free' : '₹99'}</Text></View>
        <View style={[styles.row, styles.totalRow]}><Text style={styles.totalLabel}>Grand Total</Text><Text style={styles.totalValue}>₹{getTotal().toLocaleString('en-IN')}</Text></View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Proceed to Pay →" onPress={() => navigation.navigate('CheckoutPayment', { address })} fullWidth size="lg" />
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
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  itemName: { flex: 1, color: Colors.textSecondary, fontSize: FontSize.sm },
  itemPrice: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  addressBox: { marginTop: Spacing.md, padding: Spacing.md, backgroundColor: Colors.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border },
  sectionLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.xs, fontWeight: FontWeight.semiBold },
  addrName: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.semiBold, marginBottom: 2 },
  addrLine: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  addrPhone: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  label: { color: Colors.textSecondary, fontSize: FontSize.md },
  value: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: FontWeight.medium },
  totalRow: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm, marginTop: Spacing.xs },
  totalLabel: { color: Colors.textPrimary, fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  totalValue: { color: Colors.primary, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
  footer: { position: 'absolute', bottom: Spacing.xl, left: Spacing.md, right: Spacing.md },
});
