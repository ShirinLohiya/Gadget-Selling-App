import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import { SearchBar } from '../../components/SearchBar';
import { CategoryPill } from '../../components/CategoryPill';
import { ProductCard } from '../../components/ProductCard';
import products from '../../data/products.json';
import categories from '../../data/categories.json';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

// ─── Person B's screen — scaffold provided by Person E ───
export default function HomeScreen({ navigation }: any) {
  const user = useAuthStore((s) => s.user);
  const [search, setSearch] = React.useState('');
  const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);
  const [activeCategory, setActiveCategory] = React.useState('All');
  const addItem = useCartStore((s) => s.addItem);
  const { toggle } = useWishlistStore();

  const filtered = products
  .filter((p) =>
    activeCategory === 'All' ? true : p.category === activeCategory
  )
  .filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

const featured = filtered.slice(0, 6);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] ?? 'there'} 👋</Text>
            <Text style={styles.tagline}>Find your next gadget</Text>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={search}
          onChangeText={(text) => setSearch(text)}
          onFocus={() => navigation.navigate('Explore')}
          style={styles.search}
        />

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={[{ id: 'all', name: 'All' }, ...categories]}
          keyExtractor={(c) => c.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.sm }}
          renderItem={({ item }) => (
            <CategoryPill
              label={item.name}
              color={(item as any).color}
              isActive={activeCategory === item.name}
              onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
            />
          )}
        />

        {/* Featured Products */}
        <Text style={styles.sectionTitle}>Featured Gadgets</Text>
        <View style={styles.grid}>
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p as any}
              onPress={() => navigation.navigate('ProductDetail', { productId: p.id })}
              onLongPress={() => toggle(p.id)}   // ✅ ADD THIS LINE
              onAddToCart={() => addItem({ productId: p.id, name: p.name, price: p.price, imageUrl: p.images[0] })}
              layout="grid"
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  greeting: { fontSize: FontSize.xl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  tagline: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  search: { marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: FontWeight.bold, marginBottom: Spacing.sm, marginTop: Spacing.md },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});



