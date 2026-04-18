import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, Radius, Shadow } from '../../constants/theme';
import { Button } from '../../components/Button';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import products from '../../data/products.json';

// ─── Person B's screen — scaffold provided by Person E ───
export default function ProductDetailScreen({ route, navigation }: any) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);

  const [selectedColor, setSelectedColor] = useState(product?.variants?.colors?.[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.variants?.storage?.[0]);
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(productId);

  if (!product) return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.notFound}>Product not found.</Text>
    </SafeAreaView>
  );

  const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  const handleAddToCart = () => {
    addItem({ productId: product.id, name: product.name, price: product.price, imageUrl: product.images[0], selectedColor, selectedStorage });
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishBtn} onPress={() => toggle(productId)}>
            <Ionicons name={wishlisted ? 'heart' : 'heart-outline'} size={22} color={wishlisted ? Colors.error : Colors.textPrimary} />
          </TouchableOpacity>
          <Image source={{ uri: product.images[0] }} style={styles.image} resizeMode="cover" />
        </View>

        <View style={styles.content}>
          {/* Brand + Name */}
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={Colors.warning} />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviews}>({product.reviewCount} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.discount > 0 && (
              <>
                <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
                <View style={styles.discountBadge}><Text style={styles.discountText}>{product.discount}% OFF</Text></View>
              </>
            )}
          </View>

          {/* Color Variants */}
          {product.variants.colors && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color: <Text style={styles.selectedVariant}>{selectedColor}</Text></Text>
              <View style={styles.variantRow}>
                {product.variants.colors.map((c) => (
                  <TouchableOpacity key={c} style={[styles.variantPill, selectedColor === c && styles.variantPillActive]} onPress={() => setSelectedColor(c)}>
                    <Text style={[styles.variantText, selectedColor === c && styles.variantTextActive]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Storage Variants */}
          {product.variants.storage && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Storage: <Text style={styles.selectedVariant}>{selectedStorage}</Text></Text>
              <View style={styles.variantRow}>
                {product.variants.storage.map((s) => (
                  <TouchableOpacity key={s} style={[styles.variantPill, selectedStorage === s && styles.variantPillActive]} onPress={() => setSelectedStorage(s)}>
                    <Text style={[styles.variantText, selectedStorage === s && styles.variantTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Qty picker */}
          <View style={styles.qtyRow}>
            <Text style={styles.sectionTitle}>Quantity:</Text>
            <View style={styles.qtyControls}>
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>
                <Ionicons name="remove" size={18} color={Colors.textPrimary} />
              </TouchableOpacity>
              <Text style={styles.qty}>{qty}</Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}>
                <Ionicons name="add" size={18} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Specs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            {Object.entries(product.specs).map(([key, val]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specVal}>{val}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <Button label="Add to Cart" onPress={handleAddToCart} variant="outline" style={{ flex: 1, marginRight: Spacing.sm }} />
        <Button label="Buy Now" onPress={() => { handleAddToCart(); navigation.navigate('CheckoutAddress'); }} style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  notFound: { color: Colors.textSecondary, textAlign: 'center', marginTop: 100, fontSize: FontSize.lg },
  imageContainer: { position: 'relative', height: 300, backgroundColor: Colors.surfaceAlt },
  image: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 16, left: 16, zIndex: 10, backgroundColor: Colors.surface + 'DD', borderRadius: 20, padding: 8 },
  wishBtn: { position: 'absolute', top: 16, right: 16, zIndex: 10, backgroundColor: Colors.surface + 'DD', borderRadius: 20, padding: 8 },
  content: { padding: Spacing.md },
  brand: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.semiBold, textTransform: 'uppercase' },
  name: { fontSize: FontSize.xl, color: Colors.textPrimary, fontWeight: FontWeight.bold, marginTop: 4, lineHeight: 28 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: Spacing.xs },
  rating: { fontSize: FontSize.sm, color: Colors.warning, fontWeight: FontWeight.bold },
  reviews: { fontSize: FontSize.xs, color: Colors.textMuted },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm, flexWrap: 'wrap' },
  price: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  originalPrice: { fontSize: FontSize.md, color: Colors.textMuted, textDecorationLine: 'line-through' },
  discountBadge: { backgroundColor: Colors.error, borderRadius: Radius.xs, paddingHorizontal: 8, paddingVertical: 2 },
  discountText: { color: '#fff', fontSize: FontSize.xs, fontWeight: FontWeight.bold },
  section: { marginTop: Spacing.lg },
  sectionTitle: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.semiBold, marginBottom: Spacing.sm },
  selectedVariant: { color: Colors.primary },
  variantRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  variantPill: { borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs },
  variantPillActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '22' },
  variantText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  variantTextActive: { color: Colors.primary, fontWeight: FontWeight.semiBold },
  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.lg },
  qtyControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, overflow: 'hidden' },
  qtyBtn: { padding: Spacing.sm, paddingHorizontal: Spacing.md },
  qty: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: FontWeight.bold, paddingHorizontal: Spacing.md, minWidth: 40, textAlign: 'center' },
  description: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 22 },
  specRow: { flexDirection: 'row', paddingVertical: Spacing.xs, borderBottomWidth: 1, borderBottomColor: Colors.border },
  specKey: { flex: 1, fontSize: FontSize.sm, color: Colors.textSecondary },
  specVal: { flex: 2, fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  bottomBar: { flexDirection: 'row', padding: Spacing.md, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border },
});



