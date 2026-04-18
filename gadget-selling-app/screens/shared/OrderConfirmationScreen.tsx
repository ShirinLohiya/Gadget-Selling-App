import React from 'react';
import { View, Text, StyleSheet,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { Button } from '../../components/Button';

// ─── Person C's screen — scaffold provided by Person E ───
export default function OrderConfirmationScreen({ route, navigation }: any) {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.checkmark}>✅</Text>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Text style={styles.sub}>Your gadget is on its way. Track it in My Orders.</Text>

        <View style={styles.buttons}>
          <Button label="Track My Order" onPress={() => navigation.navigate('OrderDetail', { orderId })} fullWidth size="lg" style={{ marginBottom: Spacing.sm }} />
          <Button label="Continue Shopping" onPress={() => navigation.navigate('BuyerTabs')} variant="outline" fullWidth />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  checkmark: { fontSize: 80, marginBottom: Spacing.lg },
  title: { fontSize: FontSize.xxxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  orderId: { fontSize: FontSize.sm, color: Colors.primary, marginTop: Spacing.xs, fontWeight: FontWeight.medium },
  sub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.md, lineHeight: 22 },
  buttons: { width: '100%', marginTop: Spacing.xxl },
});


