import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import mockOrders from '../../data/mockOrders.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Person C's screen — Cart & Checkout Lead ───
export default function OrderDetailScreen({ route, navigation }: any) {
  const { orderId } = route.params;
  const [order, setOrder] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const stored = await AsyncStorage.getItem('@mock_orders');
        if (stored) {
          const orders = JSON.parse(stored);
          const found = orders.find((o: any) => o.id === orderId);
          if (found) {
            setOrder(found);
            return;
          }
        }
      } catch {}
      // Fallback to static mock data
      const fallback = mockOrders.find((o) => o.id === orderId) ?? mockOrders[0];
      setOrder(fallback);
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Order #{order.id}</Text>
        <Text style={[styles.status, { color: order.status === 'delivered' ? Colors.success : Colors.warning }]}>
          {order.status.toUpperCase()}
        </Text>

        {/* Tracking Timeline */}
        <Text style={styles.sectionTitle}>Tracking</Text>
        {order.tracking.map((step: any, i: number) => (
          <View key={i} style={styles.trackStep}>
            <View style={[styles.trackDot, step.done && styles.trackDotDone]}>
              {step.done && <Ionicons name="checkmark" size={12} color="#fff" />}
            </View>
            {i < order.tracking.length - 1 && <View style={[styles.trackLine, step.done && styles.trackLineDone]} />}
            <View style={styles.trackInfo}>
              <Text style={[styles.trackLabel, step.done && styles.trackLabelDone]}>{step.status}</Text>
              {step.timestamp && (
                <Text style={styles.trackTime}>
                  {new Date(step.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </Text>
              )}
            </View>
          </View>
        ))}

        {/* Items */}
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item: any) => (
          <View key={item.productId} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>× {item.qty}</Text>
            <Text style={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString('en-IN')}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Paid</Text>
          <Text style={styles.totalValue}>₹{order.total.toLocaleString('en-IN')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  back: { padding: Spacing.md, paddingBottom: 0 },
  backText: { color: Colors.primary, fontSize: FontSize.md },
  container: { padding: Spacing.md },
  title: { fontSize: FontSize.xl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  status: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, marginTop: 4, marginBottom: Spacing.lg },
  sectionTitle: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.semiBold, marginBottom: Spacing.md, marginTop: Spacing.md },
  trackStep: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 0 },
  trackDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md, zIndex: 1 },
  trackDotDone: { backgroundColor: Colors.success },
  trackLine: { position: 'absolute', left: 11, top: 24, width: 2, height: 36, backgroundColor: Colors.border },
  trackLineDone: { backgroundColor: Colors.success },
  trackInfo: { flex: 1, paddingBottom: Spacing.lg },
  trackLabel: { fontSize: FontSize.sm, color: Colors.textMuted },
  trackLabelDone: { color: Colors.textPrimary, fontWeight: FontWeight.medium },
  trackTime: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  itemName: { flex: 1, fontSize: FontSize.sm, color: Colors.textPrimary },
  itemQty: { fontSize: FontSize.sm, color: Colors.textSecondary, marginHorizontal: Spacing.sm },
  itemPrice: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.md, marginTop: Spacing.md },
  totalLabel: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  totalValue: { fontSize: FontSize.lg, color: Colors.primary, fontWeight: FontWeight.bold },
});
