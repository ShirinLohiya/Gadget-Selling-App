import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { useListingsStore } from '../../store/useListingsStore';
import { Ionicons } from '@expo/vector-icons';

// ─── Person D's screen — scaffold provided by Person E ───
export default function InquiriesScreen({ navigation }: any) {
  const { inquiries, markInquiryRead } = useListingsStore();

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Inquiries</Text>
      <FlatList
        data={inquiries}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, !item.isRead && styles.unread]}
            onPress={() => { markInquiryRead(item.id); }}
          >
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.buyerName.charAt(0)}</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.topRow}>
                  <Text style={styles.buyer}>{item.buyerName}</Text>
                  <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
                </View>
                <Text style={styles.product}>{item.productName}</Text>
                <Text numberOfLines={2} style={styles.message}>{item.message}</Text>
                {item.reply && (
                  <View style={styles.replyChip}>
                    <Ionicons name="checkmark-circle" size={12} color={Colors.success} />
                    <Text style={styles.replyText}>Replied</Text>
                  </View>
                )}
              </View>
              {!item.isRead && <View style={styles.dot} />}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No inquiries yet from buyers.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold, padding: Spacing.md },
  list: { padding: Spacing.md },
  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm },
  unread: { borderLeftWidth: 3, borderLeftColor: Colors.primary },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary + '33', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  avatarText: { color: Colors.primary, fontWeight: FontWeight.bold, fontSize: FontSize.md },
  content: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  buyer: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: FontWeight.semiBold },
  date: { fontSize: FontSize.xs, color: Colors.textMuted },
  product: { fontSize: FontSize.xs, color: Colors.accent, marginTop: 2 },
  message: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 4, lineHeight: 16 },
  replyChip: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  replyText: { fontSize: FontSize.xs, color: Colors.success },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginLeft: Spacing.xs, marginTop: 4 },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xxl, fontSize: FontSize.md },
});



