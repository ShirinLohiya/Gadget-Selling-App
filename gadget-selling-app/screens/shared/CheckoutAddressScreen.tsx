import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { Button } from '../../components/Button';

// ─── Person C's screen — scaffold provided by Person E ───
export default function CheckoutAddressScreen({ navigation }: any) {
  const [selected, setSelected] = React.useState(0);
  const addresses = [
    { name: 'Home', line: '42, Tech Park, Whitefield, Bengaluru - 560066', phone: '9988776655' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Delivery Address</Text>
      <Text style={styles.step}>Step 1 of 3</Text>

      {addresses.map((addr, i) => (
        <TouchableOpacity key={i} style={[styles.card, i === selected && styles.cardActive]} onPress={() => setSelected(i)}>
          <Text style={styles.addrName}>{addr.name}</Text>
          <Text style={styles.addrLine}>{addr.line}</Text>
          <Text style={styles.addrPhone}>📱 {addr.phone}</Text>
          {i === selected && <Text style={styles.selectedLabel}>✓ Selected</Text>}
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Button label="Continue →" onPress={() => navigation.navigate('CheckoutSummary')} fullWidth size="lg" />
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
  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1.5, borderColor: Colors.border },
  cardActive: { borderColor: Colors.primary },
  addrName: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.semiBold, marginBottom: 4 },
  addrLine: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  addrPhone: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4 },
  selectedLabel: { fontSize: FontSize.xs, color: Colors.success, marginTop: 6, fontWeight: FontWeight.semiBold },
  footer: { position: 'absolute', bottom: Spacing.xl, left: Spacing.md, right: Spacing.md },
});



