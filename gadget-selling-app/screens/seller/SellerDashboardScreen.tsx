import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius, Shadow } from '../../constants/theme';
import { useListingsStore } from '../../store/useListingsStore';
import { useAuthStore } from '../../store/useAuthStore';

// ─── Person D's screen — scaffold provided by Person E ───
export default function SellerDashboardScreen({ navigation }: any) {
  const { listings, inquiries, getUnreadCount } = useListingsStore();
  const user = useAuthStore((s) => s.user);

  const unread = getUnreadCount();
  const mockRevenue = listings.reduce((sum, l) => sum + l.price * l.stock, 0);

  const StatCard = ({ label, value, emoji, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]} 👋</Text>
        <Text style={styles.sub}>Here's your store at a glance</Text>

        {/* Stat Cards */}
        <View style={styles.statsRow}>
          <StatCard label="Listings" value={listings.length} emoji="📦" color={Colors.primary} />
          <StatCard label="Inquiries" value={`${unread} new`} emoji="💬" color={Colors.accent} />
          <StatCard label="Est. Value" value={`₹${(mockRevenue / 100000).toFixed(1)}L`} emoji="💰" color={Colors.success} />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Listings')}>
          <Text style={styles.actionEmoji}>➕</Text>
          <Text style={styles.actionLabel}>Add New Listing</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Inquiries')}>
          <Text style={styles.actionEmoji}>💬</Text>
          <Text style={styles.actionLabel}>View Inquiries {unread > 0 && `(${unread} unread)`}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Recent Inquiries */}
        <Text style={styles.sectionTitle}>Recent Inquiries</Text>
        {inquiries.slice(0, 3).map((inq) => (
          <View key={inq.id} style={[styles.inquiryCard, !inq.isRead && styles.unreadCard]}>
            <View style={styles.inquiryHeader}>
              <Text style={styles.inquiryBuyer}>{inq.buyerName}</Text>
              {!inq.isRead && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.inquiryProduct}>{inq.productName}</Text>
            <Text style={styles.inquiryMsg} numberOfLines={2}>{inq.message}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.md },
  greeting: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  sub: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.lg, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  statCard: { flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, borderLeftWidth: 3, ...Shadow.sm },
  statEmoji: { fontSize: 24, marginBottom: Spacing.xs },
  statValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: FontWeight.bold, marginBottom: Spacing.sm, marginTop: Spacing.md },
  actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  actionEmoji: { fontSize: 20, marginRight: Spacing.md },
  actionLabel: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  chevron: { fontSize: FontSize.xl, color: Colors.textMuted },
  inquiryCard: { backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  unreadCard: { borderLeftWidth: 3, borderLeftColor: Colors.primary },
  inquiryHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inquiryBuyer: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: FontWeight.semiBold },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  inquiryProduct: { fontSize: FontSize.xs, color: Colors.accent, marginTop: 2 },
  inquiryMsg: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 4, lineHeight: 16 },
});



