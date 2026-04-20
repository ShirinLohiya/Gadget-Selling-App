import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import { SearchBar } from '../../components/SearchBar';
import { CategoryPill } from '../../components/CategoryPill';
import { ProductCard } from '../../components/ProductCard';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import products from '../../data/products.json';
import categories from '../../data/categories.json';

// ─── Person B's screen — scaffold provided by Person E ───
export default function ExploreScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const addItem = useCartStore((s) => s.addItem);
  const [sort, setSort] = React.useState('low'); // low or high
  const { toggle } = useWishlistStore();

  const filtered = products
  .filter((p) => {
    const matchQuery =
      query.trim() === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase());

    const matchCat =
      activeCategory === 'All' || p.category === activeCategory;

    return matchQuery && matchCat;
  })
  .sort((a, b) =>
    sort === 'low' ? a.price - b.price : b.price - a.price
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text
  style={{ color: Colors.primary, marginBottom: 8 }}
  onPress={() => setSort(sort === 'low' ? 'high' : 'low')}
>
  Sort by Price: {sort === 'low' ? 'Low → High' : 'High → Low'}
</Text>
        <SearchBar value={query} onChangeText={setQuery} autoFocus style={styles.search} />
        <FlatList
          horizontal
          data={[{ id: 'all', name: 'All' }, ...categories]}
          keyExtractor={(c) => c.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryPill label={item.name} color={(item as any).color} isActive={activeCategory === item.name} onPress={() => setActiveCategory(item.name)} />
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item as any}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
            onLongPress={() => toggle(item.id)}
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
        ListEmptyComponent={
          <Text style={styles.empty}>
            No gadgets found. Try a different search.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.md, paddingBottom: 0 },
  title: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold, marginBottom: Spacing.sm },
  search: { marginBottom: Spacing.sm },
  list: { padding: Spacing.sm },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xxl, fontSize: FontSize.md },
});



