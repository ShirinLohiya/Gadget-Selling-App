import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Radius } from '../../constants/theme';
import { useListingsStore } from '../../store/useListingsStore';
import { Button } from '../../components/Button';

// ─── Person D's screen — scaffold provided by Person E ───
export default function ListingsScreen({ navigation }: any) {
  const { listings, removeListing } = useListingsStore();

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Listing', `Remove "${name}" from your listings?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeListing(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My Listings</Text>
        <Button label="+ Add" onPress={() => {}} size="sm" />
      </View>
      <FlatList
        data={listings}
        keyExtractor={(l) => l.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.images[0] }} style={styles.image} resizeMode="cover" />
            <View style={styles.content}>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
              <View style={styles.actions}>
                <Button label="Edit" onPress={() => {}} size="sm" variant="outline" style={{ flex: 1, marginRight: Spacing.xs }} />
                <Button label="Delete" onPress={() => handleDelete(item.id, item.name)} size="sm" variant="danger" style={{ flex: 1 }} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No listings yet. Add your first product!</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md },
  title: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: FontWeight.bold },
  list: { padding: Spacing.md },
  card: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: Radius.lg, marginBottom: Spacing.sm, overflow: 'hidden' },
  image: { width: 100, height: 100, backgroundColor: Colors.surfaceAlt },
  content: { flex: 1, padding: Spacing.sm },
  name: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: FontWeight.semiBold },
  category: { fontSize: FontSize.xs, color: Colors.primary, marginTop: 2 },
  price: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.bold, marginTop: 4 },
  actions: { flexDirection: 'row', marginTop: Spacing.xs },
  empty: { textAlign: 'center', color: Colors.textSecondary, marginTop: Spacing.xxl, fontSize: FontSize.md },
});



