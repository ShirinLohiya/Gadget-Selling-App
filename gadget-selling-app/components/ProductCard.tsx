import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, FontSize, FontWeight, Shadow } from '../constants/theme';
import { useWishlistStore } from '../store/useWishlistStore';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isFeatured?: boolean;
  isFlashSale?: boolean;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart?: () => void;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  layout = 'grid',
}) => {
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  if (layout === 'list') {
    return (
      <TouchableOpacity style={styles.listCard} onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: product.images[0] }} style={styles.listImage} resizeMode="cover" />
        <View style={styles.listContent}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.nameText} numberOfLines={2}>{product.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color={Colors.warning} />
            <Text style={styles.ratingText}>{product.rating} ({product.reviewCount})</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.wishlistBtnList}
          onPress={() => toggle(product.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? Colors.error : Colors.textSecondary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.gridCard} onPress={onPress} activeOpacity={0.85}>
      {/* Discount Badge */}
      {product.discount > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.discount}% OFF</Text>
        </View>
      )}

      {/* Flash Sale Badge */}
      {product.isFlashSale && (
        <View style={styles.flashBadge}>
          <Ionicons name="flash" size={10} color="#fff" />
          <Text style={styles.flashText}>FLASH</Text>
        </View>
      )}

      {/* Wishlist Button */}
      <TouchableOpacity
        style={styles.wishlistBtn}
        onPress={() => toggle(product.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={wishlisted ? 'heart' : 'heart-outline'}
          size={18}
          color={wishlisted ? Colors.error : Colors.textSecondary}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: product.images[0] }}
        style={styles.gridImage}
        resizeMode="cover"
      />

      <View style={styles.gridContent}>
        <Text style={styles.brandText}>{product.brand}</Text>
        <Text style={styles.nameText} numberOfLines={2}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={11} color={Colors.warning} />
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.discount > 0 && (
            <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
          )}
        </View>

        {onAddToCart && (
          <TouchableOpacity style={styles.addBtn} onPress={onAddToCart} activeOpacity={0.8}>
            <Ionicons name="add" size={16} color="#fff" />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Grid Card
  gridCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    flex: 1,
    margin: Spacing.xs,
    ...Shadow.sm,
  },
  gridImage: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.surfaceAlt,
  },
  gridContent: {
    padding: Spacing.sm,
  },

  // List Card
  listCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  listImage: {
    width: 110,
    height: 110,
    backgroundColor: Colors.surfaceAlt,
  },
  listContent: {
    flex: 1,
    padding: Spacing.sm,
    justifyContent: 'center',
  },

  // Shared
  brandText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  nameText: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    gap: 3,
  },
  ratingText: {
    fontSize: FontSize.xs,
    color: Colors.warning,
    fontWeight: FontWeight.medium,
  },
  reviewCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    fontWeight: FontWeight.bold,
  },
  originalPrice: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },

  // Badges
  discountBadge: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: Colors.error,
    borderRadius: Radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  discountText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: FontWeight.bold,
  },
  flashBadge: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: Colors.warning,
    borderRadius: Radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    zIndex: 1,
  },
  flashText: {
    fontSize: 9,
    color: Colors.background,
    fontWeight: FontWeight.bold,
  },

  // Wishlist
  wishlistBtn: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: Colors.surface + 'CC',
    borderRadius: Radius.full,
    padding: 6,
    zIndex: 1,
  },
  wishlistBtnList: {
    padding: Spacing.sm,
    alignSelf: 'center',
  },

  // Add to Cart btn
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingVertical: 6,
    gap: 4,
    marginTop: Spacing.xs,
  },
  addBtnText: {
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
    fontWeight: FontWeight.semiBold,
  },
});
