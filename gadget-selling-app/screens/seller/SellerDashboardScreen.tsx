import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // ✅ FIXED
import { Colors } from '../../constants/theme';
import { useListingsStore } from '../../store/useListingsStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function SellerDashboardScreen() {
  const navigation = useNavigation<any>(); // ✅ FIXED

  const { listings, inquiries, getUnreadCount } = useListingsStore();

  const user = useAuthStore((s) => s.user);

  const unread = getUnreadCount();

  const inventoryValue = listings.reduce(
    (sum, l) => sum + l.price * l.stock,
    0
  );

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

        {/* Header */}
        <Text style={styles.greeting}>
          Hello, {user?.name?.split(' ')[0] || 'Seller'} 👋
        </Text>
        <Text style={styles.sub}>Here's your store at a glance</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard
            label="Listings"
            value={listings.length}
            emoji="📦"
            color={Colors.primary}
          />
          <StatCard
            label="Inquiries"
            value={`${unread} new`}
            emoji="💬"
            color={Colors.accent}
          />
          <StatCard
            label="Est. Value"
            value={`₹${(inventoryValue / 100000).toFixed(1)}L`}
            emoji="💰"
            color={Colors.success}
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Listings')} // ✅ FIXED
        >
          <Text style={styles.actionEmoji}>➕</Text>
          <Text style={styles.actionLabel}>Add New Listing</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Inquiries')} // ✅ FIXED
        >
          <Text style={styles.actionEmoji}>💬</Text>
          <Text style={styles.actionLabel}>
            View Inquiries {unread > 0 && `(${unread} unread)`}
          </Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Recent Inquiries */}
        <Text style={styles.sectionTitle}>Recent Inquiries</Text>

        {inquiries.slice(0, 3).map((inq) => (
          <View
            key={inq.id}
            style={[styles.inquiryCard, !inq.isRead && styles.unreadCard]}
          >
            <View style={styles.inquiryHeader}>
              <Text style={styles.inquiryBuyer}>{inq.buyerName}</Text>
              {!inq.isRead && <View style={styles.unreadDot} />}
            </View>

            <Text style={styles.inquiryProduct}>
              {inq.productName}
            </Text>

            <Text style={styles.inquiryMsg} numberOfLines={2}>
              {inq.message}
            </Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  container: { padding: 16 },

  greeting: {
    fontSize: 22,
    color: Colors.textPrimary,
    fontWeight: '700',
  },

  sub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
  },

  statEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },

  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },

  sectionTitle: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 12,
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  actionEmoji: {
    fontSize: 18,
    marginRight: 10,
  },

  actionLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  chevron: {
    fontSize: 20,
    color: Colors.textSecondary,
  },

  inquiryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },

  inquiryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inquiryBuyer: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },

  inquiryProduct: {
    fontSize: 12,
    color: Colors.accent,
    marginTop: 2,
  },

  inquiryMsg: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});