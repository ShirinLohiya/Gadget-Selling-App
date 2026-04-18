import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, FontSize, FontWeight } from '../constants/theme';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* Avatar Circle */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{review.userName.charAt(0).toUpperCase()}</Text>
        </View>

        <View style={styles.headerText}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{review.userName}</Text>
            {review.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={12} color={Colors.success} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          <View style={styles.starsRow}>
            {stars.map((filled, i) => (
              <Ionicons
                key={i}
                name={filled ? 'star' : 'star-outline'}
                size={12}
                color={Colors.warning}
              />
            ))}
          </View>
        </View>

        <Text style={styles.date}>{formatDate(review.date)}</Text>
      </View>

      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
  },
  headerText: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 2,
  },
  userName: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    fontWeight: FontWeight.semiBold,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  verifiedText: {
    fontSize: FontSize.xs,
    color: Colors.success,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  comment: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
