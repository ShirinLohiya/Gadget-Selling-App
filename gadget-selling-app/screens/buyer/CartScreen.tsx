import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { CartItem } from '../../components/CartItem';
import { Button } from '../../components/Button';
import { useCartStore } from '../../store/useCartStore';

// ─── Person C's screen — scaffold provided by Person E ───
export default function CartScreen({ navigation }: any) {
  const { items, removeItem, updateQty, getSubtotal, getTotal, getDiscount } = useCartStore();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some gadgets and come back!</Text>
          <Button label="Explore Gadgets" onPress={() => navigation.navigate('Explore')} style={{ marginTop: Spacing.xl }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.productId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQty={(qty) => updateQty(item.productId, qty)}
            onRemove={() => removeItem(item.productId)}
          />
        )}
      />
      <View style={styles.footer}>
        <View style={styles.row}><Text style={styles.label}>Subtotal</Text><Text style={styles.value}>₹{getSubtotal().toLocaleString('en-IN')}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Discount</Text><Text style={[styles.value, { color: Colors.success }]}>-₹{getDiscount().toLocaleString('en-IN')}</Text></View>
        <View style={[styles.row, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>₹{getTotal().toLocaleString('en-IN')}</Text></View>
        <Button label="Proceed to Checkout" onPress={() => navigation.navigate('CheckoutAddress')} fullWidth size="lg" style={{ marginTop: Spacing.md }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold, padding: Spacing.md },
  list: { padding: Spacing.md },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  emptyTitle: { fontSize: FontSize.xl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  emptySub: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.xs },
  footer: { backgroundColor: Colors.surface, padding: Spacing.md, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  label: { color: Colors.textSecondary, fontSize: FontSize.md },
  value: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: FontWeight.medium },
  totalRow: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm, marginTop: Spacing.xs },
  totalLabel: { color: Colors.textPrimary, fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  totalValue: { color: Colors.primary, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
});



