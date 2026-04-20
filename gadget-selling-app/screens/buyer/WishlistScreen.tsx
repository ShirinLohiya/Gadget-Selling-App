import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import { ProductCard } from '../../components/ProductCard';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import products from '../../data/products.json';

// ─── Person B's screen — scaffold provided by Person E ───
export default function WishlistScreen({ navigation }: any) {
  const { productIds, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = products.filter((p) => productIds.includes(p.id));

  if (wishlisted.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>❤️</Text>
          <Text style={styles.emptyTitle}>No saved items yet</Text>
          <Text style={styles.emptySub}>Tap the heart icon on any product to save it here.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Wishlist ({productIds.length})</Text>
      <FlatList
        data={wishlisted}
        keyExtractor={(p) => p.id}
        numColumns={2}
        contentContainerStyle={{ padding: Spacing.sm }}
        renderItem={({ item }) => (
          <ProductCard
            product={item as any}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
            onLongPress={() => toggle(item.id)}   // ✅ ADD THIS
            onAddToCart={() =>
              addItem({
                productId: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.images[0],
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold, padding: Spacing.md },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  emptyTitle: { fontSize: FontSize.xl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  emptySub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs },
});



