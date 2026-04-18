import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, FontSize, FontWeight } from '../constants/theme';
import { CartItemType } from '../store/useCartStore';

interface CartItemProps {
  item: CartItemType;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
  onSaveToWishlist?: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQty,
  onRemove,
  onSaveToWishlist,
}) => {
  const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

        {(item.selectedColor || item.selectedStorage) && (
          <Text style={styles.variant}>
            {[item.selectedColor, item.selectedStorage].filter(Boolean).join(' • ')}
          </Text>
        )}

        <Text style={styles.price}>{formatPrice(item.price)}</Text>

        <View style={styles.actions}>
          {/* Quantity Picker */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => onUpdateQty(item.quantity - 1)}
            >
              <Ionicons
                name={item.quantity === 1 ? 'trash-outline' : 'remove'}
                size={16}
                color={item.quantity === 1 ? Colors.error : Colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => onUpdateQty(item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Side Actions */}
          <View style={styles.sideActions}>
            {onSaveToWishlist && (
              <TouchableOpacity onPress={onSaveToWishlist}>
                <Ionicons name="heart-outline" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onRemove} style={{ marginLeft: Spacing.sm }}>
              <Ionicons name="close" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
  },
  content: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  name: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
    lineHeight: 18,
  },
  variant: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  qtyBtn: {
    padding: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  qty: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    fontWeight: FontWeight.bold,
    paddingHorizontal: Spacing.sm,
    minWidth: 30,
    textAlign: 'center',
  },
  sideActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
