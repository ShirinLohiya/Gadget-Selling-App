import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';  
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useListingsStore } from '../../store/useListingsStore';

const Colors = {
  primary: '#6C5CE7',
  accent: '#00CEC9',
  background: '#0F0F13',
  surface: '#1A1A24',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  success: '#00B894',
  warning: '#FDCB6E',
  error: '#D63031',
};

export default function Inquiries() {
  const router = useRouter();

  // ✅ Correct store usage
  const inquiries = useListingsStore((s) => s.inquiries);
  const markAsRead = useListingsStore((s) => s.markInquiryRead);
  const replyToInquiry = useListingsStore((s) => s.replyToInquiry);
  const unreadCount = useListingsStore((s) => s.getUnreadCount());

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  const selected = inquiries.find((i) => i.id === selectedId);

  const openInquiry = (id: string) => {
    markAsRead(id);
    setSelectedId(id);
    setReply('');
  };

  const handleReply = () => {
    if (!reply.trim() || !selectedId) return;
    replyToInquiry(selectedId, reply.trim());
    setReply('');
  };

  // ================= DETAIL VIEW =================
  if (selected) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedId(null)}>
              <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.title}>{selected.buyerName}</Text>
            <View style={{ width: 22 }} />
          </View>

          <ScrollView contentContainerStyle={styles.detailContent}>
            {/* Product */}
            {selected.productName && (
              <View style={styles.productRef}>
                <Ionicons name="cube-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.productRefText}>
                  Re: {selected.productName}
                </Text>
              </View>
            )}

            {/* Buyer Message */}
            <View style={styles.bubble}>
              <Text style={styles.bubbleLabel}>Buyer</Text>
              <Text style={styles.bubbleText}>{selected.message}</Text>
              <Text style={styles.bubbleTime}>{selected.createdAt}</Text>
            </View>

            {/* ✅ FIXED: Single reply (not array) */}
            {selected.reply && (
              <View style={[styles.bubble, styles.replyBubble]}>
                <Text style={[styles.bubbleLabel, { color: Colors.accent }]}>
                  You
                </Text>
                <Text style={styles.bubbleText}>{selected.reply}</Text>
                <Text style={styles.bubbleTime}>Just now</Text>
              </View>
            )}
          </ScrollView>

          {/* Reply Box */}
          <View style={styles.replyBar}>
            <TextInput
              style={styles.replyInput}
              placeholder="Write a reply..."
              placeholderTextColor={Colors.textSecondary}
              value={reply}
              onChangeText={setReply}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, !reply.trim() && { opacity: 0.4 }]}
              onPress={handleReply}
              disabled={!reply.trim()}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // ================= LIST VIEW =================
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.title}>Inquiries</Text>

        {unreadCount > 0 ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{unreadCount} new</Text>
          </View>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {inquiries.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="chatbubbles-outline" size={52} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>No inquiries yet</Text>
          <Text style={styles.emptySubtitle}>
            Buyers will reach out here
          </Text>
        </View>
      ) : (
        <FlatList
          data={inquiries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.inquiryCard}
              onPress={() => openInquiry(item.id)}
            >
              <View style={styles.inquiryLeft}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarLetter}>
                    {item.buyerName?.[0]?.toUpperCase()}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.inqTopRow}>
                    <Text style={styles.buyerName}>
                      {item.buyerName}
                    </Text>
                    {!item.isRead && <View style={styles.dot} />}
                  </View>

                  {item.productName && (
                    <Text style={styles.productLabel}>
                      {item.productName}
                    </Text>
                  )}

                  <Text style={styles.preview} numberOfLines={1}>
                    {item.message}
                  </Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 56,
  },

  title: { color: Colors.textPrimary, fontSize: 18, fontWeight: '700' },

  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  unreadBadgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  inquiryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inquiryLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '33',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarLetter: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },

  inqTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  buyerName: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },

  productLabel: {
    color: Colors.accent,
    fontSize: 11,
    marginTop: 1,
  },

  preview: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },

  emptySubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  detailContent: { padding: 20, gap: 14, paddingBottom: 30 },

  productRef: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 10,
  },

  productRefText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },

  bubble: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
  },

  replyBubble: {
    borderLeftColor: Colors.accent,
    backgroundColor: Colors.primary + '15',
  },

  bubbleLabel: {
    color: Colors.warning,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },

  bubbleText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },

  bubbleTime: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 6,
  },

  replyBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
  },

  replyInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    color: Colors.textPrimary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },

  sendBtn: {
    backgroundColor: Colors.primary,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
