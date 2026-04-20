import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { Button } from '../../components/Button';

// ─── Person C's screen — Cart & Checkout Lead ───
export default function CheckoutAddressScreen({ navigation }: any) {
  const [selected, setSelected] = useState(0);
  const [addresses, setAddresses] = useState([
    { name: 'Home', line: '42, Tech Park, Whitefield, Bengaluru - 560066', phone: '9988776655' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLine, setNewLine] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleAddAddress = () => {
    if (newName && newLine && newPhone) {
      setAddresses([...addresses, { name: newName, line: newLine, phone: newPhone }]);
      setSelected(addresses.length);
      setShowForm(false);
      setNewName('');
      setNewLine('');
      setNewPhone('');
    }
  };

  const handleContinue = () => {
    navigation.navigate('CheckoutSummary', { address: addresses[selected] });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Delivery Address</Text>
      <Text style={styles.step}>Step 1 of 3</Text>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
        {addresses.map((addr, i) => (
          <TouchableOpacity key={i} style={[styles.card, i === selected && styles.cardActive]} onPress={() => setSelected(i)}>
            <Text style={styles.addrName}>{addr.name}</Text>
            <Text style={styles.addrLine}>{addr.line}</Text>
            <Text style={styles.addrPhone}>📱 {addr.phone}</Text>
            {i === selected && <Text style={styles.selectedLabel}>✓ Selected</Text>}
          </TouchableOpacity>
        ))}

        {!showForm ? (
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)}>
            <Text style={styles.addBtnText}>+ Add New Address</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.form}>
            <Text style={styles.formTitle}>New Address</Text>
            <TextInput style={styles.input} placeholder="Label (e.g. Work, Home)" placeholderTextColor={Colors.textMuted} value={newName} onChangeText={setNewName} />
            <TextInput style={styles.input} placeholder="Full Address Line" placeholderTextColor={Colors.textMuted} value={newLine} onChangeText={setNewLine} multiline />
            <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor={Colors.textMuted} value={newPhone} onChangeText={setNewPhone} keyboardType="phone-pad" />
            <View style={styles.formActions}>
              <Button label="Cancel" variant="outline" onPress={() => setShowForm(false)} style={{ flex: 1, marginRight: Spacing.sm }} />
              <Button label="Save Address" onPress={handleAddAddress} style={{ flex: 1 }} />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Continue →" onPress={handleContinue} fullWidth size="lg" />
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
  content: { flex: 1 },
  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1.5, borderColor: Colors.border },
  cardActive: { borderColor: Colors.primary },
  addrName: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.semiBold, marginBottom: 4 },
  addrLine: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  addrPhone: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4 },
  selectedLabel: { fontSize: FontSize.xs, color: Colors.success, marginTop: 6, fontWeight: FontWeight.semiBold },
  addBtn: { padding: Spacing.md, alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.lg, borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed', marginTop: Spacing.sm },
  addBtnText: { color: Colors.primary, fontSize: FontSize.md, fontWeight: FontWeight.medium },
  form: { marginTop: Spacing.md, padding: Spacing.md, backgroundColor: Colors.surface, borderRadius: Radius.lg },
  formTitle: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.bold, marginBottom: Spacing.sm },
  input: { borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.sm, marginBottom: Spacing.sm, fontSize: FontSize.md, color: Colors.textPrimary, backgroundColor: Colors.background },
  formActions: { flexDirection: 'row', marginTop: Spacing.xs },
  footer: { position: 'absolute', bottom: Spacing.xl, left: Spacing.md, right: Spacing.md },
});
